/**
 * Pricing page for HAPI MCP Stack — Open Source edition.
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
import { CheckCircle } from 'lucide-react';
import '@site/src/css/pricing.css';

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is HAPI MCP really free and open source?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The core HAPI MCP framework is MIT-licensed and free forever. Paid plans cover managed hosting, advanced auth, observability, and enterprise features on top of the OSS core."
      }
    },
    {
      "@type": "Question",
      "name": "What are 'soft limits' on the Pro plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Soft limits mean we won't hard-cut your service if you briefly exceed thresholds. We'll reach out to discuss usage before anything changes. Designed for teams that scale gradually."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to rewrite my services to use HAPI MCP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. HAPI MCP lifts your existing OpenAPI specs directly into MCP tools. Your auth, validation, and business rules remain unchanged."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can I deploy an MCP server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With HAPI Starter, you can deploy your first MCP server in under 60 seconds. Upload your OpenAPI spec and we handle the rest."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in the Enterprise plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enterprise includes on-premise deployment, air-gap bundles, multi-tenant gateway, SSO integration, dedicated support, and custom SLAs."
      }
    },
    {
      "@type": "Question",
      "name": "Can I self-host HAPI MCP for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The OSS core can be self-hosted indefinitely at zero cost. The Free managed tier is for those who want cloud hosting without the ops overhead."
      }
    }
  ]
};

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
  icon: string;
  badge?: string;
}

const tiers: PricingTier[] = [
  {
    name: "Free Forever",
    tagline: "Open source. No strings attached.",
    price: "$0",
    period: "forever",
    description: "The full OSS core — self-host unlimited MCP servers or use our managed cloud for personal projects.",
    icon: "💚",
    oss: true,
    badge: "Open Source",
    features: [
      "MIT-licensed core — fork & self-host free",
      "Self-host unlimited MCP servers",
      "OpenAPI → MCP conversion",
      "Auto-generated connectors (WIP)",
      "Deploy to Cloudflare Workers",
      "Community support",
    ],
    cta: "Get the Source",
    ctaLink: "https://github.com/la-rebelion/hapi-mcp",
  },
  {
    name: "Starter",
    tagline: "For indie devs & small teams",
    price: "$99",
    period: "one-time",
    description: "Ship your first AI-ready API layer. Up to 10 MCP servers on managed cloud.",
    icon: "🚀",
    features: [
      "Up to 10 MCP servers (managed)",
      "Soft limits to grow at your pace",
      "1-click deployment",
      "Auto-generated ChatGPT connector",
      "Basic auth (API keys)",
      "Deploy to Cloudflare Workers",
      "OpenAPI → MCP conversion",
      "Community support",
      "30-day money-back guarantee",
    ],
    cta: "Get Started",
    ctaLink: "https://docs.mcp.com.ai/get-started",
  },
  {
    name: "Pro",
    tagline: "For teams shipping at scale",
    price: "$199",
    period: "per month",
    description: "Unlimited MCP servers with soft limits. Auth, observability, and priority support.",
    icon: "⚡",
    popular: true,
    badge: "Most Popular",
    features: [
      "Unlimited MCP servers (soft limits)",
      "Everything in Starter, plus:",
      "OIDC + OAuth (Auth0, Keycloak)",
      "Built-in observability dashboard",
      "Real-time API synchronization",
      "Deploy anywhere (K8s, VPS, Cloudflare)",
      "Priority email support",
      "99.9% uptime SLA",
    ],
    cta: "Start Free Trial",
    ctaLink: "https://run.mcp.com.ai/signup",
  },
  {
    name: "Enterprise",
    tagline: "For organizations at scale",
    price: "Custom",
    description: "Air-gap deployments, SSO, multi-tenant gateways, and white-glove support.",
    icon: "🏢",
    features: [
      "Everything in Pro, plus:",
      "On-premise & air-gap deployment",
      "Multi-tenant MCP gateway",
      "SSO (SAML, OIDC)",
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

const addons = [
  {
    id: "lifetime",
    name: "Lifetime Access",
    price: "$499",
    description: "One-time payment for unlimited Pro features. No monthly fees — ever.",
    icon: "♾️",
    features: [
      "All Pro features",
      "Lifetime updates",
      "No monthly fees",
      "Limited to first 100 customers",
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

// ─── OEM Modal ────────────────────────────────────────────────────────────────
// @note: This form is structured as static HTML for HubSpot compliance
// We use inline preventDefault in the form element to avoid navigation while allowing HubSpot to track
// See: https://knowledge.hubspot.com/forms/use-non-hubspot-forms

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

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div className={clsx(
      'mcpPricingCard',
      tier.popular && 'mcpPricingCard--popular',
      tier.oss && 'mcpPricingCard--oss',
    )}>
      {tier.badge && (
        <div className={clsx(
          'mcpPricingBadge',
          tier.popular ? 'mcpPricingBadge--popular' : 'mcpPricingBadge--oss',
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

      <Link
        className={clsx(
          'button', 'button--lg',
          tier.popular ? 'button--primary' : tier.oss ? 'mcpBtnOutline' : 'mcpBtnSecondary',
        )}
        href={tier.ctaLink}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

function AddonCard({
  addon,
  onApply,
}: {
  addon: typeof addons[0];
  onApply?: () => void;
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
      {addon.id === 'oem' && onApply ? (
        <button
          className="button button--lg mcpBtnSecondary mcpAddonApplyBtn"
          onClick={onApply}
        >
          Apply Now →
        </button>
      ) : (
        <Link
          className="button button--lg mcpBtnOutline mcpAddonApplyBtn"
          href="mailto:sales@mcp.com.ai?subject=Lifetime%20Access"
        >
          Get Lifetime Access
        </Link>
      )}
    </div>
  );
}

function ComparisonTable() {
  const C = () => <span className="mcpComparisonCheckmark">✓</span>;
  const D = () => <span className="mcpComparisonDash">—</span>;
  const O = () => <span className="mcpComparisonOss">OSS ∞</span>;

  return (
    <div className="mcpComparisonTable">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Free Forever</th>
            <th>Starter</th>
            <th>Pro</th>
            <th>Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Self-host (OSS core)</td>
            <td><O /></td>
            <td><O /></td>
            <td><O /></td>
            <td><O /></td>
          </tr>
          <tr>
            <td>Managed MCP servers</td>
            <td>Up to 3</td>
            <td>Up to 10</td>
            <td>Unlimited*</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>OpenAPI → MCP Conversion</td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>Auto-generated connectors</td>
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
          </tr>
          <tr>
            <td>Observability dashboard</td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>Real-time API sync</td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>Multi-tenant gateway</td>
            <td><D /></td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>On-premise / air-gap</td>
            <td><D /></td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>SSO (SAML, OIDC)</td>
            <td><D /></td>
            <td><D /></td>
            <td><D /></td>
            <td><C /></td>
          </tr>
          <tr>
            <td>Support</td>
            <td>Community</td>
            <td>Community</td>
            <td>Priority email</td>
            <td>Dedicated CSM</td>
          </tr>
          <tr>
            <td>SLA</td>
            <td><D /></td>
            <td><D /></td>
            <td>99.9%</td>
            <td>Custom</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RiskReversals() {
  const guarantees = [
    { icon: "🛡️", title: "No Deploy, No Charge", description: "If we can't get your MCP server running, you don't pay." },
    { icon: "⚡", title: "60-Second Guarantee", description: "API not ChatGPT-visible in 10 minutes? Full refund." },
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
  const faqs = [
    {
      q: "Is HAPI MCP really free and open source?",
      a: "Yes. The core is MIT-licensed. Free forever, fork it, self-host it. Paid plans are for the managed cloud service and enterprise features built on top.",
    },
    {
      q: "What are 'soft limits' on the Pro plan?",
      a: "Soft limits mean we won't hard-cut your service if you briefly exceed thresholds. We'll reach out and discuss usage before anything changes.",
    },
    {
      q: "Do I need to rewrite my services to use HAPI MCP?",
      a: "No. HAPI MCP lifts your existing OpenAPI specs directly into MCP tools. Your auth, validation, and business rules remain unchanged.",
    },
    {
      q: "How quickly can I deploy an MCP server?",
      a: "With HAPI Starter, your first MCP server is live in under 60 seconds. Upload your OpenAPI spec and we handle the rest.",
    },
    {
      q: "Can I self-host the Pro or Enterprise features for free?",
      a: "The OSS core is free forever. Advanced features like the observability dashboard, multi-tenant gateway, and SSO are available in paid managed tiers or Enterprise licenses.",
    },
    {
      q: "Which AI clients can consume the tools?",
      a: "Any MCP client: ChatGPT, Claude, QBot, Agentico.dev, chatMCP, or your own custom orchestrators. Vendor-neutral by design.",
    },
    {
      q: "What happens if my API changes?",
      a: "Update your OpenAPI spec and HAPI automatically regenerates your MCP tools. Real-time sync on Pro and above.",
    },
    {
      q: "Do you offer discounts for startups or educational institutions?",
      a: "Yes. Special programs for YC-backed startups, students, and open-source projects. Contact us for details.",
    },
  ];

  return (
    <section className="mcpSection mcpPricingFaq">
      <div className="container">
        <div className="mcpSectionHeader">
          <h2 className="mcpSectionTitle">Frequently Asked Questions</h2>
        </div>
        <div className="mcpFaq">
          {faqs.map((faq, idx) => (
            <details key={idx}>
              <summary><strong>{faq.q}</strong></summary>
              <p>{faq.a}</p>
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

  return (
    <Layout
      title="Pricing — Free Forever, Open Source"
      description="HAPI MCP is open source and free forever. Paid plans for managed hosting, advanced auth, and enterprise scale. No shadow code. No vendor lock-in.">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(pricingJsonLd)}
        </script>
      </Head>

      <OemModal open={oemModalOpen} onClose={() => setOemModalOpen(false)} />

      {/* ── Hero ── */}
      <section className="mcpHero">
        <div className="container">
          <div className="mcpPricingHeroContent">
            <span className="mcpSectionBadge">Pricing</span>
            <h1 className="mcpHeroTitle">
              Simple Pricing.<br />
              <strong>Free Forever, Open Source.</strong>
            </h1>
            <p className="mcpHeroSubtitle">
              The core is <strong>MIT-licensed</strong> — fork it, self-host it, ship it.
              Pay only for the managed cloud and enterprise capabilities you actually need.
            </p>
            <div className="mcpOssStrip">
              <span>🌟</span>
              <span>Open Source on GitHub —</span>
              <Link href="https://github.com/la-rebelion/hapi-mcp">la-rebelion/hapi-mcp</Link>
              <span>·</span>
              <code>MIT License</code>
            </div>
          </div>
        </div>
      </section>

      {/* ── OSS Pillars ── */}
      <section className="mcpSection mcpSection--alt" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="mcpOssPillars">
            <div className="mcpOssPillar">
              <span className="mcpOssPillarIcon" aria-hidden>🍴</span>
              <div>
                <h4>Fork It</h4>
                <p>MIT licensed. Take the full source, modify it, and ship it inside your own stack.</p>
              </div>
            </div>
            <div className="mcpOssPillar">
              <span className="mcpOssPillarIcon" aria-hidden>🏠</span>
              <div>
                <h4>Self-Host Free</h4>
                <p>Run unlimited MCP servers on your own infrastructure — zero cost, zero lock-in.</p>
              </div>
            </div>
            <div className="mcpOssPillar">
              <span className="mcpOssPillarIcon" aria-hidden>🤝</span>
              <div>
                <h4>Contribute</h4>
                <p>Join the community, file issues, open PRs, and help shape the roadmap.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing cards ── */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpPricingGrid">
            {tiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
          <p className="mcpSoftLimitsNote">
            * Soft limits: we won't cut your service without a conversation first.{' '}
            <Link href="#faq">Learn more ↓</Link>
          </p>
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
          </div>
          <ComparisonTable />
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
            <p>Open source at the core. Enterprise-grade when you need it.</p>
            <div className="mcpHeroCtas" style={{ justifyContent: 'center' }}>
              <Link className="button button--primary button--lg" href="https://github.com/la-rebelion/hapi-mcp">
                ⭐ Star on GitHub
              </Link>
              <Link className="button button--lg mcpBtnSecondary" href="/request-demo">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
