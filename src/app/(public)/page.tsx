import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { FAQ } from "@/components/sections/faq";
import { AppContainer } from "@/components/layout/app-container";
import { HomeSectionScroller } from "@/components/layout/home-section-scroller";

export default function Home() {
  return (
    <div className="relative overflow-hidden py-8 sm:py-10 lg:py-12">
      <HomeSectionScroller />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,oklch(0.97_0_0),transparent_70%)] dark:bg-[radial-gradient(circle_at_top,oklch(0.2_0_0),transparent_70%)]" />
      <AppContainer className="relative space-y-16 sm:space-y-20">
        <Hero />
        <Features />
        <FAQ />
      </AppContainer>
    </div>
  );
}
