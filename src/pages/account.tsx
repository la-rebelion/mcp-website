import React, {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Layout from "@theme/Layout";
import { useBillingEndpoints } from "@site/src/lib/billing";
import "@site/src/css/pricing.css";

type AccountSummary = {
  state: "pending" | "provisioned";
  plan?: "starter" | "pro";
  subscriptionStatus?: string;
  licenseExpiresAt?: string;
};

type AccountState =
  "checking" | "signed-out" | "pending" | "provisioned" | "error";

async function errorMessage(response: Response): Promise<string> {
  const body = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;
  return (
    body?.message ?? "We could not complete that request. Please try again."
  );
}

export default function Account(): ReactNode {
  const billingEndpoints = useBillingEndpoints();
  const [state, setState] = useState<AccountState>("checking");
  const [summary, setSummary] = useState<AccountSummary | null>(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const refreshAccount = async () => {
    const response = await fetch(billingEndpoints.account, {
      credentials: "include",
    });
    if (response.status === 401) {
      setState("signed-out");
      setSummary(null);
      return;
    }
    if (!response.ok) throw new Error(await errorMessage(response));
    const next = (await response.json()) as AccountSummary;
    setSummary(next);
    setState(next.state);
  };

  useEffect(() => {
    void refreshAccount().catch((error: unknown) => {
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not check your account.",
      );
      setState("error");
    });
  }, []);

  const sendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `${billingEndpoints.auth}/email-otp/send-verification-otp`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, type: "sign-in" }),
        },
      );
      if (!response.ok) throw new Error(await errorMessage(response));
      setCodeSent(true);
      setMessage(
        "If this is the email you used at Checkout, a six-digit code is on its way.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not send a code. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const verifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `${billingEndpoints.auth}/sign-in/email-otp`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        },
      );
      if (!response.ok) throw new Error(await errorMessage(response));
      await refreshAccount();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not verify that code. Please request a new one.",
      );
    } finally {
      setBusy(false);
    }
  };

  const downloadLicense = async () => {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(billingEndpoints.license, {
        credentials: "include",
      });
      if (!response.ok) throw new Error(await errorMessage(response));
      const file = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = file;
      link.download = "license.hapi";
      link.click();
      URL.revokeObjectURL(file);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not download your license.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout
      title="Your HAPI account"
      description="Access your HAPI production license and billing portal."
    >
      <main className="pricingPage accountPage">
        <section className="pricingHero">
          <div className="container pricingHeroInner">
            <p className="pricingKicker">HAPI account</p>
            <h1>Activate your production license.</h1>
            <p>
              Checkout starts your purchase. Verify the same email here to
              access the license and manage billing.
            </p>
          </div>
        </section>
        <section className="pricingSection">
          <div className="container accountLayout">
            <div>
              <p className="pricingKicker">What happens next</p>
              <h2>Payment and activation are separate on purpose.</h2>
              <p>
                Stripe confirms payment. HAPI then issues an offline-capable
                license for that paid period. A short delay after Checkout is
                normal while the verified payment event arrives.
              </p>
            </div>
            <div className="accountPanel" aria-live="polite">
              {state === "checking" && <p>Checking your account…</p>}
              {(state === "signed-out" || state === "error") && (
                <>
                  <h2>Sign in with your Checkout email</h2>
                  <p>
                    Use the work email supplied at Stripe Checkout. No password
                    is required.
                  </p>
                  <form className="pricingForm" onSubmit={sendCode}>
                    <label htmlFor="account-email">
                      Checkout email
                      <input
                        id="account-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </label>
                    <input
                      type="submit"
                      className="button button--primary button--lg"
                      value={busy ? "Sending…" : "Email me a code"}
                      disabled={busy}
                    />
                  </form>
                  {codeSent && (
                    <form
                      className="pricingForm accountVerifyForm"
                      onSubmit={verifyCode}
                    >
                      <label htmlFor="account-otp">
                        Six-digit code
                        <input
                          id="account-otp"
                          name="otp"
                          inputMode="numeric"
                          pattern="[0-9]{6}"
                          required
                          autoComplete="one-time-code"
                          value={otp}
                          onChange={(event) => setOtp(event.target.value)}
                        />
                      </label>
                      <input
                        type="submit"
                        className="button button--primary button--lg"
                        value={busy ? "Verifying…" : "Verify and continue"}
                        disabled={busy}
                      />
                    </form>
                  )}
                </>
              )}
              {state === "pending" && (
                <>
                  <h2>Activation is pending</h2>
                  <p>
                    We found your verified email, but a paid invoice has not
                    finished provisioning a license yet. Refresh in a few
                    minutes; do not purchase again.
                  </p>
                  <button
                    type="button"
                    className="button button--lg pricingButtonSecondary"
                    onClick={() => void refreshAccount()}
                    disabled={busy}
                  >
                    Refresh status
                  </button>
                </>
              )}
              {state === "provisioned" && (
                <>
                  <h2>
                    Your {summary?.plan === "pro" ? "Pro" : "Starter"} license
                    is ready
                  </h2>
                  <p>
                    {summary?.licenseExpiresAt && (
                      <>
                        Current paid period ends{" "}
                        {new Date(
                          summary.licenseExpiresAt,
                        ).toLocaleDateString()}
                        .
                      </>
                    )}{" "}
                    Download the current license for your production deployment,
                    or use Stripe to manage payment details and subscription
                    settings.
                  </p>
                  <div className="accountActions">
                    <button
                      type="button"
                      className="button button--primary button--lg"
                      onClick={() => void downloadLicense()}
                      disabled={busy}
                    >
                      Download license
                    </button>
                    <form method="post" action={billingEndpoints.portal}>
                      <input
                        type="submit"
                        className="button button--lg pricingButtonSecondary"
                        value="Manage billing in Stripe"
                      />
                    </form>
                  </div>
                </>
              )}
              {message && (
                <p className="accountMessage" role="status">
                  {message}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
