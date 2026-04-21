import React, { useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { CheckCircle } from 'lucide-react';
import '@site/src/css/forms-pages.css';

const benefits = [
  {
    icon: '⚡',
    title: 'Early Access',
    desc: 'Be first to know about new HAPI Stack features, CLI updates, and beta releases.',
  },
  {
    icon: '🛠️',
    title: 'Developer Insights',
    desc: 'Deep dives into MCP architecture, OpenAPI patterns, and production best practices.',
  },
  {
    icon: '🤖',
    title: 'AI Tools Landscape',
    desc: 'Curated roundups on the MCP ecosystem, new clients, and AI tooling trends.',
  },
  {
    icon: '🎁',
    title: 'Exclusive Offers',
    desc: 'Special pricing, lifetime deals, and beta invites only for subscribers.',
  },
];

// @note: This form is structured as static HTML for HubSpot compliance
// We use inline preventDefault in the form element to avoid navigation while allowing HubSpot to track
// See: https://knowledge.hubspot.com/forms/use-non-hubspot-forms

export default function GetTheNews(): ReactNode {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    return false;
  };

  return (
    <Layout
      title="Get the Newsletter"
      description="Stay updated with the latest HAPI Stack developments, MCP tooling news, and exclusive developer insights. No spam, ever.">
      <Head>
        <meta property="og:title" content="HAPI MCP Newsletter — Stay Ahead of the AI Tools Revolution" />
        <meta
          property="og:description"
          content="Join thousands of developers building with MCP. Get early access, deep-dive insights, and exclusive offers."
        />
      </Head>

      {/* Hero */}
      <section className="mcpHero mcpNewsHero">
        <div className="container">
          <span className="mcpSectionBadge">Newsletter</span>
          <h1 className="mcpHeroTitle">
            Stay Ahead of the<br />
            <strong>AI Tools Revolution</strong>
          </h1>
          <p className="mcpHeroSubtitle">
            Join developers building production-ready MCP integrations.<br />
            <strong>No fluff. No spam. Just signal.</strong>
          </p>
        </div>
      </section>

      {/* Form + Benefits */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpNewsLayout">

            {/* Form card */}
            <div className="mcpNewsFormCard">
              {submitted ? (
                <div className="mcpFormThanks">
                  <CheckCircle className="mcpFormThanksIcon" />
                  <h2>You're in! 🎉</h2>
                  <p>
                    Thanks for subscribing. We'll send you the latest HAPI Stack news, insights, and
                    exclusive offers — straight to your inbox.
                  </p>
                  <p className="mcpExitFooter">Check your inbox for a confirmation email.</p>
                </div>
              ) : (
                <>
                  <h2 className="mcpNewsFormTitle">Get the Newsletter</h2>
                  <p className="mcpNewsFormSubtitle">One focused email per week. Unsubscribe anytime.</p>

                  <form method="POST" action="#" onSubmit={handleSubmit} className="mcpExitForm">
                    <div className="mcpFormGrid" style={{ marginBottom: '0.6rem' }}>
                      <div>
                        <label htmlFor="gtn-firstname" className="mcpLabel">First Name</label>
                        <input
                          id="gtn-firstname"
                          name="firstname"
                          type="text"
                          placeholder="Your first name"
                          className="mcpExitInput"
                        />
                      </div>
                      <div>
                        <label htmlFor="gtn-lastname" className="mcpLabel">Last Name</label>
                        <input
                          id="gtn-lastname"
                          name="lastname"
                          type="text"
                          placeholder="Your last name"
                          className="mcpExitInput"
                        />
                      </div>
                    </div>

                    <label htmlFor="gtn-email" className="mcpLabel">Email *</label>
                    <input
                      id="gtn-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="mcpExitInput"
                      style={{ marginBottom: '0.75rem' }}
                    />

                    <input
                      type="submit"
                      value="Subscribe — It's Free →"
                      className="mcpFormSubmit"
                    />
                  </form>

                  <p className="mcpExitFooter" style={{ marginTop: '1rem' }}>
                    No spam, ever. Unsubscribe with one click. We respect your privacy.
                  </p>
                </>
              )}
            </div>

            {/* Benefits sidebar */}
            <div>
              <p className="mcpNewsBenefitsTitle">What you'll get</p>
              <div className="mcpNewsBenefitsList">
                {benefits.map((b, i) => (
                  <div key={i} className="mcpNewsBenefit">
                    <div className="mcpNewsBenefitIcon" aria-hidden>{b.icon}</div>
                    <div>
                      <div className="mcpNewsBenefitTitle">{b.title}</div>
                      <div className="mcpNewsBenefitDesc">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <h2 className="mcpSectionTitle">Trusted by developers worldwide</h2>
            <p className="mcpSectionSubtitle">
              A growing community of engineers turning existing APIs into AI-ready MCP servers —
              without rewrites, without shadow systems.
            </p>
          </div>
          <div className="mcpNewsStats">
            <div className="mcpNewsStat">
              <div className="mcpNewsStatNum">2,000+</div>
              <div className="mcpNewsStatLabel">Subscribers</div>
            </div>
            <div className="mcpNewsStat">
              <div className="mcpNewsStatNum">Weekly</div>
              <div className="mcpNewsStatLabel">Delivery</div>
            </div>
            <div className="mcpNewsStat">
              <div className="mcpNewsStatNum">0</div>
              <div className="mcpNewsStatLabel">Spam Emails</div>
            </div>
            <div className="mcpNewsStat">
              <div className="mcpNewsStatNum">1-click</div>
              <div className="mcpNewsStatLabel">Unsubscribe</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
