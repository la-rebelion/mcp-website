/**
 * Pricing page — mcp.com.ai
 * Version: v1.0 (2026-05-19) — aligned with The AI Infrastructure Framework™ v1.0
 *
 * What changed from the prior version:
 *  - Killed the awkward "Starter $99 one-time" tier (replaced by clearer Free tier).
 *  - Removed SSO from Pro (SAML/SSO moved to Enterprise + Services SOW only).
 *  - Added Enterprise price anchor ("Starting at $12,000/year").
 *  - Lifetime offer: capped at 25 customers (was 100), priced $1,499 (was $499).
 *  - NEW: dedicated "Services" tier card linking to the HAPI MCP Pilot Accelerator.
 *  - Added comparison row for Services vs product tiers.
 *  - Reorganized FAQ to address the most common objections.
 *
 * Drop-in path: src/pages/pricing.tsx
 * Built for: Docusaurus v3.x + React 18.
 */

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

// ============================================================================
// Types
// ============================================================================

type Feature = { label: string; included?: boolean };

type Tier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: Feature[];
  cta: { label: string; href: string };
  highlight?: boolean;
  badge?: string;
  icon: string;
};

// ============================================================================
// Tier data
// ============================================================================

const productTiers: Tier[] = [
  {
    id: 'free',
    name: 'Free Forever',
    tagline: 'Open source. No strings attached.',
    price: '$0',
    priceSuffix: '/ forever',
    description:
      'The full OSS core — self-host unlimited MCP Servers or use our managed cloud for personal projects.',
    icon: '💚',
    features: [
      { label: 'MIT-licensed core — fork & self-host free' },
      { label: 'Self-host unlimited MCP Servers' },
      { label: 'OpenAPI → MCP conversion' },
      { label: 'Auto-generated connectors' },
      { label: 'Deploy to Cloudflare Workers' },
      { label: 'Up to 3 managed MCP Servers (cloud)' },
      { label: 'Community support' },
    ],
    cta: { label: 'Get the Source', href: 'https://github.com/la-rebelion/hapi-mcp' },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For teams shipping at scale',
    price: '$199',
    priceSuffix: '/ per month',
    description:
      'Unlimited MCP Servers with soft limits. Auth, observability, and priority support.',
    icon: '⚡',
    badge: 'Most Popular',
    highlight: true,
    features: [
      { label: 'Unlimited MCP Servers (soft limits)' },
      { label: 'Everything in Free, plus:' },
      { label: 'OIDC + OAuth (Auth0, Keycloak)' },
      { label: 'Built-in observability dashboard' },
      { label: 'Real-time API synchronization' },
      { label: 'Deploy anywhere (K8s, VPS, Cloudflare)' },
      { label: 'Priority email support' },
      { label: '99.9% uptime SLA' },
    ],
    cta: { label: 'Start Free Trial', href: 'https://run.mcp.com.ai/signup' },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For organizations at scale',
    price: 'From $12,000',
    priceSuffix: '/ per year',
    description:
      'Air-gap deployments, multi-tenant gateways, advanced RBAC, and white-glove support.',
    icon: '🏢',
    features: [
      { label: 'Everything in Pro, plus:' },
      { label: 'On-premise & air-gap deployment' },
      { label: 'Multi-tenant MCP gateway' },
      { label: 'Enterprise SSO (SAML, OIDC) — add-on' },
      { label: 'Advanced RBAC & policy enforcement' },
      { label: 'Audit logs & compliance tooling' },
      { label: 'Helm charts & Terraform modules' },
      { label: 'Dedicated CSM & Slack channel' },
      { label: 'Custom SLAs & 24/7 support' },
    ],
    cta: { label: 'Contact Sales', href: 'mailto:hello@mcp.com.ai' },
  },
];

