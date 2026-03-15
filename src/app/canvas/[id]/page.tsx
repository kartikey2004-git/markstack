"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import DrawingCanvas from "@/components/canvas/drawing-canvas";
import CanvasToolbar from "@/components/canvas/canvas-toolbar";
import { useTheme } from "next-themes";

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
  const excalidrawAPIRef = useRef<any>(null);

  const canvasId = params.id as string;

  useEffect(() => {
    if (!canvasData) {
      fetchCanvas();
    }
  }, [canvasId]);

  const fetchCanvas = async () => {
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
  };

  const createCanvas = async () => {
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
  };

  const handleSave = async (data: CanvasData) => {
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
    } finally {
      setSaving(false);
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading canvas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <CanvasToolbar
        canvasId={canvasId}
        excalidrawAPI={excalidrawAPIRef.current}
        onSave={() => {
          /* Manual save handled by autosave */
        }}
        isSaving={saving}
        isReadOnly={false}
        shareToken={shareToken}
        onShareChange={setShareToken}
      />
      <div className="flex-1">
        <DrawingCanvas
          initialData={canvasData}
          onSave={handleSave}
          onChange={handleCanvasChange}
          excalidrawAPI={(api) => {
            excalidrawAPIRef.current = api;
          }}
          theme={theme as "light" | "dark"}
        />
      </div>
    </div>
  );
}
