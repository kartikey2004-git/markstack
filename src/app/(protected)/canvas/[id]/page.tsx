"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import DrawingCanvas from "@/components/canvas/drawing-canvas";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Save,
  Share2,
  Download,
  History,
  Link2,
  FileImage,
  FileJson,
  FileCode,
  Plus,
} from "lucide-react";

interface CanvasData {
  elements: readonly any[];
  appState: any;
  files: any;
}

export default function CanvasPage() {
  const params = useParams();
  const { theme } = useTheme();
  const [canvasData, setCanvasData] = useState<CanvasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [versions, setVersions] = useState<any[]>([]);
  const [loadingVersions, setLoadingVersions] = useState(false);
  const excalidrawAPIRef = useRef<any>(null);

  const canvasId = params.id as string;

  const createCanvas = useCallback(async () => {
    try {
      const response = await fetch(`/api/canvas/${canvasId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled Canvas",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create canvas");
      }

      const data = await response.json();
      setCanvasData(data.canvas.data);
      setShareToken(data.canvas.shareToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create canvas");
    } finally {
      setLoading(false);
    }
  }, [canvasId]);

  const fetchCanvas = useCallback(async () => {
    try {
      const response = await fetch(`/api/canvas/${canvasId}`);
      if (!response.ok) {
        if (response.status === 404) {
          // Canvas doesn't exist, create it
          await createCanvas();
          return;
        }
        throw new Error("Canvas not found");
      }
      const data = await response.json();
      setCanvasData(data.canvas.data);
      setShareToken(data.canvas.shareToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load canvas");
    } finally {
      setLoading(false);
    }
  }, [canvasId, createCanvas]);

  useEffect(() => {
    if (!canvasData) {
      fetchCanvas();
    }
  }, [canvasId, fetchCanvas]);

  const saveCanvasData = async (data: CanvasData) => {
    if (saving) return;

    setSaving(true);
    try {
      const response = await fetch("/api/canvas/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          canvasId,
          data,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save canvas");
      }
    } catch (err) {
      console.error("Save error:", err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (saving || !canvasData) return;

    try {
      await saveCanvasData(canvasData);
      toast.success("Canvas saved!");
    } catch (err) {
      toast.error("Failed to save canvas");
    }
  };

  const handleShare = async () => {
    try {
      const response = await fetch("/api/canvas/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ canvasId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create share link");
      }

      const data = await response.json();
      setShareToken(data.shareToken);

      // Copy share URL to clipboard
      try {
        await navigator.clipboard.writeText(data.shareUrl);
        toast.success("Share link copied to clipboard!");
      } catch (clipboardError) {
        // Fallback if clipboard API fails
        const textArea = document.createElement("textarea");
        textArea.value = data.shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Share link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to create share link");
    }
  };

  const handleUnshare = async () => {
    try {
      const response = await fetch("/api/canvas/share", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ canvasId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove share link");
      }

      setShareToken(null);
      toast.success("Share link removed");
    } catch (error) {
      toast.error("Failed to remove share link");
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

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `canvas-${canvasId}.png`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("PNG exported successfully");
    } catch (error) {
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

      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `canvas-${canvasId}.svg`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("SVG exported successfully");
    } catch (error) {
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
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `canvas-${canvasId}.json`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("JSON exported successfully");
    } catch (error) {
      toast.error("Failed to export JSON");
    }
  };

  const loadVersions = async () => {
    if (loadingVersions) return;

    setLoadingVersions(true);
    try {
      const response = await fetch(`/api/canvas/${canvasId}/versions`);
      if (!response.ok) {
        throw new Error("Failed to load versions");
      }
      const data = await response.json();
      setVersions(data.versions);
    } catch (error) {
      toast.error("Failed to load versions");
    } finally {
      setLoadingVersions(false);
    }
  };

  const handleRestoreVersion = async (versionId: string) => {
    try {
      const response = await fetch("/api/canvas/restore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ canvasId, versionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to restore version");
      }

      toast.success("Version restored successfully");
      // Reload the page to show the restored version
      window.location.reload();
    } catch (error) {
      toast.error("Failed to restore version");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleCreateVersion = async () => {
    try {
      // Get current canvas data from the Excalidraw API
      if (!excalidrawAPIRef.current) {
        toast.error("Canvas not ready");
        return;
      }

      const elements = excalidrawAPIRef.current.getSceneElements();
      const appState = excalidrawAPIRef.current.getAppState();
      const files = excalidrawAPIRef.current.getFiles();

      const response = await fetch("/api/canvas/version", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          canvasId,
          data: { elements, appState, files },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create version");
      }

      toast.success("Version created successfully");
      // Reload versions to show the new one
      loadVersions();
    } catch (error) {
      toast.error("Failed to create version");
    }
  };

  const handleCanvasChange = useCallback(
    (elements: readonly any[], appState: any, files: any) => {
      // Only update state if the data has actually changed
      if (
        !canvasData ||
        canvasData.elements !== elements ||
        JSON.stringify(canvasData.appState) !== JSON.stringify(appState) ||
        canvasData.files !== files
      ) {
        setCanvasData({ elements, appState, files });
      }
    },
    [canvasData],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-lg">Loading canvas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full w-full">
        {/* Editor Header */}
        <div className="border-b bg-background px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold">Canvas</h1>
              {shareToken && (
                <Badge variant="outline" className="text-xs">
                  <Link2 className="w-3 h-3 mr-1" />
                  Shared
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={shareToken ? handleUnshare : handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {shareToken ? "Unshare" : "Share"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleExportPNG}>
                    <FileImage className="w-4 h-4 mr-2" />
                    Export as PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportSVG}>
                    <FileCode className="w-4 h-4 mr-2" />
                    Export as SVG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportJSON}>
                    <FileJson className="w-4 h-4 mr-2" />
                    Export as JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" onClick={loadVersions}>
                    <History className="w-4 h-4 mr-2" />
                    Versions
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-2">
                  <SheetHeader>
                    <SheetTitle>Version History</SheetTitle>
                    <SheetDescription>
                      Restore previous versions of your canvas
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium ml-2">
                        Version History
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCreateVersion}
                        disabled={loadingVersions}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Version
                      </Button>
                    </div>
                    <div className="overflow-y-auto max-h-[calc(100vh-250px)] space-y-2 pr-2">
                      {loadingVersions ? (
                        <div className="text-sm text-muted-foreground">
                          Loading versions...
                        </div>
                      ) : versions.length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                          No versions found. Click "Create Version" to save the
                          current state.
                        </div>
                      ) : (
                        versions.map((version) => (
                          <div
                            key={version.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <div className="text-sm font-medium">
                                {formatDate(version.createdAt)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Version ID: {version.id.slice(0, 8)}...
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRestoreVersion(version.id)}
                            >
                              Restore
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Canvas Workspace */}
        <div className="flex-1 relative overflow-hidden">
          <DrawingCanvas
            initialData={canvasData}
            onSave={saveCanvasData}
            onChange={handleCanvasChange}
            excalidrawAPI={(api) => {
              excalidrawAPIRef.current = api;
            }}
            theme={theme as "light" | "dark"}
            className="absolute inset-0"
          />

          {/* Floating Toolbar */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-background border rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save canvas</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
