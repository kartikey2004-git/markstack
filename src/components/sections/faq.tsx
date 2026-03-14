"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I create content with Markstack?",
    answer:
      "Simply navigate to the Markstack editor, start writing in markdown, and use the live preview to see your content render in real-time. Your work is automatically saved as a draft.",
  },
  {
    question: "Can I preview markdown before publishing?",
    answer:
      "Yes! The split-screen editor shows your markdown on one side and a live preview on the other, updating instantly as you type.",
  },
  {
    question: "Where is my content stored in Markstack?",
    answer:
      "Your content is stored securely in Markstack's database. Each post includes your content, metadata, and rendered HTML for fast loading and easy access.",
  },
  {
    question: "Can I edit content after publishing?",
    answer:
      "Yes! Markstack allows you to edit your content after publishing. Simply navigate to your post and use the editor to make updates, which are saved automatically.",
  },
  {
    question: "What markdown features are supported?",
    answer:
      "Full GitHub-flavored markdown support including tables, code blocks with syntax highlighting, images, and MDX components.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="space-y-8 py-8 sm:py-10">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
          Everything you need to get productive quickly in MarkStack.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-border/70 bg-card/70 px-5 shadow-none transition-colors duration-200"
            >
              <AccordionTrigger className="py-4 text-left text-sm font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
