"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { jsonRequestInit, requestJson } from "@/lib/api/client";

export default function NewCanvasPage() {
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const createCanvas = async () => {
    if (!title.trim()) {
      toast.error("Please enter a canvas title");
      return;
    }

    setCreating(true);
    try {
      const data = await requestJson<{ canvas: { id: string } }>(
        "/api/canvas/create",
        jsonRequestInit("POST", { title: title.trim() }),
        { fallback: "Failed to create canvas" },
      );
      toast.success("Canvas created successfully!");
      router.push(`/canvas/${data.canvas.id}`);
    } catch {
      toast.error("Failed to create canvas");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create New Canvas</CardTitle>
          <CardDescription>
            Start drawing with our interactive whiteboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Canvas Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter canvas title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createCanvas();
                }
              }}
            />
          </div>
          <Button
            size="lg"
            onClick={createCanvas}
            disabled={creating || !title.trim()}
            className="w-full"
          >
            {creating ? "Creating..." : "Create Canvas"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
