"use client";
import Link from "next/link";
import { LogoIcon } from "@/icons";
import React from "react";
import { usePathname } from "next/navigation";

function Logo() {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/checkout" ? (
        <div className="flex w-52 items-center sm:w-full">
          <LogoIcon />
        </div>
      ) : (
        <Link href="/" className="flex w-52 items-center sm:w-full">
          <LogoIcon />
        </Link>
      )}
    </>
  );
}

export default Logo;
