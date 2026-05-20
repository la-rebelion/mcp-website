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
import { CheckCircle } from 'lucide-react';
import '@site/src/css/pricing.css';

// ─── Types & data ─────────────────────────────────────────────────────────────

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
  oss?: boolean;
  services?: boolean;
  icon: string;
  badge?: string;
}

interface PricingFaq {
  question: string;
  answer: ReactNode;
  schemaAnswer: string;
}

const tiers: PricingTier[] = [
  {
    name: "Free Community",
    tagline: "Join the community. Read the source. Self-host within limits.",
    price: "$0",
    period: "forever",
    description: "Free community membership unlocks source access under LRL-CL. Self-host the runtime on your own infrastructure within the community thresholds.",
    icon: "💚",
    oss: true,
    badge: "Community Tier",
    features: [
      "LRL-CL source access (private repo, members-only)",
      "Self-host free under the community thresholds*",
      "OpenAPI → MCP conversion (self-hosted)",
      "Community forum support",
    ],
    cta: "Join the Community",
    // ctaLink: "https://run.mcp.com.ai/signup",
    ctaLink: "https://rebelion.la/subscribe?utm_source=mcp_website&utm_medium=pricing&utm_campaign=free-community",
  },
  {
    name: "Starter",
    tagline: "Try the managed service. Ship your first MCP in minutes.",
    price: "$9",
    period: "per month",
    description: "Managed cloud essentials for early adopters validating the workflow. Stand up a few MCP servers without touching infrastructure.",
    icon: "🚀",
    badge: "Early Adopter",
    features: [
      "Everything in Free Community, plus:",
      "Auto-generated connectors",
      "Deploy to Cloudflare Workers (managed)",
      "Up to 3 managed MCP servers (cloud)",
      "Email support",
      "1-click deployment",
    ],
    cta: "Start for $9/mo",
    // ctaLink: "https://run.mcp.com.ai/signup?plan=starter",
    ctaLink: "https://run.mcp.com.ai?utm_source=website&utm_medium=pricing&utm_campaign=starter",
  },
  {
    name: "Pro",
    tagline: "For teams shipping at scale",
    price: "$199",
    period: "per month",
    description: "Unlimited managed MCP servers with soft limits. Auth, observability, and priority support — all under one subscription.",
    icon: "⚡",
    popular: true,
    badge: "Most Popular",
    features: [
      "Everything in Starter, plus:",
      "Unlimited MCP servers (soft limits)",
      "OIDC + OAuth (Auth0, Keycloak)",
      "Built-in observability dashboard",
      "Real-time API synchronization",
      "Deploy anywhere (K8s, VPS, Cloudflare)",
      "Priority email support",
      "99.9% uptime SLA",
    ],
    cta: "Start Free Trial",
    ctaLink: "https://run.mcp.com.ai?utm_source=website&utm_medium=pricing&utm_campaign=pro",
  },
  {
    name: "Enterprise",
    tagline: "For organizations at scale",
    price: "From $12,000",
    period: "per year",
    description: "Commercial license, air-gap deployments, multi-tenant gateways, advanced RBAC, and white-glove support.",
    icon: "🏢",
    features: [
      "Everything in Pro, plus:",
      "Commercial license — usage above LRL-CL thresholds",
      "On-premise & air-gap deployment",
      "Multi-tenant MCP gateway",
      "Enterprise SSO (SAML, OIDC) — add-on",
      "Advanced RBAC & policy enforcement",
      "Audit logs & compliance tooling",
      "Helm charts & Terraform modules",
      "Dedicated CSM & Slack channel",
      "Custom SLAs & 24/7 support",
    ],
    cta: "Contact Sales",
    ctaLink: "mailto:sales@mcp.com.ai?subject=Enterprise%20Inquiry",
  },
];

const servicesTier: PricingTier = {
  name: "Services",
  tagline: "Architect-led setup. Production-ready in weeks.",
  price: "From $4,500",
  period: "one-time engagement",
  description: "Need someone to design the workflow, build the MCP servers, set up governance, and hand it to your team? The HAPI MCP Pilot Accelerator is the done-for-you path.",
  icon: "🛠️",
  services: true,
  badge: "Architect-Led Services",
  features: [
    "Pilot Blueprint — workflow + ROI scoring",
    "MCP Bridge Factory (1–10 MCP servers depending on tier)",
    "Governance gate (OAuth/OIDC + least-privilege)",
    "Audit & Ops Pack with runbooks",
    "3 tiers: Thin-Slice / Standard / Enterprise",
    "Ship-the-Foundation Guarantee",
    "3×30×3 post-implementation support",
    "14 days – 12 weeks delivery",
  ],
  cta: "See the Pilot Accelerator →",
  ctaLink: "/pilot-accelerator",
};

