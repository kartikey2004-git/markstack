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
    <section className="space-y-8 py-16 sm:py-20 lg:py-24">
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Features
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Powerful markdown platform designed for modern content creators who
          value simplicity and efficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="border-0 shadow-sm rounded-sm bg-card/50 backdrop-blur-sm p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
