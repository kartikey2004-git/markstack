"use client";

import {
  Pencil,
  Sparkles,
  Workflow,
  Rocket,
} from "lucide-react";
import { AppContainer } from "@/components/layout/app-container";

const steps = [
  {
    title: "Capture",
    description: "Save notes, ideas, and research the moment inspiration strikes.",
    icon: Pencil,
    border: "border-sky-300",
    bg: "from-sky-100 via-slate-50 to-sky-50",
  },
  {
    title: "Structure",
    description: "Transform scattered thoughts into organized knowledge with AI.",
    icon: Sparkles,
    border: "border-orange-300",
    bg: "from-orange-100 via-rose-50 to-amber-50",
  },
  {
    title: "Visualize",
    description: "Connect concepts, plan workflows, and see the bigger picture.",
    icon: Workflow,
    border: "border-cyan-300",
    bg: "from-cyan-100 via-sky-50 to-indigo-50",
  },
  {
    title: "Publish",
    description: "Turn your work into polished content and share it instantly.",
    icon: Rocket,
    border: "border-lime-300",
    bg: "from-yellow-100 via-green-50 to-lime-100",
  },
];

export function MechanismPipeline() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20">
      {/* Dotted Background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <AppContainer className="relative z-10">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div className="border border-border bg-muted px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground">
            THE CREATOR WORKFLOW, REIMAGINED
          </div>
        </div>

        {/* Heading */}
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight text-foreground md:text-5xl">
          Stop Switching Between Tools. Start Building Knowledge.
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          From first idea to final publication, MarkStack keeps your notes, visuals, AI assistance, and content connected in one seamless workflow.
        </p>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
        
            return (
              <div
                key={step.title}
                className={`
                  group
                  relative
                  h-55
                  overflow-hidden
                  border-2 cursor-pointer
                  ${step.border}
                  bg-linear-to-br
                  ${step.bg}
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                `}
              >
                {/* Watercolor Effect */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.5),transparent_40%)]" />
                  <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent blur-2xl" />
                </div>
        
                {/* Icon */}
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className="relative z-10 text-foreground transition-all duration-300 group-hover:scale-110"
                />
        
                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3
                    className="
                      text-base font-medium text-foreground md:text-lg
                      transition-all duration-300
                      group-hover:mb-2
                    "
                  >
                    {step.title}
                  </h3>
                
                  <div
                    className="
                      max-h-0
                      overflow-hidden
                      opacity-0
                      transition-all duration-300
                      group-hover:max-h-20
                      group-hover:opacity-100
                    "
                  >
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AppContainer>
    </section>
  );
}