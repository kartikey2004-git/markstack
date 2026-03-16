"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Plus, Eye, Share2, Trash2, Palette, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ProtectedPageWrapper } from "@/components/layout/protected-page-wrapper";

interface Canvas {
  id: string;
  title: string;
  isPublic: boolean;
  shareToken: string | null;
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
      const response = await fetch("/api/canvases");
      if (!response.ok) {
        throw new Error("Failed to fetch canvases");
      }
      const data = await response.json();
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
      const response = await fetch(`/api/canvas/${canvasId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ canvasId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete canvas");
      }

      setCanvases(canvases.filter((canvas) => canvas.id !== canvasId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete canvas");
    }
  };

  if (loading) {
    return (
      <ProtectedPageWrapper>
        <PageSkeleton cardCount={8} gridCols="2" />
      </ProtectedPageWrapper>
    );
  }

  if (error) {
    return (
      <ProtectedPageWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </ProtectedPageWrapper>
    );
  }

  return (
    <ProtectedPageWrapper
      title="Your Canvases"
      description="Manage and organize your design canvases"
      actions={
        <Link href="/canvas/new">
          <Button className="bg-black text-white hover:bg-black/90">
            <Plus className="w-4 h-4 mr-2" />
            New Canvas
          </Button>
        </Link>
      }
    >
      {canvases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Palette className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">No canvases yet</h3>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            Start creating by setting up your first design canvas. Organize your
            ideas, sketches, and projects in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/canvas/new">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-black/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Canvas
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {canvases.map((canvas) => (
              <Card key={canvas.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg truncate">
                      {canvas.title || "Untitled Canvas"}
                    </CardTitle>
                    <div className="flex gap-2">
                      {canvas.isPublic && (
                        <Badge variant="secondary" className="text-xs">
                          <Share2 className="w-3 h-3 mr-1" />
                          Public
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Created{" "}
                      {formatDistanceToNow(new Date(canvas.createdAt), {
                        addSuffix: true,
                      })}{" "}
                      ago
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Updated{" "}
                      {formatDistanceToNow(new Date(canvas.updatedAt), {
                        addSuffix: true,
                      })}{" "}
                      ago
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Link href={`/canvas/${canvas.id}`}>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Open
                        </Button>
                      </Link>

                      <Link href={`/canvas/${canvas.id}`}>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCanvas(canvas.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </ProtectedPageWrapper>
  );
}
