"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Quote,
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

export interface ToolbarProps {
  onInsert: (syntax: string) => Promise<void>;
  onStructureMarkdown?: () => Promise<void>;
}

export function Toolbar({ onInsert, onStructureMarkdown }: ToolbarProps) {
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
  };

  const toolbarButtons = toolbarCommandDefinitions.map(({ label, syntax }) => ({
    icon: toolbarIcons[syntax],
    label,
    syntax,
  }));

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-1.5 border-b bg-muted/30 p-2">
        {toolbarButtons.map(({ icon: Icon, label, syntax }) => (
          <Tooltip key={syntax}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleInsert(syntax)}
                disabled={loadingAction === syntax}
                className="transition-all duration-200 ease-in-out"
              >
                <Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <div className="mx-1 h-6 w-px bg-border" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleStructureMarkdown}
              disabled={isStructuring || !onStructureMarkdown}
              className="h-8 px-2 transition-all duration-200 ease-in-out"
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
      </div>
    </TooltipProvider>
  );
}
