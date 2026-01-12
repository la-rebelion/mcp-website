---
title: "Why a Registry + Connect Authority Beats a Gateway"
description: "A comparison of MCP Registry as a Connect Authority versus traditional MCP Gateway architectures."
image: /img/mcp-registry-connect-authority-vs-gateway.png
tags: [mcp, architecture, hapi, registry]
keywords: [mcp,registry,connect authority,gateway,hapi,architecture]
draft: true
---

In the world of MCP (Model Context Protocol), two architectural patterns often come up for discussion: using a [Registry](https://registry.modelcontextprotocol.io) as a Connect Authority versus deploying a traditional Gateway. While both approaches aim to manage and secure connections between clients and servers, they do so in fundamentally different ways.

In this article, we will explore why the Registry + Connect Authority model often outperforms the traditional Gateway approach.

<!-- truncate-->

A gateway **centralizes runtime traffic**. A connect authority **centralizes permission**.  
Considering that the HAPI MCP servers already enforce auth, policy, rate limits, and observability, a proxy gateway is mostly cost and risk.

Aren't MCP Servers already proxying traffic to backends?

Here's the **"Why Registry + Connect Authority beats a gateway"** comparison chart that breaks down the key dimensions:

## Why Connect Authority beats a traditional MCP Gateway

| Dimension                 | Traditional MCP Gateway (proxy data-plane)                 | Registry + Connect Authority (descriptor + direct connect)                                                | Why it wins                                             |
| ------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| What it is                | One endpoint that **proxies** MCP traffic                  | Registry issues **permission to connect**, traffic goes **direct** to server                              | You get control without becoming the hot path           |
| Traffic path              | Client → **Gateway** → Server                              | Client → **Server** (after descriptor)                                                                    | No latency tax, no bandwidth bottleneck                 |
| Scaling                   | Must scale for **all requests**                            | Scales for **connect issuance only**                                                                      | Control-plane load is tiny vs data-plane load           |
| Reliability blast radius  | Gateway outage = everything breaks                         | Registry outage affects **new connects**; existing sessions can continue (depending on TTL/refresh model) | Fewer "all systems down" moments                        |
| Security boundary         | Centralized, attractive target                             | Distributed enforcement at HAPI servers; Registry only governs connects                                   | Smaller attack surface, less sensitive runtime exposure |
| Moderation / revocation   | Usually possible, but requires proxying or complex routing | **Stop issuing descriptors** → no new sessions; refresh → hard cut-off                                    | Runtime-effective moderation without proxy              |
| Auth termination          | Often at gateway (adds complexity + secrets)               | At **HAPI server** (already your design)                                                                  | Keeps secrets and policy where they belong              |
| Policy / RBAC             | Centralized policy engine needed                           | Enforced by **HAPI**; descriptor may carry hints (optional)                                               | No duplicated policy stack                              |
| Rate limiting             | Central choke point; risks noisy-neighbor                  | Per-server / per-tenant at HAPI                                                                           | Better isolation and fairness                           |
| Observability             | Centralized, but expensive and noisy                       | HAPI produces real runtime telemetry; Registry logs issuance                                              | Signals are cleaner and cheaper                         |
| Multi-tenancy             | Requires strict separation at gateway                      | Natural with per-tenant descriptors + HAPI enforcement                                                    | Tenant governance without a monolith                    |
| Data privacy              | Gateway can see payloads (risk)                            | Registry never sees tool payloads                                                                         | Big win for trust + compliance                          |
| Implementation complexity | Medium-to-high (proxy, routing, retries, SSE quirks)       | Low-to-medium (issue token + validate token + refresh)                                                    | Fewer moving parts, fewer outages                       |
| Vendor lock-in risk       | Often higher (gateway semantics creep)                     | Lower (descriptor is portable, servers remain standard)                                                   | You can swap implementations later                      |
| Best fit                  | Centralized platform teams who want full proxy control     | Ecosystems + enterprises that want governance **without** data-plane                                      | Scales socially and technically                         |

---

## When you *still* want a gateway

Well, sometimes a gateway is still useful.  
You may still want a proxy gateway when you need:

* protocol bridging (stdio ↔ HTTP) - `stdio` is legacy and we enforce HTTP natively, `stdio` is not supported
* multi-protocol consolidation (gRPC + HTTP + websockets)
* deep traffic transformation (e.g., SOAP ↔ REST)
* deep payload inspection / transformation
* single endpoint requirements for legacy network constraints
* centralized caching of tool results (rare)

But for **streamable HTTP only + HAPI enforced servers**, the connect authority model is the cleaner default.

With that said, you can always pair both patterns: use the Registry as a Connect Authority *and* deploy gateways where needed. They're not mutually exclusive. What matters is that you separate **permission** (Registry) from **enforcement** (HAPI servers), and avoid becoming a fragile, high-risk data-plane bottleneck.

What about you? Have you used either pattern? Share your experiences in the comments!

*Be HAPI*, and stay tuned for more MCP architecture deep dives. Go Rebels! ✊🏼
