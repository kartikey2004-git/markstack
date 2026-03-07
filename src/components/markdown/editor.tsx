"use client";

import { useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { useSlashCommands } from "@/hooks/use-slash-commands";
import {
  applyMarkdownFormat,
  FormatType,
} from "@/lib/markdown/format-selection";

export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onInsertSyntax: (syntax: string) => void;
  onEditorReady: (editor: any) => void;
}

export function MarkdownEditor({
  value,
  onChange,
  onInsertSyntax,
  onEditorReady,
}: MarkdownEditorProps) {
  const editorRef = useRef<any>(null);
  const applyFormatRef = useRef<(formatType: FormatType) => void>(() => {});

  const {
    isOpen,
    position,
    selectedIndex,
    filteredCommands,
    filter,
    setFilter,
    openMenu,
    closeMenu,
    selectCommand,
  } = useSlashCommands(editorRef);

  const applyFormat = useCallback(
    (formatType: FormatType) => {
      if (!editorRef.current) return;

      applyMarkdownFormat(editorRef.current, formatType);

      const newContent = editorRef.current.getValue();
      onChange(newContent);

      editorRef.current.focus();
    },
    [onChange],
  );

  applyFormatRef.current = applyFormat;

  const handleEditorDidMount = useCallback(
    (editor: any) => {
      editorRef.current = editor;
      onEditorReady(editor);

      editor.getModel()?.setLanguage("markdown");

      editor.onDidChangeModelContent(() => {
        const position = editor.getPosition();
        const model = editor.getModel();
        const lineContent = model.getLineContent(position.lineNumber);
        const cursorColumn = position.column;

        const beforeCursor = lineContent.slice(0, cursorColumn - 1);
        const slashMatch = beforeCursor.match(/\/([a-zA-Z]*)$/);

        if (slashMatch) {
          const slashStart = cursorColumn - slashMatch[0].length;
          const coords = editor.getScrolledVisiblePosition(position);
          const editorDomNode = editor.getDomNode();
          const rect = editorDomNode.getBoundingClientRect();

          openMenu(
            rect.top + coords.top - 20,
            rect.left + coords.left,
            model.getOffsetAt({
              lineNumber: position.lineNumber,
              column: slashStart,
            }),
            model.getOffsetAt(position),
          );
          setFilter(slashMatch[1]);
        } else {
          closeMenu();
        }
      });

      editor.onDidBlurEditorText(() => {
        setTimeout(closeMenu, 150);
      });
    },
    [openMenu, closeMenu, setFilter, applyFormat],
  );

  return (
    <div className="relative h-full">
      <Editor
        height="100%"
        defaultLanguage="markdown"
        value={value}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          fontSize: 15,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
          theme: "vs-dark",
          padding: { top: 20, bottom: 20 },
          lineHeight: 1.6,
        }}
      />

      {isOpen && (
        <div
          className="absolute z-50 w-64 rounded-sm border bg-popover p-1 shadow-md"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <div className="max-h-64 overflow-y-auto">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => (
                <div
                  key={command.id}
                  className={`flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent ${
                    index === selectedIndex ? "bg-accent" : ""
                  }`}
                  onClick={() => selectCommand(command)}
                >
                  <div className="flex-1">
                    <div className="font-medium">{command.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {command.description}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No commands found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
