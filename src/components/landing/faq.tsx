"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I write a blog post?",
    answer: "Simply navigate to the editor, start writing in markdown, and use the live preview to see your content render in real-time. Your work is automatically saved as a draft.",
  },
  {
    question: "Can I preview markdown before publishing?",
    answer: "Yes! The split-screen editor shows your markdown on one side and a live preview on the other, updating instantly as you type.",
  },
  {
    question: "Where are my blogs stored?",
    answer: "Blogs are stored as JSON files in the blogs directory. Each blog includes your content, metadata, and rendered HTML for fast loading.",
  },
  {
    question: "Can I edit blogs after publishing?",
    answer: "Currently, blogs are saved as static files. You can edit the JSON files directly or use the editor to create updated versions.",
  },
  {
    question: "What markdown features are supported?",
    answer: "Full GitHub-flavored markdown support including tables, code blocks with syntax highlighting, images, and MDX components.",
  },
];

export function FAQ() {
  return (
    <section className="space-y-8 py-16 sm:py-20 lg:py-24">
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Everything you need to know about using Markstack for your blogging needs.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto px-4">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-0 shadow-sm bg-card/50 backdrop-blur-sm rounded-lg px-6"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
