import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { FAQ } from "@/components/sections/faq";
import { AppContainer } from "@/components/layout/app-container";
import { HomeSectionScroller } from "@/components/layout/home-section-scroller";

export default function Home() {
  return (
    <div className="relative overflow-hidden py-6 sm:py-8 lg:py-12">
      <HomeSectionScroller />
      <AppContainer className="relative space-y-12 sm:space-y-16 lg:space-y-20">
        <Hero />
        <Features />
        <FAQ />
      </AppContainer>
    </div>
  );
}
