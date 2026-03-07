"use client";

import dynamic from "next/dynamic";
import "highlight.js/styles/github-dark.css";

const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((mod) => mod.MDXRemote),
  {
    ssr: false,
    loading: () => <div>Loading content...</div>,
  },
);

export interface MDXContentProps {
  content: any;
}

export function MDXContent({ content }: MDXContentProps) {
  if (!content) return null;

  return <MDXRemote {...content} />;
}
