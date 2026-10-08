/**
 * The hero excerpt. Every sentence here is copied from your own published article,
 * and every source is a link that article already cites.
 * To change the excerpt, edit `heroExcerpt.parts` and `sources` — no component changes needed.
 */
export type Source = {
  id: string;
  label: string; // short, mono-set identifier
  publisher: string;
  url: string;
};

export type ExcerptPart = {
  text: string;
  source?: keyof typeof sources;
};

export const sources = {
  nvd: {
    id: "nvd",
    label: "CVE-2025-32711",
    publisher: "NIST National Vulnerability Database",
    url: "https://nvd.nist.gov/vuln/detail/CVE-2025-32711",
  },
  ghsa: {
    id: "ghsa",
    label: "GHSA-6xpm-ggf7-wc3p",
    publisher: "GitHub Advisory Database",
    url: "https://github.com/advisories/GHSA-6xpm-ggf7-wc3p",
  },
} satisfies Record<string, Source>;

export const heroExcerpt: {
  /** substring of the article's liveUrl in src/data/work.ts */
  articleMatch: string;
  parts: ExcerptPart[];
} = {
  articleMatch: "byoa-shadow-ai-blog",
  parts: [
    {
      text: "CVE-2025-32711, better known as EchoLeak per the Aim Security researchers who found it, carries a CVSS score of 9.3, and Aim Security describes it as the first known zero-click attack on a major AI application.",
      source: "nvd",
    },
    {
      text: " CVE-2025-6514 (CVSS 9.6) is a command injection vulnerability in mcp-remote, the proxy that lets clients like Claude Desktop, Cursor, and Windsurf talk to remote MCP servers.",
      source: "ghsa",
    },
  ],
};
