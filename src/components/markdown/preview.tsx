"use client";

import { MDXRemote } from "next-mdx-remote";
import "highlight.js/styles/github-dark.css";

export interface MarkdownPreviewProps {
  content: any;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-muted-foreground font-medium">
          Start typing to see preview...
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-8">
      <div
        className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-code:font-mono prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto"
        style={{
          fontSize: "15px",
          lineHeight: "1.7",
        }}
      >
        <MDXRemote {...content} />
      </div>
    </div>
  );
}
