/**
 * Pricing page for HAPI MCP Stack
 * Based on mafia offer strategy: Dream Outcome × Likelihood / (Time Delay × Effort)
 */
import React, { useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import clsx from 'clsx';
import '@site/src/css/pricing.css';

// JSON-LD structured data for pricing
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
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
        "text": "With HAPI Start, you can deploy your first MCP server in under 60 seconds. Upload your OpenAPI spec and we handle the rest."
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
      "name": "Can I host HAPI MCP on my own infrastructure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All plans support self-hosting. Enterprise includes Helm charts, Terraform templates, and air-gap deployment bundles."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if my API changes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Update your OpenAPI spec and HAPI automatically regenerates your MCP tools. Real-time synchronization keeps everything in sync."
      }
    }
  ]
};

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
  icon: string;
}

const tiers: PricingTier[] = [
  {
    name: "Free",
    tagline: "For hobbyists & exploration",
    price: "$0",
    period: "forever",
    description: "Explore MCP with essential features. Rate limits apply.",
    icon: "🌱",
    features: [
      "Run 1 MCP Server (Public)",
      "Auto-generated connectors",
      "Standard rate limits",
      "Public API only",
      "Community support"
    ],
    cta: "Start Building",
    ctaLink: "https://docs.mcp.com.ai/quickstart"
  },
  {
    name: "Start",
    tagline: "For indie developers & early adopters",
    price: "$99",
    period: "one-time",
    description: "Turn your first API into an MCP server in under 60 seconds.",
    icon: "🚀",
    features: [
      "1-click MCP server deployment",
      "Auto-generated ChatGPT connector",
      "Basic auth integration (API keys)",
      "Deploy to Cloudflare Workers",
      "OpenAPI → MCP conversion",
      "Community support",
      "30-day money-back guarantee"
    ],
    cta: "Get Started",
    ctaLink: "https://docs.mcp.com.ai/get-started"
  },
  {
    name: "Pro",
    tagline: "For teams & growing products",
    price: "$199",
    period: "per month",
    description: "Scale your MCP infrastructure with enterprise auth and monitoring.",
    icon: "⚡",
    popular: true,
    features: [
      "Everything in Start, plus:",
      "Unlimited MCP servers",
      "OIDC + OAuth integration (Auth0, Keycloak)",
      "Built-in observability dashboard",
      "Real-time API synchronization",
      "Deploy anywhere (K8s, VPS, Cloudflare)",
      "Priority email support",
      "99.9% uptime SLA"
    ],
    cta: "Start Free Trial",
    ctaLink: "https://run.mcp.com.ai/signup"
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
      "SSO integration (SAML, OIDC)",
      "Advanced RBAC & policy enforcement",
      "Audit logs & compliance tooling",
      "Helm charts & Terraform modules",
      "Dedicated CSM & Slack channel",
      "Custom SLAs & 24/7 support"
    ],
    cta: "Contact Sales",
    ctaLink: "mailto:sales@mcp.com.ai?subject=Enterprise%20Inquiry"
  }
];

