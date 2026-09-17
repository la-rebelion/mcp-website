import React, { useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { selfServePlans, pricingFaqs } from '@site/src/data/hapiPricing';
import '@site/src/css/pricing.css';

const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: pricingFaqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) };

function PlanCard({ plan }: { plan: typeof selfServePlans[number] }) {
  return <article className="pricingPlan">
    <header><h3>{plan.name}</h3><p className="pricingPlanPrice">{plan.price}</p><p className="pricingPlanPeriod">{plan.period}</p></header>
    <p className="pricingPlanCapacity">{plan.executions}<br /><span>{plan.throughput}</span></p>
    <p>{plan.audience}</p><ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
    {plan.id === 'free' ? <a className="button button--lg pricingButtonSecondary" href="https://hapi.mcp.com.ai">Use HAPI free</a> : <a className="button button--lg button--primary" href="#production-conversation">Discuss {plan.name}</a>}
  </article>;
}

function ApiUnitEstimator(): ReactNode {
  const [apiCount, setApiCount] = useState(10);
  const [averageOperations, setAverageOperations] = useState(100);
  const safeApiCount = Math.max(0, apiCount || 0);
  const safeAverageOperations = Math.max(0, averageOperations || 0);
  const unitsPerApi = safeApiCount === 0 ? 0 : Math.max(1, Math.ceil(safeAverageOperations / 50));
  const estimatedUnits = safeApiCount * unitsPerApi;

  return <details className="apiUnitEstimator">
    <summary className="button button--lg pricingButtonSecondary">Estimate your API Units</summary>
    <div className="apiUnitEstimatorBody">
      <p>Use production APIs only. This is an indicative estimate; an Enterprise agreement confirms the count from the actual API estate.</p>
      <div className="apiUnitEstimatorFields">
        <label>Production APIs
          <input type="number" min="0" inputMode="numeric" value={apiCount} onChange={(event) => setApiCount(Number(event.target.value))} />
        </label>
        <label>Average operations per API
          <input type="number" min="0" inputMode="numeric" value={averageOperations} onChange={(event) => setAverageOperations(Number(event.target.value))} />
        </label>
      </div>
      <output className="apiUnitEstimatorResult" aria-live="polite">
        <strong>{estimatedUnits.toLocaleString()} estimated API Units</strong>
        <span>{safeApiCount.toLocaleString()} APIs × {unitsPerApi.toLocaleString()} Unit{unitsPerApi === 1 ? '' : 's'} per API</span>
      </output>
      <p className="apiUnitEstimatorRule">One API Unit covers up to 50 operations. For a varied estate, count each API from its own OpenAPI definition instead of relying on an average.</p>
    </div>
  </details>;
}

