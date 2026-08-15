"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Pencil,
  Network,
  Workflow,
  Rocket,
  Sparkles,
} from "lucide-react";
import { AppContainer } from "@/components/layout/app-container";

type Step = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  panelTitle: string;
  panelDescription: string;
  icon: React.ElementType;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Capture",
    description:
      "Save ideas, notes, and research the moment inspiration strikes.",
    tags: ["Notes", "Ideas", "Research", "Links"],
    panelTitle: "Quick Capture",
    panelDescription:
      "Capture thoughts, snippets, bookmarks, and research from anywhere.",
    icon: Pencil,
  },
  {
    id: 2,
    title: "Connect",
    description:
      "Link related thoughts together to build a living knowledge graph.",
    tags: ["Backlinks", "Knowledge", "Relations", "AI"],
    panelTitle: "Connected Knowledge",
    panelDescription:
      "Discover relationships between notes and build structured knowledge.",
    icon: Network,
  },
  {
    id: 3,
    title: "Visualize",
    description:
      "Use canvases to explore concepts, systems, and workflows.",
    tags: ["Canvas", "Mind Maps", "Flows", "Diagrams"],
    panelTitle: "Visual Canvas",
    panelDescription:
      "Map concepts visually and connect ideas on an infinite canvas.",
    icon: Workflow,
  },
  {
    id: 4,
    title: "Publish",
    description:
      "Turn your knowledge into beautiful content ready to share.",
    tags: ["Blogs", "Docs", "Share", "Publish"],
    panelTitle: "Ready to Publish",
    panelDescription:
      "Transform notes into polished content and publish instantly.",
    icon: Rocket,
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(1);

  return (
    <section className="bg-foreground text-background">
      <AppContainer className="py-24">
        <div className="grid gap-20 lg:grid-cols-2">
        
        </div>
      </AppContainer>
    </section>
  );
}

