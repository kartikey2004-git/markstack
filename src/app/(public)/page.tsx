import { HeroNew } from "@/components/sections/hero-new";
import { MechanismPipeline } from "@/components/sections/mechanism-pipeline";
import ReplyRateSection from "@/components/sections/real-message-proof";
import  FaqSection  from "@/components/sections/faq-section";
import CaseStudySection from "@/components/sections/case-study-section";

export default function Home() {
  return (
    <>
      <main>
        <HeroNew />
        <MechanismPipeline />
        <ReplyRateSection />
        <CaseStudySection />
        <FaqSection />
      </main>
    </>
  );
}