export default function Pricing(): ReactNode {
  return <Layout title="HAPI MCP pricing" description="Keep your API estate AI-ready without creating another MCP codebase to own.">
    <Head><script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script></Head>
    <main className="pricingPage">
      <section className="pricingHero"><div className="container pricingHeroInner"><p className="pricingKicker">HAPI MCP pricing</p><h1>Keep your API estate AI-ready.<br /><strong>Do not create another software estate.</strong></h1><p>AI can generate MCP code. It does not remove the work of securing, deploying, testing, updating, and retiring every generated server. HAPI keeps your existing API contract at the center.</p><a className="button button--primary button--lg" href="#production-conversation">Talk about production capacity</a></div></section>

      <section className="pricingSection"><div className="container pricingDecision"><div><p className="pricingKicker">The commercial model</p><h2>Pay for capacity when you need it. License the API estate when it matters.</h2></div><div className="pricingPaths"><article><h3>Self-service capacity</h3><p>For teams proving and operating a focused workload. Simple monthly execution capacity, no charge for protocol chatter.</p></article><article><h3>Enterprise API estate</h3><p>For organizations standardizing how many production APIs stay available to AI. Capacity is contracted; <b>API Units</b> guide the conversation.</p></article></div></div></section>

      <section className="pricingSection pricingSectionMuted"><div className="container"><div className="pricingSectionHeading"><p className="pricingKicker">Production paths</p><h2>Start without registration. Choose capacity when you are ready.</h2><p>Not sure which production plan is right for you? We have you covered: start with the Pilot Accelerator, a focused 14-day proof before committing to a recurring plan.</p></div><div className="pricingPlans">{selfServePlans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}</div><p className="pricingFinePrint">An execution is an MCP <code>tools/call</code>. Discovery and protocol operations are not billable capacity.</p></div></section>

      <section className="pricingSection"><div className="container pricingComparison"><div><p className="pricingKicker">The ownership question</p><h2>Generation is cheap. Ownership is not.</h2><p>Open source and AI-generated code can reduce acquisition cost. They do not remove lifecycle ownership.</p></div><div className="pricingComparisonRows"><div><h3>Build and own another MCP estate</h3><ul><li>Implement and validate adapters</li><li>Operate deployment, dependencies, and upgrades</li><li>Keep API and MCP behavior synchronized</li></ul></div><div><h3>Keep APIs MCP-ready with HAPI</h3><ul><li>Expose the API contract you already operate</li><li>Apply a consistent MCP runtime model</li><li>Scale the estate without pricing by tool count</li></ul></div></div></div></section>

      <section className="pricingSection pricingEnterprise"><div className="container pricingEnterpriseInner"><div><p className="pricingKicker">Enterprise</p><h2>Standardize AI access across your API estate.</h2><p>Enterprise is not Pro with more executions. It covers estate licensing, contracted execution capacity, private deployment options, and the support needed to keep a growing API surface AI-ready.</p><p className="pricingApiUnit"><strong>API Unit:</strong> one production API/OpenAPI service, up to 50 operations. A 51–100 operation API uses two Units.</p><ApiUnitEstimator /></div><a className="button button--primary button--lg" href="#production-conversation">Discuss an Enterprise estate</a></div></section>

      <section className="pricingSection pricingPilot"><div className="container pricingPilotInner"><div><p className="pricingKicker">Zero-Shadow Pilot</p><h2>Turn one proven workflow into an API-estate decision.</h2><p>The Thin-Slice Pilot proves a focused workflow. For Enterprise teams, the Zero-Shadow Pilot carries that evidence into an API-estate adoption recommendation, including AI consumption, authorization, deployment, and the lifecycle difference between HAPI and shadow MCP code.</p></div><a className="button button--lg pricingButtonSecondary" href="/pilot-accelerator">Explore the Zero-Shadow Pilot</a></div></section>

      <section className="pricingSection" id="production-conversation"><div className="container pricingFormLayout"><div><p className="pricingKicker">Production capacity conversation</p><h2>Tell us what you are keeping AI-ready.</h2><p>We use this to recommend the right capacity, Pilot Accelerator, or Enterprise approach.</p></div><form className="pricingForm" method="POST" action="#production-conversation"><div className="pricingFormGrid"><label>Name<input name="firstname" required autoComplete="name" /></label><label>Work email<input name="email" type="email" required autoComplete="email" /></label></div><div className="pricingFormGrid"><label>Company<input name="company" autoComplete="organization" /></label><label>What are you considering?<select name="plan_interest" defaultValue=""><option value="" disabled>Select one</option><option>Starter</option><option>Pro</option><option>Pilot Accelerator (Thin-Slice)</option><option>Enterprise API estate</option><option>Zero-Shadow Pilot</option></select></label></div><div className="pricingFormGrid"><label>Production API estate<select name="api_estate" defaultValue=""><option value="" disabled>Select range</option><option>One API</option><option>2–10 APIs</option><option>11–100 APIs</option><option>More than 100 APIs</option></select></label><label>Deployment preference<select name="deployment" defaultValue=""><option value="" disabled>Select one</option><option>Cloud</option><option>Private cloud</option><option>On-premises or air-gapped</option><option>Not sure yet</option></select></label></div><label>What are you trying to enable?<textarea name="message" rows={4} placeholder="API estate, capacity, security, or migration context" /></label><input type="submit" className="button button--primary button--lg" value="Start the conversation" /></form></div></section>

      <section className="pricingSection pricingSectionMuted"><div className="container pricingFaq"><p className="pricingKicker">Pricing details</p><h2>Questions buyers ask</h2>{pricingFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
    </main>
  </Layout>;
}