const addons = [
  {
    id: "lifetime",
    name: "Lifetime Access",
    price: "$1,499",
    description: "One-time payment for unlimited Pro features. No monthly fees — ever. Less than 8 months of Pro, then it pays for itself.",
    icon: "♾️",
    features: [
      "All Pro features",
      "Lifetime updates",
      "No monthly fees",
      "Limited to first 25 customers",
    ],
  },
  {
    id: "oem",
    name: "OEM / White-Label",
    price: "Revenue Share",
    description: "Embed HAPI MCP into your platform and ship it as your own product.",
    icon: "🤝",
    features: [
      "Rebrand as your own product",
      "Custom domain & SSL",
      "Full API & webhook access",
      "Co-marketing opportunities",
      "Dedicated partner onboarding",
    ],
  },
];

const pricingFaqs: PricingFaq[] = [
  {
    question: "Is HAPI MCP open source?",
    answer: (
      <>
        HAPI MCP is <strong>source-available</strong>, not OSI-open-source. The source is licensed under the <Link href="https://rebelion.la/community-license-LRL-CL">La Rebelion Labs Community License (LRL-CL)</Link>. Free community members can read, modify, and self-host the code under the LRL-CL thresholds. Above those thresholds, a commercial license applies. We chose this model deliberately — it keeps the project accessible to individuals and small teams while protecting it from extractive use.
      </>
    ),
    schemaAnswer: "HAPI MCP is source-available, not OSI-open-source. The source is licensed under the La Rebelion Labs Community License (LRL-CL). Free community members can read, modify, and self-host the code under the LRL-CL thresholds. Above those thresholds, a commercial license applies.",
  },
  {
    question: "How do I access the HAPI MCP source code?",
    answer: (
      <>
        Source access is gated by a free La Rebelion community membership. Sign up, get added to the private repository, and you can clone, read, and modify the source under the LRL-CL. We keep the repo private to validate the community model and prevent extractive use — not to hide what we're building.
      </>
    ),
    schemaAnswer: "Source access is gated by a free La Rebelion community membership. Sign up, get added to the private repository, and you can clone, read, and modify the source under the LRL-CL.",
  },
  {
    question: "What are the LRL-CL thresholds for free use?",
    answer: (
      <>
        Free use is allowed if <em>all</em> of the following are true for your organization: fewer than 25 employees, fewer than 10 active agents or orchestrated workloads, fewer than 100,000 monthly requests/executions/workflows, and under $1M USD in annual revenue. Above any of those, or if you offer HAPI MCP as part of a hosted/managed service of your own, a commercial license applies. See the <Link href="https://rebelion.la/community-license-LRL-CL">full license text</Link>.
      </>
    ),
    schemaAnswer: "Free use is allowed if your organization has fewer than 25 employees, fewer than 10 active agents, fewer than 100,000 monthly requests, and under $1M USD annual revenue. Above any of those, or if offered as a hosted service, a commercial license applies.",
  },
  {
    question: "What's the difference between Pro and Services?",
    answer: (
      <>
        <strong>Pro</strong> gives you the runtime: unlimited managed MCP servers, OIDC/OAuth, observability, and an SLA. It fits teams that can design the workflow and configure governance themselves. <strong>Services</strong> is the HAPI MCP Pilot Accelerator: an architect-led engagement where we design the workflow, build the MCP servers, install the governance gate, and hand over runbooks so your team can operate it long-term.
      </>
    ),
    schemaAnswer: "Pro gives you the runtime: unlimited managed MCP servers, OIDC/OAuth, observability, and an SLA. Services is the HAPI MCP Pilot Accelerator, an architect-led engagement where we design the workflow, build the MCP servers, install the governance gate, and hand over runbooks so your team can operate it long-term.",
  },
  {
    question: "What are 'soft limits' on the Pro plan?",
    answer: "Soft limits mean we won't hard-cut your service if you briefly exceed thresholds. We'll reach out and discuss usage before anything changes.",
    schemaAnswer: "Soft limits mean we won't hard-cut your service if you briefly exceed thresholds. We'll reach out and discuss usage before anything changes.",
  },
  {
    question: "Why isn't SAML SSO in Pro?",
    answer: "SAML and enterprise SSO are IdP-specific and usually require coordination with security teams. It's available as an Enterprise add-on or through a scoped Services engagement, rather than being presented as a checkbox feature in Pro.",
    schemaAnswer: "SAML and enterprise SSO are IdP-specific and usually require coordination with security teams. It's available as an Enterprise add-on or through a scoped Services engagement, rather than being presented as a checkbox feature in Pro.",
  },
  {
    question: "Do I need to rewrite my services to use HAPI MCP?",
    answer: "No. HAPI MCP lifts your existing OpenAPI specs directly into MCP tools. Your auth, validation, and business rules remain unchanged.",
    schemaAnswer: "No. HAPI MCP lifts your existing OpenAPI specs directly into MCP tools. Your auth, validation, and business rules remain unchanged.",
  },
  {
    question: "How quickly can I deploy an MCP server?",
    answer: "With managed cloud, your first MCP server is live in under 60 seconds. For more complex production-grade workflows, Services delivers a thin-slice implementation in as little as 14 days.",
    schemaAnswer: "With managed cloud, your first MCP server is live in under 60 seconds. For more complex production-grade workflows, Services delivers a thin-slice implementation in as little as 14 days.",
  },
  {
    question: "Can I self-host without a managed cloud subscription?",
    answer: (
      <>
        Yes. Self-hosting is allowed under the LRL-CL within the community thresholds (under 25 employees, $1M revenue, 100K req/mo, 10 agents). You'll need a free community membership to access the source. Above the thresholds, a commercial license applies. Self-hosting is independent of any managed cloud subscription.
      </>
    ),
    schemaAnswer: "Yes. Self-hosting is allowed under the LRL-CL within the community thresholds. A free community membership is required to access the source. Above the thresholds, a commercial license applies.",
  },
  {
    question: "Which AI clients can consume the tools?",
    answer: "Any MCP client: ChatGPT, Claude, QBot, Agentico.dev, chatMCP, or your own custom orchestrators. HAPI MCP is vendor-neutral by design.",
    schemaAnswer: "Any MCP client: ChatGPT, Claude, QBot, Agentico.dev, chatMCP, or your own custom orchestrators. HAPI MCP is vendor-neutral by design.",
  },
  {
    question: "What happens if my API changes?",
    answer: "Update your OpenAPI spec and HAPI automatically regenerates your MCP tools. Real-time sync is available on Pro and above.",
    schemaAnswer: "Update your OpenAPI spec and HAPI automatically regenerates your MCP tools. Real-time sync is available on Pro and above.",
  },
  {
    question: "What's the difference between Enterprise and Services?",
    answer: "Enterprise is a product subscription for teams operating the platform themselves. Services is an engagement where we design and build the initial implementation for you. Many enterprise customers use Services to get to production faster, then run on Enterprise long-term.",
    schemaAnswer: "Enterprise is a product subscription for teams operating the platform themselves. Services is an engagement where we design and build the initial implementation for you. Many enterprise customers use Services to get to production faster, then run on Enterprise long-term.",
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pricingFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.schemaAnswer,
    },
  })),
};

