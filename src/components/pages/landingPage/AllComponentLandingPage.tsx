import React from "react";
import HeroSection from "@/components/pages/landingPage/HeroSection";

import ThemeSection from "@/components/pages/landingPage/ThemeSection";
import ContactSection from "@/components/pages/landingPage/ContactSection";
import ProjectTableSection from "@/components/pages/landingPage/ProjectTableSection";
import SpeedUpSection from "@/components/pages/landingPage/SpeedUpSection";
import Pricing from "@/components/pages/pricing";
import VsCodeSection from "@/components/pages/landingPage/VsCodeSection";
import FAQSection from "@/components/pages/landingPage/FAQSection";
import CodeQuality from "@/components/pages/landingPage/CodeQuality";
import FeatureGeneration from "@/components/pages/landingPage/FeatureGeneration";

export default function AllComponentLandingPage() {
  return (
    <>
      <FeatureGeneration />
      <SpeedUpSection />
      <ContactSection />
      <ThemeSection />
      <ProjectTableSection />
      <VsCodeSection />
      <CodeQuality />

      <div className="from-background via-backgroundGradient to-background dark:bg-gradient-to-b">
        <Pricing isLanding={true} />
      </div>
      <div className="bg-home-gradient-light from-background via-backgroundGradient to-background dark:bg-gradient-to-b">
        <HeroSection />
      </div>
      <FAQSection />
    </>
  );
}
