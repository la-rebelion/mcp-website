---
title: "Your API Knows What Comes Next. Now Your AI Can Too."
description: "HAPI Capability Graph and Capability Planning give MCP clients a safer, more useful way to discover API tools, understand what is missing, and prepare the next step—with optional Jev-powered classification from TypeSafe."
keywords:
  - API Capability Graph
  - Capability Planning
  - MCP
  - Jev
  - TypeSafe
  - OpenAPI
  - AI agents
  - tool discovery
  - agentic workflows
---

# Your API Knows What Comes Next. Now Your AI Can Too.

An AI assistant can understand a request. That is useful. But when the request
touches a real business process—booking an appointment, changing an order,
onboarding a customer, resolving an account issue—understanding is only the
beginning.

The assistant still has to answer the questions that matter:

- What can I safely do right now?
- What information is missing?
- Which tool is the right next tool?
- Should I ask a question, show options, or prepare an action?
- Does this change need authorization or a human confirmation?

Until now, most MCP servers have handed the model a list of tools and hoped it
would infer the rest.

That works for a demo. It is not enough for work that matters.

Today, we are excited to share what we have been building for **HAPI v1.2**:
**Capability Graph**, **Capability Planning**, and an optional classifier
powered by **Jev from TypeSafe**.

Together, they help turn an API from a menu of possible actions into a
decision guide an AI assistant can actually use.