// ─── Shared modal helpers ─────────────────────────────────────────────────────
// @note: All forms are structured as static HTML for HubSpot compliance
// We use inline preventDefault to avoid navigation while allowing HubSpot to track
// See: https://knowledge.hubspot.com/forms/use-non-hubspot-forms

function ModalThanks({ message }: { message: string }) {
  return (
    <div className="mcpExitThanks">
      <CheckCircle style={{ width: 40, height: 40, color: 'var(--brand-primary)', margin: '0 auto 0.75rem', display: 'block' }} />
      <h3>Request received!</h3>
      <p>{message}</p>
    </div>
  );
}

function useModalForm(onClose: () => void) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) { onClose(); setSubmitted(false); setErrors({}); }
  };
  return { submitted, setSubmitted, errors, setErrors, handleOpenChange };
}

function validateBase(d: FormData): Record<string, string> {
  const next: Record<string, string> = {};
  const email = String(d.get('email') || '').trim();
  if (!email) next.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email.';
  if (!String(d.get('firstname') || '').trim()) next.firstname = 'Name is required.';
  return next;
}

// ─── Contact Sales Modal ──────────────────────────────────────────────────────

function ContactSalesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { submitted, setSubmitted, errors, setErrors, handleOpenChange } = useModalForm(onClose);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateBase(new FormData(e.currentTarget));
    if (Object.keys(found).length > 0) { setErrors(found); return false; }
    setErrors({});
    setSubmitted(true);
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={clsx('mcpExit', 'mcpOemModal')}>
        <DialogHeader>
          <DialogTitle className="mcpExitTitle">Contact Sales — Enterprise</DialogTitle>
          <DialogDescription className="mcpExitLead">
            Enterprise starts at $12,000/year. Tell us about your organization and we'll reach out within 1 business day.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <ModalThanks message="Our team will reach out within 1 business day with a tailored Enterprise or Enterprise + Services proposal." />
        ) : (
          <form method="POST" action="#" onSubmit={handleSubmit} noValidate className="mcpExitForm">
            <div className="mcpOemGrid" style={{ marginBottom: '0.6rem' }}>
              <div>
                <label htmlFor="cs-firstname" className="mcpLabel">Your Name *</label>
                <input id="cs-firstname" name="firstname" type="text" placeholder="Full name"
                  className={`mcpExitInput${errors.firstname ? ' is-invalid' : ''}`} />
                {errors.firstname && <div className="mcpFieldError">{errors.firstname}</div>}
              </div>
              <div>
                <label htmlFor="cs-email" className="mcpLabel">Work Email *</label>
                <input id="cs-email" name="email" type="email" placeholder="you@company.com"
                  className={`mcpExitInput${errors.email ? ' is-invalid' : ''}`} />
                {errors.email && <div className="mcpFieldError">{errors.email}</div>}
              </div>
            </div>

            <div className="mcpOemGrid" style={{ marginBottom: '0.6rem' }}>
              <div>
                <label htmlFor="cs-company" className="mcpLabel">Company</label>
                <input id="cs-company" name="company" type="text" placeholder="Your company" className="mcpExitInput" />
              </div>
              <div>
                <label htmlFor="cs-jobtitle" className="mcpLabel">Role / Title</label>
                <input id="cs-jobtitle" name="jobtitle" type="text" placeholder="e.g., CTO, VP Engineering" className="mcpExitInput" />
              </div>
            </div>

            <div className="mcpOemGrid" style={{ marginBottom: '0.6rem' }}>
              <div>
                <label htmlFor="cs-teamsize" className="mcpLabel">Engineering team size</label>
                <select id="cs-teamsize" name="numemployees" className="mcpExitInput" defaultValue="" style={{ cursor: 'pointer' }}>
                  <option value="" disabled>Select…</option>
                  <option value="1-10">1 – 10</option>
                  <option value="11-50">11 – 50</option>
                  <option value="51-200">51 – 200</option>
                  <option value="201+">201+</option>
                </select>
              </div>
              <div>
                <label htmlFor="cs-deployment" className="mcpLabel">Deployment preference</label>
                <select id="cs-deployment" name="deployment" className="mcpExitInput" defaultValue="" style={{ cursor: 'pointer' }}>
                  <option value="" disabled>Select…</option>
                  <option value="cloud">Cloud (managed)</option>
                  <option value="onprem">On-premises / air-gap</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
            </div>

            <label htmlFor="cs-usecase" className="mcpLabel">Use case &amp; requirements</label>
            <textarea id="cs-usecase" name="message"
              placeholder="Describe your use case, number of APIs, compliance requirements, or anything else we should know…"
              className="mcpExitInput"
              style={{ minHeight: 80, resize: 'vertical', marginBottom: '0.75rem' }} />

            <div className="mcpExitActions">
              <button type="button" className="mcpExitBtnGhost" onClick={onClose}>Cancel</button>
              <input type="submit" value="Contact Sales" className="mcpExitBtnPrimary" />
            </div>
          </form>
        )}

        <p className="mcpExitFooter">No spam. We use this only to prepare for your conversation.</p>
      </DialogContent>
    </Dialog>
  );
}

