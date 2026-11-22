"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Plus, Eye, Share2, Trash2, Palette } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { AuthGuard } from "@/components/auth/auth-guard";
import { ProtectedPageWrapper } from "@/components/layout/protected-page-wrapper";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { toast } from "sonner";
import { jsonRequestInit, requestJson, requestOk } from "@/lib/api/client";

interface Canvas {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export default function AllCanvasesPage() {
  const [canvases, setCanvases] = useState<Canvas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCanvases();
  }, []);

  const fetchCanvases = async () => {
    try {
      const data = await requestJson<{ canvases: Canvas[] }>(
        "/api/canvases",
        undefined,
        { fallback: "Failed to fetch canvases" },
      );
      setCanvases(data.canvases);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load canvases");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCanvas = async (canvasId: string) => {
    if (!confirm("Are you sure you want to delete this canvas?")) {
      return;
    }

    try {
      await requestOk(
        `/api/canvas/${canvasId}`,
        jsonRequestInit("DELETE", { canvasId }),
        { fallback: "Failed to delete canvas" },
      );

      setCanvases(canvases.filter((canvas) => canvas.id !== canvasId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete canvas");
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <ProtectedPageWrapper>
          <PageSkeleton cardCount={8} gridCols="2" />
        </ProtectedPageWrapper>
      </AuthGuard>
    );
  }

  if (error) {
    return (
      <AuthGuard>
        <ProtectedPageWrapper title="Your canvases">
          <ErrorState
            description={error}
            action={{ label: "Try again", onClick: fetchCanvases }}
          />
        </ProtectedPageWrapper>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <ProtectedPageWrapper
        title="Your canvases"
        description="Organize your ideas, sketches, and projects in one place."
        actions={
          <Link href="/canvas/new" className="w-full sm:w-auto">
            <Button size="lg" className="w-full gap-2 sm:w-auto">
              <Plus className="size-4" />
              New canvas
            </Button>
          </Link>
        }
      >
        {canvases.length === 0 ? (
          <EmptyState
            icon={Palette}
            title="No canvases yet"
            description="Start creating by setting up your first design canvas. Organize your ideas, sketches, and projects in one place."
            action={{ label: "Create your first canvas", href: "/canvas/new" }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {canvases.map((canvas) => (
              <Card
                key={canvas.id}
                className="group transition-all duration-200 hover:border-foreground/20 hover:shadow-md cursor-pointer h-full"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 sm:gap-4">
                    <CardTitle className="text-base font-semibold truncate group-hover:text-foreground flex-1">
                      {canvas.title || "Untitled Canvas"}
                    </CardTitle>

                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {new Date(canvas.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">
                    Updated{" "}
                    {formatDistanceToNow(new Date(canvas.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                    <Link
                      href={`/canvas/${canvas.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>

                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(
                            `${window.location.origin}/canvas/${canvas.id}`,
                          );
                          toast.success("Link copied to clipboard");
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCanvas(canvas.id);
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ProtectedPageWrapper>
    </AuthGuard>
  );
}
