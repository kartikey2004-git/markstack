import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileX } from "lucide-react";

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <FileX className="w-16 h-16 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
          <p className="text-muted-foreground">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link href="/editor">
            <Button className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Editor
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
