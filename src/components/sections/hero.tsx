"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit3, Eye, Zap, Save, Sparkles, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session.data);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleStartWriting = () => {
    if (isAuthenticated) {
      router.push("/editor");
    } else {
      router.push("/auth?callbackUrl=/editor");
    }
  };

  const handleBrowseContent = () => {
    router.push("/blogs");
  };

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="mb-6 flex justify-center">
          <Badge className="gap-2 px-3 py-1 text-xs text-black bg-muted border border-border">
            <Sparkles className="w-3 h-3" />
            Writing Assistant
          </Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
          Write Markdown.
          <br />
          <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Publish with Markstack.
          </span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          A modern markdown platform with instant preview, intelligent auto-save
          and seamless publishing. Built for writers and developers.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            { icon: Edit3, label: "Monaco Editor" },
            { icon: Eye, label: "Live Preview" },
            { icon: Save, label: "Auto Save" },
            { icon: Zap, label: "Slash Commands" },
          ].map(({ icon: Icon, label }, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              <Icon className="w-3 h-3" /> {label}
            </Badge>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="gap-2 px-8 h-12 text-base group"
            onClick={handleStartWriting}
            disabled={isAuthenticated === null}
          >
            Start Writing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8"
            onClick={handleBrowseContent}
            disabled={isAuthenticated === null}
          >
            Browse Content
          </Button>
        </div>
      </div>
    </section>
  );
}
