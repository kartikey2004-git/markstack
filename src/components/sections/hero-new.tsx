"use client";

import { ArrowRight } from "lucide-react";
import { AppContainer } from "@/components/layout/app-container";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  GitBranch,
  Brain,
  FileText,
  Rocket,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Radial system: a pulsing hub, nodes on a dotted orbit, and curved spokes.
// Everything is laid out in one 540×440 space and scaled to fit its column.
const DIAGRAM = {
  width: 540,
  height: 440,
  cx: 270,
  cy: 220,
  orbit: 160,
  outerOrbit: 212,
  hubRadius: 52,
};

const NODES = [
  { id: "capture", angle: -90, title: "Capture", icon: Lightbulb },
  { id: "canvas", angle: -18, title: "Visual canvas", icon: GitBranch, active: true },
  { id: "markdown", angle: 54, title: "Markdown", icon: FileText },
  { id: "organize", angle: 126, title: "Organize AI", icon: Brain },
  { id: "publish", angle: 198, title: "Publish", icon: Rocket },
] as const;

const NODE_WIDTH = 160;
const NODE_HEIGHT = 48;

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return {
    x: DIAGRAM.cx + radius * Math.cos(a),
    y: DIAGRAM.cy + radius * Math.sin(a),
  };
}

// A spoke leaves the hub edge and bows slightly, so the graph reads as organic
// rather than a rigid tree. It ends at the node centre, under the node card.
function spokePath(angleDeg: number) {
  const start = polar(angleDeg, DIAGRAM.hubRadius + 4);
  const end = polar(angleDeg, DIAGRAM.orbit);
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const a = (angleDeg * Math.PI) / 180;
  const bow = 18;
  const ctrlX = midX - Math.sin(a) * bow;
  const ctrlY = midY + Math.cos(a) * bow;
  return `M ${start.x} ${start.y} Q ${ctrlX} ${ctrlY} ${end.x} ${end.y}`;
}

export function HeroNew() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session.data);
      } catch {
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
    <section className="relative overflow-hidden bg-background pt-12 pb-20 sm:pt-16 md:pt-20 md:pb-24">
      <AppContainer className="relative z-10">
        <div className="grid items-center gap-14 xl:grid-cols-2 xl:gap-20">
          {/* Copy */}
          <div className="text-center xl:text-left">
            <span className="inline-flex items-center gap-2.5 border border-border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:px-3.5 sm:text-[11px] sm:tracking-[0.2em]">
              <span className="h-1.5 w-1.5 bg-blue-600" />
              For developers, builders &amp; writers
            </span>

            <h1 className="mx-auto mt-7 text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl xl:mx-0 xl:text-4xl">
              <span className="block">Turn thoughts into</span>
              <span className="block">documents, diagrams and</span>
              <span className="block"><span className="text-blue-600">published</span> knowledge</span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg xl:mx-0">
              Capture ideas, map them visually, organize them with AI, and
              publish them all inside one connected workspace.
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center xl:justify-start">
              <Button
                size="lg"
                className="h-12 rounded-none bg-foreground px-7 text-[15px] font-medium text-background hover:bg-foreground/90"
                onClick={handleStartWriting}
                disabled={isAuthenticated === null}
              >
                Start writing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-none border-border px-7 text-[15px] font-medium"
                onClick={handleBrowseContent}
              >
                Browse content
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground xl:justify-start">
              <span>Markdown</span>
              <span>Visual canvas</span>
              <span>AI organization</span>
              <span>Publishing</span>
            </div>
          </div>

          {/* Visual: the radial node system, scaled to fit on every screen */}
          <FitDiagram>
            <svg
              viewBox={`0 0 ${DIAGRAM.width} ${DIAGRAM.height}`}
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              {/* Orbits */}
              <circle
                cx={DIAGRAM.cx}
                cy={DIAGRAM.cy}
                r={DIAGRAM.outerOrbit}
                stroke="rgba(15,23,42,0.07)"
                strokeWidth={1}
              />
              <circle
                cx={DIAGRAM.cx}
                cy={DIAGRAM.cy}
                r={DIAGRAM.orbit}
                stroke="rgba(15,23,42,0.18)"
                strokeWidth={1.25}
                strokeDasharray="1 6"
                strokeLinecap="round"
              />

              {/* Spokes */}
              {NODES.map((node) => (
                <path
                  key={`spoke-${node.id}`}
                  d={spokePath(node.angle)}
                  stroke="rgba(15,23,42,0.16)"
                  strokeWidth={1}
                />
              ))}

              {/* Particles travelling hub → node */}
              {NODES.map((node, index) => (
                <circle key={`dot-${node.id}`} r={2.5} fill="#0f172a">
                  <animateMotion
                    dur="3s"
                    begin={`${index * 0.6}s`}
                    repeatCount="indefinite"
                    path={spokePath(node.angle)}
                  />
                </circle>
              ))}

              {/* Hub pulse */}
              <circle
                cx={DIAGRAM.cx}
                cy={DIAGRAM.cy}
                r={DIAGRAM.hubRadius}
                stroke="rgba(37,99,235,0.6)"
                strokeWidth={1}
              >
                <animate
                  attributeName="r"
                  values={`${DIAGRAM.hubRadius};${DIAGRAM.hubRadius + 30}`}
                  dur="2.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>

            <div
              className="absolute z-40 flex items-center justify-center rounded-full bg-foreground text-background shadow-[0_24px_48px_-20px_rgba(15,23,42,0.5)]"
              style={{
                left: DIAGRAM.cx - DIAGRAM.hubRadius,
                top: DIAGRAM.cy - DIAGRAM.hubRadius,
                width: DIAGRAM.hubRadius * 2,
                height: DIAGRAM.hubRadius * 2,
              }}
            >
              <Workflow className="h-8 w-8" strokeWidth={1.5} />
            </div>

            {NODES.map((node) => {
              const point = polar(node.angle, DIAGRAM.orbit);
              return (
                <NodeCard
                  key={node.id}
                  title={node.title}
                  icon={<node.icon className="h-4 w-4" />}
                  active={"active" in node && node.active}
                  style={{
                    left: point.x - NODE_WIDTH / 2,
                    top: point.y - NODE_HEIGHT / 2,
                    width: NODE_WIDTH,
                    height: NODE_HEIGHT,
                  }}
                />
              );
            })}
          </FitDiagram>
        </div>
      </AppContainer>
    </section>
  );
}

// Renders children at the diagram's full 540×440 size, then scales the whole
// stage down (never up) so it fits its column. Full size at xl and up.
function FitDiagram({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const update = () => {
      setScale(Math.min(1, element.clientWidth / DIAGRAM.width));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto w-full overflow-hidden"
      style={{
        maxWidth: DIAGRAM.width,
        height: DIAGRAM.height * scale,
      }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: DIAGRAM.width,
          height: DIAGRAM.height,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function NodeCard({
  title,
  icon,
  active,
  style,
}: {
  title: string;
  icon: ReactNode;
  active: boolean;
  style: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "absolute z-30 flex items-center gap-2.5 whitespace-nowrap rounded-xl border bg-white px-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_12px_28px_-16px_rgba(15,23,42,0.25)]",
        active ? "border-blue-600/40" : "border-black/[0.06]",
      )}
      style={style}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          active ? "bg-blue-600 text-white" : "bg-muted text-foreground",
        )}
      >
        {icon}
      </span>
      <span className="truncate text-xs font-medium text-foreground">
        {title}
      </span>
      {active && (
        <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
      )}
    </div>
  );
}
