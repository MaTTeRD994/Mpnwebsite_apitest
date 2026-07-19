require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');
const StatsPuller = require('./statsPuller');

// 1. Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// 2. Initialize Discord Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// 3. Define Slash Commands
const commands = [
  {
    name: 'lookup',
    description: 'Shows detailed information about a player on our network.',
    options: [
      {
        name: 'playername',
        type: 3, // STRING
        description: 'The Minecraft username of the player',
        required: true,
      }
    ]
  },
  {
    name: 'players',
    description: 'Gives a live overview of all players currently online across our servers.'
  },
  {
    name: 'networkstatus',
    description: 'Displays the current status and player count for each server in the network.'
  },
  {
    name: 'link',
    description: 'Get instructions on how to link your Minecraft account to Discord.'
  },
  {
    name: 'help',
    description: 'Show a list of all available bot commands.'
  }
];

// 4. Register Commands on Ready
client.once('ready', async () => {
  console.log(`[Discord] Logged in as ${client.user.tag}`);
  
  // Register Slash Commands
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
  try {
    console.log('[Discord] Refreshing application (/) commands.');
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, process.env.DISCORD_SERVER_ID),
      { body: commands },
    );
    console.log('[Discord] Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }

  // Set initial presence
  updatePresence();
  
  // Start the background sync intervals
  setInterval(updatePresence, 1000 * 60 * 5); // Update status every 5 mins
  setInterval(syncRoles, 1000 * 60 * 2); // Sync roles every 2 mins
  
  // Run an initial sync immediately
  syncRoles();
});

// 5. Background Role Syncing
async function syncRoles() {
  try {
    console.log("[Sync] Checking for newly linked accounts...");
    const guild = await client.guilds.fetch(process.env.DISCORD_SERVER_ID);
    if (!guild) return;

    // Fetch all users from Supabase who have linked a Discord account
    const { data: linkedUsers, error } = await supabase
      .from('users')
      .select('discord_id, minecraft_name')
      .not('discord_id', 'is', null);
      
    if (error || !linkedUsers) return;

    for (const user of linkedUsers) {
      try {
        const member = await guild.members.fetch(user.discord_id).catch(() => null);
        if (member) {
          // Check if they don't have the Linked Role yet
          if (!member.roles.cache.has(process.env.DISCORD_LINKED_ROLE_ID)) {
            await member.roles.add(process.env.DISCORD_LINKED_ROLE_ID);
            console.log(`[Sync] Assigned Linked role to ${member.user.tag} (MC: ${user.minecraft_name})`);
          }
        }
      } catch (err) {
        // Ignore errors for individual users (e.g. left server)
      }
    }
  } catch (err) {
    console.error("[Sync] Error during role sync:", err);
  }
}

// 6. Dynamic Presence Update
async function updatePresence() {
  try {
    // Fetch live status from the website's API (which polls mcsrvstat.us natively)
    const res = await fetch('https://mpnwebsite-apitest.vercel.app/api/servers');
    if (!res.ok) return;
    const servers = await res.json();
    
    // Sum up the players count from all online servers
    const totalPlayers = servers.reduce((acc, server) => acc + (server.players || 0), 0);
    
    client.user.setActivity({
      name: `${totalPlayers} players online | mpnhost.com`,
      type: ActivityType.Watching
    });
  } catch (err) {}
}

