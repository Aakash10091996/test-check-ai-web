"use client";
import React from "react";
// import PricingPlanCommon from "@/components/pages/pricing/PricingPlanCommon";
import { PricingSectionLandingPage } from "@/components/pages/checkoutPage/PricingSectionLandingPage";
import Footer from "@/components/common/Footer";
import { usePathname } from "next/navigation";

export default function Pricing({ isLanding = false }: { isLanding?: boolean }) {
  const pathName = usePathname();
  return (
    <div
      className={` flex flex-col ${pathName.length > 1 ? " bg-aiBackgroundDark pt-10" : " bg-background lg:mt-7"} justify-center`}
    >
      {/* <div className="max-sm:hidden">
        <PricingPlanCommon />
      </div> */}
      {/* <div className="sm:hidden"> */}
      <PricingSectionLandingPage />
      {/* </div> */}
      {!isLanding && <Footer />}
    </div>
  );
}
