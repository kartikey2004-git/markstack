"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DrawingCanvas from "@/components/canvas/drawing-canvas";
import { useTheme } from "next-themes";

interface CanvasData {
  elements: any[];
  appState: any;
  files: any;
}

export default function SharePage() {
  const params = useParams();
  const { theme } = useTheme();
  const [canvasData, setCanvasData] = useState<CanvasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canvasTitle, setCanvasTitle] = useState<string>("Shared Canvas");

  const shareToken = params.token as string;

  useEffect(() => {
    fetchSharedCanvas();
  }, [shareToken]);

  const fetchSharedCanvas = async () => {
    try {
      const response = await fetch(`/api/share/${shareToken}`);
      if (!response.ok) {
        throw new Error("Canvas not found or not publicly accessible");
      }
      const data = await response.json();
      setCanvasData(data.data);
      setCanvasTitle(data.title || "Shared Canvas");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load canvas");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading shared canvas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <p className="text-gray-500">The canvas may not be publicly accessible or the link is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">{canvasTitle}</h1>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            Read-only
          </span>
        </div>
        <a 
          href="/canvas/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Your Own Canvas
        </a>
      </div>
      <div className="flex-1">
        <DrawingCanvas
          initialData={canvasData}
          readOnly={true}
          theme={theme as "light" | "dark"}
        />
      </div>
    </div>
  );
}