// ─── Lifetime Access Modal ────────────────────────────────────────────────────

function LifetimeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { submitted, setSubmitted, errors, setErrors, handleOpenChange } = useModalForm(onClose);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateBase(new FormData(e.currentTarget));
    if (Object.keys(found).length > 0) { setErrors(found); return false; }
    setErrors({});
    setSubmitted(true);
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={clsx('mcpExit', 'mcpOemModal')}>
        <DialogHeader>
          <DialogTitle className="mcpExitTitle">Get Lifetime Access</DialogTitle>
          <DialogDescription className="mcpExitLead">
            One-time payment. All Pro features. Forever. Limited to 25 seats.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <ModalThanks message="We'll send payment instructions and onboarding details to your inbox within 24 hours." />
        ) : (
          <form method="POST" action="#" onSubmit={handleSubmit} noValidate className="mcpExitForm">
            <div className="mcpOemGrid" style={{ marginBottom: '0.6rem' }}>
              <div>
                <label htmlFor="lt-firstname" className="mcpLabel">Your Name *</label>
                <input id="lt-firstname" name="firstname" type="text" placeholder="Full name"
                  className={`mcpExitInput${errors.firstname ? ' is-invalid' : ''}`} />
                {errors.firstname && <div className="mcpFieldError">{errors.firstname}</div>}
              </div>
              <div>
                <label htmlFor="lt-email" className="mcpLabel">Email *</label>
                <input id="lt-email" name="email" type="email" placeholder="you@company.com"
                  className={`mcpExitInput${errors.email ? ' is-invalid' : ''}`} />
                {errors.email && <div className="mcpFieldError">{errors.email}</div>}
              </div>
            </div>

            <label htmlFor="lt-usecase" className="mcpLabel">
              How do you plan to use HAPI MCP?
              <span style={{ fontWeight: 400, color: 'var(--ifm-color-emphasis-600)', marginLeft: '0.4rem', fontSize: '0.8rem' }}>optional</span>
            </label>
            <textarea id="lt-usecase" name="message"
              placeholder={'e.g. "We have 5 internal APIs and want to expose them as MCP tools to our team\'s Claude setup."'}
              className="mcpExitInput"
              style={{ minHeight: 72, resize: 'vertical', marginBottom: '0.75rem' }} />

            <div className="mcpExitActions">
              <button type="button" className="mcpExitBtnGhost" onClick={onClose}>Cancel</button>
              <input type="submit" value="Reserve My Seat →" className="mcpExitBtnPrimary" />
            </div>
          </form>
        )}

        <p className="mcpExitFooter">$1,499 one-time. We'll send an invoice to your email. No spam.</p>
      </DialogContent>
    </Dialog>
  );
}

