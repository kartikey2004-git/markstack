"use client";

import dynamic from "next/dynamic";
import { useRef, useCallback, useMemo } from "react";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

import type {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import type { CanvasData } from "@/types/canvas";

interface DrawingCanvasProps {
  initialData?: CanvasData | null;
  onChange?: (
    elements: readonly ExcalidrawElement[],
    appState: Partial<AppState>,
    files: BinaryFiles,
  ) => void;
  readOnly?: boolean;
  theme?: "light" | "dark";
  className?: string;
  excalidrawAPI?: (api: ExcalidrawImperativeAPI) => void;
}

export default function DrawingCanvas({
  initialData,
  onChange,
  readOnly = false,
  theme = "light",
  className = "",
  excalidrawAPI,
}: DrawingCanvasProps) {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const lastCanvasDataRef = useRef<{
    elements: readonly ExcalidrawElement[];
    appState: Partial<AppState>;
  } | null>(null);

  // Safe initial data creation with useMemo
  const safeInitialData = useMemo<ExcalidrawInitialDataState | undefined>(() => {
    if (!initialData) return undefined;

    // The stored appState is untyped JSON and does not match Excalidraw's
    // AppState exactly (e.g. collaborators is an array, zoom is a plain number),
    // so it is read as a record with defaults and cast once at the boundary.
    const stored = (initialData.appState ?? {}) as Record<string, unknown>;
    const pick = (key: string, fallback: unknown) => stored[key] || fallback;

    return {
      elements: initialData.elements || [],
      appState: {
        collaborators: Array.isArray(stored.collaborators)
          ? stored.collaborators
          : [],
        viewBackgroundColor: pick("viewBackgroundColor", "#ffffff"),
        currentItemStrokeColor: pick("currentItemStrokeColor", "#1e1e1e"),
        currentItemBackgroundColor: pick(
          "currentItemBackgroundColor",
          "transparent",
        ),
        currentItemFillStyle: pick("currentItemFillStyle", "solid"),
        currentItemStrokeWidth: pick("currentItemStrokeWidth", 1),
        currentItemStrokeStyle: pick("currentItemStrokeStyle", "solid"),
        currentItemRoughness: pick("currentItemRoughness", 1),
        currentItemOpacity: pick("currentItemOpacity", 100),
        currentFontFamily: pick("currentFontFamily", 1),
        currentFontSize: pick("currentFontSize", 20),
        currentTextAlign: pick("currentTextAlign", "left"),
        currentTextVerticalAlign: pick("currentTextVerticalAlign", "top"),
        currentItemStartArrowhead: pick("currentItemStartArrowhead", null),
        currentItemEndArrowhead: pick("currentItemEndArrowhead", null),
        scrollX: pick("scrollX", 0),
        scrollY: pick("scrollY", 0),
        zoom: pick("zoom", { value: 1 }),
        viewModeEnabled: pick("viewModeEnabled", false),
        zenModeEnabled: pick("zenModeEnabled", false),
        gridModeEnabled: pick("gridModeEnabled", false),
      },
      files: {},
    } as unknown as ExcalidrawInitialDataState;
    // Depends only on the element count (the canvas id was never part of the data).
  }, [initialData?.elements?.length]);

  // Handle canvas changes with proper state management
  const handleChange = useCallback(
    (
      elements: readonly ExcalidrawElement[],
      appState: Partial<AppState>,
      files: BinaryFiles,
    ) => {
      const newCanvasData = { elements, appState };
      if (
        JSON.stringify(lastCanvasDataRef.current) ===
        JSON.stringify(newCanvasData)
      ) {
        return;
      }

      lastCanvasDataRef.current = newCanvasData;

      if (onChange) {
        onChange(elements, appState, files);
      }
    },
    [onChange],
  );

  return (
    <div className={`h-full w-full ${className}`}>
      <Excalidraw
        initialData={safeInitialData}
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
