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
}

export function Toolbar({ onInsert }: ToolbarProps) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleInsert = async (syntax: string) => {
    setLoadingAction(syntax);
    try {
      await onInsert(syntax);
    } finally {
      setLoadingAction(null);
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
      </div>
    </TooltipProvider>
  );
}
