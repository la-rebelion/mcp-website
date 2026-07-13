---
title: "MCP-First? I Still Believe the Future Is API-First."
description: "Exploring why APIs will remain the stable foundation for software, even as MCP emerges as a new abstraction for AI agents."
keywords: ["API-first", "MCP", "AI agents", "software architecture"]
authors: ["adrian"]
image: /img/blog/api-first-vs-mcp-first.png
---

## **MCP-First? I Still Believe the Future Is API-First.**

Every few months, our industry declares the next abstraction layer "the new HTTP."

First it was SOAP.

Then REST.

Then GraphQL.

Then gRPC.

Now, it's MCP.

<!-- truncate -->

The excitement is understandable. Model Context Protocol (MCP) is changing how AI agents discover and use software. It removes friction. It standardizes tool access. It gives language models a common interface.

But that doesn't mean APIs are going away.

Quite the opposite.

I believe the future is **API-first, MCP-enabled**.

Not MCP-first.

---

## The Wrong Question

The discussion often starts with a question like this:

> "If agents are the future users of software, shouldn't we build for agents first?"

I think that's the wrong question.

The better question is:

> **What is the most stable contract a platform can expose over the next 10-20 years?**

My answer is still:

**APIs.**

Whether REST, gRPC, or another protocol that hasn't been invented yet.

---

## APIs Solve a Different Problem

People sometimes compare REST APIs and MCP as if one replaces the other.

They don't.

They solve different problems.

REST APIs answer:

- How do applications communicate?
- How is data represented?
- How are systems versioned?
- How are requests authenticated?
- How are responses cached?
- How are SLAs enforced?
- How are services monitored?

MCP answers something else:

- What tools are available?
- How should an AI discover them?
- How should the model invoke them?
- What metadata helps the model use them correctly?

Those are complementary questions.

Not competing ones.

---

## Developers Are Not Going Away

One assumption behind "MCP-first" thinking is that AI agents will become the primary consumers of software.

Maybe.

But even if that happens...

Someone still builds the software.

Someone still designs the APIs.

Someone still versions the contracts.

Someone still debugs production.

Someone still integrates systems.

Even autonomous agents need reliable interfaces underneath.

Ironically, many AI agents themselves generate REST calls today.

Because APIs remain the most deterministic interface available.

---

## APIs Are the Infrastructure

Think about the Internet.

Browsers don't replace HTTP.

Mobile apps don't replace HTTP.

SDKs don't replace HTTP.

GraphQL didn't replace HTTP.

Even gRPC often runs over HTTP/2.

Every new abstraction eventually sits on top of the previous one.

MCP feels similar.

It is another abstraction.

A useful one.

But underneath?

There is usually an API.

Sometimes REST.

Sometimes gRPC.

Sometimes GraphQL.

Sometimes something proprietary.

The foundation hasn't changed.

The interface exposed to the AI has.

---

## MCP Is an Adapter, Not the Product

One reason I built HAPI MCP the way I did is because I never wanted developers rewriting APIs just because AI arrived.

Organizations have spent years designing APIs.

They have:

- security reviews
- governance
- documentation
- SDKs
- monitoring
- observability
- rate limiting
- compliance
- audit trails

Why throw that away?

Instead, expose those capabilities through MCP.

The API remains the source of truth.

MCP becomes another consumer.

Exactly like:

- a web frontend
- a mobile application
- an SDK
- a partner integration

The difference is simply that the consumer happens to be an AI agent.

---

## Today's MCP Could Be Tomorrow's Legacy Protocol

History is surprisingly consistent.

Technology stacks evolve.

Standards evolve.

Frameworks evolve.

Developer preferences evolve.

Imagine rebuilding your backend every time the industry discovers a new protocol.

SOAP.

REST.

GraphQL.

gRPC.

MCP.

Whatever comes next.

That is expensive.

Instead, stable organizations invest in one thing:

**A durable business API.**

Everything else becomes an adapter.

That adapter may change every five years.

Your business logic shouldn't have to.

---

## Enterprise Architecture Already Solved This

