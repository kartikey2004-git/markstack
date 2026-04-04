"use client";

import { MDXRemote } from "next-mdx-remote";
import "highlight.js/styles/github-dark.css";
import type { SerializedMdx } from "@/lib/markdown/mdx-renderer";

export interface MarkdownPreviewProps {
  content: SerializedMdx | null;
  isLoading?: boolean;
}

const components = {
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="overflow-x-auto rounded-lg bg-muted p-4 text-sm"
      {...props}
    />
  ),
};

export function MarkdownPreview({ content, isLoading }: MarkdownPreviewProps) {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          <p className="text-sm text-muted-foreground">Rendering preview...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium mb-2">Start writing</h3>
          <p className="text-sm text-muted-foreground">
            Type or paste markdown content to see a live preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6 sm:p-8">
      <div
        className="prose prose-gray max-w-none dark:prose-invert
          prose-headings:font-semibold
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:leading-relaxed
          prose-code:font-mono
          prose-pre:overflow-x-auto
          prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4"
        style={{ fontSize: "15px", lineHeight: "1.7" }}
      >
        <MDXRemote {...content} components={components} />
      </div>
    </div>
  );
}
