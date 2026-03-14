import type { ReactNode } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { AppContainer } from "@/components/layout/app-container";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-muted/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.97_0_0),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,oklch(0.2_0_0),transparent_58%)]" />
      <header className="relative border-b bg-background/90 backdrop-blur">
        <AppContainer className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <FileText className="size-4" />
            MarkStack
          </Link>
          <ThemeToggle />
        </AppContainer>
      </header>

      <main className="relative">{children}</main>
    </div>
  );
}
