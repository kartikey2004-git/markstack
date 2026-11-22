"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import DrawingCanvas from "@/components/canvas/drawing-canvas";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { toast } from "sonner";
import {
  Save,
  Share2,
  Download,
  FileImage,
  FileJson,
  FileCode,
} from "lucide-react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import type { CanvasData } from "@/types/canvas";
import {
  ApiError,
  jsonRequestInit,
  requestJson,
  requestOk,
} from "@/lib/api/client";
import { downloadBlob } from "@/lib/download";
import { cn } from "@/lib/utils";

type CanvasResponse = { canvas: { title: string; data: CanvasData } };

export default function CanvasPage() {
  const params = useParams();
  const [canvasData, setCanvasData] = useState<CanvasData | null>(null);
  const [title, setTitle] = useState("Untitled canvas");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const excalidrawAPIRef = useRef<ExcalidrawImperativeAPI | null>(null);
  // Serialized elements as of the last load or save. Only element edits count
  // as unsaved; zoom, scroll, and selection do not.
  const savedElementsRef = useRef<string>("");

  const canvasId = params.id as string;

  const applyLoadedCanvas = useCallback((canvas: CanvasResponse["canvas"]) => {
    setCanvasData(canvas.data);
    setTitle(canvas.title || "Untitled canvas");
    savedElementsRef.current = JSON.stringify(canvas.data.elements ?? []);
    setIsDirty(false);
  }, []);

  const createCanvas = useCallback(async () => {
    try {
      const data = await requestJson<CanvasResponse>(
        `/api/canvas/${canvasId}`,
        jsonRequestInit("POST", { title: "Untitled Canvas" }),
        { fallback: "Failed to create canvas" },
      );
      applyLoadedCanvas(data.canvas);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create canvas");
    } finally {
      setLoading(false);
    }
  }, [canvasId, applyLoadedCanvas]);

  const fetchCanvas = useCallback(async () => {
    try {
      const data = await requestJson<CanvasResponse>(
        `/api/canvas/${canvasId}`,
        undefined,
        { fallback: "Canvas not found" },
      );
      applyLoadedCanvas(data.canvas);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        await createCanvas();
        return;
      }
      setError(err instanceof Error ? err.message : "Failed to load canvas");
    } finally {
      setLoading(false);
    }
  }, [canvasId, createCanvas, applyLoadedCanvas]);

  useEffect(() => {
    if (!canvasData) {
      fetchCanvas();
    }
  }, [canvasId, fetchCanvas]);

  const saveCanvasData = async (data: CanvasData) => {
    if (saving) return;

    setSaving(true);
    try {
      await requestOk(
        "/api/canvas/save",
        jsonRequestInit("POST", { canvasId, data }),
        { fallback: "Failed to save canvas" },
      );
      savedElementsRef.current = JSON.stringify(data.elements ?? []);
      setIsDirty(false);
    } catch (err) {
      console.error("Save error:", err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleSave = useCallback(async () => {
    if (saving || !canvasData) return;

    try {
      await saveCanvasData(canvasData);
      toast.success("Canvas saved");
    } catch {
      toast.error("Failed to save canvas");
    }
    // saveCanvasData closes over the latest state on each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving, canvasData, canvasId]);

  // Ctrl+S / Cmd+S saves the canvas. Listen in the capture phase and stop the
  // event so Excalidraw does not also run its own "save to file" shortcut.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        event.stopPropagation();
        handleSave();
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [handleSave]);

  // Warn before leaving the page with unsaved changes.
  useEffect(() => {
    if (!isDirty) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  const handleCanvasChange = useCallback(
    (
      elements: CanvasData["elements"],
      appState: CanvasData["appState"],
      files: CanvasData["files"],
    ) => {
      setCanvasData({ elements, appState, files });
      setIsDirty(JSON.stringify(elements) !== savedElementsRef.current);
    },
    [],
  );

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("Canvas link copied to clipboard!");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Canvas link copied to clipboard!");
    }
  };

  const handleExportPNG = async () => {
    if (!excalidrawAPIRef.current) return;

    try {
      const elements = excalidrawAPIRef.current.getSceneElements();

      if (!elements || !elements.length) {
        toast.error("Canvas is empty");
        return;
      }

      const { exportToBlob } = await import("@excalidraw/excalidraw");

      const blob = await exportToBlob({
        elements,
        appState: excalidrawAPIRef.current.getAppState(),
        files: excalidrawAPIRef.current.getFiles(),
        mimeType: "image/png",
      });

      downloadBlob(blob, `canvas-${canvasId}.png`);

      toast.success("PNG exported successfully");
    } catch {
      toast.error("Failed to export PNG");
    }
  };

  const handleExportSVG = async () => {
    if (!excalidrawAPIRef.current) return;

    try {
      const elements = excalidrawAPIRef.current.getSceneElements();

      if (!elements || !elements.length) {
        toast.error("Canvas is empty");
        return;
      }

      const { exportToSvg } = await import("@excalidraw/excalidraw");

      const svg = await exportToSvg({
        elements,
        appState: excalidrawAPIRef.current.getAppState(),
        files: excalidrawAPIRef.current.getFiles(),
      });

      // exportToSvg resolves to an SVGSVGElement; serialize it to get markup.
      const markup = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([markup], { type: "image/svg+xml" });
      downloadBlob(blob, `canvas-${canvasId}.svg`);

      toast.success("SVG exported successfully");
    } catch {
      toast.error("Failed to export SVG");
    }
  };

  const handleExportJSON = async () => {
    if (!excalidrawAPIRef.current) return;

    try {
      const elements = excalidrawAPIRef.current.getSceneElements();

      const appState = excalidrawAPIRef.current.getAppState();
      const files = excalidrawAPIRef.current.getFiles();

      const { serializeAsJSON } = await import("@excalidraw/excalidraw");

      const serialized = serializeAsJSON(elements, appState, files, "local");

      const blob = new Blob([serialized], { type: "application/json" });
      downloadBlob(blob, `canvas-${canvasId}.json`);

      toast.success("JSON exported successfully");
    } catch {
      toast.error("Failed to export JSON");
    }
  };

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 sm:p-6">
        <ErrorState
          className="w-full max-w-md"
          description={error}
          action={{ label: "Try again", onClick: fetchCanvas }}
        />
      </div>
    );
  }

  if (loading || !canvasData) {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="flex-shrink-0 border-b bg-background px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-10 w-48" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 sm:p-6">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex h-full w-full flex-col">
        <header className="flex flex-shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border bg-background px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Canvas
            </p>
            <div className="mt-0.5 flex items-center gap-3">
              <h1 className="truncate text-base font-medium text-foreground sm:text-lg">
                {title}
              </h1>
              <SaveStatus isDirty={isDirty} saving={saving} />
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={saving}
              title="Save (Ctrl+S)"
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "Saving…" : "Save"}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleExportPNG} className="gap-2">
                  <FileImage className="h-4 w-4" />
                  Export as PNG
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleExportSVG} className="gap-2">
                  <FileCode className="h-4 w-4" />
                  Export as SVG
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleExportJSON} className="gap-2">
                  <FileJson className="h-4 w-4" />
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <DrawingCanvas
            initialData={canvasData}
            onChange={handleCanvasChange}
            excalidrawAPI={(api) => {
              excalidrawAPIRef.current = api;
            }}
            theme="light"
            className="absolute inset-0"
          />
        </div>
      </div>
    </TooltipProvider>
  );
}

function SaveStatus({ isDirty, saving }: { isDirty: boolean; saving: boolean }) {
  const label = saving ? "Saving" : isDirty ? "Unsaved changes" : "All changes saved";

  return (
    <span
      className={cn(
        "flex flex-shrink-0 items-center gap-1.5 text-xs",
        isDirty ? "text-foreground" : "text-muted-foreground",
      )}
      aria-live="polite"
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          saving ? "animate-pulse bg-blue-600" : isDirty ? "bg-blue-600" : "bg-muted-foreground/50",
        )}
      />
      {label}
    </span>
  );
}
