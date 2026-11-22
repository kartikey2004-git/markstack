"use client";

import Link from "next/link";
import { AppContainer } from "@/components/layout/app-container";
import { UserMenu } from "../shared/user-menu";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border py-4">
      <AppContainer className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground text-lg font-semibold"
        >
          <span className="text-xl"></span> Markstack
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground ml-20">
          <span className="inline-flex items-center px-5 py-2  text-[12px] font-medium uppercase tracking-[0.22em]">
            HELLO ! DEVELOPERS, BUILDERS & WRITERS
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <UserMenu />
        </div>
      </AppContainer>
    </nav>
  );
}
