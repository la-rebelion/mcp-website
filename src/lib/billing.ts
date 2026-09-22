import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  createBillingEndpoints,
  type BillingEndpoints,
} from "./billing-config";

export type { BillingEndpoints } from "./billing-config";

export function useBillingEndpoints(): BillingEndpoints {
  const { siteConfig } = useDocusaurusContext();
  const configuredOrigin = siteConfig.customFields?.billingPublicOrigin;
  if (typeof configuredOrigin !== "string") {
    throw new Error("Missing public billing origin configuration.");
  }
  return createBillingEndpoints(configuredOrigin);
}
