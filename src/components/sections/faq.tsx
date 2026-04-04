export function FAQ() {
  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="bg-card border border-border rounded-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold mb-3">
                How is MarkStack different from Notion?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                MarkStack is specifically designed for developers and content
                creators with built-in blog publishing, canvas integration, and
                a focus on markdown-first workflows. While Notion is a
                general-purpose productivity tool, MarkStack provides
                specialized features like SEO-optimized blog deployment,
                Excalidraw canvas integration, and developer-friendly markdown
                editing with syntax highlighting.
              </p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold mb-3">
                Can I publish blogs publicly?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! MarkStack includes built-in blog publishing with one-click
                deployment. Your blogs are automatically optimized for SEO,
                responsive design, and include features like table of contents
                generation, syntax highlighting for code blocks, and social
                media integration. You can publish under your custom domain or
                use our hosted platform.
              </p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold mb-3">Is my data secure?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely. We use industry-standard encryption for data at rest
                and in transit. All data is backed up regularly, and you
                maintain full ownership of your content. We offer export
                functionality so you can always download your data in standard
                formats like Markdown, JSON, or HTML.
              </p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold mb-3">
                Does it support collaboration?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, MarkStack supports real-time collaboration on documents and
                canvases. You can invite team members to edit documents, leave
                comments, and work together on visual diagrams. We also provide
                version history and conflict resolution to ensure smooth
                teamwork.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-semibold mb-3">
                What integrations are available?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                MarkStack integrates with popular developer tools including
                GitHub for version control, Excalidraw for visual diagrams, and
                various CMS platforms for content distribution. We also provide
                REST APIs and webhooks for custom integrations with your
                existing workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
