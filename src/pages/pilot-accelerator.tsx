import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '@site/src/css/pricing.css';

const outcomes = [
  ['One real API', 'Choose a production API with a meaningful AI use case, not a demo-only connector.'],
  ['A working access path', 'Validate MCP consumption, authorization boundaries, deployment assumptions, and operational ownership.'],
  ['A scale recommendation', 'Leave with a practical recommendation for the APIs to prioritize, capacity to contract, and migration work to sequence.'],
];

export default function PilotAccelerator(): ReactNode {
  return <Layout title="HAPI Zero-Shadow Pilot" description="Prove that a production API can become AI-accessible without creating another MCP implementation to maintain.">
    <main className="pricingPage">
      <section className="pricingHero"><div className="container pricingHeroInner"><p className="pricingKicker">HAPI Zero-Shadow Pilot</p><h1>Prove AI access to a real API.<br /><strong>Do not add shadow code to own.</strong></h1><p>Work with HAPI on one production API and establish whether your team can make it AI-accessible without generating, deploying, and maintaining another MCP implementation.</p><Link className="button button--primary button--lg" href="/pricing">Discuss a pilot</Link></div></section>

      <section className="pricingSection"><div className="container pricingDecision"><div><p className="pricingKicker">What the pilot is for</p><h2>A focused route from a real API to an Enterprise decision.</h2><p>The pilot is not a generic consulting catalog. It reduces uncertainty before standardizing AI access across an API estate.</p></div><div className="pricingPaths">{outcomes.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

      <section className="pricingSection pricingSectionMuted"><div className="container pricingComparison"><div><p className="pricingKicker">The lifecycle comparison</p><h2>See the ownership model before you scale it.</h2><p>If you already maintain generated or handwritten MCP servers, the pilot can compare that lifecycle with the HAPI approach using an agreed API change or operating scenario.</p></div><div className="pricingComparisonRows"><div><h3>Shadow MCP code</h3><ul><li>Another implementation to validate and deploy</li><li>Another dependency and protocol-upgrade path</li><li>Another synchronization surface when the API evolves</li></ul></div><div><h3>HAPI approach</h3><ul><li>Keep the existing API contract central</li><li>Validate a consistent runtime and access model</li><li>Plan estate adoption from the evidence collected</li></ul></div></div></div></section>

      <section className="pricingSection"><div className="container pricingDecision"><div><p className="pricingKicker">Shadow Code Buyback</p><h2>Already maintaining MCP wrappers?</h2></div><div><p>Bring them into the discussion. As part of Enterprise onboarding, HAPI can help identify and replace an agreed initial set of shadow implementations. This is migration and onboarding support, not a cash reimbursement.</p><Link className="button button--lg pricingButtonSecondary" href="/pricing">Talk about migration</Link></div></div></section>

      <section className="pricingSection pricingEnterprise"><div className="container pricingEnterpriseInner"><div><p className="pricingKicker">Next step</p><h2>Turn pilot evidence into an API-estate plan.</h2><p>Commercial scope, capacity, deployment constraints, and Enterprise terms are agreed in the production capacity conversation, not implied by a public services menu.</p></div><Link className="button button--primary button--lg" href="/pricing">Start the conversation</Link></div></section>
    </main>
  </Layout>;
}