// ─── OEM Modal ────────────────────────────────────────────────────────────────

function OemModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement): Record<string, string> => {
    const d = new FormData(form);
    const next: Record<string, string> = {};
    const email = String(d.get('email') || '').trim();
    if (!email) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email.';
    if (!String(d.get('firstname') || '').trim()) next.firstname = 'Name is required.';
    if (!String(d.get('company') || '').trim()) next.company = 'Company is required.';
    return next;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(e.currentTarget);
    if (Object.keys(found).length > 0) { setErrors(found); return false; }
    setErrors({});
    setSubmitted(true);
    return false;
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) { onClose(); setSubmitted(false); setErrors({}); }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={clsx('mcpExit', 'mcpOemModal')}>
        <DialogHeader>
          <DialogTitle className="mcpExitTitle">Apply for OEM / White-Label</DialogTitle>
          <DialogDescription className="mcpExitLead">
            Tell us about your platform — we'll follow up within 2 business days.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="mcpExitThanks">
            <CheckCircle style={{ width: 40, height: 40, color: 'var(--brand-primary)', margin: '0 auto 0.75rem', display: 'block' }} />
            <h3>Application received!</h3>
            <p>Our partnerships team will reach out within 2 business days.</p>
          </div>
        ) : (
          <form method="POST" action="#" onSubmit={handleSubmit} noValidate className="mcpExitForm">
            <div className="mcpOemGrid" style={{ marginBottom: '0.6rem' }}>
              <div>
                <label htmlFor="oem-firstname" className="mcpLabel">Your Name *</label>
                <input
                  id="oem-firstname"
                  name="firstname"
                  type="text"
                  placeholder="Full name"
                  className={`mcpExitInput${errors.firstname ? ' is-invalid' : ''}`}
                />
                {errors.firstname && <div className="mcpFieldError">{errors.firstname}</div>}
              </div>
              <div>
                <label htmlFor="oem-email" className="mcpLabel">Work Email *</label>
                <input
                  id="oem-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className={`mcpExitInput${errors.email ? ' is-invalid' : ''}`}
                />
                {errors.email && <div className="mcpFieldError">{errors.email}</div>}
              </div>
            </div>

            <div className="mcpOemGrid" style={{ marginBottom: '0.6rem' }}>
              <div>
                <label htmlFor="oem-company" className="mcpLabel">Company *</label>
                <input
                  id="oem-company"
                  name="company"
                  type="text"
                  placeholder="Your company"
                  className={`mcpExitInput${errors.company ? ' is-invalid' : ''}`}
                />
                {errors.company && <div className="mcpFieldError">{errors.company}</div>}
              </div>
              <div>
                <label htmlFor="oem-product" className="mcpLabel">Product / Platform</label>
                <input
                  id="oem-product"
                  name="product"
                  type="text"
                  placeholder="What are you building?"
                  className="mcpExitInput"
                />
              </div>
            </div>

            <label htmlFor="oem-users" className="mcpLabel">Estimated monthly active users</label>
            <select id="oem-users" name="mau" className="mcpExitInput" defaultValue="" style={{ cursor: 'pointer', marginBottom: '0.6rem' }}>
              <option value="" disabled>Select range…</option>
              <option value="lt1k">Under 1,000</option>
              <option value="1k-10k">1,000 - 10,000</option>
              <option value="10k-100k">10,000 - 100,000</option>
              <option value="100k+">100,000+</option>
            </select>

            <label htmlFor="oem-usecase" className="mcpLabel">How do you plan to integrate HAPI MCP?</label>
            <textarea
              id="oem-usecase"
              name="message"
              placeholder="Describe your integration plan, target users, and any specific requirements…"
              className="mcpExitInput"
              style={{ minHeight: 80, resize: 'vertical', marginBottom: '0.75rem' }}
            />

            <div className="mcpExitActions">
              <button type="button" className="mcpExitBtnGhost" onClick={onClose}>Cancel</button>
              <input type="submit" value="Submit Application" className="mcpExitBtnPrimary" />
            </div>
          </form>
        )}

        <p className="mcpExitFooter">We respect your privacy. No spam, ever.</p>
      </DialogContent>
    </Dialog>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────

