"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is MarkStack?",
    answer:
      "MarkStack is a creator workspace that combines visual canvases, blog publishing, and task planning in one organized platform.",
  },
  {
    question: "What can I create with MarkStack?",
    answer:
      "You can design visual canvases for creative projects, write and publish markdown blogs, and organize tasks with our calendar-based todo planner.",
  },
  {
    question: "Do I need an account to read blogs?",
    answer:
      "No, anyone can read published blogs without an account. You only need to sign up to create content, canvases, or manage todos.",
  },
  {
    question: "How does the canvas editor work?",
    answer:
      "The canvas editor provides a visual workspace where you can create designs, sketches, and diagrams. Your work is automatically saved and organized.",
  },
  {
    question: "Can I manage my own blog posts?",
    answer:
      "Yes, registered users can write, edit, and publish blog posts with markdown support, live preview, and automatic SEO optimization.",
  },
  {
    question: "Is MarkStack free to use?",
    answer:
      "MarkStack offers a complete workspace for creators. Sign up to access all features including canvases, blogs, and task planning.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="space-y-8 py-8 sm:py-10">
      <div className="space-y-3 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
          Everything you need to know about MarkStack's creator workspace.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-2 sm:px-0">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-border/70 bg-card/70 px-4 shadow-none transition-colors duration-200 sm:px-5"
            >
              <AccordionTrigger className="py-4 text-left text-xs font-medium hover:no-underline sm:text-sm">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