const addons = [
  {
    name: "Lifetime Access",
    price: "$499",
    description: "One-time payment for unlimited Pro features forever",
    icon: "♾️",
    features: [
      "All Pro features",
      "Lifetime updates",
      "No monthly fees",
      "Limited to first 100 customers"
    ]
  },
  {
    name: "OEM / White-Label",
    price: "Revenue Share",
    description: "Embed HAPI MCP into your platform",
    icon: "🤝",
    features: [
      "Rebrand as your own",
      "Custom domain & SSL",
      "API & webhook access",
      "Co-marketing opportunities"
    ]
  }
];

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div className={clsx("mcpPricingCard", tier.popular && "mcpPricingCard--popular")}>
      {tier.popular && <div className="mcpPricingBadge">Most Popular</div>}
      <div className="mcpPricingHeader">
        <div className="mcpPricingIcon" aria-hidden>{tier.icon}</div>
        <h3 className="mcpPricingName">{tier.name}</h3>
        <p className="mcpPricingTagline">{tier.tagline}</p>
      </div>
      <div className="mcpPricingPrice">
        <span className="mcpPricingAmount">{tier.price}</span>
        {tier.period && <span className="mcpPricingPeriod">/ {tier.period}</span>}
      </div>
      <p className="mcpPricingDescription">{tier.description}</p>
      <Link className={clsx("button", "button--lg", tier.popular ? "button--primary" : "mcpBtnSecondary")} href={tier.ctaLink}>
        {tier.cta}
      </Link>
      <ul className="mcpPricingFeatures">
        {tier.features.map((feature, idx) => (
          <li key={idx}>
            <span className="mcpCheckmark" aria-hidden>✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddonCard({ addon }: { addon: typeof addons[0] }) {
  return (
    <div className="mcpAddonCard">
      <div className="mcpAddonIcon" aria-hidden>{addon.icon}</div>
      <h4 className="mcpAddonName">{addon.name}</h4>
      <div className="mcpAddonPrice">{addon.price}</div>
      <p className="mcpAddonDescription">{addon.description}</p>
      <ul className="mcpAddonFeatures">
        {addon.features.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="mcpComparisonTable">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Free</th>
            <th>Start</th>
            <th>Pro</th>
            <th>Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MCP Server Deployment</td>
            <td>1 Public</td>
            <td>1 Project</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>OpenAPI → MCP Conversion</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>ChatGPT Connector</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>OIDC / OAuth</td>
            <td>—</td>
            <td>—</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Observability Dashboard</td>
            <td>—</td>
            <td>—</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Multi-tenant Gateway</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>On-Premise / Air-Gap</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>SSO (SAML, OIDC)</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Support</td>
            <td>Community</td>
            <td>Community</td>
            <td>Email</td>
            <td>Dedicated CSM</td>
          </tr>
          <tr>
            <td>SLA</td>
            <td>—</td>
            <td>—</td>
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
    {
      icon: "🛡️",
      title: "No Deployment, No Charge",
      description: "If we can't get your MCP server running, you don't pay."
    },
    {
      icon: "⚡",
      title: "60-Second Guarantee",
      description: "Your API isn't ChatGPT-visible in 10 minutes? Full refund."
    },
    {
      icon: "🔄",
      title: "Lifetime Updates",
      description: "Your MCP manifest updates automatically as your API evolves."
    },
    {
      icon: "💬",
      title: "Unlimited Support",
      description: "Until your first integration works flawlessly."
    }
  ];

  return (
    <div className="mcpRiskReversals">
      {guarantees.map((g, idx) => (
        <div key={idx} className="mcpGuarantee">
          <div className="mcpGuaranteeIcon" aria-hidden>{g.icon}</div>
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
      q: "Do I need to rewrite my services to use HAPI MCP?",
      a: "No. HAPI MCP lifts your existing OpenAPI specs directly into MCP tools. Your auth, validation, and business rules remain unchanged."
    },
    {
      q: "How quickly can I deploy an MCP server?",
      a: "With HAPI Start, you can deploy your first MCP server in under 60 seconds. Upload your OpenAPI spec and we handle the rest."
    },
    {
      q: "Is this just another MCP server?",
      a: "No—it's the Headless API model. Your API is the runtime. HAPI Server reflects it as MCP; runMCP scales it; OrcA orchestrates it. No duplicate logic."
    },
    {
      q: "Which clients can consume the tools?",
      a: "Any MCP client: ChatGPT, Claude, QBot, Agentico.dev, chatMCP, or your own custom orchestrators. It's vendor-neutral by design."
    },
    {
      q: "What happens if my API changes?",
      a: "Update your OpenAPI spec and HAPI automatically regenerates your MCP tools. Real-time synchronization keeps everything in sync."
    },
    {
      q: "Can I host HAPI MCP on my own infrastructure?",
      a: "Yes. All plans support self-hosting. Enterprise includes Helm charts, Terraform templates, and air-gap deployment bundles."
    },
    {
      q: "What about security and compliance?",
      a: "Scoped credentials, per-tool permissions, and auditable calls are inherited from your API layer. HAPI adds guardrails and observability for regulated environments."
    },
    {
      q: "Do you offer discounts for startups or educational institutions?",
      a: "Yes! We have special programs for YC-backed startups, students, and open-source projects. Contact us for details."
    }
  ];

  return (
    <section className="mcpSection">
      <div className="container">
        <h2 className="mcpCenter">Frequently Asked Questions</h2>
        <div className="mcpFaq">
          {faqs.map((faq, idx) => (
            <details key={idx}>
              <summary><strong>Q: {faq.q}</strong></summary>
              <p>A: {faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Pricing(): ReactNode {
  const [showAnnual, setShowAnnual] = useState(false);

  return (
    <Layout
      title="Pricing"
      description="Simple, transparent pricing for HAPI MCP Stack. Turn your APIs into AI-ready MCP servers in seconds. No shadow code. No vendor lock-in.">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(pricingJsonLd)}
        </script>
      </Head>

      <div className="mcpPricingPage">
        {/* Hero */}
        <section className="mcpPricingHero">
          <div className="container">
            <div className="mcpPricingHeroContent">
              <span className="mcpSectionBadge">Pricing</span>
              <h1 className="mcpPricingHeroTitle">
                Simple, Transparent Pricing.<br/>
                <strong>Zero Shadow Systems.</strong>
              </h1>
              <p className="mcpPricingHeroSubtitle">
                Turn your existing APIs into MCP servers in <strong>seconds</strong>. 
                No rewrites. No duplicate logic. No technical debt.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="mcpSection">
          <div className="container">
            <div className="mcpPricingGrid">
              {tiers.map((tier) => (
                <PricingCard key={tier.name} tier={tier} />
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="mcpSection mcpSection--alt">
          <div className="container">
            <div className="mcpSectionHeader">
              <h2 className="mcpSectionTitle">Special Offers</h2>
              <p className="mcpSectionSubtitle">Limited availability for early adopters</p>
            </div>
            <div className="mcpAddonsGrid">
              {addons.map((addon) => (
                <AddonCard key={addon.name} addon={addon} />
              ))}
            </div>
          </div>
        </section>

        {/* Risk Reversals */}
        <section className="mcpSection">
          <div className="container">
            <h2 className="mcpCenter">Our Guarantees</h2>
            <p className="mcpCenter" style={{ marginBottom: '2rem' }}>
              We're so confident you'll love HAPI MCP that we back it with these guarantees:
            </p>
            <RiskReversals />
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mcpSection mcpSection--alt">
          <div className="container">
            <h2 className="mcpCenter">Feature Comparison</h2>
            <ComparisonTable />
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* CTA */}
        <section className="mcpSection mcpSection--cta">
          <div className="container">
            <div className="mcpCtaBox">
              <h2>Ready to Make Your APIs AI-Ready?</h2>
              <p>Join teams that ship AI initiatives without rewrites or shadow systems.</p>
              <div className="mcpHeroCtas" style={{ justifyContent: 'center' }}>
                <Link className="button button--primary button--lg" href="https://docs.mcp.com.ai/get-started">
                  Get Started
                </Link>
                <Link className="button button--lg mcpBtnSecondary" href="mailto:sales@mcp.com.ai?subject=Demo%20Request">
                  Request Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
