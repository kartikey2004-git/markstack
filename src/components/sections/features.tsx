import { Card } from "@/components/ui/card";
import { Edit3, Eye, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Edit3,
    title: "Monaco Editor",
    description:
      "Professional code editor with syntax highlighting, line numbers, and intelligent auto-completion.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "Real-time markdown preview with MDX support, syntax highlighting, and beautiful typography.",
  },
  {
    icon: Zap,
    title: "Slash Commands",
    description:
      "Quick formatting with slash commands. Type / to access formatting options and shortcuts.",
  },
  {
    icon: Globe,
    title: "SEO Friendly",
    description:
      "Automatic slug generation and optimized meta tags for better search engine visibility.",
  },
];

export function Features() {
  return (
    <section id="features" className="space-y-8 py-8 sm:py-10">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for clean workflows
        </h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
          A focused writing stack with the right defaults, structured controls,
          and polished rendering.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group rounded-xl border border-border/70 bg-card/65 p-5 shadow-none transition-all duration-200 ease-in-out hover:border-border hover:bg-card hover:shadow-sm"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border bg-muted/40">
              <feature.icon className="h-5 w-5 text-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
