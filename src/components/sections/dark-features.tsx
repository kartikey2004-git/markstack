"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Pencil,
  Network,
  Workflow,
  Rocket,
  Sparkles,
} from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  panelTitle: string;
  panelDescription: string;
  icon: React.ElementType;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Capture",
    description:
      "Save ideas, notes, and research the moment inspiration strikes.",
    tags: ["Notes", "Ideas", "Research", "Links"],
    panelTitle: "Quick Capture",
    panelDescription:
      "Capture thoughts, snippets, bookmarks, and research from anywhere.",
    icon: Pencil,
  },
  {
    id: 2,
    title: "Connect",
    description:
      "Link related thoughts together to build a living knowledge graph.",
    tags: ["Backlinks", "Knowledge", "Relations", "AI"],
    panelTitle: "Connected Knowledge",
    panelDescription:
      "Discover relationships between notes and build structured knowledge.",
    icon: Network,
  },
  {
    id: 3,
    title: "Visualize",
    description:
      "Use canvases to explore concepts, systems, and workflows.",
    tags: ["Canvas", "Mind Maps", "Flows", "Diagrams"],
    panelTitle: "Visual Canvas",
    panelDescription:
      "Map concepts visually and connect ideas on an infinite canvas.",
    icon: Workflow,
  },
  {
    id: 4,
    title: "Publish",
    description:
      "Turn your knowledge into beautiful content ready to share.",
    tags: ["Blogs", "Docs", "Share", "Publish"],
    panelTitle: "Ready to Publish",
    panelDescription:
      "Transform notes into polished content and publish instantly.",
    icon: Rocket,
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(1);

  const activeStep =
    steps.find((step) => step.id === active) ?? steps[0];

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-20 lg:grid-cols-2">
          {/* LEFT */}
          <div className="flex flex-col">
            {steps.map((step) => {
              const isActive = active === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setActive(step.id)}
                  className="group relative py-8 text-left"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-2.5 h-2 w-2 rounded-full transition-all ${
                        isActive ? "bg-white" : "bg-white/30"
                      }`}
                    />

                    <div className="flex-1">
                      <h3
                        className={`text-xl transition-all ${
                          isActive
                            ? "text-white"
                            : "text-white/50 group-hover:text-white/80"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{
                              opacity: 0,
                              height: 0,
                            }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                            }}
                            transition={{
                              duration: 0.35,
                            }}
                            className="mt-3 max-w-md overflow-hidden text-sm text-white/60"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-8 h-px bg-white/15">
                    {isActive && (
                      <motion.div
                        layoutId="active-line"
                        className="h-full bg-gradient-to-r from-pink-300 via-orange-200 to-white"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -40,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="w-full max-w-xl p-8 backdrop-blur-xl"
              >
                <SignalCard step={activeStep} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalCard({ step }: { step: Step }) {
  const Icon = step.icon;

  return (
    <div className="relative overflow-hidden p-8">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)]" />

      {/* Top */}
      <div className="relative flex items-center justify-between">
        <div className="rounded-2xl p-4">
          <Icon className="h-6 w-6 text-white" />
        </div>

        <div className="flex gap-2">
          {step.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-none border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Heading */}
      <div className="relative mt-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
          <Sparkles className="h-3 w-3" />
          {step.panelTitle}
        </div>

        <h3 className="text-3xl font-medium tracking-tight">
          {step.title}
        </h3>

        <p className="mt-4 max-w-md leading-relaxed text-white/60">
          {step.panelDescription}
        </p>
      </div>

      {/* Mock Product Preview */}
      <div className="relative mt-10 space-y-3">
        <div className="rounded-none border border-white/10 bg-white/5 p-4">
          <div className="mb-2 h-2 w-24 rounded-none bg-white/20" />
          <div className="h-2 w-full rounded-none bg-white/10" />
        </div>

        <div className="rounded-none border border-white/10 bg-white/5 p-4">
          <div className="mb-2 h-2 w-32 rounded-none bg-white/20" />
          <div className="h-2 w-4/5 rounded-none bg-white/10" />
        </div>

        <div className="rounded-none border border-white/10 bg-white/5 p-4">
          <div className="mb-2 h-2 w-20 rounded-none bg-white/20" />
          <div className="h-2 w-3/4 rounded-none bg-white/10" />
        </div>
      </div>
    </div>
  );
}
