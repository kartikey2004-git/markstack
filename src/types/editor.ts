import type { editor as MonacoEditor, Selection } from "monaco-editor";

export type EditorEdit = MonacoEditor.IIdentifiedSingleEditOperation;
export type EditorInstance = MonacoEditor.IStandaloneCodeEditor;
export type EditorSelection = Selection;
