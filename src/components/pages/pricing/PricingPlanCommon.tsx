import React from "react";
import PricingCard from "@/components/pages/pricing/PricingCard";
import PricingTable from "@/components/pages/pricing/PricingTable";

export default function PricingPlanCommon() {
  return (
    <div className="flex max-w-[74rem] flex-col items-center justify-end">
      <div className="mt-3 flex h-fit w-full flex-wrap items-center justify-end max-pxl:justify-center">
        <PricingCard />
      </div>
      <div className=" w-[100%]">
        <PricingTable />
      </div>
    </div>
  );
}
