import React, { useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { CheckCircle } from 'lucide-react';
import '@site/src/css/forms-pages.css';

// @note: This form is structured as static HTML for HubSpot compliance
// We use inline preventDefault in the form element to avoid navigation while allowing HubSpot to track
// See: https://knowledge.hubspot.com/forms/use-non-hubspot-forms

const diyCons = [
  'Hours or days reading protocol docs',
  'Requires writing & maintaining code',
  'Manual sync every time your API changes',
  'You figure out auth, hosting, and tooling',
  'Non-technical teammates are on their own',
  'Breaks when MCP spec updates',
];

const hapiPros = [
  'Live in 60 seconds — or we build it for you',
  'Zero code required on your end',
  'Auto-syncs as your API evolves',
  'Auth, hosting, and tooling: handled',
  'Plain-English scoping for any team',
  'Always up-to-date with the MCP spec',
];

const steps = [
  {
    num: '1',
    title: 'Tell us about your project',
    desc: '2-minute form below. No jargon required.',
  },
  {
    num: '2',
    title: 'Free scoping call',
    desc: "We review your setup and send a clear plan + quote within 1 business day.",
  },
  {
    num: '3',
    title: 'Your MCP goes live',
    desc: 'We build, deploy, and hand it over. Ongoing sync included.',
  },
];

export default function GetMyMcp(): ReactNode {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement): Record<string, string> => {
    const data = new FormData(form);
    const next: Record<string, string> = {};
    const email = String(data.get('email') || '').trim();
    if (!email) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.';
    const firstname = String(data.get('firstname') || '').trim();
    if (!firstname) next.firstname = 'Your name is required.';
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
      title="Get My MCP — We Build It For You"
      description="Turn your API into an AI-ready MCP server without writing a single line of code. We build it for you — whether you're a developer or a business owner.">
      <Head>
        <meta property="og:title" content="Get My MCP Server — Built For You in 60 Seconds" />
        <meta
          property="og:description"
          content="Have an API? We turn it into a production-ready MCP server. No code. No rewrites. Works with ChatGPT, Claude, and any MCP client."
        />
      </Head>

      {/* ── Hero ── */}
      <section className="mcpHero mcpGetMcpHero">
        <div className="container">
          <span className="mcpSectionBadge">Done For You</span>
          <h1 className="mcpHeroTitle">
            Your API, Talking to AI.<br />
            <strong>We Build It For You.</strong>
          </h1>
          <p className="mcpHeroSubtitle">
            Whether you have a production API or just a napkin sketch of what you need —
            we turn it into a <strong>production-ready MCP server</strong> without you
            writing a single line of code.
          </p>
          <p className="mcpHeroDescription">
            Works with ChatGPT, Claude, and any MCP-compatible AI agent.
            No rewrites. No shadow systems. No surprise invoices.
          </p>
          <div className="mcpGetMcpHeroActions">
            <a className="button button--primary button--lg" href="#get-started">
              Get My MCP Built →
            </a>
            <Link className="button button--lg mcpBtnOutline" href="/pricing">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who is this for? ── */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Two Types of Builders</span>
            <h2 className="mcpSectionTitle">Which one are you?</h2>
            <p className="mcpSectionSubtitle">
              We work with both — the form at the bottom adapts to your situation.
            </p>
          </div>
          <div className="mcpAudienceGrid">
            <div className="mcpAudienceCard mcpAudienceCard--dev">
              <span className="mcpAudienceEmoji">🧑‍💻</span>
              <h3>I'm a Developer</h3>
              <p>
                I have APIs, OpenAPI specs, maybe a staging environment. I know what MCP is —
                I just don't want to spend a sprint building the boilerplate when HAPI can
                do it in 60 seconds.
              </p>
              <span className="mcpAudienceTag">Ship faster</span>
            </div>
            <div className="mcpAudienceCard mcpAudienceCard--biz">
              <span className="mcpAudienceEmoji">🏢</span>
              <h3>I'm a Business Owner</h3>
              <p>
                I have a product or service. I want AI assistants to be able to use it,
                recommend it, or interact with it. I don't know what an API is, and that's
                perfectly fine — we'll figure it out together.
              </p>
              <span className="mcpAudienceTag">Zero tech required</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpSectionHeader">
            <h2 className="mcpSectionTitle">How it works</h2>
            <p className="mcpSectionSubtitle">Three steps. The first one takes two minutes.</p>
          </div>
          <div className="mcpSteps">
            {steps.map((s) => (
              <div key={s.num} className="mcpStep">
                <div className="mcpStepNum">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why HAPI vs DIY ── */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Why HAPI over DIY?</span>
            <h2 className="mcpSectionTitle">The official docs will teach you to fish. We bring the fish.</h2>
            <p className="mcpSectionSubtitle">
              The MCP specification is public, the SDKs are free, and the tutorials are great —
              if you have a week. We have you live before lunch.
            </p>
          </div>
          <div className="mcpVsGrid">
            <div className="mcpVsCard mcpVsCard--diy">
              <h4>🔧 Build it yourself</h4>
              <ul className="mcpVsList">
                {diyCons.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
            <div className="mcpVsCard mcpVsCard--hapi">
              <h4>⚡ HAPI MCP — Done For You</h4>
              <ul className="mcpVsList">
                {hapiPros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Form ── */}
      <section className="mcpSection" id="get-started">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Free Assessment</span>
            <h2 className="mcpSectionTitle">Let's Build Your MCP</h2>
            <p className="mcpSectionSubtitle">
              Answer a few questions so we can scope the work accurately.{' '}
              <strong>Takes 2 minutes.</strong> No obligation.
            </p>
          </div>

          <div className="mcpGetMcpFormWrap">
            {submitted ? (
              <div className="mcpFormThanks">
                <CheckCircle className="mcpFormThanksIcon" />
                <h2>We've got your request! 🚀</h2>
                <p>
                  Someone from our team will reach out within <strong>1 business day</strong> with
                  a clear roadmap and effort estimate.
                </p>
                <p>
                  In the meantime, feel free to explore the{' '}
                  <Link href="https://docs.mcp.com.ai/quickstart">quickstart docs</Link> or check
                  out our <Link href="/pricing">pricing</Link>.
                </p>
                <p className="mcpExitFooter" style={{ marginTop: '1rem' }}>
                  We respect your privacy. No spam. Ever.
                </p>
              </div>
            ) : (
              <form method="POST" action="#" onSubmit={handleSubmit} noValidate>

                {/* Contact */}
                <p className="mcpGetMcpFormTitle">Tell us about your project</p>
                <p className="mcpGetMcpFormSub">
                  No tech-speak required. Just tell us what you're trying to do.
                </p>

                <div className="mcpFormGrid" style={{ marginBottom: '0.75rem' }}>
                  <div className="mcpFormSection" style={{ marginBottom: 0 }}>
                    <label htmlFor="gm-firstname" className="mcpLabel">
                      Your Name *
                    </label>
                    <input
                      id="gm-firstname"
                      name="firstname"
                      type="text"
                      placeholder="First name"
                      required
                      className={`mcpExitInput${errors.firstname ? ' is-invalid' : ''}`}
                    />
                    {errors.firstname && (
                      <div className="mcpFieldError">{errors.firstname}</div>
                    )}
                  </div>
                  <div className="mcpFormSection" style={{ marginBottom: 0 }}>
                    <label htmlFor="gm-email" className="mcpLabel">
                      Work Email *
                    </label>
                    <input
                      id="gm-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className={`mcpExitInput${errors.email ? ' is-invalid' : ''}`}
                    />
                    {errors.email && (
                      <div className="mcpFieldError">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="mcpFormSection">
                  <label htmlFor="gm-goal" className="mcpLabel">
                    What do you want AI to be able to do?
                    <span className="mcpFormSectionHint">in plain English — no jargon needed</span>
                  </label>
                  <textarea
                    id="gm-goal"
                    name="message"
                    placeholder={'e.g. "I want ChatGPT to look up orders from our e-commerce platform" or "I want Claude to query our internal database and answer customer questions"'}
                    className="mcpExitInput"
                    style={{ minHeight: 88, resize: 'vertical', marginBottom: 0 }}
                  />
                </div>

                <hr className="mcpFormDivider" />

                {/* Q1: API ready? */}
                <div className="mcpFormSection">
                  <span className="mcpFormSectionLabel">
                    Do you have an API ready in production?
                    <span className="mcpFormSectionHint">(this helps us estimate the work)</span>
                  </span>
                  <div className="mcpRadioGroup">
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_status" value="production" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">✅</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Yes — deployed and documented</span>
                          <span className="mcpRadioCardSub">OpenAPI spec preferred, but not required</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_status" value="wip" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🔧</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Yes — but it's a work in progress</span>
                          <span className="mcpRadioCardSub">We can work with that</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_status" value="planned" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🌱</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Not yet — still building or planning</span>
                          <span className="mcpRadioCardSub">We can advise from the start</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_status" value="unknown" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🤷</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Honestly, not sure what an API is</span>
                          <span className="mcpRadioCardSub">That's fine — we speak human too</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Q2: Public availability */}
                <div className="mcpFormSection">
                  <span className="mcpFormSectionLabel">Is your API (or service) publicly accessible?</span>
                  <div className="mcpRadioGroup mcpRadioGroup--3">
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_public" value="public" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🌐</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Yes — publicly available</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_public" value="private" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🔒</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">No — internal / private network</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_public" value="na" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🤔</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Not applicable / not sure yet</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Q3: Authorization */}
                <div className="mcpFormSection">
                  <span className="mcpFormSectionLabel">
                    Does your API use authorization or authentication?
                    <span className="mcpFormSectionHint">e.g., API keys, OAuth, JWT</span>
                  </span>
                  <div className="mcpRadioGroup mcpRadioGroup--3">
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_auth" value="yes" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🔐</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Yes — it's locked down</span>
                          <span className="mcpRadioCardSub">API keys, OAuth, JWT, or similar</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_auth" value="open" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🌐</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">No — open for now</span>
                          <span className="mcpRadioCardSub">Or not applicable</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="api_auth" value="unknown" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🤷</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Not sure</span>
                          <span className="mcpRadioCardSub">Help me decide</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Q4: Deployment */}
                <div className="mcpFormSection">
                  <span className="mcpFormSectionLabel">Where will the MCP server be deployed?</span>
                  <div className="mcpRadioGroup">
                    <label className="mcpRadioCard">
                      <input type="radio" name="deployment" value="cloud" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">☁️</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Cloud</span>
                          <span className="mcpRadioCardSub">AWS, GCP, Azure, Cloudflare…</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="deployment" value="onprem" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🏢</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">On-premises</span>
                          <span className="mcpRadioCardSub">Private infrastructure or air-gap</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="deployment" value="hybrid" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🔀</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Hybrid</span>
                          <span className="mcpRadioCardSub">Mix of cloud and on-prem</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="radio" name="deployment" value="unknown" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🤷</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Not sure yet</span>
                          <span className="mcpRadioCardSub">Help me decide</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Q5: AI target */}
                <div className="mcpFormSection">
                  <span className="mcpFormSectionLabel">
                    Which AI assistant should use your MCP?
                    <span className="mcpFormSectionHint">select all that apply</span>
                  </span>
                  <div className="mcpRadioGroup">
                    <label className="mcpRadioCard">
                      <input type="checkbox" name="ai_target" value="chatgpt" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🤖</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">ChatGPT / OpenAI</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="checkbox" name="ai_target" value="claude" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">🧠</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Claude (Anthropic)</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="checkbox" name="ai_target" value="custom" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">⚙️</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">Custom / internal agent</span>
                        </span>
                      </span>
                    </label>
                    <label className="mcpRadioCard">
                      <input type="checkbox" name="ai_target" value="all" />
                      <span className="mcpRadioCardContent">
                        <span className="mcpRadioCardEmoji">✨</span>
                        <span className="mcpRadioCardText">
                          <span className="mcpRadioCardLabel">All of them / not sure</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Q6: Timeline */}
                <div className="mcpFormSection">
                  <label htmlFor="gm-timeline" className="mcpLabel">
                    When do you need this live?
                  </label>
                  <select
                    id="gm-timeline"
                    name="timeline"
                    className="mcpExitInput"
                    style={{ cursor: 'pointer' }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select a timeline…</option>
                    <option value="asap">🚀 ASAP — I needed this yesterday</option>
                    <option value="1-3m">📅 Within 1–3 months</option>
                    <option value="3-6m">🔭 3–6 months, planning ahead</option>
                    <option value="exploring">🧐 Just exploring for now</option>
                  </select>
                </div>

                <hr className="mcpFormDivider" />

                {/* Company info for sizing */}
                <div className="mcpFormGrid" style={{ marginBottom: '1rem' }}>
                  <div className="mcpFormSection" style={{ marginBottom: 0 }}>
                    <label htmlFor="gm-company" className="mcpLabel">Company / Project name</label>
                    <input
                      id="gm-company"
                      name="company"
                      type="text"
                      placeholder="Your company or project"
                      className="mcpExitInput"
                    />
                  </div>
                  <div className="mcpFormSection" style={{ marginBottom: 0 }}>
                    <label htmlFor="gm-jobtitle" className="mcpLabel">Your Role</label>
                    <input
                      id="gm-jobtitle"
                      name="jobtitle"
                      type="text"
                      placeholder="e.g., CTO, Founder, Developer"
                      className="mcpExitInput"
                    />
                  </div>
                </div>

                <input
                  type="submit"
                  value="Get My Free Assessment →"
                  className="mcpFormSubmit"
                />

                <p className="mcpExitFooter" style={{ marginTop: '1rem' }}>
                  Free assessment. No obligation. No spam. We'll follow up within 1 business day.
                </p>
              </form>
            )}
          </div>

          {/* What happens next */}
          {!submitted && (
            <div style={{ maxWidth: 640, margin: '2.5rem auto 0', textAlign: 'center' }}>
              <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>What happens after you submit?</p>
              <p style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                We don't add you to a drip sequence. A real human reviews your answers.
              </p>
              <div className="mcpNextSteps">
                <div className="mcpNextStep">
                  <div className="mcpNextStepNum">1</div>
                  <strong>We review your project</strong>
                  <p>Within 1 business day, we assess complexity and effort.</p>
                </div>
                <div className="mcpNextStep">
                  <div className="mcpNextStepNum">2</div>
                  <strong>You get a clear plan</strong>
                  <p>Roadmap, timeline, and a transparent quote. No surprises.</p>
                </div>
                <div className="mcpNextStep">
                  <div className="mcpNextStepNum">3</div>
                  <strong>We build it together</strong>
                  <p>Or hand it off to you if you'd rather self-serve.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
