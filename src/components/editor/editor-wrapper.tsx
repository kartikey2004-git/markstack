"use client";

import { useRef, useCallback, useEffect } from "react";
import { useMarkdown } from "@/hooks/use-markdown";
import { useBlogSave } from "@/hooks/use-blog-save";
import { Toolbar } from "@/components/editor/editor-toolbar";
import { MarkdownEditor } from "@/components/editor/markdown-editor";
import { MarkdownPreview } from "@/components/editor/preview-pane";
import { ImageDropzone } from "@/components/editor/image-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Save } from "lucide-react";
import type { Blog } from "@/types/blog";
import type { EditorInstance } from "@/types/editor";

interface EditorWrapperProps {
  blog?: Blog;
}

export function EditorWrapper({ blog }: EditorWrapperProps) {
  const editorRef = useRef<EditorInstance | null>(null);
  const {
    content,
    setContent,
    serializedContent,
    isLoading,
    insertSyntax,
    handleImageUpload,
    handleFileUpload,
    handleStructureMarkdown,
    setEditorRef,
  } = useMarkdown("");

  const {
    title,
    setTitle,
    description,
    setDescription,
    isSaving,
    saveBlog,
    saveDraft,
    loadDraft,
  } = useBlogSave();

  // Load existing blog data or draft on mount
  useEffect(() => {
    if (blog) {
      // Load existing blog data
      setTitle(blog.title);
      setDescription(blog.description || "");
      setContent(blog.content || "");
    } else {
      // Load draft for new blog
      const draftContent = loadDraft();
      if (draftContent) {
        setContent(draftContent);
      }
    }
  }, [blog, loadDraft, setContent, setTitle, setDescription]);

  // Auto-save draft when content changes
  useEffect(() => {
    if (content) {
      const timer = setTimeout(() => {
        saveDraft(content);
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timer);
    }
  }, [content, title, description, saveDraft]);

  const handleEditorReady = useCallback(
    (editor: EditorInstance) => {
      editorRef.current = editor;
      setEditorRef(editor);
    },
    [setEditorRef],
  );

  const handleSaveBlog = useCallback(async () => {
    const slug = await saveBlog(content, blog?.id);
    if (slug) {
      window.location.href = `/blogs/${slug}`;
    }
  }, [content, saveBlog, blog]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Blog Save Toolbar */}
        <div className="border-b bg-background p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1"
            />
            <Textarea
              placeholder="Brief description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 min-h-8 resize-none"
              rows={1}
            />
            <Button
              onClick={handleSaveBlog}
              disabled={isSaving || !title.trim() || !content.trim()}
              className="whitespace-nowrap"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Blog"}
            </Button>
          </div>
        </div>

        <Toolbar
          onInsert={insertSyntax}
          onStructureMarkdown={handleStructureMarkdown}
          onFileUpload={handleFileUpload}
        />

        <ResizablePanelGroup orientation="horizontal" className="flex-1">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="relative h-full border-r">
              <ImageDropzone onImageUpload={handleImageUpload} />
              <MarkdownEditor
                value={content}
                onChange={setContent}
                onEditorReady={handleEditorReady}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full bg-background font-sans">
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
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
