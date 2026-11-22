"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { downloadBlob } from "@/lib/download";

function getContentDispositionFilename(
  response: Response,
  fallbackName: string,
) {
  const contentDisposition = response.headers.get("content-disposition") ?? "";
  const match = contentDisposition.match(/filename="?([^";]+)"?/i);
  return match?.[1] ?? fallbackName;
}

async function readErrorMessage(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = (await response.json()) as { error?: string };
    return payload.error || "Export failed";
  }

  const text = await response.text();
  return text || "Export failed";
}

async function downloadMarkdownResponseText(
  response: Response,
  fallbackFileName: string,
) {
  const markdownText = await response.text();
  const blob = new Blob([markdownText], {
    type: "text/markdown;charset=utf-8",
  });
  downloadBlob(
    blob,
    getContentDispositionFilename(response, fallbackFileName),
  );
}

export function useBlogExport(blogId: string, slug: string) {
  const [isExporting, setIsExporting] = useState(false);

  const exportMarkdown = useCallback(async () => {
    const loadingToast = toast.loading("Preparing Markdown export...");

    setIsExporting(true);

    try {
      const response = await fetch(`/api/blogs/${blogId}/export/md`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await readErrorMessage(response);
        throw new Error(errorMessage);
      }

      await downloadMarkdownResponseText(response, `${slug}.md`);

      toast.success("Markdown downloaded", { id: loadingToast });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to export Markdown";
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsExporting(false);
    }
  }, [blogId, slug]);

  return {
    exportMarkdown,
    isExportingMarkdown: isExporting,
    isExporting,
  };
}
