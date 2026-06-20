import { HeroNew } from "@/components/sections/hero-new";
import { MechanismPipeline } from "@/components/sections/mechanism-pipeline";
import ProcessSection from "@/components/sections/dark-features";
import ReplyRateSection from "@/components/sections/real-message-proof";
import  FaqSection  from "@/components/sections/faq-section";
import CaseStudySection from "@/components/sections/case-study-section";

export default function Home() {
  return (
    <>
      <main>
        <HeroNew />
        <MechanismPipeline />
        <ProcessSection />
        <ReplyRateSection />
        <CaseStudySection />
        <FaqSection />
      </main>
    </>
  );
}
