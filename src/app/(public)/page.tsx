import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { FAQ } from "@/components/sections/faq";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <Hero />
      <Features />
      <FAQ />
    </div>
  );
}
