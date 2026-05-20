/**
 * The AI Infrastructure Framework™ — Pilot Accelerator page
 * Route: /pilot-accelerator
 *
 * Companion CSS: src/css/pilot-accelerator.css (new file — see deployment notes)
 * Reuses many classes from src/css/pricing.css.
 *
 * Lead-capture flow:
 *   - Primary CTA → external scheduler at go.mcp.com.ai/adrian-meet
 *   - Secondary CTA → opens ProposalRequestModal → captures via HubSpot-style form
 *     → on submit, surface "Thanks" + a direct download link (replace stub with real PDF URL)
 */

import React, { useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import clsx from 'clsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@site/src/components/ui/dialog';
import {
  CheckCircle,
  ShieldCheck,
  Activity,
  Wrench,
  FileText,
  Workflow,
  GitBranch,
  Lock,
  AlertTriangle,
  Eye,
  Database,
  TrendingUp,
  Layers,
} from 'lucide-react';
import '@site/src/css/pricing.css';
import '@site/src/css/pilot-accelerator.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tier {
  name: string;
  tagline: string;
  duration: string;
  servers: string;
  environment: string;
  governance: string;
  support: string;
  betaPrice: string;
  standardPrice: string;
  popular?: boolean;
  badge?: string;
  icon: string;
}

interface Problem {
  icon: ReactNode;
  title: string;
  body: string;
}

interface Step {
  number: string;
  title: string;
  body: string;
}

interface Deliverable {
  icon: ReactNode;
  title: string;
  bullets: string[];
}

interface CompareRow {
  option: string;
  cost: string;
  timeline: string;
  catch: string;
  highlight?: boolean;
}

