"use client";

import { useState, useCallback, useRef } from "react";
import {
  applyMarkdownFormat,
  FormatType,
} from "@/lib/markdown/format-selection";
import { serializeMDX } from "@/lib/markdown/mdx-renderer";
import { uploadImage, createImageMarkdown } from "@/lib/markdown/image-upload";

export function useMarkdown(initialContent: string = "") {
  const [content, setContent] = useState(initialContent);
  const [serializedContent, setSerializedContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<any>(null);

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

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (file.type === "text/markdown" || file.name.endsWith(".md")) {
        try {
          const text = await file.text();
          await updateContent(text);
        } catch (error) {
          console.error("Error reading file:", error);
        }
      }
    },
    [updateContent],
  );

  const setEditorRef = useCallback((editor: any) => {
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
    handleFileUpload,
    setEditorRef,
  };
}
