import { Card } from "@/components/ui/card";
import { Edit3, Palette, Calendar, FileText } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Visual Canvas",
    description:
      "Create and organize visual designs with our interactive canvas workspace. Perfect for sketches, diagrams, and creative projects.",
  },
  {
    icon: FileText,
    title: "Blog Publishing",
    description:
      "Write and publish markdown blogs with live preview, tags, and public sharing. Your content reaches readers instantly.",
  },
  {
    icon: Calendar,
    title: "Todo Planner",
    description:
      "Organize tasks with our calendar-based todo system. Plan, track, and complete your work with date-based organization.",
  },
  {
    icon: Edit3,
    title: "Markdown Editor",
    description:
      "Professional markdown editor with Monaco-powered syntax highlighting and real-time preview for perfect formatting.",
  },
];

export function Features() {
  return (
    <section id="features" className="space-y-8 py-8 sm:py-10">
      <div className="space-y-3 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Everything creators need
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
          A complete workspace with visual design, writing tools, and task
          planning.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group rounded-xl border border-border/70 bg-card/65 p-4 shadow-none transition-all duration-200 ease-in-out hover:border-border hover:bg-card hover:shadow-sm sm:p-5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border bg-muted/40">
              <feature.icon className="h-5 w-5 text-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-tight sm:text-base">
                {feature.title}
              </h3>
              <p className="text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
