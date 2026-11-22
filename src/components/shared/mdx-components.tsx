import React from "react";
import { MermaidComponent } from "@/components/editor/mermaid-component";

type CodeProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

// Element overrides shared by every MDX renderer (editor preview and published blog).
// `rehypeMermaid` marks mermaid fences with a `data-mermaid` attribute.
function CodeOverride(props: CodeProps) {
  const { className, children, ...rest } = props;

  const isMermaid =
    Reflect.get(rest, "data-mermaid") === "true" ||
    className === "language-mermaid";

  if (isMermaid && typeof children === "string") {
    return (
      <div className="not-prose">
        <MermaidComponent chart={children.trim()} />
      </div>
    );
  }

  return (
    <code className="bg-muted px-1 py-0.5 rounded text-sm" {...rest}>
      {children}
    </code>
  );
}

function PreOverride(props: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm" {...props} />
  );
}

export const mdxComponents = {
  code: CodeOverride,
  pre: PreOverride,
};
