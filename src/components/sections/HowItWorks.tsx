import { FileText, Terminal, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@site/src/components/ui/card";

export const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Pick your API spec",
      description: "OpenAPI, Swagger, REST - HAPI CLI works with any API specification format.",
      details: ["OpenAPI 3.0+", "REST APIs", "OAuth 2.0 Dynamic Client Registration"]
    },
    {
      icon: Terminal,
      title: "Run a single command",
      description: "One simple CLI command transforms your API into a usable MCP Server.",
      details: ["No complex setup", "Zero configuration", "Works anywhere", "Cross-platform"]
    },
    {
      icon: Zap,
      title: "Use instantly",
      description: "Your API is now ready as a tool, AI agent, or testing interface.",
      details: ["MCP server ready", "AI agent compatible", "Testing interface", "Developer Experience friendly"]
    }
  ];

  return (
    <section className="mcpSection mcpSection--alt" style={{ padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            How It Works
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--ifm-color-emphasis-700)', maxWidth: '42rem', margin: '0 auto' }}>
            Three simple steps to transform any API into a powerful, usable tool
          </p>
        </div>

        {/* Steps Flow */}
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div className="mcpGrid">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="mcpCard" style={{ position: 'relative', transition: 'all 0.3s ease', cursor: 'default' }}>
                  <CardContent style={{ padding: '2rem', textAlign: 'center' }}>
                    {/* Step number */}
                    <div className="bg-gradient-primary" style={{ 
                      position: 'absolute', 
                      top: '-1rem', 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      width: '2rem', 
                      height: '2rem', 
                      borderRadius: '9999px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#fff', 
                      fontWeight: 'bold', 
                      fontSize: '0.875rem' 
                    }}>
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div style={{ 
                      marginBottom: '1.5rem', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: '4rem', 
                      height: '4rem', 
                      borderRadius: '9999px', 
                      background: 'color-mix(in srgb, var(--brand-primary) 10%, transparent)',
                      transition: 'background 0.3s ease'
                    }}>
                      <IconComponent style={{ width: '2rem', height: '2rem', color: 'var(--brand-primary)' }} />
                    </div>

                    {/* Content */}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>{step.title}</h3>
                    <p style={{ color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      {step.description}
                    </p>

                    {/* Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-700)' }}>
                          <div style={{ width: '0.375rem', height: '0.375rem', borderRadius: '9999px', background: 'color-mix(in srgb, var(--brand-primary) 60%, transparent)' }}></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Visual Pipeline */}
        <div style={{ marginTop: '5rem', maxWidth: '64rem', margin: '5rem auto 0' }}>
          <div style={{ 
            background: 'var(--ifm-background-surface-color)', 
            border: '1px solid color-mix(in srgb, var(--ifm-color-primary) 12%, transparent)', 
            borderRadius: '0.75rem', 
            padding: '2rem',
            boxShadow: '0 2px 14px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, textAlign: 'center', marginBottom: '2rem' }}>Visual Pipeline</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  margin: '0 auto', 
                  borderRadius: '0.5rem', 
                  background: 'color-mix(in srgb, var(--brand-primary) 10%, transparent)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <FileText style={{ width: '2rem', height: '2rem', color: 'var(--brand-primary)' }} />
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>API Spec</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-700)' }}>swagger.json</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-700)' }}><a href="https://spec.openapis.org/oas/v3.1.0.html#openapi-object">OpenAPI Specs</a></p>
              </div>
              
              <ArrowRight style={{ width: '1.5rem', height: '1.5rem', color: 'var(--brand-primary)', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              
              <div style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="bg-gradient-primary" style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  margin: '0 auto', 
                  borderRadius: '0.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Terminal style={{ width: '2rem', height: '2rem', color: '#fff' }} />
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>HAPI CLI</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-700)' }}>Magic happens</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-700)' }}><a href="https://hapi.mcp.com.ai">hapi.mcp.com.ai</a></p>
              </div>
              
              <ArrowRight style={{ width: '1.5rem', height: '1.5rem', color: 'var(--brand-primary)', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              
              <div style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  margin: '0 auto', 
                  borderRadius: '0.5rem', 
                  background: 'color-mix(in srgb, var(--brand-secondary) 20%, transparent)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Zap style={{ width: '2rem', height: '2rem', color: 'var(--brand-secondary)' }} />
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Usable Tool</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-700)' }}>AI-ready</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-700)' }}><a href="https://run.mcp.com.ai">run.mcp.com.ai</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};