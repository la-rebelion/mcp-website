import { expect, test } from 'bun:test';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { billingEndpoints, selfServePlans } from '../src/data/hapiPricing';

async function files(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => entry.isDirectory()
    ? files(join(directory, entry.name))
    : [join(directory, entry.name)]));
  return nested.flat();
}

test('only Starter and Pro are eligible for self-service Checkout', () => {
  const checkoutPlans = selfServePlans.filter((plan) => plan.checkoutPlan);
  expect(checkoutPlans.map((plan) => plan.checkoutPlan)).toEqual(['starter', 'pro']);
  expect(billingEndpoints.checkout).toBe('https://billing.mcp.com.ai/api/checkout');
});

test('pricing keeps Checkout native and leaves non-Checkout paths distinct', async () => {
  const source = await Bun.file(new URL('../src/pages/pricing.tsx', import.meta.url)).text();
  expect(source).toContain('method="post" action={billingEndpoints.checkout}');
  expect(source).toContain('type="hidden" name="plan" value={plan.checkoutPlan}');
  expect(source).toContain('href="/pilot-accelerator"');
  expect(source).toContain('href="#production-conversation"');
});

test('website source and any built output contain no Stripe secret or Price ID', async () => {
  const sourceFiles = [
    new URL('../src/data/hapiPricing.ts', import.meta.url),
    new URL('../src/pages/pricing.tsx', import.meta.url),
    new URL('../src/pages/account.tsx', import.meta.url),
  ];
  const contents = await Promise.all(sourceFiles.map((file) => Bun.file(file).text()));
  const buildDirectory = new URL('../build/', import.meta.url);
  if (await stat(buildDirectory.pathname).then(() => true).catch(() => false)) {
    const output = await Promise.all((await files(buildDirectory.pathname))
      .filter((file) => /\.(?:css|html|js)$/.test(file))
      .map((file) => Bun.file(file).text()));
    contents.push(...output);
  }
  expect(contents.join('\n')).not.toMatch(/(?:sk_(?:test|live)_|whsec_|price_[A-Za-z0-9]+)/);
});

test('account UI uses native controls and keeps unfulfilled payments pending', async () => {
  const source = await Bun.file(new URL('../src/pages/account.tsx', import.meta.url)).text();
  expect(source).toContain('credentials: \'include\'');
  expect(source).toContain('Activation is pending');
  expect(source).toContain('form method="post" action={billingEndpoints.portal}');
  expect(source).toContain('autoComplete="one-time-code"');
});
