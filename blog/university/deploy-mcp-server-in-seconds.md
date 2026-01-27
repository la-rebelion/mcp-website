---
title: "How to Deploy MCP Servers"
description: "A step-by-step guide to deploying MCP servers using HAPI CLI."
tags: ["guide", "deployment"]
keywords: ["MCP deployment", "HAPI CLI", "Cloudflare Workers", "Docker", "Fly.io"]
---

Setting up a **Model Context Protocol (MCP)** server is easier than you might think! It is a straightforward process that doesn't require extensive DevOps skills. Whether you're testing, packaging, or scaling globally, the **HAPI MCP Stack** equips you with everything you need to launch your server in just seconds.

In this guide, we'll explore **4 different ways** to run and deploy MCP servers using the HAPI CLI.

<!-- truncate -->

## 1. Local Development (The Quickest Way)

For rapid iteration and testing, running your MCP server locally is the best approach. You can instantly spin up a server and inspect its tools using the official MCP Inspector.

In this example, we'll run an **OpenAI Tools** server.

```bash
# Run the MCP Server Locally and pipe to Inspector
hapi serve openai-tools \
  --headless \
  --port 3030 \m
  --url https://api.openai.com/v1 | bunx @modelcontextprotocol/inspector
```

### What's happening here?
- `hapi serve`: Starts the MCP server.
- `--headless`: Runs without a UI (optimized for machine interaction).
- `--port 3030`: Binds the server to port 3030.
- `| bunx @modelcontextprotocol/inspector`: Pipes the output directly to the MCP Inspector, allowing you to interact with your tools in a web interface locally.

---

## 2. Docker Containers (The Portable Way)

If you need to ship your server to Kubernetes, ECS, or any container orchestration platform, Docker is the industry standard. We provide a pre-built image `hapimcp/hapi-cli` that is ready to serve.

```bash
docker run --name hapi-openai -d \
  -p 3030:3030 \
  hapimcp/hapi-cli:latest serve \
  --openapi https://docs.mcp.com.ai/servers-apis/openapi/openai-tools.yaml \
  --headless \
  --url https://api.openai.com/v1
```

### Breakdown:
- `hapimcp/hapi-cli:latest`: The official HAPI CLI Docker image.
- `--openapi ...`: Specifies the OpenAPI definition for the server (defining the tools/resources).
- `-p 3030:3030`: Maps the container port to your host.

Your server is now running in a container, ready to accept connections on port 3030!

---

## 3. Cloudflare Workers (The Scalable Way)

For a serverless solution with global low latency, **Cloudflare Workers** is the ultimate deployment target. HAPI CLI handles the entire build and deployment process for you.

```bash
hapi deploy --name openai-tools \
  --project openai \
  --openapi https://docs.mcp.com.ai/servers-apis/openapi/openai-tools.yaml \
  --url https://api.openai.com/v1
```

You'll see output like this:

```text
📝 Generating temporary Wrangler config...
⚙️ Deploying to Cloudflare Workers...
🌍 Live at: https://openai-tools.runmcp.workers.dev
✅ Deployed successfully!
```

### Why Cloudflare Workers?
- **Zero Cold Starts:** Instant response times.
- **Global Distribution:** Deployed to 300+ cities worldwide.
- **Cost Effective:** Pay only for what you use.

---

## 4. Fly.io (The Global Way)

For those who prefer running on **Fly.io**, you can deploy your MCP server instantly using our pre-built image, bypassing the need for Dockerfiles or complex overrides.

```bash
fly machine run hapimcp/hapi-cli:latest --command "hapi serve" \
  -e openapi="https://docs.mcp.com.ai/servers-apis/openapi/openai-tools.yaml" \
  -e url="https://api.openai.com/v1"
```

### Why Fly.io?
- **Instant Machines:** Boot full VM instances in milliseconds.
- **Global Anycast:** Run close to your users.
- **Pre-built Image:** No build step required—just run.

---

## Summary

| Method | Best For | Requirement |
| :--- | :--- | :--- |
| **Local** | Development, Testing, Debugging | HAPI CLI |
| **Docker** | Enterprise, Kubernetes, VPS | Docker Engine |
| **Workers** | Serverless, Scaling, Public APIs | Cloudflare Account |
| **Fly.io** | Global VMs, Persistent Apps | Fly.io Account |

Ready to build your own? Check out the full documentation at [docs.mcp.com.ai](https://docs.mcp.com.ai).

🏁 **Done. Be HAPI, and go Rebels! ✊**