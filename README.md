# MCP — Model Context Protocol Website

Public site for the Headless API (HAPI) Stack for Model Context Protocol (MCP). The goal is to clarify limitations and common misconceptions, and provide practical, real‑world guidance for teams building with MCP.

- Live site: https://mcp.com.ai
- Docs: https://docs.mcp.com.ai
- HAPI Server: https://hapi.mcp.com.ai
- Run MCP: https://run.mcp.com.ai
- QBot: https://qbot.mcp.com.ai

## What This Website Covers

- Deep dives on MCP capabilities, limits, and trade‑offs
- Patterns for robust server/client design and tool integration
- Real examples, anti‑patterns, and guidance for production use
- Pointers to the broader MCP ecosystem and reference material

Built with [Docusaurus](https://docusaurus.io/) in blog‑only mode.

## Repo Structure (content‑first)

- `blog/` — MDX posts and metadata (`authors.yml`, `tags.yml`)
- `static/` — static assets (images, downloads)
- `src/` — theme and site components
- `docs/` — template examples (currently disabled in config)

## Contributing Content

We welcome articles, case studies, and clarifications that help practitioners use MCP effectively.

1. Create a new MDX post under `blog/` named `YYYY-MM-DD-title.mdx`.
2. Add front matter with at least `title`, `authors`, `tags`, and `description`.
3. If you’re a new author, add yourself to `blog/authors.yml`.
4. Place images in `static/img/` and reference them as `/img/your-image.png`.
5. Preview locally (see below) and open a PR.

Example front matter:

```mdx
---
slug: mcp-misconceptions
title: Common Misconceptions about MCP
description: Clarifying what MCP does—and doesn’t—do in practice.
authors: [your-id]
tags: [mcp, patterns]
---
```

## Local Development

Requirements: Node.js ≥ 20.

Install dependencies with your preferred manager and start the dev server:

```bash
bun install
bun run start
```

This runs a local server and live‑reloads on changes.

## Preview

```bash
bun run serve   # preview the production build
```

The static site is generated to the `build/` directory and can be hosted on any static hosting platform.

## Deployment

Deployments are handled by maintainers. If using GitHub Pages, the following can be used:

```bash
# SSH
USE_SSH=true bun deploy

# HTTPS
GIT_USER=<github-username> bun deploy
```

## License

See `LICENSE` for details.
