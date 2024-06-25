"use client";
import React, { useEffect } from "react";
import ColorAndIconPage from "@/components/pages/colorAndIconPage";
import { NODE_ENV } from "@/config/constants";

const Page: React.FC = () => {
  useEffect(() => {
    if (NODE_ENV !== "development") {
      window.location.href = "/";
    }
  }, []);

  return <ColorAndIconPage />;
};

export default Page;