const servicesTier: Tier = {
  id: 'services',
  name: 'Services',
  tagline: 'Architect-led setup. Production-ready in weeks.',
  price: 'From $4,500',
  priceSuffix: '/ one-time engagement',
  description:
    'Need someone to design the workflow, build the MCP Servers, set up governance, and hand it to your team? The HAPI MCP Pilot Accelerator is the done-for-you path.',
  icon: '🛠️',
  badge: 'For Enterprise Buyers',
  features: [
    { label: 'Pilot Blueprint — workflow + ROI scoring' },
    { label: 'MCP Bridge Factory (1–10 MCP Servers depending on tier)' },
    { label: 'Governance gate (OAuth/OIDC + least-privilege)' },
    { label: 'Audit & Ops Pack with runbooks' },
    { label: '3 tiers: Thin-Slice / Standard / Enterprise' },
    { label: 'Ship-the-Foundation Guarantee' },
    { label: '3×30×3 post-implementation support' },
    { label: '14 days – 12 weeks delivery' },
  ],
  cta: { label: 'See the Pilot Accelerator →', href: 'https://mcp.com.ai/get-my-mcp' },
};

// ============================================================================
// Styles (inline for portability; replace with CSS modules if you prefer)
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  hero: { textAlign: 'center', padding: '4rem 1.5rem 2rem' },
  heroTitle: { fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 },
  heroSubtitle: {
    fontSize: '1.25rem',
    marginTop: '1rem',
    color: 'var(--ifm-color-emphasis-700)',
    maxWidth: 760,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ossBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'var(--ifm-color-emphasis-100)',
    padding: '0.5rem 1rem',
    borderRadius: 999,
    fontSize: '0.9rem',
    marginTop: '1.25rem',
  },
  pillRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
    maxWidth: 1100,
    margin: '2rem auto',
    padding: '0 1rem',
  },
  pill: {
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 12,
    padding: '1.25rem',
    textAlign: 'center',
    background: 'var(--ifm-background-surface-color)',
  },
  pillIcon: { fontSize: '1.75rem' },
  pillTitle: { fontWeight: 700, marginTop: '0.5rem' },
  pillBody: { fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)', marginTop: '0.25rem' },
  tierGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.25rem',
    maxWidth: 1200,
    margin: '2rem auto',
    padding: '0 1rem',
  },
  tierCard: {
    position: 'relative',
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 16,
    padding: '2rem 1.5rem',
    background: 'var(--ifm-background-surface-color)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  tierCardHighlight: {
    borderColor: 'var(--ifm-color-primary)',
    boxShadow: '0 12px 40px rgba(218, 119, 86, 0.18)',
    transform: 'translateY(-4px)',
  },
  badge: {
    position: 'absolute',
    top: -12,
    right: 16,
    background: 'var(--ifm-color-primary)',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: 999,
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  tierIcon: { fontSize: '2rem', marginBottom: '0.5rem' },
  tierName: { fontSize: '1.5rem', fontWeight: 700, margin: 0 },
  tierTagline: { color: 'var(--ifm-color-emphasis-600)', fontSize: '0.95rem', marginBottom: '1rem' },
  tierPrice: { fontSize: '2.25rem', fontWeight: 800, margin: '0.75rem 0 0.25rem' },
  tierPriceSuffix: { color: 'var(--ifm-color-emphasis-600)', fontSize: '0.9rem' },
  tierDescription: {
    fontSize: '0.95rem',
    color: 'var(--ifm-color-emphasis-700)',
    minHeight: 60,
    marginBottom: '1rem',
  },
  featureList: { listStyle: 'none', padding: 0, margin: '0 0 1.5rem', flexGrow: 1 },
  feature: { display: 'flex', gap: '0.5rem', padding: '0.35rem 0', fontSize: '0.95rem' },
  ctaPrimary: {
    display: 'block',
    textAlign: 'center',
    padding: '0.85rem 1.25rem',
    borderRadius: 8,
    background: 'var(--ifm-color-primary)',
    color: '#fff',
    fontWeight: 700,
    textDecoration: 'none',
  },
  ctaSecondary: {
    display: 'block',
    textAlign: 'center',
    padding: '0.85rem 1.25rem',
    borderRadius: 8,
    background: 'transparent',
    color: 'var(--ifm-color-primary)',
    fontWeight: 700,
    textDecoration: 'none',
    border: '1px solid var(--ifm-color-primary)',
  },
  servicesBanner: {
    maxWidth: 1100,
    margin: '3rem auto',
    padding: '2rem',
    borderRadius: 20,
    background: 'linear-gradient(135deg, #0B1220 0%, #1a2942 100%)',
    color: '#fff',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '2rem',
    alignItems: 'center',
  },
  servicesBannerInner: { },
  servicesBannerTag: {
    display: 'inline-block',
    background: 'rgba(218, 119, 86, 0.2)',
    color: '#DA7756',
    padding: '0.25rem 0.75rem',
    borderRadius: 999,
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
  },
  servicesBannerTitle: { fontSize: '1.75rem', fontWeight: 800, margin: 0 },
  servicesBannerBody: { color: 'rgba(255,255,255,0.85)', marginTop: '0.5rem', maxWidth: 640 },
  servicesBannerCta: {
    background: '#DA7756',
    color: '#fff',
    padding: '1rem 1.5rem',
    borderRadius: 12,
    fontWeight: 700,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  section: { maxWidth: 1100, margin: '3rem auto', padding: '0 1rem' },
  sectionTitle: { fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.5rem' },
  sectionSubtitle: {
    textAlign: 'center',
    color: 'var(--ifm-color-emphasis-700)',
    marginBottom: '2rem',
  },
  specialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.25rem',
  },
  specialCard: {
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 16,
    padding: '1.75rem',
    background: 'var(--ifm-background-surface-color)',
  },
  specialIcon: { fontSize: '1.75rem' },
  specialPrice: { fontSize: '1.75rem', fontWeight: 800, margin: '0.5rem 0' },
  guaranteeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.25rem',
  },
  guaranteeCard: {
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 12,
    padding: '1.5rem',
    textAlign: 'center',
    background: 'var(--ifm-background-surface-color)',
  },
  compareWrap: { overflowX: 'auto', marginTop: '1.5rem' },
  compareTable: { width: '100%', borderCollapse: 'collapse', minWidth: 720 },
  compareTh: {
    padding: '0.85rem 0.75rem',
    textAlign: 'left',
    fontWeight: 700,
    borderBottom: '2px solid var(--ifm-color-emphasis-300)',
  },
  compareTd: {
    padding: '0.75rem',
    borderBottom: '1px solid var(--ifm-color-emphasis-200)',
    fontSize: '0.95rem',
  },
  faqWrap: { marginTop: '1rem' },
  faqItem: {
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 10,
    marginBottom: '0.75rem',
    padding: '1rem 1.25rem',
    background: 'var(--ifm-background-surface-color)',
  },
  faqQ: { fontWeight: 700, fontSize: '1rem', cursor: 'pointer' },
  faqA: { color: 'var(--ifm-color-emphasis-800)', marginTop: '0.5rem', fontSize: '0.95rem' },
  finalCta: {
    textAlign: 'center',
    padding: '4rem 1.5rem',
    background: 'var(--ifm-color-emphasis-100)',
    borderRadius: 20,
    margin: '3rem auto',
    maxWidth: 1100,
  },
  finalCtaTitle: { fontSize: '2rem', fontWeight: 800 },
  finalCtaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1.5rem',
    flexWrap: 'wrap',
  },
};