function PricingCard({ tier, onCta }: { tier: PricingTier; onCta?: () => void }) {
  return (
    <div className={clsx(
      'mcpPricingCard',
      tier.popular && 'mcpPricingCard--popular',
      tier.oss && 'mcpPricingCard--oss',
      tier.services && 'mcpPricingCard--services',
    )}>
      {tier.badge && (
        <div className={clsx(
          'mcpPricingBadge',
          tier.popular && 'mcpPricingBadge--popular',
          tier.oss && 'mcpPricingBadge--oss',
          tier.services && 'mcpPricingBadge--services',
        )}>
          {tier.badge}
        </div>
      )}

      <div className="mcpPricingHeader">
        <span className="mcpPricingIcon" aria-hidden>{tier.icon}</span>
        <h3 className="mcpPricingName">{tier.name}</h3>
        <p className="mcpPricingTagline">{tier.tagline}</p>
      </div>

      <div className="mcpPricingPrice">
        <span className="mcpPricingAmount">{tier.price}</span>
        {tier.period && <span className="mcpPricingPeriod">/ {tier.period}</span>}
      </div>

      <p className="mcpPricingDescription">{tier.description}</p>

      <ul className="mcpPricingFeatures">
        {tier.features.map((feature, idx) => (
          <li key={idx}>
            <span className="mcpCheckmark" aria-hidden>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {onCta ? (
        <button
          className={clsx(
            'button', 'button--lg',
            tier.popular || tier.services ? 'button--primary' : 'mcpBtnSecondary',
          )}
          onClick={onCta}
        >
          {tier.cta}
        </button>
      ) : (
        <Link
          className={clsx(
            'button', 'button--lg',
            tier.popular || tier.services ? 'button--primary' : tier.oss ? 'mcpBtnOutline' : 'mcpBtnSecondary',
          )}
          href={tier.ctaLink}
        >
          {tier.cta}
        </Link>
      )}
    </div>
  );
}

function AddonCard({
  addon,
  onApply,
  onLifetime,
}: {
  addon: typeof addons[0];
  onApply?: () => void;
  onLifetime?: () => void;
}) {
  return (
    <div className={clsx('mcpAddonCard', addon.id === 'oem' && 'mcpAddonCard--oem')}>
      <span className="mcpAddonIcon" aria-hidden>{addon.icon}</span>
      <h4 className="mcpAddonName">{addon.name}</h4>
      <div className="mcpAddonPrice">{addon.price}</div>
      <p className="mcpAddonDescription">{addon.description}</p>
      <ul className="mcpAddonFeatures">
        {addon.features.map((f, idx) => <li key={idx}>{f}</li>)}
      </ul>
      {addon.id === 'oem' ? (
        <button
          className="button button--lg mcpBtnSecondary mcpAddonApplyBtn"
          onClick={onApply}
        >
          Apply Now →
        </button>
      ) : (
        <button
          className="button button--lg mcpBtnOutline mcpAddonApplyBtn"
          onClick={onLifetime}
        >
          Get Lifetime Access
        </button>
      )}
    </div>
  );
}

function ComparisonTable() {
  const C = () => <span className="mcpComparisonCheckmark">✓</span>;
  const D = () => <span className="mcpComparisonDash">—</span>;

  return (
    <div className="mcpComparisonTable">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Free Community</th>
            <th>Starter</th>
            <th>Pro</th>
            <th>Enterprise</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LRL-CL source access</td>
            <td>Members-only repo</td>
            <td>Members-only repo</td>
            <td>Members-only repo</td>
            <td>Members-only repo + commercial license</td>
            <td>Used in delivery</td>
          </tr>
          <tr>
            <td>Self-host under LRL-CL thresholds*</td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
            <td>By scope</td>
          </tr>
          <tr>
            <td>Managed MCP servers</td>
            <td><D /></td>
            <td>Up to 3</td>
            <td>Unlimited**</td>
            <td>Unlimited</td>
            <td>1–10 (architect-built)</td>
          </tr>
          <tr>
            <td>OpenAPI → MCP Conversion</td>
            <td>Self-hosted</td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>Auto-generated connectors</td>
            <td><D /></td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>Deploy to Cloudflare Workers (managed)</td>
            <td><D /></td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>OIDC / OAuth</td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
            <td><C /></td>
            <td>Configured for you</td>
          </tr>
          <tr>
            <td>Observability dashboard</td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
            <td><C /></td>
            <td>Custom dashboards</td>
          </tr>
          <tr>
            <td>Real-time API sync</td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>Multi-tenant gateway</td>
            <td><D /></td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
            <td>By scope</td>
          </tr>
          <tr>
            <td>On-premise / air-gap</td>
            <td><D /></td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
            <td>By scope</td>
          </tr>
          <tr>
            <td>Enterprise SSO (SAML)</td>
            <td><D /></td>
            <td><D /></td>
            <td><D /></td>
            <td>Add-on</td>
            <td>Separate SOW</td>
          </tr>
          <tr>
            <td>Commercial use above thresholds*</td>
            <td><D /></td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
            <td>Included in engagement</td>
          </tr>
          <tr>
            <td>Governance + audit trail</td>
            <td>Basic</td>
            <td>Basic</td>
            <td>Basic+</td>
            <td>Full</td>
            <td>Full + runbooks</td>
          </tr>
          <tr>
            <td>Done-for-you implementation</td>
            <td><D /></td>
            <td><D /></td>
            <td><D /></td>
            <td><D /></td>
            <td>14 days – 12 weeks</td>
          </tr>
          <tr>
            <td>Support</td>
            <td>Community forum</td>
            <td>Email</td>
            <td>Priority email</td>
            <td>Dedicated CSM</td>
            <td>1-on-1 with MCP architects</td>
          </tr>
          <tr>
            <td>SLA</td>
            <td><D /></td>
            <td><D /></td>
            <td>99.9%</td>
            <td>Custom</td>
            <td>Ship-the-Foundation Guarantee</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RiskReversals() {
  const guarantees = [
    { icon: "🛡️", title: "No Deploy, No Charge", description: "If we can't get your MCP server running, you don't pay." },
    { icon: "⚡", title: "10-Minute Visibility Guarantee", description: "First MCP server not visible in 10 minutes? Full refund." },
    { icon: "🔄", title: "Lifetime Updates", description: "MCP manifest auto-updates as your API evolves." },
    { icon: "💬", title: "Unlimited Support", description: "Until your first integration works flawlessly." },
  ];
  return (
    <div className="mcpRiskReversals">
      {guarantees.map((g, idx) => (
        <div key={idx} className="mcpGuarantee">
          <span className="mcpGuaranteeIcon" aria-hidden>{g.icon}</span>
          <h4>{g.title}</h4>
          <p>{g.description}</p>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  return (
    <section className="mcpSection mcpPricingFaq">
      <div className="container">
        <div className="mcpSectionHeader">
          <h2 className="mcpSectionTitle">Frequently Asked Questions</h2>
        </div>
        <div className="mcpFaq">
          {pricingFaqs.map((faq, idx) => (
            <details key={idx}>
              <summary><strong>{faq.question}</strong></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Pricing(): ReactNode {
  const [oemModalOpen, setOemModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [lifetimeModalOpen, setLifetimeModalOpen] = useState(false);

  return (
    <Layout
      title="Pricing — Source-Available Community License"
      description="HAPI MCP is source-available under the LRL-CL. Free for individuals and small teams within the community thresholds. Pay for managed cloud, enterprise capabilities, or architect-led implementation when scale calls for it.">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(pricingJsonLd)}
        </script>
      </Head>

      <OemModal open={oemModalOpen} onClose={() => setOemModalOpen(false)} />
      <ContactSalesModal open={salesModalOpen} onClose={() => setSalesModalOpen(false)} />
      <LifetimeModal open={lifetimeModalOpen} onClose={() => setLifetimeModalOpen(false)} />

      {/* ── Hero ── */}
      <section className="mcpHero">
        <div className="container">
          <div className="mcpPricingHeroContent">
            <span className="mcpSectionBadge">Pricing</span>
            <h1 className="mcpHeroTitle">
              Simple Pricing.<br />
              <strong>Free for the Community.</strong>
            </h1>
            <p className="mcpHeroSubtitle">
              HAPI MCP is <strong>source-available under the LRL-CL</strong> — free for individuals and small teams to read,
              modify, and self-host within the community thresholds. Pay for managed cloud, enterprise capabilities,
              or architect-led implementation only when your scale calls for it.
            </p>
            <div className="mcpOssStrip">
              <span>🤝</span>
              <span>Source-Available under</span>
              <Link href="https://rebelion.la/community-license-LRL-CL">LRL-CL</Link>
              <span>·</span>
              <span>Join the community to access the source</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community pillars ── */}
      <section className="mcpSection mcpSection--alt" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="mcpOssPillars">
            <div className="mcpOssPillar">
              <span className="mcpOssPillarIcon" aria-hidden>🔓</span>
              <div>
                <h4>Read the Source</h4>
                <p>Free community membership unlocks the private repository — read, learn, and modify the code under the LRL-CL.</p>
              </div>
            </div>
            <div className="mcpOssPillar">
              <span className="mcpOssPillarIcon" aria-hidden>🏠</span>
              <div>
                <h4>Self-Host Under LRL-CL</h4>
                <p>Run unlimited MCP servers on your own infrastructure, free under the community thresholds — no lock-in.</p>
              </div>
            </div>
            <div className="mcpOssPillar">
              <span className="mcpOssPillarIcon" aria-hidden>🤝</span>
              <div>
                <h4>Join the Community</h4>
                <p>Help shape the roadmap, file issues, discuss patterns, and connect with engineers solving the same problems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing cards ── */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Self-Serve Plans</span>
            <h2 className="mcpSectionTitle">Start Free, Then Scale on Demand</h2>
            <p className="mcpSectionSubtitle">
              Join the community for free source access. Upgrade to managed runtime and enterprise controls only when the workload justifies it.
            </p>
          </div>
          <div className="mcpPricingGrid">
            {tiers.map((tier) => (
              <PricingCard
                key={tier.name}
                tier={tier}
                onCta={tier.name === 'Enterprise' ? () => setSalesModalOpen(true) : undefined}
              />
            ))}
          </div>
          <br/>
          <p className="mcpSoftLimitsNote">
            * LRL-CL thresholds for free use: under 25 employees, 100K monthly requests, $1M revenue, and 10 active agents.
            {' '}<Link href="https://rebelion.la/community-license-LRL-CL">Read the license ↗</Link>{' · '}
            ** Soft limits: we won't cut your service without a conversation first.{' '}
            <Link href="#faq">Learn more ↓</Link>
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Architect-Led Services</span>
            <h2 className="mcpSectionTitle">Need It Done-for-You?</h2>
            <p className="mcpSectionSubtitle">
              The HAPI MCP Pilot Accelerator takes one AI workflow from sandbox to production with an architect-led implementation.
            </p>
          </div>

          <div className="mcpServicesBanner">
            <div>
              <span className="mcpServicesBannerTag">Pilot Accelerator</span>
              <h3 className="mcpServicesBannerTitle">Production-ready in 14 days to 12 weeks.</h3>
              <p className="mcpServicesBannerDescription">
                We design the workflow, build 1–10 MCP servers, install the governance gate, and hand the runbooks to your team. Best fit for enterprise buyers who want a fast, opinionated path to a working production slice.
              </p>
            </div>
            <Link className="button button--primary button--lg" href="/pilot-accelerator">
              See the Pilot Accelerator →
            </Link>
          </div>

          <div className="mcpServicesCardWrap">
            <PricingCard tier={servicesTier} />
          </div>
        </div>
      </section>

      {/* ── Special offers ── */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Special Offers</span>
            <h2 className="mcpSectionTitle">Beyond the Standard Plans</h2>
            <p className="mcpSectionSubtitle">For early adopters and platform partners.</p>
          </div>
          <div className="mcpAddonsGrid">
            {addons.map((addon) => (
              <AddonCard
                key={addon.id}
                addon={addon}
                onApply={addon.id === 'oem' ? () => setOemModalOpen(true) : undefined}
                onLifetime={addon.id === 'lifetime' ? () => setLifetimeModalOpen(true) : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantees ── */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpSectionHeader">
            <h2 className="mcpSectionTitle">Our Guarantees</h2>
            <p className="mcpSectionSubtitle">
              We're confident you'll love HAPI MCP. Here's what we stand behind.
            </p>
          </div>
          <RiskReversals />
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <h2 className="mcpSectionTitle">Feature Comparison</h2>
            <p className="mcpSectionSubtitle">
              Services is an implementation engagement. The other tiers are product plans you operate yourself.
            </p>
          </div>
          <ComparisonTable />
          <br/>
          <p className="mcpSoftLimitsNote">
            * LRL-CL thresholds for free use: under 25 employees, 100K monthly requests, $1M revenue, and 10 active agents.
            {' '}<Link href="https://rebelion.la/community-license-LRL-CL">Read the license ↗</Link>{' · '}
            ** Soft limits: we won't cut your service without a conversation first.{' '}
            <Link href="#faq">Learn more ↓</Link>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div id="faq">
        <FAQ />
      </div>

      {/* ── CTA ── */}
      <section className="mcpSection mcpSection--cta">
        <div className="container">
          <div className="mcpCtaBox">
            <h2>Ready to Make Your APIs AI-Ready?</h2>
            <p>Source-available under LRL-CL. Enterprise-grade when you need it. Architect-led when you want it done for you.</p>
            <div className="mcpHeroCtas" style={{ justifyContent: 'center' }}>
              <Link className="button button--primary button--lg" href="https://rebelion.la/subscribe?utm_source=mcp_website&utm_medium=pricing&utm_campaign=join_community">
                🤝 Join the Community
              </Link>
              <Link className="button button--lg mcpBtnSecondary" href="https://go.mcp.com.ai/adrian-meet">
                Book a Call
              </Link>
              <Link className="button button--lg mcpBtnOutline" href="/pilot-accelerator">
                See the Pilot Accelerator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
