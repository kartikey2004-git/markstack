import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

export function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "code" &&
        node.properties &&
        Array.isArray(node.properties.className) &&
        (node.properties.className as string[]).includes("language-mermaid")
      ) {
        // Mark this element for custom handling
        node.properties["data-mermaid"] = "true";
      }
    });
  };
}
