"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit3,
  Eye,
  Zap,
  Save,
  FolderOpen,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative text-center space-y-8 py-16 sm:py-20 lg:py-24">
        <div className="space-y-6">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              New: AI-Powered Writing Assistant
            </span>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge
              variant="secondary"
              className="gap-1 bg-background/50 backdrop-blur-sm border-border/50"
            >
              <Edit3 className="w-3 h-3" />
              Monaco Editor
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-background/50 backdrop-blur-sm border-border/50"
            >
              <Eye className="w-3 h-3" />
              Live Preview
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-background/50 backdrop-blur-sm border-border/50"
            >
              <Save className="w-3 h-3" />
              Auto-Save
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-background/50 backdrop-blur-sm border-border/50"
            >
              <Zap className="w-3 h-3" />
              Slash Commands
            </Badge>
          </div>

          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Write Markdown.
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Publish with Markstack.
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4 font-light">
              Markstack is the modern markdown platform with instant preview,
              intelligent auto-save, and seamless publishing. Create
              professional content that captivates your audience.
            </p>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-primary-foreground">
                      {i}
                    </span>
                  </div>
                ))}
              </div>
              <span className="ml-2">1,00+ writers</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1">5.0 rating</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link href="/editor">
            <Button
              size="lg"
              className="gap-2 text-lg px-8 py-6 w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Start Writing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 text-lg px-8 py-6 w-full sm:w-auto border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-200 group"
            onClick={() => {
              const element = document.getElementById("blogs");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Browse Content
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Key features highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto px-4 mt-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Instant setup</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Free forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}
