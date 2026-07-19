package com.mpn.link;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mojang.brigadier.CommandDispatcher;
import net.minecraft.Util;
import net.minecraft.commands.CommandSourceStack;
import net.minecraft.commands.Commands;
import net.minecraft.network.chat.Style;
import net.minecraft.network.chat.TextColor;
import net.minecraft.network.chat.TextComponent;
import net.minecraft.server.level.ServerPlayer;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.RegisterCommandsEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.IExtensionPoint;
import net.minecraftforge.fml.ModLoadingContext;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.loading.FMLPaths;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Mod("mpnlink")
public class LinkMod {

    private String supabaseUrl = "";
    private String supabaseKey = "";
    private String websiteUrl = "https://mpnwebsite-apitest.vercel.app";

    private static final String CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No 0/O/1/I to avoid confusion
    private static final SecureRandom RANDOM = new SecureRandom();

    public LinkMod() {
        loadConfig();
        MinecraftForge.EVENT_BUS.register(this);
        ModLoadingContext.get().registerExtensionPoint(IExtensionPoint.DisplayTest.class, () -> new IExtensionPoint.DisplayTest(() -> IExtensionPoint.DisplayTest.IGNORESERVERONLY, (a, b) -> true));
    }

    private void loadConfig() {
        try {
            Path configPath = FMLPaths.CONFIGDIR.get().resolve("mpn-link.json");
            if (!Files.exists(configPath)) {
                String defaultConfig = "{\n" +
                    "  \"supabaseUrl\": \"https://yagbveusufnarnibdisr.supabase.co\",\n" +
                    "  \"supabaseKey\": \"YOUR_SUPABASE_ANON_KEY_HERE\",\n" +
                    "  \"websiteUrl\": \"https://mpnwebsite-apitest.vercel.app\"\n" +
                    "}";
                Files.writeString(configPath, defaultConfig);
                System.out.println("[MPN-Link] Created default config at " + configPath);
                return;
            }
            String json = Files.readString(configPath);
            JsonObject config = JsonParser.parseString(json).getAsJsonObject();
            supabaseUrl = config.get("supabaseUrl").getAsString();
            supabaseKey = config.get("supabaseKey").getAsString();
            websiteUrl = config.get("websiteUrl").getAsString();
            System.out.println("[MPN-Link] Config loaded successfully");
        } catch (Exception e) {
            System.err.println("[MPN-Link] Failed to load config: " + e.getMessage());
        }
    }

    @SubscribeEvent
    public void onRegisterCommands(RegisterCommandsEvent event) {
        CommandDispatcher<CommandSourceStack> dispatcher = event.getDispatcher();
        dispatcher.register(Commands.literal("link")
            .executes(ctx -> {
                CommandSourceStack source = ctx.getSource();
                ServerPlayer player = source.getPlayerOrException();

                String uuid = player.getStringUUID();
                String name = player.getGameProfile().getName();
                String code = generateCode();

                new Thread(() -> {
                    try {
                        sendLinkCode(code, uuid, name);
                        player.getServer().execute(() -> {
                            player.sendMessage(new TextComponent(""), Util.NIL_UUID);
                            player.sendMessage(new TextComponent(" ✦ ")
                                .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0xA855F7)).withBold(true))
                                .append(new TextComponent("Your link code: ")
                                    .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0xE2E8F0)).withBold(false)))
                                .append(new TextComponent(code)
                                    .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0x4ADE80)).withBold(true))), Util.NIL_UUID);
                            player.sendMessage(new TextComponent(" ✦ ")
                                .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0xA855F7)).withBold(true))
                                .append(new TextComponent("Go to ")
                                    .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0xE2E8F0)).withBold(false)))
                                .append(new TextComponent(websiteUrl + "/account")
                                    .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0x60A5FA)).withBold(false).withUnderlined(true)))
                                .append(new TextComponent(" and enter this code")
                                    .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0xE2E8F0)).withBold(false))), Util.NIL_UUID);
                            player.sendMessage(new TextComponent(" ✦ ")
                                .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0xA855F7)).withBold(true))
                                .append(new TextComponent("Code expires in 10 minutes")
                                    .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0x94A3B8)).withBold(false))), Util.NIL_UUID);
                            player.sendMessage(new TextComponent(""), Util.NIL_UUID);
                        });
                    } catch (Exception e) {
                        player.getServer().execute(() -> {
                            player.sendMessage(new TextComponent("✗ Failed to generate link code. Please try again later.")
                                .withStyle(Style.EMPTY.withColor(TextColor.fromRgb(0xEF4444))), Util.NIL_UUID);
                        });
                        System.err.println("[MPN-Link] Error sending code: " + e.getMessage());
                    }
                }, "MPN-Link-Thread").start();

                return 1;
            })
        );
    }

    private String generateCode() {
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            sb.append(CHARS.charAt(RANDOM.nextInt(CHARS.length())));
        }
        return sb.toString();
    }

    private void sendLinkCode(String code, String uuid, String name) throws Exception {
        String endpoint = supabaseUrl + "/rest/v1/link_codes";
        String expiresAt = Instant.now().plus(10, ChronoUnit.MINUTES).toString();

        String body = String.format(
            "{\"code\":\"%s\",\"minecraft_uuid\":\"%s\",\"minecraft_name\":\"%s\",\"expires_at\":\"%s\"}",
            code, uuid, name, expiresAt
        );

        URL url = new URL(endpoint);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("apikey", supabaseKey);
        conn.setRequestProperty("Authorization", "Bearer " + supabaseKey);
        conn.setRequestProperty("Prefer", "return=minimal");
        conn.setDoOutput(true);
        conn.setConnectTimeout(5000);
        conn.setReadTimeout(5000);

        try (OutputStream os = conn.getOutputStream()) {
            os.write(body.getBytes(StandardCharsets.UTF_8));
        }

        int responseCode = conn.getResponseCode();
        if (responseCode < 200 || responseCode >= 300) {
            InputStream errorStream = conn.getErrorStream();
            String errorBody = errorStream != null ? new String(errorStream.readAllBytes(), StandardCharsets.UTF_8) : "Unknown";
            throw new RuntimeException("Supabase returned " + responseCode + ": " + errorBody);
        }
        conn.disconnect();
    }
}
