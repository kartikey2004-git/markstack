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
import { Button } from "@/components/ui/button";
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

  const toolbarButtons = [
    { icon: Heading1, label: "Heading 1", syntax: "h1" },
    { icon: Heading2, label: "Heading 2", syntax: "h2" },
    { icon: Heading3, label: "Heading 3", syntax: "h3" },
    { icon: Bold, label: "Bold", syntax: "bold" },
    { icon: Italic, label: "Italic", syntax: "italic" },
    { icon: Code, label: "Inline Code", syntax: "code" },
    { icon: List, label: "Bullet List", syntax: "bullet" },
    { icon: ListOrdered, label: "Numbered List", syntax: "numbered" },
    { icon: Quote, label: "Quote", syntax: "quote" },
    { icon: Code, label: "Code Block", syntax: "codeblock" },
    { icon: Minus, label: "Divider", syntax: "divider" },
    { icon: Image, label: "Image", syntax: "image" },
  ];

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
      </div>
    </TooltipProvider>
  );
}
