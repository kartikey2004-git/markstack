"use client";

import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  applyMarkdownFormat,
  FormatType,
} from "@/lib/markdown/format-selection";
import { serializeMDX } from "@/lib/markdown/mdx-renderer";
import { uploadImage, createImageMarkdown } from "@/lib/markdown/image-upload";
import type { SerializedMdx } from "@/lib/markdown/mdx-renderer";
import type { EditorInstance } from "@/types/editor";

export function useMarkdown(initialContent: string = "") {
  const [content, setContent] = useState(initialContent);
  const [serializedContent, setSerializedContent] =
    useState<SerializedMdx | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<EditorInstance | null>(null);

  const updateContent = useCallback(async (newContent: string) => {
    setContent(newContent);
    setIsLoading(true);
    try {
      const serialized = await serializeMDX(newContent);
      setSerializedContent(serialized);
    } catch (error) {
      console.error("Error serializing MDX:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const insertSyntax = useCallback(
    async (syntaxKey: string) => {
      if (!editorRef.current) return;

      const editor = editorRef.current;

      // Handle image separately since it's not in the formatting utility
      if (syntaxKey === "image") {
        // This would open an image dialog - for now just insert placeholder
        const position = editor.getPosition();
        const model = editor.getModel();
        if (!position || !model) {
          return;
        }

        const offset = model.getOffsetAt(position);
        const newContent =
          content.slice(0, offset) +
          "\n![Alt text](url)\n" +
          content.slice(offset);
        editor.setValue(newContent);
        await updateContent(newContent);
        return;
      }

      // Apply formatting using the new utility
      applyMarkdownFormat(editor, syntaxKey as FormatType);

      // Update preview with new content
      const newContent = editor.getValue();
      await updateContent(newContent);

      // Keep focus on editor
      editor.focus();
    },
    [updateContent, content],
  );

  const handleImageUpload = useCallback(
    async (file: File) => {
      try {
        const image = await uploadImage(file);
        const imageMarkdown = createImageMarkdown(image);

        if (editorRef.current) {
          const editor = editorRef.current;
          const position = editor.getPosition();
          const model = editor.getModel();
          if (!position || !model) {
            return;
          }

          const offset = model.getOffsetAt(position);
          const newContent =
            content.slice(0, offset) +
            "\n" +
            imageMarkdown +
            "\n" +
            content.slice(offset);
          editor.setValue(newContent);
          await updateContent(newContent);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    [content, updateContent],
  );

  const handleStructureMarkdown = useCallback(async () => {
    if (!editorRef.current) return;

    let toastId: string | number | undefined;

    try {
      const currentContent = editorRef.current.getValue();

      if (!currentContent.trim()) {
        toast.warning("No content to structure");
        return;
      }

      toastId = toast.loading("Structuring markdown...");

      const response = await fetch("/api/structure-markdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown: currentContent }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({}) as { error?: string });
        throw new Error(errorData.error || "Failed to structure markdown");
      }

      const data = (await response.json()) as { markdown?: string };
      const structuredContent = data.markdown;

      if (structuredContent && structuredContent !== currentContent) {
        editorRef.current.setValue(structuredContent);
        await updateContent(structuredContent);
        toast.success("Markdown structured successfully!", { id: toastId });
      } else {
        toast.info("No changes needed", { id: toastId });
      }
    } catch (error) {
      console.error("Error structuring markdown:", error);
      if (toastId) {
        toast.error("Failed to structure markdown. Please try again.", {
          id: toastId,
        });
      } else {
        toast.error("Failed to structure markdown. Please try again.");
      }
      throw error;
    }
  }, [updateContent]);

  const setEditorRef = useCallback((editor: EditorInstance) => {
    editorRef.current = editor;
  }, []);

  return {
    content,
    setContent: updateContent,
    serializedContent,
    isLoading,
    editorRef,
    insertSyntax,
    handleImageUpload,
    handleStructureMarkdown,
    setEditorRef,
  };
}