interface FAQ {
  question: string;
  answer: ReactNode;
  schemaAnswer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const problems: Problem[] = [
  {
    icon: <Workflow size={28} aria-hidden />,
    title: "The custom-wrapper trap",
    body: "Your team writes one-off connectors for every AI-to-SaaS integration. They break every time Salesforce, Jira, or Workday pushes an update. Senior engineers spend cycles being plumbers.",
  },
  {
    icon: <Eye size={28} aria-hidden />,
    title: "The visibility gap",
    body: "Leadership can't answer 'what data did the agent touch, and under what permissions?' Without that answer, the project can't pass security review — and won't go live.",
  },
  {
    icon: <AlertTriangle size={28} aria-hidden />,
    title: "Shadow AI sprawl",
    body: "Because the official path is too slow, developers use unapproved tools and personal accounts. You know it's happening. Policy alone won't stop it.",
  },
  {
    icon: <Database size={28} aria-hidden />,
    title: "Legacy mismatch",
    body: "Your 10–20 year old systems weren't built for AI. Forcing direct connections to a modern agent yields latency, hallucination, or accidental data exposure.",
  },
  {
    icon: <TrendingUp size={28} aria-hidden />,
    title: "Board pressure",
    body: "You're asked to show AI ROI this fiscal year — but most of the AI budget has been spent on sandbox pilots that never reached production.",
  },
];

const differentiators = [
  { title: "Standard over custom", body: "MCP is the 'USB-C for AI.' One protocol, every system, no per-tool glue code." },
  { title: "Legacy-first", body: "We wrap your decade-old systems in a modern interface — no rewrite required." },
  { title: "Governance-first", body: "Authentication, authorization, and audit are designed in on day one — not bolted on later." },
  { title: "Modular", body: "Swap LLM providers or add a new MCP Server in days, not months." },
  { title: "ROI-first", body: "The pilot workflow is selected on business impact, not 'cool factor.'" },
];

const methodology: Step[] = [
  { number: "01", title: "Pick a high-ROI workflow", body: "Single job-to-be-done with the strongest measurable outcome. Selected together in a scoping session." },
  { number: "02", title: "Map systems & actions", body: "Read/write boundaries, auth approach, action constraints. Each system maps to one MCP Server." },
  { number: "03", title: "Build MCP Servers", body: "Standardized servers for the agreed systems (the Bridge Factory). Tool schemas, action constraints, regression test harness." },
  { number: "04", title: "Add the governance gate", body: "Least-privilege access, scoped tokens, policy checks, allow-lists. OAuth / OIDC / API keys — SAML SSO is a separate engagement." },
  { number: "05", title: "Add observability + audit", body: "Activity logs, trace IDs, audit events per tool/action, cost budgets. The artifact your security team needs to sign off." },
  { number: "06", title: "Validate safety", body: "Test cases, prompt-injection considerations, break-glass controls, kill-switch." },
  { number: "07", title: "Operationalize + handoff", body: "Runbooks, ownership map, change process, walkthrough session. Your team owns it from day one." },
];

const deliverables: Deliverable[] = [
  {
    icon: <FileText size={28} aria-hidden />,
    title: "Pilot Blueprint",
    bullets: [
      "Workflow definition with ROI scoring and success metrics",
      "System and action map with permission boundaries",
      "90-day MCP Server roadmap (bonus)",
    ],
  },
  {
    icon: <Wrench size={28} aria-hidden />,
    title: "MCP Bridge Factory",
    bullets: [
      "Production-grade MCP Servers for your highest-priority systems (count varies by tier)",
      "Tool schemas, action constraints, regression test harness",
      "Standardized patterns reusable across the next MCP Servers your team builds",
    ],
  },
  {
    icon: <Lock size={28} aria-hidden />,
    title: "Governance Gate",
    bullets: [
      "AuthN/AuthZ via OAuth, OIDC, API keys, or service accounts",
      "Policy checks and least-privilege model",
      "Break-glass emergency controls and kill-switch",
      "Note: SAML / Enterprise SSO is a separate add-on SOW",
    ],
  },
  {
    icon: <Activity size={28} aria-hidden />,
    title: "Audit & Ops Pack",
    bullets: [
      "Audit trail events and traceability per agent action",
      "Observability hooks and lightweight dashboards",
      "Runbooks, ownership map, handoff workshop",
    ],
  },
];

const bonuses = [
  { title: "Token Budget & Tool Discovery Playbook", body: "Prevent token bloat with tool filtering, catalogs, and context budgets." },
  { title: "Executive-Ready One-Pager", body: "Board/CISO-friendly summary of what was built, what's safer, what's next." },
  { title: "3 × 30-min × 3-month Support", body: "Three 30-minute consulting sessions over 3 months after handoff." },
];

const tiers: Tier[] = [
  {
    name: "Thin-Slice Pilot",
    tagline: "14-day proof. One workflow. One MCP Server.",
    duration: "14 days",
    servers: "1 MCP Server",
    environment: "Dev / Test",
    governance: "Basic",
    support: "30 days",
    betaPrice: "From $4,500",
    standardPrice: "$7,500 standard",
    icon: "🎯",
  },
  {
    name: "Standard Pilot",
    tagline: "Production-grade. Most enterprise teams start here.",
    duration: "4–6 weeks",
    servers: "3–5 MCP Servers",
    environment: "Dev → Staging",
    governance: "Full",
    support: "3 × 30-min sessions / 3 months",
    betaPrice: "From $9,500",
    standardPrice: "$15,000–$18,000 standard",
    popular: true,
    badge: "Most Popular",
    icon: "⚡",
  },
  {
    name: "Enterprise Pilot",
    tagline: "Multi-workflow rollout with custom policy.",
    duration: "8–12 weeks",
    servers: "5–10 MCP Servers",
    environment: "Dev → Staging → Prod-bound",
    governance: "Full + custom policy",
    support: "90 days + retainer option",
    betaPrice: "From $24,500",
    standardPrice: "$35,000–$50,000 standard",
    icon: "🏢",
  },
];

const fitFor = [
  "Platform, integration, and AI-enablement leaders at SMB and enterprise scale.",
  "Teams who already ran AI pilots and hit the integration / audit wall.",
  "Organizations operating under EU AI Act, SOC 2, HIPAA, or internal security review pressure.",
  "Stacks that mix legacy systems, modern SaaS, and custom internal APIs.",
];

const notFitFor = [
  "Pre-seed startups — use the open-source HAPI MCP and self-host for free.",
  "Teams that need full enterprise rollout in one engagement (the pilot is a starting point, not the rollout).",
  "Buyers seeking a 'compliance guarantee' — we reduce risk through controls, not promises.",
  "Teams whose primary need is SAML / Enterprise SSO integration — that's a separate, dedicated scope of work.",
];

const compareRows: CompareRow[] = [
  { option: "Hire in-house architect", cost: "$200–350K / year + benefits", timeline: "3–6 months to hire + 90 days ramp", catch: "Slow to start" },
  { option: "Big-4 consulting firm", cost: "$500K – $2M+", timeline: "9–24 months", catch: "Tech changes twice mid-flight" },
  { option: "Internal team custom build", cost: "$0 cash · $150K+ opportunity cost", timeline: "4–6 months for v1", catch: "Maintenance tax forever" },
  { option: "Low-code wrapper SaaS", cost: "$500 – $5K / month + setup", timeline: "Weeks", catch: "Vendor lock-in, weak on legacy / air-gap" },
  { option: "HAPI MCP Pilot Accelerator", cost: "$4.5K – $50K one-time", timeline: "14 days – 12 weeks", catch: "Pilot scope only — rollout is separate", highlight: true },
];

const pilotFaqs: FAQ[] = [
  {
    question: "How is the 14-day Thin-Slice different from the 4–6 week Standard Pilot?",
    answer: "The Thin-Slice covers one workflow and one MCP Server in a dev/test environment — enough to prove the pattern to your team and secure internal budget for the bigger engagement. The Standard Pilot covers one workflow but 3–5 MCP Servers, with full governance, audit, and a path toward staging. Many enterprise buyers run the Thin-Slice first as a low-risk evaluation.",
    schemaAnswer: "The Thin-Slice covers one workflow and one MCP Server in dev/test to prove the pattern and secure internal budget. The Standard Pilot covers one workflow with 3–5 MCP Servers, full governance, audit, and a path to staging.",
  },
  {
    question: "What if my team isn't familiar with MCP?",
    answer: "That's the expected case. The engagement includes a walkthrough workshop, runbooks, and the 3 × 30-minute follow-up sessions over 3 months. Your team also gets free access to Rebel-U content during the engagement to ramp on MCP fundamentals while we build.",
    schemaAnswer: "That is the expected case. The engagement includes a walkthrough workshop, runbooks, and three follow-up sessions over 3 months, plus free access to Rebel-U learning content during the engagement.",
  },
  {
    question: "What happens after handoff?",
    answer: (
      <>
        Your team owns and operates the system. You can either run it self-serve, or move to an optional <strong>Support Retainer</strong> ($2,500/month or $7,500/quarter) for ongoing MCP Server additions, governance evolution, and oncall office hours. Many clients also pick up a separate engagement to expand to more workflows after Q1.
      </>
    ),
    schemaAnswer: "Your team owns and operates the system after handoff. Optionally, a Support Retainer at $2,500/month or $7,500/quarter provides ongoing MCP Server additions, governance evolution, and oncall office hours.",
  },
  {
    question: "Can we extend the engagement mid-flight?",
    answer: "Yes — extensions are handled via a change order to the original SOW. Common reasons: scope grew (extra MCP Server requested), a new IdP added, or you decided to push to staging earlier. Pricing is per-server or per-week depending on the scope of the change.",
    schemaAnswer: "Yes. Extensions are handled via change order to the SOW, priced per MCP Server or per additional week depending on scope.",
  },
  {
    question: "What if we need SAML / Enterprise SSO?",
    answer: "SAML / Enterprise SSO is a separate, dedicated SOW scoped per IdP (Okta, Entra ID, Ping, Keycloak). It's intentionally not bundled — IdP integrations are sensitive and require security-team coordination. We can sequence it after the Pilot or run in parallel with a separate signer on your side.",
    schemaAnswer: "SAML and Enterprise SSO are a separate, dedicated SOW scoped per IdP. Can be sequenced after the Pilot or run in parallel.",
  },
  {
    question: "What if our systems aren't OpenAPI?",
    answer: "OpenAPI v3 is the fastest path because HAPI MCP can lift the spec directly into MCP tools. For non-OpenAPI systems (gRPC, internal RPC, raw databases, legacy SOAP), we build the MCP Server by hand — usually with a thin OpenAPI shim added during the engagement so the same standardized contract applies. This is in-scope; expect 1.5–2× the build time per non-OpenAPI server.",
    schemaAnswer: "Non-OpenAPI systems are supported. We build the MCP Server by hand, typically with a thin OpenAPI shim added during the engagement, at 1.5–2x the build time per server.",
  },
  {
    question: "Do you offer fixed-price or time-and-materials?",
    answer: "Fixed-price by default. The Pilot tiers are fixed-fee engagements with defined deliverables, a Ship-the-Foundation Guarantee, and predictable scope. T&M is only used for the Support Retainer and post-Pilot expansion work, where ongoing scope is harder to predict.",
    schemaAnswer: "Fixed-price by default. The Pilot tiers are fixed-fee with defined deliverables and a Ship-the-Foundation Guarantee. Time-and-materials applies to the Support Retainer and post-Pilot expansion only.",
  },
  {
    question: "What's the refund / extension policy?",
    answer: "If you provide the agreed inputs (system access, documentation, SME availability) on time and we miss a Pilot deliverable, you choose between a free extension week or a partial refund of fees attributable to the missed deliverable. Refund is capped at fees paid for affected deliverables, per the MSA Addendum §11. This is your sole remedy under the Ship-the-Foundation Guarantee.",
    schemaAnswer: "If you provide agreed inputs on time and we miss a deliverable, you choose between a free extension week or a partial refund of fees attributable to the missed deliverable, capped at fees paid for that deliverable.",
  },
  {
    question: "How do beta slots and the 12-month price lock work?",
    answer: "Beta pricing is capped at the first 5 logos and capacity-capped at 3 active pilots per month. Beta clients keep beta pricing for 12 months on follow-on MCP Servers added through a retainer or expansion SOW. After the first 5 logos, pricing moves to standard rates and onboarding becomes cohort-based.",
    schemaAnswer: "Beta pricing is capped at the first 5 logos and 3 active pilots per month. Beta clients keep beta pricing for 12 months on follow-on MCP Servers added through a retainer or expansion SOW.",
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pilotFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.schemaAnswer },
  })),
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'HAPI MCP Pilot Accelerator',
  alternateName: 'The AI Infrastructure Framework Pilot Accelerator',
  serviceType: 'AI Infrastructure Implementation',
  provider: {
    '@type': 'Organization',
    name: 'La Rebelion Labs',
    url: 'https://mcp.com.ai',
  },
  description:
    "Architect-led, time-bound engagement that replaces fragile, custom AI integrations with a standardized, governed MCP-based connectivity layer. Three tiers: Thin-Slice (14 days), Standard (4–6 weeks), Enterprise (8–12 weeks).",
  offers: tiers.map((t) => ({
    '@type': 'Offer',
    name: t.name,
    description: t.tagline,
    price: t.betaPrice.replace(/[^0-9]/g, ''),
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: t.betaPrice,
      priceCurrency: 'USD',
    },
  })),
};

