"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20">
      {/* Dot Background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto max-w-5xl border border-border bg-card">
        <div className="grid md:grid-cols-2">
          {/* Left Side */}
          <div className="relative min-h-[540px] overflow-hidden border-r border-border p-6 md:p-8">
            <h2 className="max-w-xs text-4xl font-medium leading-none tracking-tight text-foreground">
              Have questions?
              <br />
              We got answers
            </h2>

            {/* Decorative Logo */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center opacity-[0.04]">
              <div className="relative h-[280px] w-[280px]">
                {/* Lines */}
                <div className="absolute left-1/2 top-8 h-[180px] w-[2px] -translate-x-1/2 bg-foreground" />
                <div className="absolute left-[60px] top-[100px] h-[2px] w-[160px] bg-foreground" />

                {/* Nodes */}
                <div className="absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 rounded-full bg-foreground" />
                <div className="absolute left-0 top-[80px] h-10 w-10 rounded-full bg-foreground" />
                <div className="absolute right-0 top-[80px] h-10 w-10 rounded-full bg-foreground" />
                <div className="absolute bottom-0 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-foreground" />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="px-2 md:px-4">
            <Accordion type="single" collapsible defaultValue="faq-0">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-border px-2"
                >
                  <AccordionTrigger className="text-sm font-medium text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
