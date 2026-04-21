import React, { useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { CheckCircle } from 'lucide-react';
import '@site/src/css/forms-pages.css';

const whatToExpect = [
  {
    icon: '🎯',
    title: 'Personalized walkthrough',
    desc: 'A live demo tailored to your API stack and specific use case.',
  },
  {
    icon: '⚡',
    title: '30-minute session',
    desc: 'Focused on your key questions. No filler slides.',
  },
  {
    icon: '🛠️',
    title: 'Technical deep dive',
    desc: 'See HAPI MCP with your own OpenAPI specs — bring them if you have them.',
  },
  {
    icon: '💬',
    title: 'Open Q&A',
    desc: 'Ask anything: architecture, pricing, deployment, security, compliance.',
  },
];

const guarantees = [
  {
    icon: '🛡️',
    title: 'No obligation',
    desc: 'The demo is free. No credit card. No strings attached.',
  },
  {
    icon: '⚡',
    title: 'We come prepared',
    desc: "We'll research your stack beforehand so the demo is directly relevant to you.",
  },
  {
    icon: '🔒',
    title: 'Your data is safe',
    desc: 'We never share your contact information. Period.',
  },
];

// @note: This form is structured as static HTML for HubSpot compliance
// We use inline preventDefault in the form element to avoid navigation while allowing HubSpot to track
// See: https://knowledge.hubspot.com/forms/use-non-hubspot-forms

export default function RequestDemo(): ReactNode {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement): Record<string, string> => {
    const data = new FormData(form);
    const next: Record<string, string> = {};

    const email = String(data.get('email') || '').trim();
    if (!email) next.email = 'Work email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.';

    const phone = String(data.get('phone') || '').trim();
    if (phone && !/^[+()\d\s-]{7,}$/.test(phone)) next.phone = 'Enter a valid phone number.';

    return next;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(e.currentTarget);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return false;
    }
    setErrors({});
    setSubmitted(true);
    return false;
  };

  return (
    <Layout
      title="Request a Demo"
      description="See HAPI MCP in action. Get a personalized demo of how to turn your APIs into production-ready MCP servers in under 60 seconds.">
      <Head>
        <meta property="og:title" content="Request a HAPI MCP Demo" />
        <meta
          property="og:description"
          content="Get a personalized walkthrough of the HAPI Stack. Watch your API become an AI-ready MCP server in under 60 seconds."
        />
      </Head>

      {/* Hero */}
      <section className="mcpHero mcpDemoHero">
        <div className="container">
          <span className="mcpSectionBadge">Live Demo</span>
          <h1 className="mcpHeroTitle">
            See HAPI MCP<br />
            <strong>In Action</strong>
          </h1>
          <p className="mcpHeroSubtitle">
            A personalized walkthrough of the HAPI Stack.<br />
            Watch your API become an <strong>AI-ready MCP server in under 60 seconds</strong>.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpDemoLayout">

            {/* Form card */}
            <div className="mcpDemoFormCard">
              {submitted ? (
                <div className="mcpFormThanks">
                  <CheckCircle className="mcpFormThanksIcon" />
                  <h2>Demo Request Received!</h2>
                  <p>
                    Thanks for reaching out. A member of our team will contact you within one
                    business day to schedule your personalized demo.
                  </p>
                  <p className="mcpExitFooter">Check your inbox for a confirmation email.</p>
                </div>
              ) : (
                <>
                  <h2 className="mcpDemoFormTitle">Request Your Demo</h2>
                  <p className="mcpDemoFormSubtitle">We'll reach out within 1 business day.</p>

                  <form method="POST" action="#" onSubmit={handleSubmit} noValidate className="mcpExitForm">

                    <div className="mcpFormGrid" style={{ marginBottom: '0.6rem' }}>
                      <div>
                        <label htmlFor="rd-firstname" className="mcpLabel">First Name *</label>
                        <input
                          id="rd-firstname"
                          name="firstname"
                          type="text"
                          placeholder="First name"
                          required
                          className="mcpExitInput"
                        />
                      </div>
                      <div>
                        <label htmlFor="rd-lastname" className="mcpLabel">Last Name</label>
                        <input
                          id="rd-lastname"
                          name="lastname"
                          type="text"
                          placeholder="Last name"
                          className="mcpExitInput"
                        />
                      </div>
                    </div>

                    <label htmlFor="rd-email" className="mcpLabel">Work Email *</label>
                    <input
                      id="rd-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className={`mcpExitInput${errors.email ? ' is-invalid' : ''}`}
                      style={{ marginBottom: errors.email ? 0 : '0.6rem' }}
                    />
                    {errors.email && (
                      <div className="mcpFieldError" style={{ marginBottom: '0.6rem' }}>
                        {errors.email}
                      </div>
                    )}

                    <div className="mcpFormGrid" style={{ marginBottom: '0.6rem' }}>
                      <div>
                        <label htmlFor="rd-company" className="mcpLabel">Company</label>
                        <input
                          id="rd-company"
                          name="company"
                          type="text"
                          placeholder="Your company"
                          className="mcpExitInput"
                        />
                      </div>
                      <div>
                        <label htmlFor="rd-jobtitle" className="mcpLabel">Role / Title</label>
                        <input
                          id="rd-jobtitle"
                          name="jobtitle"
                          type="text"
                          placeholder="e.g., CTO, Lead Engineer"
                          className="mcpExitInput"
                        />
                      </div>
                    </div>

                    <label htmlFor="rd-phone" className="mcpLabel">Phone</label>
                    <input
                      id="rd-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className={`mcpExitInput${errors.phone ? ' is-invalid' : ''}`}
                      style={{ marginBottom: errors.phone ? 0 : '0.6rem' }}
                    />
                    {errors.phone && (
                      <div className="mcpFieldError" style={{ marginBottom: '0.6rem' }}>
                        {errors.phone}
                      </div>
                    )}

                    <label htmlFor="rd-message" className="mcpLabel">What would you like to see?</label>
                    <textarea
                      id="rd-message"
                      name="message"
                      placeholder="Describe your use case or any specific questions for the demo..."
                      className="mcpExitInput"
                      style={{ minHeight: 90, marginBottom: '0.75rem', resize: 'vertical' }}
                    />

                    <input
                      type="submit"
                      value="Request My Demo →"
                      className="mcpFormSubmit"
                    />
                  </form>

                  <p className="mcpExitFooter" style={{ marginTop: '1rem' }}>
                    We respect your privacy. Your info is used solely to schedule your demo.
                  </p>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <p className="mcpDemoSidebarTitle">What to expect</p>
              <div className="mcpDemoExpectList">
                {whatToExpect.map((item, i) => (
                  <div key={i} className="mcpDemoExpect">
                    <div className="mcpDemoExpectIcon" aria-hidden>{item.icon}</div>
                    <div>
                      <div className="mcpDemoExpectTitle">{item.title}</div>
                      <div className="mcpDemoExpectDesc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mcpDemoTrustBlock">
                <h4>Trusted by engineering teams</h4>
                <p>
                  Teams using HAPI MCP report going from API to AI-ready tools in{' '}
                  <strong>under 60 seconds</strong>. No rewrites. No shadow systems.
                  No duplicate logic.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <h2 className="mcpSectionTitle">Zero-risk guarantee</h2>
            <p className="mcpSectionSubtitle">
              We want you to feel great about booking a demo. Here's our promise:
            </p>
          </div>
          <div className="mcpDemoGuarantees">
            {guarantees.map((g, i) => (
              <div key={i} className="mcpDemoGuarantee">
                <div className="mcpDemoGuaranteeIcon" aria-hidden>{g.icon}</div>
                <h4>{g.title}</h4>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
