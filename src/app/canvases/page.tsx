"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Share2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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

      setCanvases(canvases.filter(canvas => canvas.id !== canvasId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete canvas");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading canvases...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500 text-lg">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Canvases</h1>
            <p className="text-muted-foreground">
              Manage and organize your design canvases
            </p>
          </div>
          <Link href="/canvas/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Canvas
            </Button>
          </Link>
        </div>

        {canvases.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-4">
              No canvases yet
            </div>
            <p className="text-muted-foreground mb-8">
              Create your first canvas to get started
            </p>
            <Link href="/canvas/new">
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Canvas
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {canvases.map((canvas) => (
              <Card key={canvas.id} className="hover:shadow-lg transition-shadow">
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
                      Created {formatDistanceToNow(new Date(canvas.createdAt), { addSuffix: true })} ago
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Updated {formatDistanceToNow(new Date(canvas.updatedAt), { addSuffix: true })} ago
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
        )}
      </div>
    </div>
  );
}
