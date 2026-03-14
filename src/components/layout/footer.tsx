import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-lg font-semibold">Markstack</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Modern markdown blogging platform with instant preview and seamless publishing.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/editor"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Editor
              </Link>
              <Link
                href="#blogs"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Blogs
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2 text-sm">
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <div className="space-y-2 text-sm">
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
        <Separator className="mt-8 mb-4" />
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Markstack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
