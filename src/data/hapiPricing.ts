export type SelfServePlan = {
  id: 'free' | 'starter' | 'pro' | 'scale'; name: string; price: string; period: string;
  executions: string; throughput: string; audience: string; features: string[];
};

export const selfServePlans: SelfServePlan[] = [
  { id: 'free', name: 'Free', price: '$0', period: 'no account required', executions: '36,000 MCP executions / month', throughput: '20 per minute', audience: 'Explore HAPI locally or in a low-volume environment.', features: ['npm/Bun packages, native binaries, and Docker', 'Community support', 'A genuine production-shaped evaluation allowance', 'On-prem or fully managed on the cloud'] },
  { id: 'starter', name: 'Starter', price: '$99', period: 'per month', executions: '250,000 MCP executions / month', throughput: '120 per minute', audience: 'For a first production integration and small engineering teams.', features: ['Commercial production capacity', 'Selected production capabilities', 'Standard support', 'Fully managed on the cloud', 'Production plugins (Open Telemetry, OAuth2, Webhooks, and more)'] },
  { id: 'pro', name: 'Pro', price: '$399', period: 'per month', executions: '2 million MCP executions / month', throughput: '600 per minute', audience: 'For teams making API capabilities part of their product.', features: ['Production capability set', 'Priority support', 'Capacity for sustained workloads', 'Fully managed on the cloud', 'Production plugins and Add-ons'] },
  { id: 'scale', name: 'Scale', price: '$1,499', period: 'per month', executions: '10 million MCP executions / month', throughput: '3,000 per minute', audience: 'For high-volume workloads before an estate-wide agreement.', features: ['High-throughput production capacity', 'Most production capabilities', 'Priority support', 'Fully managed on the cloud'] },
];

export const pricingFaqs = [
  { question: 'What is an MCP execution?', answer: 'An MCP execution is a completed tools/call operation. Initialization, discovery, tool listing, health checks, prompts, and resource reads do not consume execution capacity.' },
  { question: 'What is an API Unit?', answer: 'For Enterprise licensing, one API Unit is one production API or OpenAPI service with up to roughly 50 operations. Larger definitions may use additional units. This reflects the API estate kept AI-ready, not an arbitrary count of MCP tools.' },
  { question: 'Why not charge by MCP tool?', answer: 'Tool design is an architecture decision. HAPI should help teams design useful AI capabilities, not reward them for combining or removing tools to lower an invoice.' },
  { question: 'What happens when capacity is reached?', answer: 'Self-service plans are designed to prompt an upgrade before capacity becomes a problem. Enterprise agreements use contracted capacity, negotiated bursts, and agreed review terms rather than surprise usage bills.' },
  { question: 'Can I use HAPI without creating an account?', answer: 'Yes. Free HAPI is available for experimentation and low-volume use through npm/Bun, native binaries, and Docker. A production conversation starts only when you want more capacity or commercial capabilities.' },
];
