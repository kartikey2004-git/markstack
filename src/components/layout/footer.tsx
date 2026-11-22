"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { AppContainer } from "@/components/layout/app-container";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Github,
  Instagram,
  Mail,
  Twitter,
  type LucideIcon,
} from "lucide-react";

const EMAIL = "kartikeybhatnagar247@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/kartikk_huuu/";
const GITHUB_URL = "https://github.com/kartikey2004-git/markstack";
const TWITTER_URL = "https://x.com/kartikeybuilds";

type FooterLink = {
  label: string;
  href: string;
};

type SocialLink = FooterLink & {
  icon: LucideIcon;
};

// "/#section" links land on the home page and scroll to that section.
const productLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "FAQs", href: "/#faq" },
];

const workspaceLinks: FooterLink[] = [
  { label: "Blogs", href: "/blogs" },
  { label: "Canvases", href: "/canvases" },
  { label: "Editor", href: "/editor" },
];

const resourceLinks: FooterLink[] = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Twitter", href: TWITTER_URL },
  { label: "Support", href: `mailto:${EMAIL}` },
];

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: GITHUB_URL, icon: Github },
  { label: "Instagram", href: INSTAGRAM_URL, icon: Instagram },
  { label: "Twitter", href: TWITTER_URL, icon: Twitter },
  { label: "Support", href: `mailto:${EMAIL}`, icon: Mail },
];

const linkClass = "block transition-colors hover:text-foreground";

function FooterNavLink({ label, href }: FooterLink) {
  const pathname = usePathname();
  const isExternal = /^https?:\/\//.test(href);
  const isMailTo = href.startsWith("mailto:");
  const isSectionLink = href.startsWith("/#");

  if (isExternal || isMailTo) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={linkClass}
      >
        {label}
      </a>
    );
  }

  // On the home page, scroll to the section directly. The sticky navbar offset
  // comes from scroll-mt-20 on the section. From other pages, Link navigates.
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isSectionLink || pathname !== "/") return;

    const target = document.getElementById(href.slice(2));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Link href={href} onClick={handleClick} className={linkClass}>
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30 backdrop-blur">
      <AppContainer className="px-6 py-8 sm:py-10">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 lg:items-start">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">About App</h4>
            <p className="text-sm leading-6 text-muted-foreground">
              MarkStack helps you write and publish markdown content with a
              clean editor, live preview, and simple workflows.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Product</h4>
            <nav aria-label="Product" className="space-y-2 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <FooterNavLink key={link.label} {...link} />
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Workspace</h4>
            <nav aria-label="Workspace" className="space-y-2 text-sm text-muted-foreground">
              {workspaceLinks.map((link) => (
                <FooterNavLink key={link.label} {...link} />
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Resources</h4>
            <nav aria-label="Resources" className="space-y-2 text-sm text-muted-foreground">
              {resourceLinks.map((link) => (
                <FooterNavLink key={link.label} {...link} />
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Connect</h4>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const isExternal = social.href.startsWith("http");

                return (
                  <Tooltip key={social.label}>
                    <TooltipTrigger asChild>
                      <a
                        href={social.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                        aria-label={social.label}
                        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <Icon className="size-4" />
                        <span className="sr-only">{social.label}</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top">{social.label}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 MarkStack. All rights reserved.</p>
          <a
            href="https://kartikcodes.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Built by Kartikey
          </a>
        </div>
      </AppContainer>
    </footer>
  );
}
