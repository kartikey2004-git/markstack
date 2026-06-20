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
    <section className="relative overflow-hidden bg-[#fafafa] py-16">
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle,#d4d4d4 1px,transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto max-w-6xl border border-zinc-200 bg-[#f8f8f8] p-6 md:p-8">
        {/* Header */}
        <div className="max-w-5xl">
          <div className="inline-flex items-center bg-blue-50 px-3 py-2 text-xs uppercase tracking-[0.2em] text-blue-700">
            • ONE WORKSPACE. ZERO CONTEXT SWITCHING
          </div>

          <h2 className="mt-6 text-3xl font-medium tracking-tight text-black md:text-5xl">
            The Workflow Is Why Creators Stay.
          </h2>

          <p className="mt-6 max-w-5xl text-zinc-600">
            Most creators rely on separate tools for writing, visual thinking, and publishing. MarkStack brings everything together in one connected workspace, so ideas flow seamlessly from capture to publication.
          </p>

          <p className="mt-5 text-zinc-700">
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

  return (
    <div className="relative h-[400px]">
      {/* Chart Title */}
      <div className="mb-8 text-center font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
        Workflow Completion
      </div>

      <div className="relative h-[320px] border-l border-b border-zinc-300">
        {/* Horizontal Grid */}
        {[0, 5, 10, 15, 20, 25, 30].map((tick) => (
          <div
            key={tick}
            className="absolute left-0 right-0 border-t border-dashed border-zinc-200"
            style={{
              bottom: `${(tick / maxValue) * 100}%`,
            }}
          >
            <span className="absolute -left-8 -top-3 text-xs text-zinc-500">
              {tick}%
            </span>
          </div>
        ))}

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-around px-6 pb-0">
          {chartData.map((item, index) => (
            <div
              key={item.label}
              className="flex h-full flex-col items-center justify-end"
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
                className={`relative w-20 border ${
                  item.featured ? "border-emerald-200" : "border-zinc-300"
                }`}
              >
                {/* Standard Bars */}
                {!item.featured && (
                  <>
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background:
                          "repeating-linear-gradient(135deg,#ddd,#ddd 2px,transparent 2px,transparent 6px)",
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

                <div className="absolute left-3 top-3 z-10 text-xs text-zinc-700">
                  {item.value}%
                </div>
              </motion.div>

              <div className="mt-4 text-center font-mono text-xs uppercase tracking-[0.15em] text-zinc-600">
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
      whileHover={{
        y: -6,
      }}
      className="group relative overflow-hidden rounded-sm border border-zinc-300 bg-white max-w-[380px]"
    >
      {/* Animated Glow */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-40 opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg,#ffd7d7,#d7fff4,#ddd7ff,#ffd7d7)",
          filter: "blur(80px)",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative z-10 p-8 md:p-10">
        <div className="text-5xl leading-none text-zinc-900">“</div>

        <p className="mt-3 text-base leading-relaxed text-zinc-700 md:text-lg">
          "Instead of moving content between tools, I stay focused on the work itself. Notes, diagrams, AI organization, and publishing all happen in one place."
        </p>

        <div className="mt-10 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-400" />

          <div>
            <div className="font-medium text-zinc-900">Kartikey Bhatnagar</div>

            <div className="text-sm text-zinc-500">
              Full Stack Engineer
            </div>
          </div>
        </div>
      </div>

      {/* Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-sm"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.7), 0 0 40px rgba(180,255,220,0.15)",
        }}
      />
    </motion.div>
  );
}
