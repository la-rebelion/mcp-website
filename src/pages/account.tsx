import React, { type ReactNode } from "react";
import Layout from "@theme/Layout";
import { BOOKING_URL } from "@site/src/lib/booking";
import "@site/src/css/pricing.css";

// @todo: Temporary. License activation and billing are handled through a booked call until
// the self-serve account flow is re-enabled (previous implementation is in git history).
export default function Account(): ReactNode {
  return (
    <Layout
      title="Your HAPI account"
      description="Access your HAPI production license and billing."
    >
      <main className="pricingPage accountPage">
        <section className="pricingHero">
          <div className="container pricingHeroInner">
            <p className="pricingKicker">HAPI account</p>
            <h1>Activate your production license.</h1>
            <p>
              Book a call and we will set up your license and billing with you.
            </p>
            <a
              className="button button--primary button--lg"
              href={BOOKING_URL}
            >
              Book a call
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