// 7. Command Handling
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'link') {
    const embed = new EmbedBuilder()
      .setTitle('Link Your Account')
      .setColor('#5865F2')
      .setDescription('Link your Minecraft account to unlock Discord VIP perks, sync your playtime, and track your global network stats!')
      .addFields(
        { name: 'Step 1', value: 'Log into any of our Minecraft servers.' },
        { name: 'Step 2', value: 'Type `/link` in the game chat. You will receive a secure 6-digit code.' },
        { name: 'Step 3', value: 'Click the link in chat or go to `https://mpnhost.com/account` and enter your code.' }
      )
      .setFooter({ text: 'MaTTeRPixel Network' });
      
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }

  if (interaction.commandName === 'networkstatus') {
    await interaction.deferReply({ ephemeral: true });
    
    try {
      const res = await fetch('https://mpnwebsite-apitest.vercel.app/api/servers');
      if (!res.ok) throw new Error();
      const servers = await res.json();

      const embed = new EmbedBuilder()
        .setTitle('Network Status')
        .setColor('#4ADE80');
        
      let desc = '';
      for (const server of servers) {
        if (server.status === 'Online' || server.status === 'Starting') {
          desc += `**${server.name}**: 🟢 ${server.players || 0} players online\n`;
        } else {
          desc += `**${server.name}**: 🔴 Offline\n`;
        }
      }
      embed.setDescription(desc || 'No server data available.');
      
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      return interaction.editReply('❌ Failed to fetch live network status.');
    }
  }
  
  if (interaction.commandName === 'players') {
    await interaction.deferReply({ ephemeral: true });
    
    // Fetch unique player names from the players table who joined recently
    // Wait, mcsrvstat doesn't always provide player names for heavily modded servers,
    // so we will query the DB for the last 5 days of active players just as an approximation
    // since the database updated_at only updates on logout
    const { data: activePlayers, error } = await supabase
      .from('players')
      .select('uuid, name')
      .order('updated_at', { ascending: false })
      .limit(20);
      
    if (error) {
      return interaction.editReply('❌ Failed to fetch player list.');
    }
    
    if (!activePlayers || activePlayers.length === 0) {
      return interaction.editReply('There are currently no players online across the network.');
    }
    
    // Deduplicate names
    const playerNames = [...new Set(activePlayers.map(p => p.name))].join(', ');
    
    const embed = new EmbedBuilder()
      .setTitle(`Recently Active Players`)
      .setColor('#60A5FA')
      .setDescription(playerNames);
      
    await interaction.editReply({ embeds: [embed] });
  }

  if (interaction.commandName === 'lookup') {
    await interaction.deferReply({ ephemeral: true });
    const targetName = interaction.options.getString('playername');

    const { data: player, error } = await supabase
      .from('network_leaderboard')
      .select('*')
      .ilike('name', targetName)
      .maybeSingle();

    if (error || !player) {
      return interaction.editReply(`❌ Could not find any network statistics for player \`${targetName}\`. Make sure they have played on the network.`);
    }

    // Calculate rank
    const ranks = [
      { hours: 1500, name: 'Apex' },
      { hours: 1000, name: 'Celestial' },
      { hours: 600, name: 'Exalted' },
      { hours: 300, name: 'Angel' },
      { hours: 150, name: 'Divine' },
      { hours: 72, name: 'Oracle' },
      { hours: 36, name: 'Prophet' },
      { hours: 12, name: 'Disciple' },
      { hours: 4, name: 'Acolyte' },
      { hours: 0, name: 'Player' },
    ];
    let playerRank = 'Player';
    for (const r of ranks) {
      if (player.playtime >= r.hours) {
        playerRank = r.name;
        break;
      }
    }

    const embed1 = new EmbedBuilder()
      .setTitle(`**${player.name}**`)
      .setColor('#2C2F33') // Discord dark theme color to blend in
      .setImage(`https://mc-heads.net/avatar/${player.uuid}/128`);

    const embed2 = new EmbedBuilder()
      .setTitle('**Stats:**')
      .setColor('#2C2F33')
      .setDescription(
        `Rank: \`${playerRank}\`\n` +
        `Playtime \`${player.playtime} Hours\`\n` +
        `Modpacks Played \`${player.servers_played || 0}\`\n` +
        `Mob Kills \`${player.mob_kills || 0}\`\n` +
        `Blocks Mined \`${player.blocks_mined || 0}\`\n` +
        `Deaths \`${player.deaths || 0}\``
      );

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Check it on the Website!')
          .setStyle(ButtonStyle.Link)
          .setURL(`https://www.mpnhost.com/player/${player.uuid}`)
      );

    await interaction.editReply({ embeds: [embed1, embed2], components: [row] });
  }

  if (interaction.commandName === 'help') {
    const embed = new EmbedBuilder()
      .setTitle('Discord Bot Commands')
      .setColor('#5865F2')
      .setDescription('Our Discord bot lets you check live network information without leaving Discord. All responses are **only visible to you**.')
      .addFields(
        { name: '`/lookup <playername>`', value: 'Shows detailed information about a player on our network — stats, playtime, rank and more.' },
        { name: '`/players`', value: 'Gives a live overview of all players currently online across our servers.' },
        { name: '`/networkstatus`', value: 'Displays the current status and player count for each server in the network.' },
        { name: '`/link`', value: 'Get instructions on how to link your Minecraft account to Discord.' }
      )
      .setFooter({ text: 'MaTTeRPixel Network Bot' });
      
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});

// Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN);
