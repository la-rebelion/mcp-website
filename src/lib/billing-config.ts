export type BillingEndpoints = Readonly<{
  checkout: string;
  salesLead: string;
  auth: string;
  account: string;
  license: string;
  portal: string;
}>;

function origin(value: string): string {
  return new URL(value).origin;
}

export function createBillingEndpoints(
  billingPublicOrigin: string,
): BillingEndpoints {
  const base = origin(billingPublicOrigin);
  return {
    checkout: `${base}/api/checkout`,
    salesLead: `${base}/api/leads`,
    auth: `${base}/api/auth`,
    account: `${base}/api/account`,
    license: `${base}/api/account/license`,
    portal: `${base}/api/account/portal`,
  };
}
