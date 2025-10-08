import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Hubspot account id
const hubspot = {
  accountId: '21339207',
};
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const config: Config = {
  title: 'MCP — Model Context Protocol',
  tagline:
    'Understanding limitations and misconceptions • Practical guidance for real-world MCP',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://mcp.com.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'la-rebelion',
  projectName: 'mcp-website',

  onBrokenLinks: 'throw',
  // onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        // Blog‑only mode
        docs: false,
        blog: {
          routeBasePath: '/',
          blogTitle: 'MCP Insights',
          blogDescription:
            'Deep dives into Model Context Protocol: limits, misconceptions, patterns, and tools.',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-JJJXXEZWK9',
        },
        googleTagManager: {
          containerId: 'GTM-W2QSRMJN',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
      defaultMode: 'light',
      disableSwitch: false,
    },
    navbar: {
      title: 'MCP',
      logo: {
        alt: 'MCP logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/', label: 'Home', position: 'left' },
        { to: '/archive', label: 'Blog', position: 'left' },
        { href: 'https://docs.mcp.com.ai', label: 'Docs', position: 'left' },
        { href: 'https://hapi.mcp.com.ai', label: 'HAPI Server', position: 'left' },
        { href: 'https://run.mcp.com.ai', label: 'Run MCP', position: 'left' },
        { href: 'https://qbot.mcp.com.ai', label: 'QBot', position: 'left' },
        { href: 'https://github.com/', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Agentic MCP',
          items: [
            { label: 'Docs', href: 'https://docs.mcp.com.ai' },
            { label: 'HAPI Server', href: 'https://hapi.mcp.com.ai/' },
            { label: 'Run MCP', href: 'https://run.mcp.com.ai/' },
            { label: 'QBot', href: 'https://qbot.mcp.com.ai/' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Blog', to: '/' },
            { label: 'Tags', to: '/tags' },
            { label: 'GitHub', href: 'https://github.com/' },
            {
              label: 'YouTube "La Rebelion"',
              href: 'https://www.youtube.com/@LaRebelion',
            },
            {
              label: 'YouTube HAPI MCP',
              href: 'https://www.youtube.com/@hapi-mcp',
            },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MCP.com.ai by <a href="https://rebelion.la">La Rebelion Labs</a>. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  scripts: [
    {
      src: 'https://js.hsforms.net/forms/embed/v2.js',
      async: true,
    },
  ],
  headTags: [
    {
      tagName: 'script',
      attributes: {
        async: "true",
        defer: "true",
        type: 'text/javascript',
        id: 'hs-script-loader',
        src: `//js.hs-scripts.com/${hubspot.accountId}.js`,
      },
    },
  ],
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },
};

export default config;