// ─── Lead-capture modal ───────────────────────────────────────────────────────
// @note: Static HTML form for HubSpot compliance (see pricing.tsx pattern)

function ProposalRequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) { onClose(); setSubmitted(false); setErrors({}); }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const email = String(d.get('email') || '').trim();
    if (!email) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email.';
    if (!String(d.get('firstname') || '').trim()) next.firstname = 'Name is required.';
    if (Object.keys(next).length > 0) { setErrors(next); return false; }
    setErrors({});
    setSubmitted(true);
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={clsx('mcpExit', 'mcpOemModal')}>
        <DialogHeader>
          <DialogTitle className="mcpExitTitle">Download the Proposal</DialogTitle>
          <DialogDescription className="mcpExitLead">
            Get the detailed Pilot Accelerator proposal (PDF) — scope, tiers, deliverables, guarantees, and engagement terms. Sent to your inbox in under 60 seconds.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="mcpExitThanks">
            <CheckCircle style={{ width: 40, height: 40, color: 'var(--brand-primary)', margin: '0 auto 0.75rem', display: 'block' }} />
            <h3>Sent!</h3>
            <p>The proposal is on its way. Check your inbox (and spam folder, just in case).</p>
            <p style={{ marginTop: '1rem' }}>
              <Link className="button button--primary button--lg" href="https://go.mcp.com.ai/adrian-meet">
                Book a 20-min scope call
              </Link>
            </p>
          </div>
        ) : (
          <form method="POST" action="#" onSubmit={handleSubmit} noValidate className="mcpExitForm">
            <div className="mcpOemGrid" style={{ marginBottom: '0.6rem' }}>
              <div>
                <label htmlFor="pa-firstname" className="mcpLabel">Your Name *</label>
                <input id="pa-firstname" name="firstname" type="text" placeholder="Full name"
                  className={`mcpExitInput${errors.firstname ? ' is-invalid' : ''}`} />
                {errors.firstname && <div className="mcpFieldError">{errors.firstname}</div>}
              </div>
              <div>
                <label htmlFor="pa-email" className="mcpLabel">Work Email *</label>
                <input id="pa-email" name="email" type="email" placeholder="you@company.com"
                  className={`mcpExitInput${errors.email ? ' is-invalid' : ''}`} />
                {errors.email && <div className="mcpFieldError">{errors.email}</div>}
              </div>
            </div>

            <div className="mcpOemGrid" style={{ marginBottom: '0.6rem' }}>
              <div>
                <label htmlFor="pa-company" className="mcpLabel">Company</label>
                <input id="pa-company" name="company" type="text" placeholder="Your company" className="mcpExitInput" />
              </div>
              <div>
                <label htmlFor="pa-jobtitle" className="mcpLabel">Role / Title</label>
                <input id="pa-jobtitle" name="jobtitle" type="text" placeholder="e.g., CTO, VP Engineering" className="mcpExitInput" />
              </div>
            </div>

            <label htmlFor="pa-tier" className="mcpLabel">Which tier interests you?</label>
            <select id="pa-tier" name="tier_interest" className="mcpExitInput" defaultValue="" style={{ cursor: 'pointer', marginBottom: '0.6rem' }}>
              <option value="" disabled>Select…</option>
              <option value="thin-slice">Thin-Slice (14 days, $4,500)</option>
              <option value="standard">Standard (4–6 weeks, $9,500)</option>
              <option value="enterprise">Enterprise (8–12 weeks, $24,500+)</option>
              <option value="unsure">Not sure yet — want to read the proposal</option>
            </select>

            <label htmlFor="pa-notes" className="mcpLabel">
              Anything we should know?
              <span style={{ fontWeight: 400, color: 'var(--ifm-color-emphasis-600)', marginLeft: '0.4rem', fontSize: '0.8rem' }}>optional</span>
            </label>
            <textarea id="pa-notes" name="message"
              placeholder="Target workflow, systems involved, timeline pressure, compliance considerations…"
              className="mcpExitInput"
              style={{ minHeight: 72, resize: 'vertical', marginBottom: '0.75rem' }} />

            <div className="mcpExitActions">
              <button type="button" className="mcpExitBtnGhost" onClick={onClose}>Cancel</button>
              <input type="submit" value="Send Me the Proposal →" className="mcpExitBtnPrimary" />
            </div>
          </form>
        )}

        <p className="mcpExitFooter">No spam. We use this only to send the proposal and follow up if you'd like a call.</p>
      </DialogContent>
    </Dialog>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────

