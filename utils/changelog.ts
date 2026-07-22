export interface ChangelogBullet {
  linkText?: string;
  linkUrl?: string;
  rest: string; // text after the link (or the whole line, if there's no link)
}

export interface ChangelogSection {
  heading: string;
  bullets: ChangelogBullet[];
}

export interface ChangelogVersion {
  title: string;
  sections: ChangelogSection[];
}

const BULLET_LINK_RE = /^-\s*\[([^\]]+)\]\(([^)]+)\)\s*(.*)$/;
const BULLET_PLAIN_RE = /^-\s*(.*)$/;

function parseBullet(line: string): ChangelogBullet {
  const linkMatch = line.match(BULLET_LINK_RE);
  if (linkMatch) {
    const [, linkText, linkUrl, rest] = linkMatch;
    return { linkText, linkUrl, rest };
  }
  const plainMatch = line.match(BULLET_PLAIN_RE);
  return { rest: plainMatch ? plainMatch[1] : line };
}

// Parses the small, consistent subset of Markdown this changelog actually
// uses (# version headers, ## sections, "- [text](url) - rest" bullets) —
// not a general-purpose Markdown parser, since that's all CHANGELOG.md needs.
export function parseChangelog(markdown: string): ChangelogVersion[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const versions: ChangelogVersion[] = [];
  let currentVersion: ChangelogVersion | null = null;
  let currentSection: ChangelogSection | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const versionMatch = line.match(/^#\s+(.*)$/);
    if (versionMatch) {
      currentVersion = { title: versionMatch[1], sections: [] };
      versions.push(currentVersion);
      currentSection = null;
      continue;
    }

    const sectionMatch = line.match(/^##\s+(.*)$/);
    if (sectionMatch) {
      if (!currentVersion) {
        currentVersion = { title: 'Changelog', sections: [] };
        versions.push(currentVersion);
      }
      currentSection = { heading: sectionMatch[1], bullets: [] };
      currentVersion.sections.push(currentSection);
      continue;
    }

    if (line.startsWith('-')) {
      if (!currentVersion) {
        currentVersion = { title: 'Changelog', sections: [] };
        versions.push(currentVersion);
      }
      if (!currentSection) {
        currentSection = { heading: '', bullets: [] };
        currentVersion.sections.push(currentSection);
      }
      currentSection.bullets.push(parseBullet(line));
    }
  }

  return versions;
}

export type InlineToken = { type: 'text' | 'code'; value: string };

// Splits "`1.7.19` → `1.13.6`" into alternating text/code tokens so the
// caller can render backtick spans as <code> without a full Markdown renderer.
export function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const parts = text.split(/(`[^`]+`)/g);
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('`') && part.endsWith('`')) {
      tokens.push({ type: 'code', value: part.slice(1, -1) });
    } else {
      tokens.push({ type: 'text', value: part });
    }
  }
  return tokens;
}
