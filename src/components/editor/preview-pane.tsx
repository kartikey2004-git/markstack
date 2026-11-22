"use client";

import { MDXRemote } from "next-mdx-remote";
import { Loader2 } from "lucide-react";
import "highlight.js/styles/github-dark.css";
import type { SerializedMdx } from "@/lib/markdown/mdx-renderer";
import { mdxComponents } from "@/components/shared/mdx-components";

export interface MarkdownPreviewProps {
  content: SerializedMdx | null;
  isLoading?: boolean;
}

export function MarkdownPreview({ content, isLoading }: MarkdownPreviewProps) {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Rendering preview...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="text-center max-w-md">
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
        className="prose prose-gray max-w-none
          prose-headings:font-semibold
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:leading-relaxed
          prose-code:font-mono
          prose-pre:overflow-x-auto
          prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4
          text-[15px] leading-[1.7]"
      >
        <MDXRemote {...content} components={mdxComponents} />
      </div>
    </div>
  );
}
