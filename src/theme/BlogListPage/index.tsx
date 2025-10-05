/**
 * Customized BlogListPage with a branded hero header.
 */
import React, { type ReactNode, useEffect, useRef, useState } from 'react';
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
      <div className="container">
        <h1 className="mcpHeroTitle">Separate Design from Runtime in AI Agent Development</h1>
        <p className="mcpHeroSubtitle">
          Clear thinking about the Model Context Protocol: limitations, misconceptions,
          and practical patterns for building reliable agent systems. Learn from
          deep dives and hands-on guidance.
        </p>
        <div className="mcpHeroCtas">
          <Link className="button button--primary button--lg" href="https://docs.mcp.com.ai">
            Read the MCP Docs
          </Link>
          {/* <Link className="button button--lg mcpBtnSecondary" href="https://run.mcp.com.ai/">
            Try Run MCP
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }} aria-hidden>
              <path d="M5 12h12M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link> */}
          <button
            type="button"
            className="button button--lg mcpBtnSecondary"
            onClick={() => setIsDemoModalOpen(true)}>
            Request a Demo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }} aria-hidden>
              <path d="M5 12h12M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <DemoRequestModal
            open={isDemoModalOpen}
            onClose={() => setIsDemoModalOpen(false)}
          />
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
              <h3>Subscribe to the Newsletter</h3>
              <p>Insights on MCP, patterns, pitfalls, and hands-on examples delivered monthly.</p>
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
              <p>See HAPI MCP in action — the convergence of OAS, MCP, Arazzo, and LLMs.</p>
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
      {/* Value proposition */}
      <section className="mcpSection">
        <div className="container">
          <div className="row">
            <div className="col col--6">
              <h2>Model Context Protocol (MCP)</h2>
              <BadgeRow />
              <p>
                We see HAPI MCP as the convergence layer between OpenAPI (OAS), MCP, Arazzo, and LLMs — “OAS v4” for
                AI and agentic workflows. It separates design from runtime, bringing modularity, reliability, and
                observability to AI systems.
              </p>
              <div className="mcpHeroCtas" style={{ justifyContent: 'flex-start' }}>
                <Link className="button button--primary" href="https://docs.mcp.com.ai">Explore the Docs</Link>
                <Link className="button mcpBtnSecondary" href="https://hapi.mcp.com.ai/">HAPI Server</Link>
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
                    <rect x="300" y="60" width="180" height="60" rx="10" fill="#f973160f" stroke="#da7756" />
                    <text x="390" y="95" textAnchor="middle" fontFamily="inherit" fontSize="16" fill="#da7756">Runtime</text>
                    <circle cx="260" cy="90" r="18" fill="#1193b0" />
                    <text x="260" y="95" textAnchor="middle" fontFamily="inherit" fontSize="12" fill="#fff">MCP</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <h2 className="mcpCenter">Key Benefits</h2>
          <div className="mcpGrid">
            <FeatureCard title="Modularity" icon={<span className="mcpIcon">▣</span>}>
              Separate design artifacts (prompts, tools, policies) from runtime execution for faster iteration.
            </FeatureCard>
            <FeatureCard title="Scalability" icon={<span className="mcpIcon">⇲</span>}>
              Standardized interfaces enable interoperable agents and services across teams and infra.
            </FeatureCard>
            <FeatureCard title="Reliability" icon={<span className="mcpIcon">✓</span>}>
              Deterministic contracts with validation make agent behavior predictable and testable.
            </FeatureCard>
            <FeatureCard title="Observability" icon={<span className="mcpIcon">◷</span>}>
              Inspect flows, events, and metrics to continuously improve quality and safety.
            </FeatureCard>
            <FeatureCard title="Security" icon={<span className="mcpIcon">⊛</span>}>
              Principle-of-least-privilege for tools and data access with clear boundaries.
            </FeatureCard>
            <FeatureCard title="Interop" icon={<span className="mcpIcon">↔</span>}>
              OAS + MCP + Arazzo + LLMs provide a portable, vendor-neutral foundation.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mcpSection">
        <div className="container">
          <h2 className="mcpCenter">Use Cases</h2>
          <div className="mcpGrid mcpGrid--usecases">
            <UseCaseCard title="Customer Service Automation" icon={<span className="mcpIcon">☎</span>}>
              Assist agents, triage requests, and automate resolutions with grounded context and safe tool use.
            </UseCaseCard>
            <UseCaseCard title="Enterprise Knowledge Management" icon={<span className="mcpIcon">⌘</span>}>
              Unify knowledge graphs and services for accurate, explainable retrieval-augmented workflows.
            </UseCaseCard>
            <UseCaseCard title="Data Analysis & Reporting" icon={<span className="mcpIcon">∑</span>}>
              Governed analysis pipelines with human-in-the-loop approvals and reproducible outputs.
            </UseCaseCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mcpSection mcpSection--alt">
        <div className="container">
          <h2 className="mcpCenter">What Teams Say</h2>
          <div className="mcpGrid mcpGrid--testimonials">
            <blockquote className="mcpQuote">“MCP gave us predictable agent behavior and faster releases.”<footer>CTO, Fintech</footer></blockquote>
            <blockquote className="mcpQuote">“The design/runtime split made compliance sign‑off straightforward.”<footer>Head of Risk, Enterprise</footer></blockquote>
            <blockquote className="mcpQuote">“We moved from prototypes to production with clear contracts.”<footer>Director of AI, SaaS</footer></blockquote>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mcpSection">
        <div className="container">
          <h2 className="mcpCenter">FAQs</h2>
          <div className="mcpFaq">
            <details>
              <summary>Is MCP a replacement for OpenAPI?</summary>
              <p>No. We see MCP as complementary — it brings agent context and tool protocols. Together with OAS and Arazzo, you get a cohesive contract for agentic workflows.</p>
            </details>
            <details>
              <summary>How does HAPI MCP fit in?</summary>
              <p>HAPI MCP implements the protocol and adds production‑ready features: auth, routing, orchestration, and observability across services and agents.</p>
            </details>
            <details>
              <summary>Does this work with any LLM?</summary>
              <p>Yes. The interfaces are model‑agnostic. You can bring your preferred providers and switch without changing integration contracts.</p>
            </details>
            <details>
              <summary>Can I keep my existing microservices?</summary>
              <p>Absolutely. MCP builds on service boundaries. Wrap capabilities as tools, describe contracts, and compose workflows safely.</p>
            </details>
            <details>
              <summary>What about security and privacy?</summary>
              <p>Use scoped credentials, audited tool calls, and least‑privilege access. HAPI MCP adds guardrails and observability for regulated environments.</p>
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
    const STEP = 4;
    const [visibleCount, setVisibleCount] = useState(Math.min(STEP, items.length));
    const [autoInfinite, setAutoInfinite] = useState(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!autoInfinite || !sentinelRef.current) return;
      const io = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              setVisibleCount((v) => Math.min(items.length, v + STEP));
            }
          });
        },
        { rootMargin: '0px 0px 200px 0px', threshold: 0.01 },
      );
      io.observe(sentinelRef.current);
      return () => io.disconnect();
    }, [autoInfinite, items.length]);

    const loadMore = () => {
      setVisibleCount((v) => Math.min(items.length, v + STEP));
      if (!autoInfinite) setAutoInfinite(true);
    };

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
                <BlogPostItems items={items.slice(0, visibleCount)} />
              </div>
              <div className="mcpListActions">
                {visibleCount < items.length ? (
                  <button className="button button--primary" onClick={loadMore}>
                    {autoInfinite ? 'Load more' : 'Load more (enable auto)'}
                  </button>
                ) : (
                  <span className="mcpNoMore">You’ve reached the end</span>
                )}
              </div>
              <div ref={sentinelRef} className="mcpSentinel" aria-hidden />
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
