"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaseStudiesSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20">
      {/* Dot Grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto max-w-4xl border border-border bg-card p-4 md:p-6">
        {/* Header */}
        <div className="py-8 text-center">
          <div className="mb-4 inline-flex bg-muted px-2 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground">
            FOR DEVELOPERS, WRITERS & BUILDERS
          </div>

          <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-tighter tracking-[-0.01em] text-foreground md:text-5xl">
            Everything You Need
            Between an Idea
            <br />
            and a Published Article.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-[1px] bg-border">
          <CaseCard
            company="Capture"
            title="Notes, snippets, research, and documentation."
            className="col-span-12 md:col-span-4"
          />

          <GradientCard className="col-span-12 md:col-span-4" />

          <GalileoCard className="col-span-12 md:col-span-4 md:row-span-2" />

          <CaseCard
            company="Structure"
            title="AI-powered organization for messy thoughts."
            className="col-span-12 md:col-span-4"
            blue
          />

          <CaseCard
            company="Visualize"
            title="Canvases for workflows, systems, and ideas."
            className="col-span-12 md:col-span-4"
          />
        </div>

        {/* CTA */}
        <CTABanner />
      </div>
    </section>
  );
}

function CaseCard({
  title,
  company,
  className,
  blue,
}: {
  title: string;
  company: string;
  className?: string;
  blue?: boolean;
}) {
  return (
    <motion.div
      className={`relative min-h-[170px] overflow-hidden border border-border bg-card ${className}`}
    >
      {blue && (
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "linear-gradient(135deg,#9fe7ff,#e6fbff,#d8fff3)",
          }}
        />
      )}

      <div className="relative z-10 p-3">
        <div className="mb-10 text-xs font-semibold text-foreground">
          {company}
        </div>

        <h3 className="text-sm leading-snug text-foreground">
          {title}
        </h3>

        
      </div>
    </motion.div>
  );
}

function GradientCard({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
      className={`relative min-h-[170px] overflow-hidden border border-border ${className}`}
    >
      <motion.div
        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "0% 50%",
          ],
        }}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg,#ffd7d7,#d7fff3,#ddd7ff,#ffd7d7)",
          backgroundSize: "300% 300%",
        }}
      />

      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <div className="relative z-10 flex h-full flex-col p-5">
        <div className="-mt-2">
          <div className="mb-9 text-xs font-semibold text-foreground">
            Publish
          </div>
      
          <h3 className="max-w-[180px] text-sm leading-snug text-foreground">
            SEO-ready blogs and documentation.
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

function GalileoCard({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden border border-border bg-card ${className}`}
    >
      <div className="p-3">
        <div className="mb-4 text-xs font-semibold">
          Everything Between
          an Idea and a
          Published Article.
        </div>

        <h3 className="max-w-[220px] text-sm leading-snug">
          Write in markdown. Structure with AI. Visualize on canvases. Publish instantly.
        </h3>

        <div className="mt-4 flex gap-2">
          <span className="border border-border px-1 py-0.5 text-[8px] uppercase">
            One WORKFLOW 
          </span>

          <span className="border border-border px-1 py-0.5 text-[8px] uppercase">
            ONE WORKSPACE
          </span>
        </div>
      </div>

      {/* Orange Area */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44"
        style={{
          background:
            "linear-gradient(to top,#ff9d32,#ffd7a3,transparent)",
        }}
      />

      <div className="absolute bottom-3 left-3 right-3 flex gap-2">
        <div className="flex-1 border border-background/50 bg-background/60 p-2 backdrop-blur">
          <div className="text-xl font-medium">3</div>
          <div className="text-[9px] uppercase text-muted-foreground">
            CONNECTED WORKFLOWS
          </div>
        </div>

        <div className="flex-1 border border-background/50 bg-background/60 p-2 backdrop-blur">
          <div className="text-xl font-medium">
            1
          </div>

          <div className="text-[9px] uppercase text-muted-foreground">
            UNIFIED WORKSPACE
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CTABanner() {
  return (
    <motion.div
      className="relative mt-[1px] overflow-hidden border border-border bg-foreground"
    >
      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle,var(--background) 1px,transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Decorative */}
      <div className="absolute right-10 top-1/2 h-40 w-40 -translate-y-1/2 opacity-20">
        <div className="absolute h-20 w-4 bg-background rotate-45" />
        <div className="absolute h-20 w-4 -rotate-45 bg-background" />
        <div className="absolute left-10 h-20 w-4 bg-background rotate-45" />
      </div>

      <div className="relative z-10 p-6 md:p-8">
        <h3 className="max-w-lg text-2xl font-medium text-background md:text-3xl">
          Everything Between an Idea
          <br />
          and a Published Article.
        </h3>

        <p className="mt-3 max-w-md text-sm text-background/60">
          MarkStack brings everything together so your ideas stay connected from first thought to final publication.
        </p>
      </div>
    </motion.div>
  );
}