"use client";

import type { LucideIcon } from "lucide-react";
import { AppContainer } from "@/components/layout/app-container";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description: string;
  span: string;
  tall?: boolean;
};

const steps: Step[] = [
  {
    title: "Capture",
    description: "Save notes, ideas, and research the moment inspiration strikes.",
    span: "md:col-span-4",
    tall: true,
  },
  {
    title: "Structure",
    description: "Transform scattered thoughts into organized knowledge with AI.",
    span: "md:col-span-4",
  },
  {
    title: "Visualize",
    description: "Connect concepts, plan workflows, and see the bigger picture.",
    span: "md:col-span-4",
  },
  {
    title: "Publish",
    description: "Turn your work into polished content and share it instantly.",
    span: "md:col-span-8",
  },
];

export function MechanismPipeline() {
  return (
    <section id="features" className="relative scroll-mt-20 overflow-hidden bg-muted/30 py-20">
      {/* Dot grid, matching the other landing sections */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <AppContainer className="relative z-10 max-w-6xl">
        <div className="text-center">
          <div className="inline-flex bg-muted px-2 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground">
            The creator workflow, reimagined
          </div>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.01em] text-foreground md:text-5xl">
            Stop switching between tools. Start building knowledge.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            From first idea to final publication, MarkStack keeps your notes,
            visuals, AI assistance, and content connected in one seamless
            workflow.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-12">
          {steps.map((step) => {
            return (
              <article
                key={step.title}
                className={cn(
                  "flex flex-col justify-between bg-card p-6 md:p-8",
                  step.span,
                  step.tall && "md:row-span-2",
                )}
              >
                <div>
                  <h3
                    className={cn(
                      "mt-8 font-medium tracking-tight text-foreground",
                      step.tall ? "text-2xl md:text-3xl" : "text-xl",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </AppContainer>
    </section>
  );
}