**Coming soon in HAPI v1.2. Private Beta is available by request:**
[request a demo](https://mcp.com.ai/request-demo).

## The problem with a flat list of tools

MCP made it possible to connect AI clients to the APIs businesses already
trust. That is a big deal. With HAPI, an OpenAPI contract can become MCP tools
without rebuilding the backend or duplicating business logic in a prompt.

But a large API can expose dozens—or hundreds—of operations.

To a person, the difference between *cancel an appointment*, *reschedule an
appointment*, and *book a new appointment* is obvious. Each has different
consequences. Each needs different information. One may be irreversible;
another may preserve the customer’s place and simply move it.

To an AI client looking at a flat tool list, those differences are easy to
miss. The model has to infer a workflow from names, descriptions, and whatever
happened to be said in the conversation. That is where assistants start asking
the wrong question, selecting a nearly-right tool, or trying an action before
the necessary information exists.

The answer is not more prompt instructions. It is a better contract.

## From a pile of tools to a map of what is possible

**Capability Graph** gives HAPI a structured understanding of an API’s
operations. It can use the signals already in a well-designed OpenAPI contract
and, where helpful, a small amount of explicit business context:

- what an operation helps someone accomplish;
- when it should be used—and when it should not;
- whether it reads information, changes something, or removes something;
- what needs to be true before it is useful.

That creates a more useful discovery experience. Instead of presenting an AI
client with every operation at once, HAPI can deterministically narrow the
field to the tools that fit the request.

Ask to “move my appointment without cancelling it,” and the assistant has a
clear reason to consider rescheduling before cancellation. Ask to “find a
pediatrician in Morelia,” and discovery can focus on professionals, specialties,
and availability—not unrelated billing or account actions.

The API remains the source of truth. HAPI does not create a shadow workflow in
an agent prompt. It makes the intent already present in the API easier to use.

## The next leap: knowing what is ready

Finding a relevant tool is only part of the job. The next question is more
important:

> Given what we know right now, what can happen next?

That is what **Capability Planning** is for.

Capability Planning lets an MCP client ask HAPI for a bounded, deterministic
proposal based on explicit business state. It can tell the client whether a
goal is already complete, what is missing, or which safe step can move the
conversation forward.

Imagine a healthcare scheduling assistant:

1. A patient asks for a pediatrician next week.
2. The assistant finds verified professionals.
3. The patient selects one.
4. The assistant checks live availability.
5. The patient selects a time.
6. The assistant verifies the details and asks for confirmation before booking.

At every step, the assistant can be conversational and dynamic. But it does
not lose the thread of the real process.

If the patient says, “Actually, I want to cancel my current appointment,” the
assistant sees a different path: identify the appointment, verify the person,
and obtain a clear confirmation before making an irreversible change.

This is not a rigid chatbot script. It is a live decision guide grounded in
the current situation.

## Four answers that make an assistant more trustworthy

Capability Planning gives MCP clients four clear outcomes:

| Outcome | What the assistant can say |
| --- | --- |
| **Complete** | “This is already done. There is nothing else to do.” |
| **Planned** | “Everything is ready. Here is the next safe step.” |
| **Clarification required** | “I can help, but I need this specific detail or confirmation first.” |
| **Unplannable** | “There is no declared, safe path to that result from the information we have.” |

That is a much better experience than an assistant guessing, failing, and
trying again. It is also a better experience for the teams responsible for
the API: the reasons for a next step, a missing detail, or a pause are visible
and reviewable.

And one boundary is important: **planning does not call the API.** It does not
book, cancel, charge, update, or delete anything. It prepares a proposal so a
person and an AI client can decide what should happen next.

## Where Jev changes the conversation

Deterministic rules are the right foundation for authorization, policy, and
known business transitions. But people do not always describe what they need
with the same words your API uses.

“Can you move my visit?”

“I need a different time.”

“Don’t cancel it—I still need the doctor.”

Those are related, but they carry nuance. That is where the optional
**Jev-powered TypeSafe classifier** comes in.

Jev is TypeSafe’s flagship System One model: it takes state and typed questions
and returns structured answers that software can use directly. In HAPI, Jev is
not asked to invent an entire workflow or take control of the API. It can help
interpret intent and rank a bounded set of already eligible tool candidates.

The division of responsibility is deliberate:

- **HAPI and the API contract** keep authorization, policy, and declared safety
  rules in control.
- **Capability Graph** builds a deterministic shortlist.
- **Jev** adds semantic judgment when the user’s language is nuanced or
  ambiguous.
- **Capability Planning** explains whether the next step is ready, missing
  information, or needs a confirmation.

That is the opportunity we are most excited about: conversational intelligence
where language is fuzzy, predictable controls where the business process must
be exact.

## No black box. No prompt spaghetti.

The AI world does not need another layer that quietly reimplements the
business.

Your API already carries hard-won knowledge: validation, permissions, state,
rates, limits, and rules that have survived real customers and real edge cases.
HAPI’s job is to make that knowledge available to MCP clients without copying
it into a brittle agent layer.

Capability Graph and Capability Planning build on that principle.

They let teams describe the meaningful parts of a workflow once, alongside the
contract they already maintain. They allow assistants to be more useful without
turning them into unchecked operators. And they make it possible to introduce
semantic AI judgment from Jev without giving up deterministic safeguards.

## Who should care?

This is especially interesting for teams with:

- APIs that expose many MCP tools;
- operations that sound similar but have very different consequences;
- sensitive workflows with real authorization and confirmation requirements;
- assistants that need to guide people through multi-step work without becoming
  a second application.

Healthcare scheduling is one example. So are customer support, order changes,
travel adjustments, financial operations, internal IT workflows, and any
service where “what comes next?” has a real business answer.

## What is coming next

Capability Graph, Capability Planning, and the optional Jev-powered classifier
are coming in **HAPI v1.2**.

We are opening a **Private Beta** for teams that want to try the experience on
real APIs and real workflows. We are particularly interested in teams ready to
test a focused use case, evaluate the quality of tool discovery, and help shape
the right boundaries for planning and controlled execution.

If your API is already the place where your business rules live, you are closer
than you think.

Start at [jev-mcp.dev](https://jev-mcp.dev), explore the
[HAPI documentation](https://docs.mcp.com.ai/jev), or
[request a Private Beta demo](https://mcp.com.ai/request-demo).

Your API already knows what comes next.

Now your AI can too.

---

## Suggested social copy

An API with 50 MCP tools is useful.

An AI assistant that knows which tool is relevant, what information is missing,
and when to pause for confirmation? That changes the experience.

Coming in HAPI v1.2: Capability Graph, Capability Planning, and an optional
Jev-powered TypeSafe classifier for more useful, safer MCP interactions.

Private Beta available by request: https://mcp.com.ai/request-demo

## Suggested featured-image direction

**Concept:** A clean navigation map emerging from an API contract: “Request” on
the left, a highlighted “next safe step” in the center, and “Trusted outcome”
on the right. Use HAPI teal and warm orange accents, with a subtle node graph
in the background. Avoid robot imagery, brains, or generic chatbot bubbles.
