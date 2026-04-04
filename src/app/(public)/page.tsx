import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { FAQ } from "@/components/sections/faq";

import { HomeSectionScroller } from "@/components/layout/home-section-scroller";

export default function Home() {
  return (
    <div className="relative overflow-hidden py-6 sm:py-8 lg:py-12">
      <HomeSectionScroller />
      <Hero />
      <Features />
      <FAQ />
    </div>
  );
}
