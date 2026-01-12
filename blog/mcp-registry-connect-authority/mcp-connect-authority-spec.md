---
title: "MCP Connect Authority Spec (Registry-powered, Streamable HTTP)"
description: "A connect authority API and Connect Descriptor format to enable governed direct connections from MCP clients to HAPI MCP Servers without a proxy gateway."
image: /img/mcp-connect-authority.png
tags: [mcp, architecture, hapi, registry]
keywords: [mcp,connect authority,registry,hapi,streamable http,jwt]
draft: true
---

The MCP (Model Context Protocol) [Registry](https://registry.modelcontextprotocol.io) is designed to act as centralized repository for discovering and publishing MCP Servers. In this specification, we define the MCP Registry's role as a Connect Authority for enabling governed direct connections from MCP clients to HAPI MCP Servers using short-lived signed Connect Descriptors.

<!-- truncate-->

The MCP Registry does not proxy traffic. Instead, it acts as a Connect Authority. A connect authority API and Connect Descriptor format to enable governed direct connections from MCP clients to HAPI MCP Servers without a proxy gateway.

## 0) Goal

Enable **governed direct connections** from MCP clients to **HAPI MCP Servers** using **short-lived signed Connect Descriptors**, so that:

* Registry moderation/revocation becomes **runtime-effective** (stop issuing = stop new sessions)
* HAPI remains the **runtime enforcement plane** (auth, policy, rate limits, observability, token mediation)
* No data-plane proxy gateway is required

---

## 1) Non-goals

* Supporting stdio transport (explicitly out of scope)
* Proxying MCP traffic through the Registry
* Using the descriptor as user authorization (HAPI user auth still required)

---

## 2) Terms

* **Connect Descriptor**: short-lived signed token (JWT) issued by Registry that authorizes a client to initiate/refresh a session to a specific HAPI server endpoint.
* **Streamable HTTP**: remote MCP transport over HTTP streaming (e.g., SSE/streamed responses).
* **Connect Authority**: the Registry role that can allow/deny issuance based on verification, moderation, policy.

---

## 3) API: Registry Connect Authority

### Endpoint

`POST /v1/connect`

### Authentication

Registry MUST authenticate the caller (client) via `Authorization: Bearer <client_token>` or equivalent.

### Request (minimum)

* `server_ref`: `namespace/name@version` (version optional; defaults to latest stable)
* `client.client_id` optional
* `client.tenant_id` optional

### Response (minimum)

* `descriptor` (JWT string)
* `endpoint` (streamable HTTP URL)
* `expires_in` (seconds)

### Deny conditions

Registry MUST return **403** (with machine-readable code) when:

* server is revoked or moderated out (`server_revoked`)
* server is not eligible for governed mode (`server_unverified` / `policy_blocked`)
* requested transport not supported (`transport_not_supported`)

Registry SHOULD return **503** (`server_unavailable`) if it performs optional health gating and the endpoint is unreachable.

### Rate limiting

Registry SHOULD enforce issuance rate limiting per client/tenant and return **429** with `retry_after`.

---

## 4) Connect Descriptor (JWT)

### Signature

* JWT MUST be signed by Registry using a non-symmetric algorithm (EdDSA recommended).
* Registry MUST publish its signing keys via JWKS (e.g., `/.well-known/jwks.json`).

### TTL

* Descriptor TTL MUST be short: **30–120 seconds** recommended.
* Client MUST treat expired descriptors as invalid.

### Required claims (minimum)

* `iss`, `aud`, `iat`, `exp`, `jti`
* `sub` or equivalent server identity (e.g., `server:acme/payments`)
* `mcp.transport` = `streamable_http`
* `mcp.endpoint` (target streamable HTTP URL)
* `mcp.server.id` (canonical)
* `mcp.server.version`
* `client.id` (optional but recommended)
* `client.tenant` (optional but recommended)

### Recommended server identity binding

Descriptor SHOULD include at least one:

* `mcp.server.jwks_uri` (server public keys)
* `mcp.server.tls_pin_sha256` (certificate pin)
* `mcp.server.verified` boolean

---

## 5) Client Requirements (chatMCP + any MCP client)

### Discovery + connect flow (governed mode)

Client MUST:

1. Call `POST /v1/connect` to obtain descriptor
2. Extract `endpoint` from descriptor (or response)
3. Connect directly to `endpoint` via Streamable HTTP
4. Include descriptor in request headers

### Header convention

Client MUST send:

* `MCP-Connect: <descriptor_jwt>`

Client MAY also send standard user auth:

* `Authorization: Bearer <user_token>` **or** use mTLS

### Validation

Client SHOULD:

* verify descriptor signature using Registry JWKS
* check `iss/aud/exp`
* enforce `verified == true` if running in strict mode
* pin server identity (TLS pin or server JWKS) when available

### Refresh

Client MUST support descriptor refresh if HAPI requires it:

* refresh at `exp - 20s` (or upon server `refresh_required`)
* if refresh fails with `server_revoked` / `policy_blocked`, client MUST terminate session and MUST NOT reconnect.

### Retry budget

Client SHOULD:

* cap connect issuance retries (e.g., 3 attempts within 60 seconds)
* backoff on network errors and 429

---

## 6) HAPI MCP Server Requirements

### Descriptor-required mode

HAPI SHOULD support a config flag:

* `descriptor_required: true|false`

If `descriptor_required=true`, HAPI MUST refuse any stream connection without a valid descriptor.

### On initial stream connect

HAPI MUST:

1. Read descriptor from `MCP-Connect` header
2. Verify descriptor signature (Registry JWKS; cached)
3. Validate `exp`, `aud`, and that `server.id` matches itself
4. If invalid → reject (401/403) with machine code:

   * `descriptor_missing`, `descriptor_invalid`, `descriptor_expired`, `descriptor_wrong_audience`

Then HAPI MUST proceed with normal runtime enforcement:

* authenticate user (OIDC/mTLS/OBO)
* authorize per tool (RBAC/policy)
* rate limit
* observe (logs/metrics/tracing)
* token mediation/exchange (as applicable)

### Refresh enforcement (strong shutoff)

If HAPI enforces refresh:

* HAPI MUST send a `refresh_required` control message at `exp - 20s`
* HAPI MUST accept `refresh{descriptor}` control message and validate it
* HAPI MUST close the session if:

  * refresh invalid, or
  * refresh not received within grace window (recommended 30s)

HAPI SHOULD emit an auditable "session end reason":

* `revoked`, `refresh_timeout`, `auth_failed`, `policy_denied`

---

## 7) Moderation & Revocation Semantics

### Runtime effect

Moderation becomes runtime-effective by:

* Registry MUST stop issuing descriptors immediately for revoked servers
* In descriptor-required mode, no new sessions can start after revocation

### Optional strong effect for running sessions

If using refresh enforcement:

* sessions end naturally at next refresh window after revocation

---

## 8) Observability & Auditing

Registry SHOULD log issuance events:

* `jti`, `server_id`, `client_id`, `tenant_id`, decision (allow/deny), deny reason

HAPI SHOULD log:

* descriptor verification result (no token contents)
* user auth subject (if available)
* per-tool policy decision
* rate limit decisions
* session end reason

---

## 9) Compatibility rules

* Only `streamable_http` is supported.
* If server advertises other transports, Registry MUST deny connect issuance with `transport_not_supported` for governed mode.
* Version pinning: `server_ref@version` MUST map to immutable server metadata in Registry.

---

## 10) Test plan (minimum acceptance)

### Must-pass

* Valid descriptor → session opens
* Expired descriptor → rejected
* Revoked server → connect issuance denied
* Refresh required, refresh succeeds → session continues
* Refresh required, refresh denied → session closes
* Client obeys hard-stop on `server_revoked`

### Nice-to-have

* Invalid signature → rejected
* Wrong audience → rejected
* Rate limiting enforced on issuance

---

With that, you have the full MCP Connect Authority specification to enable governed direct connections from MCP clients to HAPI MCP Servers without a proxy gateway.

*Be HAPI*, and stay tuned for more MCP architecture deep dives. Go Rebels! ✊🏼