// ============================================================================
// Components
// ============================================================================

function TierCard({ tier }: { tier: Tier }) {
  const cardStyle: React.CSSProperties = tier.highlight
    ? { ...styles.tierCard, ...styles.tierCardHighlight }
    : styles.tierCard;
  return (
    <div style={cardStyle}>
      {tier.badge && <div style={styles.badge}>{tier.badge}</div>}
      <div style={styles.tierIcon}>{tier.icon}</div>
      <h3 style={styles.tierName}>{tier.name}</h3>
      <p style={styles.tierTagline}>{tier.tagline}</p>
      <div style={styles.tierPrice}>{tier.price}</div>
      {tier.priceSuffix && <div style={styles.tierPriceSuffix}>{tier.priceSuffix}</div>}
      <p style={styles.tierDescription}>{tier.description}</p>
      <ul style={styles.featureList}>
        {tier.features.map((f, i) => (
          <li key={i} style={styles.feature}>
            <span style={{ color: 'var(--ifm-color-primary)', fontWeight: 700 }}>✓</span>
            <span>{f.label}</span>
          </li>
        ))}
      </ul>
      <Link
        to={tier.cta.href}
        style={tier.highlight ? styles.ctaPrimary : styles.ctaSecondary}
      >
        {tier.cta.label}
      </Link>
    </div>
  );
}

function GuaranteeCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div style={styles.guaranteeCard}>
      <div style={{ fontSize: '2rem' }}>{icon}</div>
      <h4 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>{title}</h4>
      <p style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '0.95rem', margin: 0 }}>{body}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <details style={styles.faqItem}>
      <summary style={styles.faqQ}>{q}</summary>
      <div style={styles.faqA}>{a}</div>
    </details>
  );
}

// ============================================================================
// Page
// ============================================================================

export default function PricingPage(): JSX.Element {
  return (
    <Layout
      title="Pricing — Free Forever, Open Source"
      description="HAPI MCP is open source and free forever. Paid plans for managed hosting, advanced auth, and enterprise scale. Architect-led services for teams who need it done-for-you."
    >
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Simple Pricing. <span style={{ color: 'var(--ifm-color-primary)' }}>Free Forever, Open Source.</span>
        </h1>
        <p style={styles.heroSubtitle}>
          The core is <strong>MIT-licensed</strong> — fork it, self-host it, ship it. Pay only for managed cloud, enterprise capabilities, or done-for-you implementation when you actually need them.
        </p>
        <div style={styles.ossBadge}>
          🌟 Open Source on GitHub —{' '}
          <Link to="https://github.com/la-rebelion/hapi-mcp">la-rebelion/hapi-mcp</Link>
          <code style={{ marginLeft: 4 }}>MIT License</code>
        </div>

        <div style={styles.pillRow}>
          <div style={styles.pill}>
            <div style={styles.pillIcon}>🍴</div>
            <div style={styles.pillTitle}>Fork It</div>
            <div style={styles.pillBody}>MIT licensed. Take the full source, modify it, and ship it inside your own stack.</div>
          </div>
          <div style={styles.pill}>
            <div style={styles.pillIcon}>🏠</div>
            <div style={styles.pillTitle}>Self-Host Free</div>
            <div style={styles.pillBody}>Run unlimited MCP Servers on your own infrastructure — zero cost, zero lock-in.</div>
          </div>
          <div style={styles.pill}>
            <div style={styles.pillIcon}>🤝</div>
            <div style={styles.pillTitle}>Contribute</div>
            <div style={styles.pillBody}>Join the community, file issues, open PRs, and help shape the roadmap.</div>
          </div>
        </div>
      </section>

      {/* Product tiers */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Self-Serve Plans</h2>
        <p style={styles.sectionSubtitle}>
          For developers and platform teams. Run the open-source core for free, or upgrade to managed cloud and enterprise features when you scale.
        </p>
        <div style={styles.tierGrid}>
          {productTiers.map((t) => (
            <TierCard key={t.id} tier={t} />
          ))}
        </div>
      </section>

      {/* Services tier banner */}
      <section style={styles.servicesBanner}>
        <div style={styles.servicesBannerInner}>
          <div style={styles.servicesBannerTag}>🛠️ Architect-Led Services</div>
          <h2 style={styles.servicesBannerTitle}>Need it done-for-you?</h2>
          <p style={styles.servicesBannerBody}>
            The <strong>HAPI MCP Pilot Accelerator</strong> is an architect-led, time-bound engagement that takes one AI workflow from sandbox to production in 14 days – 12 weeks. We design the workflow, build 1–10 MCP Servers, install the governance gate, and hand the runbooks to your team. Starts at $4,500.
          </p>
        </div>
        <Link to="https://mcp.com.ai/get-my-mcp" style={styles.servicesBannerCta}>
          See the Pilot Accelerator →
        </Link>
      </section>

      {/* Services tier card (alt path) */}
      <section style={styles.section}>
        <div style={{ ...styles.tierGrid, gridTemplateColumns: 'minmax(280px, 480px)', justifyContent: 'center' }}>
          <TierCard tier={servicesTier} />
        </div>
      </section>

      {/* Special offers */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Beyond the Standard Plans</h2>
        <p style={styles.sectionSubtitle}>For early adopters and platform partners.</p>
        <div style={styles.specialGrid}>
          <div style={styles.specialCard}>
            <div style={styles.specialIcon}>♾️</div>
            <h3 style={{ marginTop: '0.5rem' }}>Lifetime Access</h3>
            <div style={styles.specialPrice}>$1,499</div>
            <p style={{ color: 'var(--ifm-color-emphasis-700)' }}>
              One-time payment for unlimited Pro features. No monthly fees — ever. Less than 8 months of Pro, then it pays for itself.
            </p>
            <ul style={{ paddingLeft: '1.25rem' }}>
              <li>All Pro features</li>
              <li>Lifetime updates</li>
              <li>No monthly fees</li>
              <li><strong>Limited to first 25 customers</strong> (real scarcity, not marketing scarcity)</li>
            </ul>
            <Link to="mailto:hello@mcp.com.ai?subject=Lifetime Access" style={styles.ctaSecondary}>
              Get Lifetime Access
            </Link>
          </div>

          <div style={styles.specialCard}>
            <div style={styles.specialIcon}>🤝</div>
            <h3 style={{ marginTop: '0.5rem' }}>OEM / White-Label</h3>
            <div style={styles.specialPrice}>Revenue Share</div>
            <p style={{ color: 'var(--ifm-color-emphasis-700)' }}>
              Embed HAPI MCP into your platform and ship it as your own product.
            </p>
            <ul style={{ paddingLeft: '1.25rem' }}>
              <li>Rebrand as your own product</li>
              <li>Custom domain & SSL</li>
              <li>Full API & webhook access</li>
              <li>Co-marketing opportunities</li>
              <li>Dedicated partner onboarding</li>
            </ul>
            <Link to="mailto:hello@mcp.com.ai?subject=OEM Partnership" style={styles.ctaSecondary}>
              Apply Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Guarantees</h2>
        <p style={styles.sectionSubtitle}>We're confident you'll love HAPI MCP. Here's what we stand behind.</p>
        <div style={styles.guaranteeGrid}>
          <GuaranteeCard icon="🛡️" title="No Deploy, No Charge" body="If we can't get your MCP Server running, you don't pay." />
          <GuaranteeCard icon="⚡" title="60-Second Guarantee" body="API not ChatGPT-visible in 10 minutes? Full refund." />
          <GuaranteeCard icon="🔄" title="Lifetime Updates" body="MCP manifest auto-updates as your API evolves." />
          <GuaranteeCard icon="💬" title="Unlimited Support" body="Until your first integration works flawlessly." />
        </div>
      </section>

      {/* Feature comparison */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Feature Comparison</h2>
        <div style={styles.compareWrap}>
          <table style={styles.compareTable}>
            <thead>
              <tr>
                <th style={styles.compareTh}>Feature</th>
                <th style={styles.compareTh}>Free Forever</th>
                <th style={styles.compareTh}>Pro</th>
                <th style={styles.compareTh}>Enterprise</th>
                <th style={styles.compareTh}>Services</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.compareTd}>Self-host (OSS core)</td>
                <td style={styles.compareTd}>OSS ∞</td>
                <td style={styles.compareTd}>OSS ∞</td>
                <td style={styles.compareTd}>OSS ∞</td>
                <td style={styles.compareTd}>OSS ∞ (used in delivery)</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>Managed MCP Servers</td>
                <td style={styles.compareTd}>Up to 3</td>
                <td style={styles.compareTd}>Unlimited*</td>
                <td style={styles.compareTd}>Unlimited</td>
                <td style={styles.compareTd}>1–10 (architect-built)</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>OpenAPI → MCP Conversion</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>✓</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>OIDC / OAuth</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>✓ (configured for you)</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>Observability dashboard</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>✓ (custom dashboards)</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>Real-time API sync</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>✓</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>Multi-tenant gateway</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>By scope</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>On-premise / air-gap</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>✓</td>
                <td style={styles.compareTd}>By scope</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>Enterprise SSO (SAML)</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>Add-on</td>
                <td style={styles.compareTd}>Separate SOW</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>Governance + audit trail</td>
                <td style={styles.compareTd}>Basic</td>
                <td style={styles.compareTd}>Basic+</td>
                <td style={styles.compareTd}>Full</td>
                <td style={styles.compareTd}>Full + runbooks</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>Done-for-you implementation</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>✓ (14 days – 12 weeks)</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>Support</td>
                <td style={styles.compareTd}>Community</td>
                <td style={styles.compareTd}>Priority email</td>
                <td style={styles.compareTd}>Dedicated CSM</td>
                <td style={styles.compareTd}>1-on-1 with Adrian</td>
              </tr>
              <tr>
                <td style={styles.compareTd}>SLA</td>
                <td style={styles.compareTd}>—</td>
                <td style={styles.compareTd}>99.9%</td>
                <td style={styles.compareTd}>Custom</td>
                <td style={styles.compareTd}>Ship-the-Foundation Guarantee</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '1rem' }}>
          * Soft limits: we won't cut your service without a conversation first.
        </p>
      </section>

      {/* FAQ */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div style={styles.faqWrap}>
          <FaqItem
            q="Is HAPI MCP really free and open source?"
            a="Yes. The core is MIT-licensed. Free forever, fork it, self-host it. Paid plans are for the managed cloud service and enterprise features built on top."
          />
          <FaqItem
            q="What's the difference between Pro and Services?"
            a={
              <>
                <strong>Pro</strong> gives you the runtime: unlimited managed MCP Servers, OIDC/OAuth, observability, and an SLA. It's a great fit if you have engineers who can design the workflow, pick the right systems, and set up governance themselves. <strong>Services</strong> (the HAPI MCP Pilot Accelerator) is when you want an architect to design the workflow, build the MCP Servers, configure governance, and hand you runbooks — most enterprise teams use both: Services to get to production fast, Pro to operate it long-term.
              </>
            }
          />
          <FaqItem
            q="What are 'soft limits' on the Pro plan?"
            a="Soft limits mean we won't hard-cut your service if you briefly exceed thresholds. We'll reach out and discuss usage before anything changes."
          />
          <FaqItem
            q="Why isn't SAML SSO in Pro?"
            a="SAML/Enterprise SSO is IdP-specific (Okta, Entra ID, Ping, ADFS, Keycloak) and requires careful integration to keep your security team happy. We don't ship it as a checkbox feature because that misleads buyers. SAML is available as an Enterprise add-on or as a separate scoped Services engagement."
          />
          <FaqItem
            q="Do I need to rewrite my services to use HAPI MCP?"
            a="No. HAPI MCP lifts your existing OpenAPI specs directly into MCP tools. Your auth, validation, and business rules remain unchanged."
          />
          <FaqItem
            q="How quickly can I deploy an MCP Server?"
            a="With managed cloud, your first MCP Server is live in under 60 seconds. Upload your OpenAPI spec and we handle the rest. For complex production-grade setups, Services delivers a thin-slice in 14 days."
          />
          <FaqItem
            q="Can I self-host the Pro or Enterprise features for free?"
            a="The OSS core is free forever. Advanced features like the observability dashboard, multi-tenant gateway, and on-premise/air-gap deployment are available in paid managed tiers or Enterprise licenses."
          />
          <FaqItem
            q="Which AI clients can consume the tools?"
            a="Any MCP client: ChatGPT, Claude, QBot, Agentico.dev, chatMCP, or your own custom orchestrators. Vendor-neutral by design."
          />
          <FaqItem
            q="What happens if my API changes?"
            a="Update your OpenAPI spec and HAPI automatically regenerates your MCP tools. Real-time sync on Pro and above."
          />
          <FaqItem
            q="Do you offer discounts for startups or educational institutions?"
            a="Yes. Special programs for YC-backed startups, students, and open-source projects. Contact us for details."
          />
          <FaqItem
            q="What's the difference between Enterprise and Services?"
            a="Enterprise is a product subscription — you operate the platform. Services is an engagement where Adrian designs and builds for you. Many enterprise customers buy both: the Enterprise plan for the runtime, and a Services engagement to get to production faster."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section style={styles.finalCta}>
        <h2 style={styles.finalCtaTitle}>Ready to Make Your APIs AI-Ready?</h2>
        <p style={{ color: 'var(--ifm-color-emphasis-700)', marginTop: '0.5rem' }}>
          Open source at the core. Enterprise-grade when you need it. Architect-led when you want it done for you.
        </p>
        <div style={styles.finalCtaButtons}>
          <Link to="https://github.com/la-rebelion/hapi-mcp" style={styles.ctaSecondary}>
            ⭐ Star on GitHub
          </Link>
          <Link to="https://go.mcp.com.ai/adrian-meet" style={styles.ctaPrimary}>
            Book a Call with Adrian
          </Link>
          <Link to="https://mcp.com.ai/get-my-mcp" style={styles.ctaPrimary}>
            See the Pilot Accelerator
          </Link>
        </div>
      </section>
    </Layout>
  );
}
