"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="relative overflow-hidden rounded-2xl bg-card/50 px-4 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-4 flex justify-center sm:mb-6">
          <Badge
            variant="secondary"
            className="gap-2 rounded-md border border-border px-3 py-1 text-xs"
          >
            <Sparkles className="size-3" />
            Creator Workspace
          </Badge>
        </div>

        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Create, write, and organize,
          <br />
          <span className="text-muted-foreground">all in one workspace.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
          MarkStack combines visual canvases, markdown blogs, and task planning
          in a clean workspace designed for creators who build and organize
          their ideas.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
          {[
            { icon: Edit3, label: "Visual Canvas" },
            { icon: Eye, label: "Blog Publishing" },
            { icon: Save, label: "Todo Planning" },
            { icon: Zap, label: "Markdown Editor" },
          ].map(({ icon: Icon, label }) => (
            <Badge
              key={label}
              variant="outline"
              className="gap-1.5 rounded-md border-border/80 bg-background/80 px-3 py-1"
            >
              <Icon className="size-3.5" />
              {label}
            </Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row">
          <Button
            size="lg"
            className="h-10 w-full gap-2 px-5 transition-all duration-200 ease-in-out sm:w-auto"
            onClick={handleStartWriting}
            disabled={isAuthenticated === null}
          >
            Start Writing
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-10 w-full px-5 sm:w-auto"
            onClick={handleBrowseContent}
          >
            Browse Content
          </Button>
        </div>

        <Card className="mx-auto mt-8 max-w-2xl border-border/70 bg-background/80 shadow-none sm:mt-12">
          <CardContent className="grid gap-4 p-4 text-left sm:gap-6 sm:p-5 sm:grid-cols-3">
            <div>
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                3
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Creative tools in one workspace
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                Public
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Blog publishing and sharing
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                Organized
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Task planning with calendar view
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
