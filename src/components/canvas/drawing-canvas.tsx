"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useCallback, useMemo } from "react";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

interface DrawingCanvasProps {
  initialData?: any;
  onChange?: (elements: readonly any[], appState: any, files: any) => void;
  onSave?: (data: {
    elements: readonly any[];
    appState: any;
    files: any;
  }) => void;
  readOnly?: boolean;
  theme?: "light" | "dark";
  className?: string;
  excalidrawAPI?: (api: any) => void;
}

export default function DrawingCanvas({
  initialData,
  onChange,
  onSave,
  readOnly = false,
  theme = "light",
  className = "",
  excalidrawAPI,
}: DrawingCanvasProps) {
  const excalidrawRef = useRef<any>(null);

  // Ensure initialData has proper structure for Excalidraw - memoized to prevent infinite loops
  const finalInitialData = useMemo(() => {
    const safeInitialData = {
      elements: initialData?.elements || [],
      appState: {
        collaborators: Array.isArray(initialData?.appState?.collaborators)
          ? initialData.appState.collaborators
          : [],
        viewBackgroundColor:
          initialData?.appState?.viewBackgroundColor || "#ffffff",
        currentItemStrokeColor:
          initialData?.appState?.currentItemStrokeColor || "#1e1e1e",
        currentItemBackgroundColor:
          initialData?.appState?.currentItemBackgroundColor || "transparent",
        currentItemFillStyle:
          initialData?.appState?.currentItemFillStyle || "solid",
        currentItemStrokeWidth:
          initialData?.appState?.currentItemStrokeWidth || 1,
        currentItemStrokeStyle:
          initialData?.appState?.currentItemStrokeStyle || "solid",
        currentItemRoughness: initialData?.appState?.currentItemRoughness || 1,
        currentItemOpacity: initialData?.appState?.currentItemOpacity || 100,
        currentFontFamily: initialData?.appState?.currentFontFamily || 1,
        currentFontSize: initialData?.appState?.currentFontSize || 20,
        currentTextAlign: initialData?.appState?.currentTextAlign || "left",
        currentTextVerticalAlign:
          initialData?.appState?.currentTextVerticalAlign || "top",
        currentItemStartArrowhead:
          initialData?.appState?.currentItemStartArrowhead || null,
        currentItemEndArrowhead:
          initialData?.appState?.currentItemEndArrowhead || null,
        scrollX: initialData?.appState?.scrollX || 0,
        scrollY: initialData?.appState?.scrollY || 0,
        zoom: initialData?.appState?.zoom || { value: 1 },
        viewModeEnabled: initialData?.appState?.viewModeEnabled || false,
        zenModeEnabled: initialData?.appState?.zenModeEnabled || false,
        gridModeEnabled: initialData?.appState?.gridModeEnabled || false,
      },
      files: initialData?.files || {},
    };

    // Force collaborators to be an array no matter what
    safeInitialData.appState.collaborators = Array.isArray(
      safeInitialData.appState.collaborators,
    )
      ? safeInitialData.appState.collaborators
      : [];

    // Create a completely new object to avoid any reference issues
    const finalData = JSON.parse(JSON.stringify(safeInitialData));
    finalData.appState.collaborators = Array.isArray(
      finalData.appState.collaborators,
    )
      ? finalData.appState.collaborators
      : [];

    return finalData;
  }, [initialData]); // Only recalculate when initialData changes

  const handleChange = useCallback(
    (elements: readonly any[], appState: any, files: any) => {
      // Ensure appState has collaborators array before passing to callbacks
      const safeAppState = {
        collaborators: Array.isArray(appState?.collaborators)
          ? appState.collaborators
          : [],
        ...appState,
      };

      if (onChange) {
        onChange(elements, safeAppState, files);
      }

      // Removed automatic debounced save - only manual saves allowed
    },
    [onChange],
  );

  return (
    <div className={`h-full w-full ${className}`}>
      <Excalidraw
        initialData={finalInitialData}
        onChange={handleChange}
        viewModeEnabled={readOnly}
        theme={theme}
        excalidrawAPI={(api) => {
          excalidrawRef.current = api;
          if (excalidrawAPI) {
            excalidrawAPI(api);
          }
        }}
      />
    </div>
  );
}
