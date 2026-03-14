"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Quote,
  Image,
  Minus,
  Heading1,
  Heading2,
  Heading3,
  Sparkles,
  Loader2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toolbarCommandDefinitions } from "@/lib/markdown/command-catalog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileUpload } from "./file-upload";

export interface ToolbarProps {
  onInsert: (syntax: string) => Promise<void>;
  onStructureMarkdown?: () => Promise<void>;
  onFileUpload?: (file: File) => void;
}

export function Toolbar({
  onInsert,
  onStructureMarkdown,
  onFileUpload,
}: ToolbarProps) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [isStructuring, setIsStructuring] = useState(false);

  const handleInsert = async (syntax: string) => {
    setLoadingAction(syntax);
    try {
      await onInsert(syntax);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleStructureMarkdown = async () => {
    if (!onStructureMarkdown) return;

    setIsStructuring(true);
    try {
      await onStructureMarkdown();
    } finally {
      setIsStructuring(false);
    }
  };

  const toolbarIcons: Record<string, LucideIcon> = {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    bold: Bold,
    italic: Italic,
    code: Code,
    bullet: List,
    numbered: ListOrdered,
    quote: Quote,
    codeblock: Code,
    divider: Minus,
    image: Image,
  };

  const toolbarButtons = toolbarCommandDefinitions.map(({ label, syntax }) => ({
    icon: toolbarIcons[syntax],
    label,
    syntax,
  }));

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-2 border-b bg-background">
        {toolbarButtons.map(({ icon: Icon, label, syntax }) => (
          <Tooltip key={syntax}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleInsert(syntax)}
                disabled={loadingAction === syntax}
                className="h-8 w-8 p-0"
              >
                <Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <div className="w-px h-6 bg-border mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleStructureMarkdown}
              disabled={isStructuring || !onStructureMarkdown}
              className="h-8 px-2"
            >
              {isStructuring ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-1" />
              )}
              <span className="text-xs">
                {isStructuring ? "Structuring..." : "Structure"}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Structure Markdown</p>
          </TooltipContent>
        </Tooltip>

        {onFileUpload && (
          <div className="ml-2">
            <FileUpload onFileUpload={onFileUpload} />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
