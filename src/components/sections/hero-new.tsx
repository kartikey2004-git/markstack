"use client";

import { ArrowRight } from "lucide-react";
import { AppContainer } from "@/components/layout/app-container";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lightbulb, GitBranch, Brain, FileText, Rocket } from "lucide-react";
import { Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimationContainer } from "./two";

export function HeroNew() {
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
    <section className="relative overflow-hidden bg-background pt-16 pb-20 sm:pt-20">
      <AppContainer className="relative z-10">
        <div className="mx-auto max-w-215 scale-[0.88] origin-top text-center">
          <div className="mb-7">
            <span className="inline-flex items-center bg-muted px-5 py-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground">
              FOR DEVELOPERS, BUILDERS & WRITERS
            </span>
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-medium leading-none tracking-tighter text-foreground md:text-6xl">
            Turn Thoughts into
            <br />
            Documents, Diagrams and
            <br />
            <span className="text-blue-600">Published</span> Knowledge
          </h1>

          <p className="mx-auto mt-7 max-w-190 text-lg leading-snug text-muted-foreground md:text-xl">
            Capture ideas, map them visually, organize them with AI, and publish
            them all inside one connected workspace.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-13 rounded-none bg-foreground px-8 text-[15px] font-medium text-background hover:bg-foreground/90"
              onClick={handleStartWriting}
              disabled={isAuthenticated === null}
            >
              Start Writing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-13 rounded-none px-8 text-[15px] font-medium"
              onClick={handleBrowseContent}
            >
              Browse Content
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
            <span>✦ Markdown</span>
            <span>✦ Visual Canvas</span>
            <span>✦ AI Organization</span>
            <span>✦ Publishing</span>
          </div>

          <div className="hidden lg:block">
            <div className="relative mx-auto mt-40 h-[300px] w-[900px] pt-10">
              <AnimationContainer />
          
              <SignalCard
                className="absolute left-1/2 top-[-110px] -translate-x-1/2"
                icon={<Lightbulb size={18} />}
                label="Capture Ideas"
              />
          
              <SignalCard
                className="absolute left-10 top-[-10px]"
                icon={<GitBranch size={18} />}
                label="Visual Canvas"
              />
          
              <SignalCard
                className="absolute top-[90px]"
                icon={<Brain size={18} />}
                label="Organize Knowledge"
              />
          
              <SignalCard
                className="absolute right-[90px] top-[-10px]"
                icon={<FileText size={18} />}
                label="Markdown Editor"
              />
          
              <SignalCard
                className="absolute right-[5px] top-[90px]"
                icon={<Rocket size={18} />}
                label="Instant Publishing"
              />
            </div>
          
            <div className="-mt-1">
              <DottedFooter />
              <CenterHub />
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}

function SignalCard({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "z-30 flex items-center gap-3 border border-border bg-background/60 px-5 py-3 backdrop-blur-md",
        "shadow-lg",
        className,
      )}
    >
      {icon}
      <span className="font-mono text-xs md:text-sm uppercase tracking-[0.15em] text-foreground">
        {label}
      </span>
    </div>
  );
}

function DottedFooter() {
  return (
    <div className="absolute bottom-0 z-20 h-[70px] w-full bg-background">
      <div
        className="h-full w-full"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
    </div>
  );
}

function CenterHub() {
  return (
    <div className="absolute bottom-0 left-1/2 z-40 -translate-x-1/2 pt-4">
      <div className="ml-10 flex h-[140px] w-[140px] items-center justify-center rounded-t-[24px] border border-border bg-muted md:h-[180px] md:w-[180px]">
        <Workflow
          className="h-12 w-12 text-foreground md:h-16 md:w-16"
          strokeWidth={1.75}
        />
      </div>
    </div>
  );
}
