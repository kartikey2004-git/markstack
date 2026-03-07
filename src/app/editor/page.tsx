"use client";

import { useRef, useCallback } from "react";
import { useMarkdown } from "@/hooks/use-markdown";
import { Toolbar } from "@/components/markdown/toolbar";
import { MarkdownEditor } from "@/components/markdown/editor";
import { MarkdownPreview } from "@/components/markdown/preview";
import { ImageDropzone } from "@/components/markdown/image-dropzone";
import { FileUpload } from "@/components/markdown/file-upload";

export default function EditorPage() {
  const editorRef = useRef<any>(null);
  const {
    content,
    setContent,
    serializedContent,
    isLoading,
    editorRef: hookEditorRef,
    insertSyntax,
    handleImageUpload,
    handleFileUpload,
    handleStructureMarkdown,
    setEditorRef,
  } = useMarkdown(`# Welcome to the Markdown Editor

This is a **Notion-style** Markdown + MDX editor with live preview.

## Features

- **Live preview** - See your changes instantly
- **Slash commands** - Type \`/\` to see available commands
- **Toolbar** - Quick formatting buttons
- **Drag & drop** - Drop images directly into the editor
- **File upload** - Upload .md files
- **Syntax highlighting** - Beautiful code blocks

## Try it out

1. Type \`/\` in the editor to see slash commands
2. Use the toolbar buttons for quick formatting
3. Drag and drop an image into the editor
4. Upload a .md file using the button below

### Code Example

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> "The best way to learn is by doing."

---

Enjoy editing!`);

  const handleEditorReady = useCallback(
    (editor: any) => {
      editorRef.current = editor;
      setEditorRef(editor);
    },
    [setEditorRef],
  );

  return (
    <div className="flex h-screen flex-col font-sans">
      <div className="flex items-center justify-between border-b bg-background p-4">
        <h1 className="text-xl font-semibold">Markdown Editor</h1>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>

      <Toolbar
        onInsert={insertSyntax}
        onStructureMarkdown={handleStructureMarkdown}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 border-r">
          <ImageDropzone onImageUpload={handleImageUpload} />
          <MarkdownEditor
            value={content}
            onChange={setContent}
            onInsertSyntax={insertSyntax}
            onEditorReady={handleEditorReady}
          />
        </div>

        <div className="flex-1 bg-background font-sans">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-sm text-muted-foreground">
                Loading preview...
              </div>
            </div>
          ) : (
            <MarkdownPreview content={serializedContent} />
          )}
        </div>
      </div>
    </div>
  );
}
