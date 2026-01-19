---
title: How to Scale MCP to Thousands of Tools Without Destroying Your Budget
description: Strategies to manage token bloat in MCP systems as tool catalogs grow.
keywords:
  - MCP Scaling
  - Token Bloat
  - AI Platform Design
  - MCP token optimization
  - HAPI MCP
  - Tool Discovery
authors:
  - adrian
image: /img/blog/dynamic-discovery-tools.png
---

**Your MCP just became a memory hog. And it’s quietly burning your budget.**

If your Model Context Protocol (MCP) catalog is growing into the hundreds—or thousands—of tools, you’re already facing the next invisible scalability wall: **token bloat**.

And it’s not a theory anymore.

<!-- truncate -->

Claude shipped its **[Tool Search Tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)** — a long-requested feature that dynamically discovers and loads tools on demand. The MCP community is actively debating [**lazy loading**](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1978), [**dynamic discovery**](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1881), and **context minimization**. There’s even a formal proposal now:
👉 [**SEP-1576: Mitigating Token Bloat in MCP**](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1576)

We talked about this issue back in August 2025: [why too many tools can break your AI](https://rebelion.la/agent-tools-guardrails-why-too-many-tools-can-break-your-ai), and now it’s time to get practical. This is the moment where MCP moves from “cool demo tech” to **real platform engineering**.

If you don’t solve token bloat early, your MCP will become:

* Expensive to run
* Slow to reason
* Hard to govern
* Risky for enterprise compliance
* Hallucination-prone 

Let’s break down what’s happening — and how to design MCP systems that scale cleanly.

---

## Token Bloat in MCP: Why Your Tool Catalog Is Becoming a Cost, Latency, and Security Problem

### Business impact first

Token bloat creates some immediate problems:

| Problem               | Business Impact                                      |
| --------------------- | ---------------------------------------------------- |
| Cost explosion        | Every request loads thousands of unused tool schemas |
| Latency               | Larger prompts = slower inference                    |
| Reasoning degradation | LLMs perform worse with noisy context                |
| Security risk         | Tools leak into contexts they should never be in     |
| Compliance failure    | Shadow tools get injected into AI workflows          |

At enterprise scale, token bloat is not a technical issue.
It’s a **platform liability**.

---

### What Is Token Bloat in MCP?

#### Simple definition

**Token bloat happens when your MCP client sends too many tool definitions into the model context — even when only one tool is needed.**

Instead of:

> “Here is the one tool you need.”

You send:

> “Here are 4,200 tools. Pick one.”

Each tool contains:

* Name
* Description
* JSON schema
* Input types
* Output types
* Metadata

Multiply that by thousands.

Now your model prompt is tens of thousands of tokens before reasoning even starts.

That’s token bloat.

---

### Why MCP Is Uniquely Vulnerable?

MCP is powerful because it standardizes tools.

But that same power creates a new failure mode:

#### MCP encourages tool catalogs

* Public registries
* Internal enterprise registries
* Department registries
* Vendor registries
* Marketplace registries

Soon you have:

* CRM tools
* ERP tools
* Cloud tools
* DevOps tools
* Security tools
* Finance tools
* HR tools

All MCP-compatible.

Now your agent needs to choose one.

So naïve implementations load **everything**.

---

#### The Breaking Point: Thousands of Tools

The MCP community hit this wall in 2025.

Which led to:

* **SEP-1576: Mitigating Token Bloat in MCP**
* Feature request: **Lazy Loading for MCP Servers**
* Claude shipping **Tool Search Tool**

This is the signal:

> The ecosystem is moving from static tool injection to dynamic discovery.

---

## Claude’s Tool Search Tool: The New MCP Pattern

Claude’s new **Tool Search Tool** introduces an important shift.

Instead of loading all tools into context:

1. Claude receives a task
2. Claude searches a tool registry
3. Claude selects relevant tools
4. Only those tools are loaded into context
5. Execution begins

This mirrors how real software works:

* You don’t load every library
* You import what you need

This is the path to the future of MCP.

---

## The Core MCP Scaling Problem

Let’s formalize it.

Your MCP system has four layers:

```
User → Agent → MCP Client → MCP Registry → MCP Servers
```

The failure happens at:

```
MCP Client → Model Context
```

Where:

* The MCP client injects tool schemas
* The model must reason over them
* The prompt explodes

---

### SEP-1576: The Community’s Wake-Up Call

SEP-1576 proposes:

* Lazy tool loading
* Partial schemas
* Tool summaries
* On-demand expansion
* Context budgets

It acknowledges a core truth:

> MCP systems must become **context-aware platforms**, not dumb tool injectors.

---

### Why Token Bloat Breaks AI Reasoning

LLMs do not reason better with more tools.

They reason better with:

* Clear options
* Minimal noise
* Focused schemas
* Small decision trees

Token bloat causes:

* Tool confusion
* Hallucinated tool calls
* Slower planning
* Lower accuracy
* Higher cost

This is not theoretical.
This is measurable.

---

## MCP Needs Platform Architecture — Not Just Protocols

This is where most teams fail.

They treat MCP like:

> “Just expose APIs as tools.”

But MCP is not just transport.
It is an **AI execution platform**.

You need:

* Tool governance
* Context orchestration
* Discovery
* Authorization
* Policy
* Auditing

This is why naive MCP deployments become **Shadow MCP**.

---

## Shadow MCP: The Silent Compliance Risk

Shadow MCP is when:

* Teams spin up MCP servers ad-hoc
* No registry
* No governance
* No audit
* No access control
* No policy

Now tools silently enter AI contexts.

**This is Shadow IT — but for AI.**

Token bloat is often the first symptom.

---

## Best Practices for Token-Efficient MCP Design

Let’s get practical. Here are nine best practices to scale MCP tool catalogs without destroying your budget:

### 1. Never Load All Tools

**Rule:**
No MCP client should ever inject all tools into context.

Ever.

Use:

* Search
* Discovery
* Ranking
* Filtering

---

### 2. Implement Tool Discovery

Your agent should:

1. Understand the task
2. Query a registry
3. Receive [ranked candidates](./how-to-rank-mcp-tools-to-improve-discovery)
4. Load only relevant tools

This is exactly what Claude’s Tool Search Tool enables.

---

### 3. Use Tool Summaries First

Instead of loading full schemas:

Start with:

* Name
* Description
* Capability tags

Then expand only the chosen tool.

---

### 4. Enforce Context Budgets

Define:

* Max tool count per request
* Max schema tokens
* Max metadata size

Reject or paginate when limits are exceeded.

---

### 5. Add Policy-Based Tool Filtering

Not every agent should see every tool.

Filter by:

* Role
* Tenant
* Department
* Environment
* Compliance level

---

### 6. Add Tool Ranking

Use:

* Semantic search
* Tags
* Domain
* Past usage
* Cost
* Latency

Return top N candidates only.

---

### 7. Add Tool Versioning

Never inject multiple versions of the same tool.

Use:

* Stable aliases
* Deprecation policies
* Controlled rollouts

---

### 8. Use Partial Schemas

Load:

* Input shape only
* Output later
* Examples on demand

---

### 9. Add Audit Trails

Track:

* Tool discovery
* Tool selection
* Tool execution
* Tool failures

This becomes your AI governance layer.

---

## MCP Is Becoming an AI Operating System

This is the real shift.

MCP is no longer:

> “A protocol for tools.”

It is becoming:

> “An operating system for AI execution.”

Which means:

* Scheduling
* Discovery
* Security
* [Connect Authority](/mcp-registry-connect-authority/)
* Cost control
* Governance
* Observability

Token bloat is the first scaling signal.

---

## Where HAPI MCP Fits in This Architecture

HAPI MCP was designed for exactly this future.

Not as a toy MCP wrapper.
But as a **Headless API platform for AI execution.**

Core principles:

* API-first MCP servers
* Registry-first discovery
* Connect Authority enforcement
* Zero-trust architecture
* Enterprise-grade deployment
* Airgap-ready
* Cloud-ready
* VM-first friendly

HAPI treats MCP as **platform infrastructure**.

Not prompt glue.

---

## The Future: Tool Search, Lazy Loading, and AI Gateways

We’re entering the next phase of AI platforms:

| Old              | New                   |
| ---------------- | --------------------- |
| Static tools     | Dynamic discovery     |
| Prompt injection | Context orchestration |
| Manual schemas   | Search-driven tools   |
| Flat catalogs    | Ranked registries     |
| No governance    | Policy enforcement    |
| Shadow MCP       | MCP Authority         |

This is exactly the direction Claude is moving.

This is exactly what SEP-1576 proposes.

And this is exactly what enterprises need. HAPI MCP is built for this future.

---

## Final Takeaways: How to Build MCP Systems That Scale

If you're building with MCP today, here is your roadmap:

1. **Adopt tool discovery**
2. **Implement lazy loading**
3. **Use a registry**
4. **Add a connect authority**
5. **Enforce context budgets**
6. **Filter by policy**
7. **Rank tools**
8. **Audit everything**
9. **Kill shadow MCP**
10. **Treat MCP as platform infrastructure**

---

## MCP Without Token Discipline Will Fail

Token bloat is not a bug.
It’s a design failure.

The teams that solve it now will own the next generation of AI platforms.

The teams that ignore it will build expensive demos that never scale.

---

## The question is simple:

Are you building MCP tools...

Or are you building an MCP platform?

---

If you're serious about AI at scale, start designing for token efficiency now.

Because your AI is only as smart as the context you give it.

Be HAPI, and Go Rebels! ✊🏼

---

## FAQ: Token bloat in MCP

**Q: What is token bloat in MCP?**  
A: Token bloat in MCP happens when an MCP client injects too many tool definitions (schemas + descriptions) into the model context, inflating prompt size before reasoning even starts.

**Q: Why is token bloat a problem for MCP systems?**  
A: Token bloat increases cost per request, adds latency, degrades tool selection quality, and expands the security/compliance surface because more tools appear in context than are needed.

**Q: What causes token bloat in MCP tool catalogs?**  
A: The most common cause is static tool injection: loading the full tool catalog into the prompt on every request instead of discovering and loading only what’s needed.

**Q: What is lazy loading for MCP tools?**  
A: Lazy loading means you load tool schemas only after the agent has identified relevant tools (usually via search/ranking), rather than preloading every tool into context.

**Q: What is tool discovery in MCP?**  
A: Tool discovery is a step where the agent queries a registry (or authority layer) to retrieve a small, ranked set of candidate tools for a task, then loads only those.

**Q: How do you mitigate token bloat when you have thousands of MCP tools?**  
A: Use search-based discovery + ranking, enforce tool/context budgets, filter tools by policy (role/tenant), and expand schemas on demand (summaries first, full schemas later).

**Q: What is a context budget for MCP tools?**  
A: A context budget is a hard limit on how many tools or schema tokens can be included in a request. It keeps cost and latency predictable and prevents runaway prompts.

**Q: Should I use FAQPage or QAPage schema for MCP Q&A content?**  
A: Use FAQPage when each question has a single authoritative answer you provide. Use QAPage only when users can submit answers (like forums).

**Q: What is shadow MCP and how does it relate to token bloat?**  
A: Shadow MCP is ungoverned MCP tooling (servers/tools) that appear without centralized discovery, policy, or audit. It often shows up first as tool sprawl and token bloat.

**Q: What’s the best MCP architecture pattern to scale tool catalogs?**  
A: Registry-first discovery with an authority/policy layer: the agent searches a catalog, gets a small ranked shortlist, and only then loads the selected tool schemas for execution.


## References:

- Feature Request: [Lazy Loading](https://github.com/anthropics/claude-code/issues/7336) for MCP Servers and Tools
- https://venturebeat.com/orchestration/claude-code-just-got-updated-with-one-of-the-most-requested-user-features
- [Tool search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)
  - [X Post](https://x.com/trq212/status/2011523109871108570) with more details.
- [SEP-1576: Mitigating Token Bloat in MCP](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1576)