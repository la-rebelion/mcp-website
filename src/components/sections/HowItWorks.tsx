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
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform any API into a powerful, usable tool
          </p>
        </div>

        {/* Steps Flow */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting arrows for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-16 -translate-y-1/2 translate-x-8">
              <ArrowRight className="w-8 h-8 text-primary/40" />
            </div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-16 -translate-y-1/2 -translate-x-8">
              <ArrowRight className="w-8 h-8 text-primary/40" />
            </div>

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="relative group hover:shadow-primary transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
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
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 shadow-primary/20">
            <h3 className="text-xl font-semibold text-center mb-8">Visual Pipeline</h3>
            <div className="flex items-center justify-center gap-4 text-center">
              <div className="flex-1 space-y-2">
                <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium">API Spec</p>
                <p className="text-xs text-muted-foreground">swagger.json</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-primary animate-pulse" />
              
              <div className="flex-1 space-y-2">
                <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Terminal className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-sm font-medium">HAPI CLI</p>
                <p className="text-xs text-muted-foreground">Magic happens</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-primary animate-pulse" />
              
              <div className="flex-1 space-y-2">
                <div className="w-16 h-16 mx-auto rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-sm font-medium">Usable Tool</p>
                <p className="text-xs text-muted-foreground">AI-ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};