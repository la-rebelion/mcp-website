export type CheckoutPlanKey = 'starter' | 'pro';

export type SelfServePlan = {
  id: 'free' | CheckoutPlanKey | 'pilot';
  name: string;
  price?: string;
  period: string;
  executions: string;
  throughput: string;
  audience: string;
  features: string[];
  checkoutPlan?: CheckoutPlanKey;
};

/** Public Worker origin only. Stripe Price IDs and credentials never enter this site. */
export const billingPublicOrigin = 'https://billing.mcp.com.ai';
export const billingEndpoints = {
  checkout: `${billingPublicOrigin}/api/checkout`,
  auth: `${billingPublicOrigin}/api/auth`,
  account: `${billingPublicOrigin}/api/account`,
  license: `${billingPublicOrigin}/api/account/license`,
  portal: `${billingPublicOrigin}/api/account/portal`,
} as const;

export const selfServePlans: SelfServePlan[] = [
  { id: 'free', name: 'Free', price: '$0', period: 'no account required', executions: '36,000 MCP executions / month', throughput: '20 per minute', audience: 'Explore HAPI locally or in a low-volume environment.', features: ['npm/Bun packages, native binaries, and Docker', 'Community support', 'A genuine production-shaped evaluation allowance', 'On-prem or fully managed on the cloud'] },
  { id: 'starter', name: 'Starter', price: '$99', period: 'per month', executions: '250,000 MCP executions / month', throughput: '120 per minute', audience: 'For a first production integration and small engineering teams.', features: ['Commercial production capacity', 'Selected production capabilities', 'Standard support', 'Fully managed on the cloud', 'Production plugins (Open Telemetry, OAuth2, Webhooks, and more)'], checkoutPlan: 'starter' },
  { id: 'pro', name: 'Pro', price: '$399', period: 'per month', executions: '2 million MCP executions / month', throughput: '600 per minute', audience: 'For teams making API capabilities part of their product.', features: ['Production capability set', 'Priority support', 'Capacity for sustained workloads', 'Fully managed on the cloud', 'Production plugins and Add-ons'], checkoutPlan: 'pro' },
  { id: 'pilot', name: 'Pilot Accelerator', price: undefined, period: 'one-time engagement', executions: '14-day proof', throughput: 'One workflow · one MCP Server', audience: 'For teams that want evidence before choosing a production plan.', features: ['Dev/test environment', 'Basic governance', '30 days of follow-up support', 'A practical adoption recommendation'] },
];

export const pricingFaqs = [
  { question: 'What is an MCP execution?', answer: 'An MCP execution is a completed tools/call operation. Initialization, discovery, tool listing, health checks, prompts, and resource reads do not consume execution capacity.' },
  { question: 'What is an API Unit?', answer: 'For Enterprise licensing, one API Unit covers one production API or OpenAPI service with up to roughly 50 operations. An API with 51–100 operations uses two Units. Count every production API separately, then add the Units together. This reflects the API estate kept AI-ready, not an arbitrary count of MCP tools.' },
  { question: 'Why not charge by MCP tool?', answer: 'Tool design is an architecture decision. HAPI should help teams design useful AI capabilities, not reward them for combining or removing tools to lower an invoice.' },
  { question: 'What happens when capacity is reached?', answer: 'Self-service plans are designed to prompt an upgrade before capacity becomes a problem. Enterprise agreements use contracted capacity, negotiated bursts, and agreed review terms rather than surprise usage bills.' },
  { question: 'Can I use HAPI without creating an account?', answer: 'Yes. Free HAPI is available for experimentation and low-volume use through npm/Bun, native binaries, and Docker. A production conversation starts only when you want more capacity or commercial capabilities.' },
];