Enterprise integration has used this pattern for decades.

Core systems expose stable interfaces.

Around them sit adapters.

Examples include:

- API gateways
- ESBs
- messaging systems
- event buses
- GraphQL layers
- mobile backends
- SDK generators

MCP fits naturally into that architecture.

It becomes another presentation layer.

Not the domain model.

Not the source of business rules.

Not the canonical integration contract.

---

## AI Doesn't Eliminate APIs—It Increases Their Value

Here's something interesting.

As AI adoption grows, API quality becomes even more important.

Why?

Because agents amplify inconsistency.

Humans compensate for poor APIs.

Agents don't.

If an endpoint behaves differently every Tuesday...

An AI won't magically fix that.

If your documentation is outdated...

The model inherits that confusion.

If your API isn't deterministic...

The agent becomes unreliable.

Good APIs become even more valuable in an AI-native world.

Not less.

---

## My Architecture Preference

If I were designing a cloud platform today, my stack would look something like this:

```
Business Logic
        │
REST / gRPC APIs
        │
-------------------------
│          │           │
SDKs     Web Apps     Mobile Apps
│
MCP Adapter
│
AI Agents
```

Notice something important.

The APIs don't exist because humans consume them.

They exist because they are the most stable integration contract in the system.

Everything else builds on top.

---

## What About Skills?

I think the same philosophy applies to AI Skills.

Skills are fantastic.

They improve discovery.

They provide context.

They help models make better decisions.

But they are not where your business logic belongs.

They describe capabilities.

They don't replace implementation.

Just like MCP.

---

## A Better Mental Model

Instead of asking:

> "Should I build APIs or MCP?"

Ask:

> "What is my canonical interface?"

For me, the answer is simple.

The API.

Everything else becomes an adapter.

That includes:

- MCP
- Skills
- SDKs
- CLI tools
- Chat interfaces
- Future agent protocols we haven't invented yet

Adapters evolve.

Core contracts should not.

---

## Practical Guidance for Builders

If you're designing an AI-ready platform today, consider this approach:

1. **Design your APIs first.** Make them deterministic, versioned, observable, and secure.
2. **Keep business logic in the API layer.** Avoid duplicating rules across agent-specific interfaces.
3. **Expose APIs through MCP.** Let AI agents consume existing capabilities instead of creating parallel implementations.
4. **Use Skills to improve discoverability.** Help models understand when and how to use your capabilities.
5. **Treat AI interfaces as extensions.** They are valuable access channels, not replacements for your platform's foundation.

This approach reduces duplication, simplifies governance, and makes your platform resilient to future protocol changes.

---

## Frequently Asked Questions

### Will MCP replace REST APIs?

Probably not. MCP standardizes how AI agents discover and invoke capabilities, while REST APIs define how systems communicate. They address different layers of the architecture.

### Should every API have an MCP interface?

Not necessarily. Expose the capabilities that benefit AI-driven workflows. Internal or low-level APIs may never need an MCP representation.

### Can I build an AI-native application without REST?

Yes. Some applications may use gRPC, GraphQL, messaging, or other protocols internally. The broader principle remains the same: keep a stable integration contract and layer AI-specific interfaces on top.

### Is MCP important?

Absolutely. It is one of the most promising standards for AI interoperability today. The question isn't whether to support MCP—it's where it belongs in your architecture.

---

## The Bigger Picture

MCP is one of the most exciting developments in the AI ecosystem. It lowers the barrier for agents to interact with software and accelerates interoperability across platforms.

But interoperability is not the same as architecture.

History has shown that durable software platforms separate **core business capabilities** from **access mechanisms**. Web browsers, mobile apps, SDKs, CLIs, and now AI agents are all different ways of reaching the same underlying services.

That is why I remain convinced that the future is not **MCP-first**.

It is **API-first, MCP-enabled**.

Because protocols will evolve.

Agents will evolve.

Models will evolve.

The businesses that succeed will be the ones whose foundations don't have to be rebuilt every time the industry invents a new way to consume software.
