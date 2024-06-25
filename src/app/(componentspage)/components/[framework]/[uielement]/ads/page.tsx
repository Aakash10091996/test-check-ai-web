"use client";
import React, { Suspense, memo, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/(componentspage)/components/[framework]/[uielement]/ads/loading";

const DynamicAdsPage = dynamic(
  () => import("@/components/adsPage/AdsPage").then((mod) => mod.default),
  {
    ssr: false,
  }
);

const Page = () => {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    const { firstChild } = document.head;
    document.head.insertBefore(meta, firstChild);
    return () => {
      document.head.removeChild(meta);
    };
  });
  return (
    <Suspense fallback={<Loading />}>
      <DynamicAdsPage />
    </Suspense>
  );
};

export default memo(Page);
