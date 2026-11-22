"use client";

import { motion } from "framer-motion";

const chartData = [
  {
    label: "Notes",
    value: 20,
  },
  {
    label: "AI",
    value: 45,
  },
  {
    label: "Canvas",
    value: 70,
  },
  {
    label: "Valued-Content",
    value: 100,
    featured: true,
  },
];

export default function ReplyRateSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-16">
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle,var(--border) 1px,transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto max-w-6xl border border-border bg-card p-6 md:p-8">
        {/* Header */}
        <div className="max-w-5xl">
          <div className="inline-flex items-center bg-muted px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground">
            • ONE WORKSPACE. ZERO CONTEXT SWITCHING
          </div>

          <h2 className="mt-6 text-3xl font-medium tracking-tight text-foreground md:text-5xl">
            The Workflow Is Why Creators Stay.
          </h2>

          <p className="mt-6 max-w-5xl text-muted-foreground">
            Most creators rely on separate tools for writing, visual thinking, and publishing. MarkStack brings everything together in one connected workspace, so ideas flow seamlessly from capture to publication.
          </p>

          <p className="mt-5 text-foreground/80">
            The difference: ideas stay connected from capture to publication.
          </p>
        </div>

        {/* Content */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
          <ReplyRateChart />
          <TestimonialCard />
        </div>
      </div>
    </section>
  );
}

function ReplyRateChart() {
  const maxValue = 100;
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <div className="min-w-0">
      {/* Chart Title */}
      <div className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:text-xs md:tracking-[0.3em]">
        Workflow Completion
      </div>

      <div className="relative h-64 border-b border-l border-border sm:h-72 md:h-[320px]">
        {/* Horizontal grid, on the same 0–100% scale as the bars */}
        {gridLines.map((tick) => (
          <div
            key={tick}
            className="absolute left-0 right-0 border-t border-dashed border-border"
            style={{
              bottom: `${(tick / maxValue) * 100}%`,
            }}
          />
        ))}

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-around gap-2 px-2 sm:gap-4 sm:px-6">
          {chartData.map((item, index) => (
            <div
              key={item.label}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
            >
              <motion.div
                initial={{ height: 0 }}
                whileInView={{
                  height: `${(item.value / maxValue) * 100}%`,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -4,
                }}
                className={`relative w-full max-w-20 border ${
                  item.featured ? "border-foreground/40" : "border-border"
                }`}
              >
                {/* Standard Bars */}
                {!item.featured && (
                  <>
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background:
                          "repeating-linear-gradient(135deg,var(--border),var(--border) 2px,transparent 2px,transparent 6px)",
                      }}
                    />
                  </>
                )}

                {/* Valley Bar */}
                {item.featured && (
                  <>
                    <motion.div
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg,#ffd9d9,#d8fff4,#ddd9ff)",
                      }}
                    />

                    <div className="absolute inset-0 backdrop-blur-sm" />
                  </>
                )}

                <div className="absolute left-2 top-2 z-10 text-xs text-foreground sm:left-3 sm:top-3">
                  {item.value}%
                </div>
              </motion.div>

              <div className="mt-4 break-words text-center font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-muted-foreground md:text-xs md:tracking-[0.15em]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialCard() {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-sm border border-border bg-card shadow-sm max-w-[380px]"
    >
      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle,var(--foreground) 1px,transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative z-10 p-8 md:p-10">
        <div className="text-5xl leading-none text-foreground">&ldquo;</div>

        <p className="mt-3 text-base leading-relaxed text-foreground/80 md:text-lg">
          &ldquo;Instead of moving content between tools, I stay focused on the work itself. Notes, diagrams, AI organization, and publishing all happen in one place.&rdquo;
        </p>

        <div className="mt-10 flex items-center gap-3">
          <div>
            <div className="font-medium text-foreground">Kartikey Bhatnagar</div>

            <div className="text-sm text-muted-foreground">
              Full Stack Engineer
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
