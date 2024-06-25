import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import HeroSection from "@/components//pages/landingPage/HeroSection";

// const DynamicHeroSection = dynamic(() =>
//   import("@/components/pages/landingPage/HeroSection").then((mod) => mod.default)
// );
const DynamicThemeSection = dynamic(() =>
  import("@/components/pages/landingPage/ThemeSection").then((mod) => mod.default)
);
const DynamicContactSection = dynamic(() =>
  import("@/components/pages/landingPage/ContactSection").then((mod) => mod.default)
);
const DynamicProjectTableSection = dynamic(() =>
  import("@/components/pages/landingPage/ProjectTableSection").then((mod) => mod.default)
);
const DynamicSpeedUpSection = dynamic(() =>
  import("@/components/pages/landingPage/SpeedUpSection").then((mod) => mod.default)
);
const DynamicPricing = dynamic(() =>
  import("@/components/pages/pricing").then((mod) => mod.default)
);
const DynamicVsCodeSection = dynamic(() =>
  import("@/components/pages/landingPage/VsCodeSection").then((mod) => mod.default)
);
const DynamicFAQSection = dynamic(() =>
  import("@/components/pages/landingPage/FAQSection").then((mod) => mod.default)
);
const DynamicCodeQuality = dynamic(() =>
  import("@/components/pages/landingPage/CodeQuality").then((mod) => mod.default)
);
const DynamicFeatureGeneration = dynamic(() =>
  import("@/components/pages/landingPage/FeatureGeneration").then((mod) => mod.default)
);

export default function DynamicAllComponentLandingPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DynamicFeatureGeneration />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicSpeedUpSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicContactSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicThemeSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicProjectTableSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicVsCodeSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicCodeQuality />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <div className="min-h-[90vh] from-background via-backgroundGradient to-background dark:bg-gradient-to-b">
          <DynamicPricing isLanding={true} />
        </div>
      </Suspense>

      <div
        className="bg-home-gradient-light from-background via-backgroundGradient to-background dark:bg-gradient-to-b"
        data-in-view="ai-input"
      >
        <HeroSection />
      </div>
      <Suspense fallback={<Loading />}>
        <DynamicFAQSection />
      </Suspense>
    </>
  );
}