function ProblemCard({ icon, title, body }: Problem) {
  return (
    <div className="paProblemCard">
      <div className="paProblemIcon" aria-hidden>{icon}</div>
      <h3 className="paProblemTitle">{title}</h3>
      <p className="paProblemBody">{body}</p>
    </div>
  );
}

function MethodStep({ step }: { step: Step }) {
  return (
    <li className="paMethodStep">
      <div className="paMethodNumber">{step.number}</div>
      <div className="paMethodContent">
        <h4 className="paMethodTitle">{step.title}</h4>
        <p className="paMethodBody">{step.body}</p>
      </div>
    </li>
  );
}

function DeliverableCard({ icon, title, bullets }: Deliverable) {
  return (
    <div className="paDeliverableCard">
      <div className="paDeliverableIcon" aria-hidden>{icon}</div>
      <h3 className="paDeliverableTitle">{title}</h3>
      <ul className="paDeliverableList">
        {bullets.map((b, i) => (
          <li key={i}><span className="mcpCheckmark" aria-hidden>✓</span> {b}</li>
        ))}
      </ul>
    </div>
  );
}

function TierCard({ tier, onCta }: { tier: Tier; onCta: () => void }) {
  return (
    <div className={clsx('paTierCard', tier.popular && 'paTierCard--popular')}>
      {tier.badge && <div className="paTierBadge">{tier.badge}</div>}
      <div className="paTierIcon" aria-hidden>{tier.icon}</div>
      <h3 className="paTierName">{tier.name}</h3>
      <p className="paTierTagline">{tier.tagline}</p>

      <div className="paTierPrice">
        <span className="paTierPriceAmount">{tier.betaPrice}</span>
        <span className="paTierPriceMeta"> · beta</span>
      </div>
      <div className="paTierPriceStandard">{tier.standardPrice}</div>

      <dl className="paTierSpecs">
        <div><dt>Duration</dt><dd>{tier.duration}</dd></div>
        <div><dt>MCP Servers</dt><dd>{tier.servers}</dd></div>
        <div><dt>Environment</dt><dd>{tier.environment}</dd></div>
        <div><dt>Governance</dt><dd>{tier.governance}</dd></div>
        <div><dt>Post-handoff support</dt><dd>{tier.support}</dd></div>
      </dl>

      <button
        className={clsx('button', 'button--lg', tier.popular ? 'button--primary' : 'mcpBtnSecondary')}
        onClick={onCta}
      >
        Get a Tailored Quote
      </button>
    </div>
  );
}

