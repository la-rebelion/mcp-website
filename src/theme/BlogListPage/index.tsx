/**
 * Customized BlogListPage with a branded hero header.
 */
import React, { type ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type { Props } from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import Link from '@docusaurus/Link';
import { ExitIntentModal } from '@site/src/components/ExitIntentModal';
import { useExitIntent } from "@site/src/hooks/useExitIntent";
import { DemoRequestModal } from '@site/src/components/DemoRequestModal';
import { HowItWorks } from '@site/src/components/sections/HowItWorks';

function BlogListPageMetadata(props: Props): ReactNode {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function Hero(): ReactNode {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  return (
    <div className="mcpHero">
      {/* Electric particles overlay */}
      <div className="electricParticles" aria-hidden="true">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>
      <div className="container">
        {/* Badge for credibility */}
        <div className="mcpHeroBadge">
          <span className="mcpBadgeIcon">✨</span>
          <span>MCP With No Shadows</span>
        </div>
        
        <h1 className="mcpHeroTitle">
          Stop Building Shadow Systems. Make Your APIs AI-Ready <strong>Today</strong>.
        </h1>
        <p className="mcpHeroSubtitle">
          <strong>HAPI MCP</strong> — The Headless API Stack for Model Context Protocol<br/>
          No shadow code. No shadow IT. Just your APIs, instantly connected to AI agents.
        </p>
        <p className="mcpHeroDescription">
          Turn your existing OpenAPI specs into MCP tools in <strong>seconds! Not months</strong>. 
          No rewrites, no duplicate logic, no technical debt. Your APIs become AI-ready while you keep control.
        </p>
        <div className="mcpHeroCtas">
          <Link className="button button--primary button--lg" href="https://docs.mcp.com.ai">
            Get Started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }} aria-hidden>
              <path d="M5 12h12M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link className="button button--lg mcpBtnSecondary" href="https://run.mcp.com.ai/">
            Try runMCP
          </Link>
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="button button--lg mcpBtnOutline">
            Request Demo
          </button>
          <DemoRequestModal
            open={isDemoModalOpen}
            onClose={() => setIsDemoModalOpen(false)}
          />
        </div>
        {/* Quick install command */}
        <div className="mcpInstallBox">
          <code className="mcpInstallCode">
            <span className="mcpInstallPrefix">$</span> curl -fsSL https://get.mcp.com.ai/hapi.sh | bash
          </code>
          <button className="mcpCopyBtn" title="Copy to clipboard" aria-label="Copy install command">📋</button>
        </div>
      </div>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="mcpPill">{children}</span>;
}

function FeatureCard({ title, children, icon }: { title: string; children: ReactNode; icon: ReactNode }) {
  return (
    <div className="mcpCard mcpCard--feature">
      <div className="mcpCardIcon" aria-hidden>{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function UseCaseCard({ title, children, icon }: { title: string; children: ReactNode; icon: ReactNode }) {
  return (
    <div className="mcpCard mcpCard--usecase">
      <div className="mcpCardIcon" aria-hidden>{icon}</div>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}

function BadgeRow(): ReactNode {
  return (
    <div className="mcpBadgeRow">
      <Pill>OAS</Pill>
      <Pill>MCP</Pill>
      <Pill>Arazzo</Pill>
      <Pill>LLMs</Pill>
    </div>
  );
}

function NewsletterAndDemo() {
  const [subscribed, setSubscribed] = useState(false);
  const [requested, setRequested] = useState(false);
  return (
    <section className="mcpSection mcpSection--alt">
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <div className="mcpPanel">
              <h3>Get the HAPI MCP Briefing</h3>
              <p>Monthly, tactical updates on MCP, OpenAPI-first patterns, and how teams ship AI without rewrites.</p>
              {subscribed ? (
                <p className="mcpSuccess">Thanks! Check your inbox to confirm.</p>
              ) : (
                <form
                  className="mcpForm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}>
                  <input className="mcpInput" type="email" name="email" placeholder="you@company.com" required />
                  <button className="button button--primary" type="submit">Subscribe</button>
                </form>
              )}
            </div>
          </div>
          <div className="col col--6">
            <div className="mcpPanel">
              <h3>Request a Demo</h3>
              <p>See HAPI MCP in action — from spec to MCP tools to OrcA-run workflows across QBot and chatMCP.</p>
              {requested ? (
                <p className="mcpSuccess">Thanks! We’ll reach out shortly.</p>
              ) : (
                <form
                  className="mcpForm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRequested(true);
                  }}>
                  <input className="mcpInput" type="text" name="name" placeholder="Full name" required />
                  <input className="mcpInput" type="email" name="email" placeholder="you@company.com" required />
                  <button className="button mcpBtnSecondary" type="submit">Request demo</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LandingSections() {
  return (
    <>
      {/* Value proposition - Problem Matching Strategy */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">The Problem</span>
            <h2 className="mcpSectionTitle">AI Projects Fail When They Create Shadow Systems</h2>
            <p className="mcpSectionSubtitle">
              Teams rebuild API logic in agent code. Duplicate business rules in LLM prompts. 
              Lose governance. Accumulate technical debt. <strong>There's a better way.</strong>
            </p>
          </div>
          <div className="row" style={{ marginTop: '2rem' }}>
            <div className="col col--6">
              <h3>HAPI MCP — Your APIs, AI-Ready. No Shadows.</h3>
              <BadgeRow />
              <p>
                <strong>No shadow code:</strong> Your API is the single source of truth. No duplicate logic in agent layers.<br/>
                <strong>No shadow IT:</strong> Same auth, same policies, same audit trails. Governance flows through automatically.<br/>
                <strong>No rewrites:</strong> OpenAPI specs become MCP tools instantly. Update the spec, tools update.
              </p>
              <p>
                Works with your existing stack: HAPI Server for auto-generation, runMCP for scaling, 
                OrcA for orchestration, QBot + chatMCP for interfaces. Deploy in seconds! Not hours, not weeks.
              </p>
              <div className="mcpHeroCtas" style={{ justifyContent: 'flex-start' }}>
                <Link className="button button--primary" href="https://docs.mcp.com.ai">Read the Docs</Link>
                <Link className="button mcpBtnSecondary" href="/#how-it-works">See How It Works</Link>
              </div>
            </div>
            <div className="col col--6">
              <div className="mcpIllustration" aria-hidden>
                <svg viewBox="0 0 520 260" width="100%" height="auto">
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1193b0" />
                      <stop offset="100%" stopColor="#da7756" />
                    </linearGradient>
                  </defs>
                  <rect x="1" y="1" width="518" height="258" rx="16" fill="none" stroke="url(#g)" strokeWidth="2" />
                  <g>
                    <rect x="40" y="60" width="180" height="60" rx="10" fill="#0ea5b90f" stroke="#1193b0" />
                    <text x="130" y="95" textAnchor="middle" fontFamily="inherit" fontSize="16" fill="#1193b0">Design</text>
                    <text x="130" y="140" textAnchor="middle" fontFamily="inherit" fontSize="12" fill="#1193b0">OAS / Arazzo</text>
                    <text x="130" y="160" textAnchor="middle" fontFamily="inherit" fontSize="12" fill="#1193b0">YAML / JSON</text>
                    <circle cx="220" cy="90" r="18" fill="#da7756" />
                    <text x="220" y="95" textAnchor="middle" fontFamily="inherit" fontSize="12" fill="#fff">HAPI</text>

                    <line x1="238" y1="90" x2="292" y2="90" stroke="#888" strokeWidth="2" markerEnd="url(#arrow)" />
                    <rect x="300" y="60" width="180" height="60" rx="10" fill="#f973160f" stroke="#da7756" />
                    <text x="390" y="95" textAnchor="middle" fontFamily="inherit" fontSize="16" fill="#da7756">Runtime</text>
                    <text x="390" y="140" textAnchor="middle" fontFamily="inherit" fontSize="12" fill="#da7756">Agents On-Premise / Cloudflare</text>
                    <text x="390" y="160" textAnchor="middle" fontFamily="inherit" fontSize="12" fill="#da7756">JSONRPC / HTTP</text>
                    <circle cx="300" cy="90" r="18" fill="#1193b0" />
                    <text x="300" y="95" textAnchor="middle" fontFamily="inherit" fontSize="12" fill="#fff">MCP</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div id="how-it-works" className="mcpSection">
        <HowItWorks />
      </div>

      <div className="mcpSection mcpSection--alt">
        <NewsletterAndDemo />
      </div>

      {/* Features - Urgency & Value Strategy */}
      <section className="mcpSection">
        <div className="container">
          <div className="mcpSectionHeader">
            <span className="mcpSectionBadge">Impact</span>
            <h2 className="mcpSectionTitle">Why Teams Choose HAPI MCP</h2>
            <p className="mcpSectionSubtitle">
              Real business value. No technical debt. Deploy AI faster without compromising governance.
            </p>
          </div>
          <div className="mcpGrid">
            <FeatureCard title="Zero Shadow Code" icon={<span className="mcpIcon">🚫</span>}>
              Your APIs are the runtime. No duplicate logic in agent layers. One source of truth, always in sync.
            </FeatureCard>
            <FeatureCard title="Deploy in Seconds" icon={<span className="mcpIcon">⚡</span>}>
              OpenAPI to MCP tools automatically. What takes competitors months happens before you finish your coffee.
            </FeatureCard>
            <FeatureCard title="Keep Governance" icon={<span className="mcpIcon">🛡</span>}>
              Auth, RBAC, rate limits, audit trails—inherited from your APIs. Compliance teams sleep better.
            </FeatureCard>
            <FeatureCard title="Scale Effortlessly" icon={<span className="mcpIcon">📈</span>}>
              runMCP handles serverless elasticity and long-running tasks. Cold-start fast, stay warm for throughput.
            </FeatureCard>
            <FeatureCard title="Predictable Workflows" icon={<span className="mcpIcon">🎯</span>}>
              OrcA orchestrates multi-step tasks deterministically. No brittle prompt chains or guesswork.
            </FeatureCard>
            <FeatureCard title="Stay Portable" icon={<span className="mcpIcon">🔄</span>}>
              Works with any MCP client—ChatGPT, Claude, QBot, custom agents. No vendor lock-in.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <h2 className="mcpCenter">Who Wins With HAPI</h2>
          <div className="mcpGrid mcpGrid--usecases">
            <UseCaseCard title="Executives" icon={<span className="mcpIcon">💼</span>}>
              Ship AI initiatives without ballooning cost. Keep teams focused on outcomes, not rewrites and integration sprawl.
            </UseCaseCard>
            <UseCaseCard title="Architects & PMs" icon={<span className="mcpIcon">⌘</span>}>
              Design with OpenAPI/Arazzo, run with MCP. Clear contracts, policy inheritance, and versioned workflows keep risk low.
            </UseCaseCard>
            <UseCaseCard title="Engineers & Ops" icon={<span className="mcpIcon">🛠</span>}>
              Deploy once. HAPI Server + runMCP scale tools; QBot/chatMCP give fast feedback; OrcA keeps executions deterministic.
            </UseCaseCard>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="mcpSection">
        <div className="container">
          <h2 className="mcpCenter">Your Stack, Already Wired</h2>
          <div className="mcpGrid">
            <FeatureCard title="HAPI Server" icon={<span className="mcpIcon">⟡</span>}>
              Turns OpenAPI into MCP tools automatically—contracts stay in sync with your source of truth.
            </FeatureCard>
            <FeatureCard title="runMCP" icon={<span className="mcpIcon">⚙</span>}>
              Autoscaling execution and testing for MCP tools; cold-start fast, stay warm when workflows run long.
            </FeatureCard>
            <FeatureCard title="OrcA" icon={<span className="mcpIcon">🧭</span>}>
              Deterministic planning and orchestration for multi-tool tasks; no brittle prompt spaghetti.
            </FeatureCard>
            <FeatureCard title="QBot" icon={<span className="mcpIcon">⌨</span>}>
              CLI TUI for power users to interact with MCP tools directly from terminal or scripts.
            </FeatureCard>
            <FeatureCard title="chatMCP" icon={<span className="mcpIcon">💬</span>}>
              Conversational client that speaks MCP natively for support, ops, and internal assistants.
            </FeatureCard>
            <FeatureCard title="Agents" icon={<span className="mcpIcon">🤖</span>}>
              Build agentic systems from standard APIs—no custom glue. Connect MCP clients across platforms.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <h2 className="mcpCenter">What Teams Say</h2>
          <div className="mcpGrid mcpGrid--testimonials">
            <blockquote className="mcpQuote">“We pointed HAPI at our Swagger and had MCP tools in production in a week.”
              {/* <footer>CTO, Fintech</footer> */}
            </blockquote>
            <blockquote className="mcpQuote">“Security loved it—policies and audit trails stayed exactly as before.”
              {/* <footer>Head of Risk, Enterprise</footer> */}
            </blockquote>
            <blockquote className="mcpQuote">“OrcA plus runMCP gave us deterministic, scalable workflows without prompt spaghetti.”{/* <footer>Director of AI, SaaS</footer> */}</blockquote>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mcpSection">
        <div className="container">
          <h2 className="mcpCenter">FAQs</h2>
          <div className="mcpFaq">
            <details>
              <summary>Do we need to rewrite our services?</summary>
              <p>No. HAPI MCP lifts your existing OpenAPI specs directly into MCP tools. Your auth, validation, and business rules remain unchanged.</p>
            </details>
            <details>
              <summary>Is this just another MCP server?</summary>
              <p>It’s the Headless API model: your API is the runtime. HAPI Server reflects it as MCP; runMCP scales it; OrcA orchestrates it. No duplicate logic.</p>
            </details>
            <details>
              <summary>Which clients can consume the tools?</summary>
              <p>Any MCP client: ChatGPT, Claude, QBot, Agentico.dev, chatMCP, bespoke orchestrators—vendor-neutral by design.</p>
            </details>
            <details>
              <summary>How do we keep control and compliance?</summary>
              <p>Your API remains the single source of truth. Policies, RBAC, rate limits, and audit logs flow through automatically; no shadow logic.</p>
            </details>
            <details>
              <summary>What about security and privacy?</summary>
              <p>Scoped credentials, per-tool permissions, and auditable calls are inherited from your API layer. HAPI adds guardrails and observability for regulated environments.</p>
            </details>
          </div>
        </div>
      </section>

      <NewsletterAndDemo />
    </>
  );
}

function BlogListPageContent(props: Props): ReactNode {
  const { metadata, items, sidebar } = props;
  const isHome = metadata.permalink === '/';
  const { showExitIntent, closeExitIntent } = useExitIntent();
  if (isHome) {
    const INITIAL_POSTS = 8;
    const recentPosts = items.slice(0, INITIAL_POSTS);

    return (
      <>
        <Hero />
        <LandingSections />
        <section className="mcpSection">
          <div className="container">
            <div className="mcpHeaderRow">
              <h2>Recent Posts</h2>
              <div>
                <Link className="button button--sm" href="/archive">View all</Link>
              </div>
            </div>
            <BlogLayout sidebar={sidebar}>
              <div className="blog-list-page blog-list-grid">
                <BlogPostItems items={recentPosts} />
              </div>
              <div className="mcpListActions">
                <Link className="button button--primary button--lg" href="/archive">
                  View all posts
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }} aria-hidden>
                    <path d="M5 12h12M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
              <ExitIntentModal open={showExitIntent} onClose={closeExitIntent} />
            </BlogLayout>
          </div>
        </section>
      </>
    );
  }

  // Non-home blog pages keep the default layout
  return (
    <BlogLayout sidebar={sidebar}>
      <div className="blog-list-page">
        <BlogPostItems items={items} />
        <BlogListPaginator metadata={metadata} />
      </div>
    </BlogLayout>
  );
}

// Simple intersection observer to animate cards/pills on entry
export function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targets = Array.from(
      document.querySelectorAll('.mcpCard, .mcpPill, .blog-list-page article'),
    );
    if (!('IntersectionObserver' in window) || targets.length === 0) return;
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function BlogListPage(props: Props): ReactNode {
  useRevealOnScroll();
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
