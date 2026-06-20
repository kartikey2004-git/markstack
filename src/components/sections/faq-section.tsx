"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus  } from "lucide-react";

const faqs = [
  {
    question: "Why not use Notion, Excalidraw, and ChatGPT separately?",
    answer:
      "You can. But every handoff between tools creates friction, duplicated work, and lost context. MarkStack keeps your notes, visual thinking, AI assistance, and publishing workflow connected in one place.",
  },
  {
    question: "Is MarkStack a note-taking app or a publishing platform?",
    answer:
      "Both—and more. MarkStack is a knowledge workspace that takes ideas from initial capture all the way to structured documentation and published content.",
  },
  {
    question: "How does AI fit into the workflow?",
    answer:
      "AI helps organize and structure information already inside your workspace. Instead of replacing your thinking, it helps refine, connect, and clarify it.",
  },
  {
    question: "Can I create diagrams and visual workflows?",
    answer:
      "Absolutely. Visual canvases are built into the workflow, making it easy to map systems, architectures, processes, and ideas alongside your written content.",
  },
  {
    question: "Who gets the most value from MarkStack?",
    answer:
      "Developers, builders, technical writers, researchers, and creators who want a faster path from idea to organized, publishable knowledge.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-20">
      {/* Dot Background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(#d4d4d4 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto max-w-5xl border border-zinc-300 bg-[#f8f8f8]">
        <div className="grid md:grid-cols-2">
          {/* Left Side */}
          <div className="relative min-h-[540px] overflow-hidden border-r border-zinc-300 p-6 md:p-8">
            <h2 className="max-w-xs text-4xl font-medium leading-[0.95] tracking-tight text-black">
              Have questions?
              <br />
              We got answers
            </h2>

            {/* Decorative Logo */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center opacity-[0.04]">
              <div className="relative h-[280px] w-[280px]">
                {/* Lines */}
                <div className="absolute left-1/2 top-8 h-[180px] w-[2px] -translate-x-1/2 bg-black" />
                <div className="absolute left-[60px] top-[100px] h-[2px] w-[160px] bg-black" />
            
                {/* Nodes */}
                <div className="absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 rounded-full bg-black" />
                <div className="absolute left-0 top-[80px] h-10 w-10 rounded-full bg-black" />
                <div className="absolute right-0 top-[80px] h-10 w-10 rounded-full bg-black" />
                <div className="absolute bottom-0 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>
            {faqs.map((faq, index) => {
              const isOpen = open === index;

              return (
                <div
                  key={index}
                  className="border-b border-zinc-300"
                >
                  <button
                    onClick={() =>
                      setOpen(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between px-4 py-5 text-left transition-colors hover:bg-black/[0.02]"
                  >
                    <span className="pr-6 text-sm font-medium text-black">
                      {faq.question}
                    </span>

                    {isOpen ? (
                      <Minus
                        size={16}
                        className="text-zinc-500"
                      />
                    ) : (
                      <Plus
                        size={16}
                        className="text-zinc-500"
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 text-sm leading-relaxed text-zinc-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}