function CompareTable() {
  return (
    <div className="paCompareTableWrap">
      <table className="paCompareTable">
        <thead>
          <tr>
            <th>Option</th>
            <th>Cost</th>
            <th>Timeline</th>
            <th>Catch</th>
          </tr>
        </thead>
        <tbody>
          {compareRows.map((r, i) => (
            <tr key={i} className={r.highlight ? 'paCompareRow--highlight' : undefined}>
              <td><strong>{r.option}</strong></td>
              <td>{r.cost}</td>
              <td>{r.timeline}</td>
              <td>{r.catch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqList() {
  return (
    <div className="mcpFaq">
      {pilotFaqs.map((faq, idx) => (
        <details key={idx}>
          <summary><strong>{faq.question}</strong></summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PilotAccelerator(): ReactNode {
  const [proposalOpen, setProposalOpen] = useState(false);

  return (
    <Layout
      title="The AI Infrastructure Framework™ — HAPI MCP Pilot Accelerator"
      description="Architect-led, time-bound engagement that takes one AI workflow from sandbox to production in 14 days to 12 weeks. Standardized MCP Servers, governance, and audit — fixed-price, with a Ship-the-Foundation Guarantee.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Head>

      <ProposalRequestModal open={proposalOpen} onClose={() => setProposalOpen(false)} />

      {/* ── Hero ── */}
      <section className="mcpHero paHero">
        <div className="container">
          <div className="mcpPricingHeroContent">
            <span className="mcpSectionBadge">The AI Infrastructure Framework™</span>
            <h1 className="mcpHeroTitle">
              Production-grade MCP for enterprise,<br />
              <strong>in 4–6 weeks.</strong>
            </h1>
            <p className="mcpHeroSubtitle">
              Replace fragile, custom AI integrations with a standardized, governed connectivity layer.
              One workflow live, 3–5 reusable MCP Servers, audit trails your security team can sign off on,
              and runbooks so your team operates it without us — fixed-price, beta from $4,500.
            </p>

            <div className="mcpHeroCtas paHeroCtas">
              <Link className="button button--primary button--lg" href="https://go.mcp.com.ai/adrian-meet">
                Book a 20-min Scope Call →
              </Link>
              <button className="button button--lg mcpBtnSecondary" onClick={() => setProposalOpen(true)}>
                Download the Proposal
              </button>
            </div>

            <div className="paHeroTrust">
              <span><ShieldCheck size={16} aria-hidden /> Ship-the-Foundation Guarantee</span>
              <span>·</span>
              <span>Beta: 5 logos cap · 3 active pilots / month</span>
              <span>·</span>
              <span>Built on <Link href="https://github.com/la-rebelion/hapi-mcp">open-source HAPI MCP</Link></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">The Problem</span>
            <h2 className="mcpSectionTitle">If you're a CIO, VP-Eng, or Systems Architect in 2026, you're sitting on at least three of these.</h2>
          </div>
          <div className="paProblemGrid">
            {problems.map((p, i) => <ProblemCard key={i} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── What Makes This Different ── */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Why This Works</span>
            <h2 className="mcpSectionTitle">Standardization beats heroism.</h2>
            <p className="mcpSectionSubtitle">
              You don't need more custom code. You need a contract between your agents and your systems. MCP is that contract.
            </p>
          </div>
          <div className="paDiffGrid">
            {differentiators.map((d, i) => (
              <div key={i} className="paDiffCard">
                <div className="paDiffMarker" aria-hidden>●</div>
                <h4>{d.title}</h4>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">The Methodology</span>
            <h2 className="mcpSectionTitle">Seven steps from sandbox to production.</h2>
            <p className="mcpSectionSubtitle">
              The same operating model on every engagement — what changes is the count of MCP Servers and the depth of governance.
            </p>
          </div>
          <ol className="paMethodList">
            {methodology.map((step) => <MethodStep key={step.number} step={step} />)}
          </ol>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">What You Get</span>
            <h2 className="mcpSectionTitle">Four artifacts your team owns from day one.</h2>
          </div>
          <div className="paDeliverableGrid">
            {deliverables.map((d, i) => <DeliverableCard key={i} {...d} />)}
          </div>

          <div className="paBonusBox">
            <h3>Plus, included bonuses</h3>
            <ul>
              {bonuses.map((b, i) => (
                <li key={i}><strong>{b.title}.</strong> {b.body}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Tiers ── */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Engagement Tiers</span>
            <h2 className="mcpSectionTitle">Three sizes. Pick the one that matches your scope.</h2>
            <p className="mcpSectionSubtitle">
              Beta pricing is locked for the first 5 logos. After that, pricing moves to standard rates and onboarding becomes cohort-based.
            </p>
          </div>
          <div className="paTierGrid">
            {tiers.map((tier) => (
              <TierCard key={tier.name} tier={tier} onCta={() => setProposalOpen(true)} />
            ))}
          </div>

          <div className="paExclusionsBox">
            <h4>What's not included in any tier</h4>
            <ul>
              <li>LLM usage fees (OpenAI / Anthropic / on-prem model costs)</li>
              <li>Cloud infrastructure and hosting (Cloudflare, AWS, Azure, GCP)</li>
              <li>SAML / Enterprise SSO integration — separate, IdP-specific SOW</li>
              <li>Formal security certification or regulatory compliance attestation (risk-reduction, not certification)</li>
              <li>Third-party licenses or subscriptions you already own</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Guarantee ── */}
      <section className="mcpSection">
        <div className="container">
          <div className="paGuaranteeBox">
            <div className="paGuaranteeIcon" aria-hidden><ShieldCheck size={48} /></div>
            <div className="paGuaranteeContent">
              <span className="mcpSectionBadge">Our Guarantee</span>
              <h2>The Ship-the-Foundation Guarantee</h2>
              <p>
                If you complete the onboarding inputs on time (system access, documentation, SME availability), we guarantee delivery of the agreed artifacts by the end of the sprint: the working pilot workflow, the agreed MCP Servers, the governance controls, and the audit/ops handoff pack.
              </p>
              <p>
                If we miss the agreed deliverables, <strong>you choose</strong> between a <strong>free extension week</strong> or a <strong>partial refund</strong> of fees attributable to the missed deliverables — capped at fees paid for the affected deliverables, per the MSA Addendum §11.
              </p>
              <p className="paGuaranteeFine">
                <em>
                  What we don't guarantee: business outcomes, regulatory compliance, security certification, or that the system is "secure by default."
                  The pilot reduces risk through controls, auditability, and least-privilege design — but compliance determinations remain your responsibility.
                </em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fit / Not Fit ── */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Honest Self-Qualification</span>
            <h2 className="mcpSectionTitle">Is this the right fit for you?</h2>
            <p className="mcpSectionSubtitle">
              The wrong answer is "yes, sign anyway." Read both columns before booking the call.
            </p>
          </div>
          <div className="paFitGrid">
            <div className="paFitCol paFitCol--yes">
              <h3><CheckCircle size={20} aria-hidden /> A good fit if…</h3>
              <ul>
                {fitFor.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
            <div className="paFitCol paFitCol--no">
              <h3><AlertTriangle size={20} aria-hidden /> Not a fit if…</h3>
              <ul>
                {notFitFor.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">How This Compares</span>
            <h2 className="mcpSectionTitle">The realistic math, 2026.</h2>
            <p className="mcpSectionSubtitle">
              If your team spends even two senior engineers × 8 weeks on fragile integration plumbing, you've already spent more than the Standard Pilot — before auditability, security review, or ongoing break-fix.
            </p>
          </div>
          <CompareTable />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mcpSection mcpSection--alt mcpPricingFaq" id="faq">
        <div className="container">
          <div className="mcpSectionHeader">
            <h2 className="mcpSectionTitle">Frequently Asked Questions</h2>
            <p className="mcpSectionSubtitle">
              Engagement mechanics, scope changes, and the questions security and procurement always ask.
            </p>
          </div>
          <FaqList />
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mcpSection mcpSection--cta">
        <div className="container">
          <div className="mcpCtaBox">
            <h2>Ready to put one workflow into production?</h2>
            <p>
              The conversation takes 20 minutes. Either we agree it's a fit and you have a clear path to a signed SOW within a week — or it isn't, and you walk away with an honest answer and a free pointer to the open-source HAPI MCP repo.
            </p>
            <div className="mcpHeroCtas" style={{ justifyContent: 'center' }}>
              <Link className="button button--primary button--lg" href="https://go.mcp.com.ai/adrian-meet">
                Book a 20-min Scope Call →
              </Link>
              <button className="button button--lg mcpBtnSecondary" onClick={() => setProposalOpen(true)}>
                Download the Proposal
              </button>
              <Link className="button button--lg mcpBtnOutline" href="https://hapi.mcp.com.ai?utm_source=pilot-accelerator&utm_medium=website&utm_campaign=final-cta">
                Or self-serve with HAPI MCP (free)
              </Link>
            </div>
            <p className="paFinalNote">
              <ShieldCheck size={14} aria-hidden /> Ship-the-Foundation Guarantee · Beta pricing locked for the first 5 logos · 3 active pilots per month.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
