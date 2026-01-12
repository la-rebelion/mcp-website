---
title: "MCP Registry vs Gateway: Why Connect Authority Wins"
description: "Explore the differences between MCP Registries and Gateways, and understand why a Connect Authority is the superior choice for enableing secure, scalable MCP connections without a gateway."
image: /img/mcp-beyond-gateway.png
---

## MCP Registry

The [MCP Registry](https://registry.modelcontextprotocol.io) is designed as a centralized catalog and metadata service for MCP (Model Context Protocol) components. It provides discovery, verification, and governance capabilities for MCP clients and servers. The HAPI MCP Registry does not proxy traffic; instead, it acts as a Connect Authority, issuing short-lived Connect Descriptors that authorize clients to connect directly to MCP Servers.

We will explore why this Connect Authority model is often preferable to deploying a traditional MCP Gateway.

<!-- truncate-->

AI-native applications require scalable, secure, and manageable architectures. **Just as with microservices**, the same security and governance principles apply to MCP-based systems. Throughout MCP's brief yet rapid evolution, [security breaches](https://authzed.com/blog/timeline-mcp-breaches) and failures have taught us valuable lessons. In response, the MCP Registry was created, offering developers a dependable, community-driven platform to discover and share MCP servers, all while ensuring security and building trust.

What the official MCP Registry actually promises today:

The official MCP Registry was launched as an open catalog + REST API for discovery and standardized metadata, with moderation and namespace verification, and it's explicitly positioned as "single source of truth" that sub-registries build on.

Key constraints that matter for a gateway discussion:

* It's metadata, not package hosting.
* It's designed primarily for programmatic consumption by sub-registries, not end-users/clients directly (at least today).
* Security scanning is delegated to package registries and/or sub-registries in the MVP (important for a gateway discussion).
* The API went into an "API freeze" period (v0.1), signaling stability, but it's still evolving toward GA.

The Registry can enable a gateway, but it's not trying to be one.

## Why not a Gateway?

*"Can the MCP Registry become an MCP Gateway?"*

That question hides a deeper one:

> **Can we get gateway-level control without turning the Registry into a fragile, high-risk data plane?**

The answer is **yes** — *if we're precise about what a gateway actually is*.

And once you see the distinction clearly, a much cleaner architecture emerges.

---

## Control-plane vs Data-plane

Firts of all, we need to clarify what a gateway *usually* means. Let's ground this first.

### A Registry is usually **control-plane**

It answers questions like:

* What exists?
* Where does it live?
* What does it support?
* Who owns it?
* Is it verified?
* Is it allowed?

Think: **catalogs, metadata, governance, discovery**.

### A Gateway is usually **data-plane**

It answers questions like:

* I connect to *one* endpoint
* Traffic flows *through* it
* It authenticates
* It enforces policy
* It rate-limits
* It observes
* It transforms

Think: **proxying, routing, runtime enforcement**.

Most gateway designs fail not because gateways are bad — **but because they are asked to do *everything*.**

So the real architectural question becomes:

> **Can we give the MCP Registry "gateway power" without making it a gateway?**

Yes — if we redefine what "gateway" means.

---

## The key insight: connection authority ≠ traffic proxy

Here's the mental flip:

* A **gateway** doesn't need to see traffic to control *who is allowed to connect*
* Runtime enforcement doesn't need to be centralized
* Moderation doesn't need a proxy to be effective

What you actually want is **connect-time authority**, not a data-plane choke point.

In this model:

* The Registry governs **who may connect**
* The server enforces **what happens after**
* The client performs **one extra, intentional step**

This is where the MCP Registry becomes something more subtle — and more powerful.

---

## The Registry as a connection resolver

Instead of proxying traffic, the Registry becomes:

* a **connection resolver**
* a **connect authority**
* a **control-plane gateway**

Not a policy engine.
Not a proxy.
Not a runtime bottleneck.

More like **DNS + app store metadata** — with teeth.

The Registry answers one critical question:

> *"Are you allowed to connect to this server right now?"*

If yes → it issues proof.
If no → the connection never starts.

---

## The Connect Descriptor (the "boarding pass")

![Boarding Pass](/img/mcp-beyond-gateway.png)

This is the missing primitive.

A **Connect Descriptor** is a:

* short-lived
* signed
* connect-time token
* issued by the Registry
* consumed by the client
* validated by the server

It contains:

* the **actual server endpoint**
* the **transport** (streamable HTTP only)
* the **server identity**
* an **expiration window**

### Think: *boarding pass*, not *passport*

* It doesn't identify the user
* It doesn't authorize tool usage
* It doesn't replace authentication

It simply says:

> *"You are allowed to attempt a connection to this server right now."*

That's it.

And that's enough.

---

## Why this extra client step matters (and why it's intentional)

Yes — this introduces an extra step for clients.

And that's the entire point.

### Old model (direct connect)

```
Client → Server URL → Tools
```

* Fast
* Simple
* Ungoverned
* Irrevocable
* No verification boundary

But we already know the risks of this model:

* unverifiable endpoints
* unmoderatable servers

**If security and governance matter, this model falls short.**

### New model (governed connect)

```
Client → Registry → Descriptor → Server URL → Tools
```

That one hop unlocks:

* runtime-effective moderation
* revocation without proxies
* endpoint integrity
* server identity pinning
* version & transport guarantees

Clients that skip this step *can still connect* — but they explicitly opt out of governance.

This mirrors OAuth perfectly:

* You can skip OAuth
* You just lose its guarantees

---

## Why streamable HTTP only changes everything

This model works **because** we constrain transport.

By supporting **remote, streamable HTTP only**:

* No stdio bridging
* No local process trust
* No transport ambiguity
* No hidden execution contexts

Every MCP server is:

* already running
* already reachable
* already enforcing policy

That's where **[HAPI MCP](https://hapi.mcp.com.ai) Servers** come in.

---

## Distributed enforcement: why HAPI makes this viable

The Registry doesn't enforce runtime security — and that's fine.

Because **HAPI MCP Servers already do**:

* authentication termination
<!-- * policy enforcement -->
* rate limiting
* observability
* token mediation / exchange

This lets us distribute enforcement *to the edge*.

The Registry decides **if a connection may exist**.
HAPI decides **what happens inside that connection**.

No proxy needed.

---

## Making moderation runtime-effective (without a gateway)

Here's the critical trick:

### Stop issuing descriptors.

That's it.

If a server is revoked or moderated out:

* the Registry refuses to issue new Connect Descriptors
* well-behaved clients cannot connect
* no traffic flows
* no proxy is involved

Want stronger enforcement?

### Descriptor refresh (hard cutoff)

Descriptors are short-lived (configurable TTL, e.g. 30-120s).

HAPI can require clients to:

* refresh the descriptor periodically
* fail the session if refresh fails

Now moderation becomes **hard runtime shutoff**:

* revoke server
* no new descriptors
* active sessions expire naturally

Still no gateway.

---

## What this architecture avoids (by design)

This is what we *intentionally* don't do:

* No central proxy
* No data-plane bottleneck
* No secrets stored in the Registry
* No traffic inspection
* No latency tax
* No single point of failure

The Registry stays:

* scalable
* safe
* boring (in a good way)
* reliable
* trustworthy
* low-risk

---

## The full flow (putting it all together)

```mermaid
sequenceDiagram
  title Registry-Powered Connect Authority (Streamable HTTP + HAPI Enforcement)

  participant Client as "MCP Client<br/>(chatMCP)"
  participant Registry as "MCP Registry<br/>(Connect Authority)"
  participant HAPI as "HAPI MCP Server<br/>(Streamable HTTP)"
  participant IdP as "IdP<br/>(OIDC / mTLS / OAuth)"

  %% Discovery
  Client->>Registry: GET /v1/servers?query=payments
  Registry-->>Client: Server metadata<br/>(id, version, endpoint, verified, jwks_uri)

  %% Connect Descriptor issuance
  Client->>Registry: POST /v1/connect<br/>{ server_ref, client_id, tenant_id }
  alt Server revoked / unverified / policy-blocked
    Registry-->>Client: 403 Error<br/>(server_revoked/server_unverified)
  else Eligible
    Registry->>Registry: (optional) Health check endpoint
    Registry->>Registry: Mint short-lived JWT descriptor<br/>(TTL 30-120s)
    Registry-->>Client: 200 { descriptor, endpoint, expires_in }
  end

  %% Direct connect to HAPI (no proxy)
  Client->>HAPI: GET /mcp (streamable)<br/>Headers:<br/>MCP-Connect: <descriptor><br/>Authorization: Bearer <user_token> (or mTLS)

  %% HAPI validates Connect Descriptor
  HAPI->>Registry: GET /.well-known/jwks.json (or cached)
  Registry-->>HAPI: Registry JWKS (public keys)
  HAPI->>HAPI: Verify descriptor signature, exp, aud, server_id match
  alt Descriptor invalid/expired
    HAPI-->>Client: 401/403 Descriptor rejected<br/>(descriptor_invalid/expired)
  else Descriptor valid
    %% HAPI terminates user auth
    HAPI->>IdP: Validate user token / mTLS / OBO exchange
    IdP-->>HAPI: OK + claims/scopes

    %% Runtime enforcement (HAPI)
    HAPI->>HAPI: Apply policy (RBAC), rate limits, observability (trace/log/metrics)

    %% MCP session
    HAPI-->>Client: 200 Stream opened (SSE/HTTP streaming)
    Client->>HAPI: MCP tool call(s)
    HAPI-->>Client: Tool results streamed
  end
```

1. Client discovers a server in the Registry
2. Client requests a Connect Descriptor
3. Registry checks verification, moderation, compatibility
4. Registry issues a short-lived descriptor
5. Client extracts the endpoint from the descriptor
6. Client connects **directly** to the HAPI server
7. HAPI validates the descriptor
8. HAPI authenticates the user
9. HAPI enforces policy and executes tools
10. Descriptor refresh keeps governance live

Discovery is centralized.  
Enforcement is distributed.  
Connections are governed.  

---

## Why this scales (technically and socially)

Technically:

* no proxy bottlenecks
* no hot path in the Registry
* horizontal scalability
* zero trust friendly

Socially:

* communities can build clients incrementally
* enterprises get governance without lock-in
* server authors keep autonomy
* moderation has real impact

---

## The final takeaway

You don't turn the MCP Registry into a gateway by adding more features.

You do it by **not turning it into one at all**.

By making it a **connection authority**, you get:

* gateway-level control
* without gateway-level risk

And that's the difference between a system that scales — and one that collapses under its own ambition.

*Be HAPI*, and stay tuned for more MCP architecture deep dives. Go Rebels! ✊🏼
