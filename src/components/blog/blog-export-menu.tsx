"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Loader2, Download, ChevronDown } from "lucide-react";
import { useBlogExport } from "@/hooks/use-blog-export";

interface BlogExportMenuProps {
  blogId: string;
  slug: string;
}

export function BlogExportMenu({ blogId, slug }: BlogExportMenuProps) {
  const { exportMarkdown, isExportingMarkdown, isExporting } = useBlogExport(
    blogId,
    slug,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="gap-2 border-border/80 bg-background/80 shadow-sm backdrop-blur-sm"
          disabled={isExporting}
        >
          <Download className="size-4" />
          <span className="hidden sm:inline">Export</span>
          <ChevronDown className="size-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          className="gap-2"
          onClick={(event) => {
            event.preventDefault();
            exportMarkdown();
          }}
          disabled={isExporting}
        >
          {isExportingMarkdown ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <FileText className="size-4" />
          )}
          Export Markdown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
