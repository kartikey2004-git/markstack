"use client";

import { TopNav } from "@/components/layout/top-nav";
import { useRef, useCallback, useEffect } from "react";
import { useMarkdown } from "@/hooks/use-markdown";
import { useBlogSave } from "@/hooks/use-blog-save";
import { Toolbar } from "@/components/markdown/toolbar";
import { MarkdownEditor } from "@/components/markdown/editor";
import { MarkdownPreview } from "@/components/markdown/preview";
import { ImageDropzone } from "@/components/markdown/image-dropzone";
import { FileUpload } from "@/components/markdown/file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Save } from "lucide-react";

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

  // Load draft on mount
  useEffect(() => {
    const draftContent = loadDraft();
    if (draftContent) {
      setContent(draftContent);
    }
  }, [loadDraft, setContent]);

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
    (editor: any) => {
      editorRef.current = editor;
      setEditorRef(editor);
    },
    [setEditorRef],
  );

  const handleSaveBlog = useCallback(async () => {
    const slug = await saveBlog(content);
    if (slug) {
      // Redirect to blog page
      window.location.href = `/blog/${slug}`;
    }
  }, [content, saveBlog]);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
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
              className="flex-1 min-h-[32px] resize-none"
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
                onInsertSyntax={insertSyntax}
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
