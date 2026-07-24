import type { ReactNode } from "react";
import Link from "next/link";
import { AppContainer } from "@/components/layout/app-container";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <header className="relative border-b bg-background/90 backdrop-blur">
        <AppContainer className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            MarkStack
          </Link>
        </AppContainer>
      </header>

      <main className="relative">{children}</main>
    </div>
  );
}
