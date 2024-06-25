"use client";
import {
  FooterFollowIcons,
  FooterLinks,
  // FooterMobileApp,
  FooterTerms,
  OtherFooterLinks,
} from "@/constants/footerRoutes";
import { FooterLogoIcon } from "@/icons";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRouteMatch } from "@/hooks";
import { adsRoutes } from "@/constants";
import { cn } from "@/lib/utils";

function Footer({ isComponent = false }: { isComponent?: boolean }) {
  const router = useRouter();
  const handleClick = (link: string) => {
    router.push(link);
  };

  const isAdsPage = useRouteMatch(adsRoutes);

  return (
    <footer
      className={cn(
        "flex w-full flex-col items-center justify-center bg-footer px-5",
        isAdsPage && "hidden"
      )}
    >
      <div className="mt-10 max-w-[1440px]">
        <div className="mb-6 flex h-full min-h-[327px] text-white max-custom:flex-wrap max-lg:w-full max-sm:flex-col custom:gap-28">
          <div className="w-72 max-lg:w-full">
            <FooterLogoIcon />
            <p className="mb-4 mt-3 text-xs leading-5">
              Speed up front end development by using Purecode AI to generate all of your UI
              components. Skip manual effort. Automate part of your workflow.
            </p>
            <h3 className="mb-3 text-sm font-semibold leading-6">Follow us</h3>
            <div className="mb-10 flex gap-4">
              {FooterFollowIcons.map((icons, index) => (
                <Link
                  key={`${icons.name} ${index}`}
                  href={icons.href}
                  target="_blank"
                  className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/[0.1] p-[6px] max-lg:size-6"
                >
                  {icons.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex max-lg:w-full max-lg:justify-between max-sm:flex-col sm:gap-10">
            {FooterLinks.map((link, index) => (
              <div key={`${link.name} ${index}`} className="max-sm:mb-9 footer:w-28 custom:w-auto">
                <h1
                  className={`mb-4 font-bold sm:text-sm footer:text-[0.9rem] ${isComponent ? "custom:text-[0.9rem] custom:leading-8" : "custom:text-xl custom:leading-8"}`}
                >
                  {link.name}
                </h1>
                <ul>
                  {link.links.map((item, itemIndex) => (
                    <li
                      key={`${itemIndex} ${item.title}`}
                      className="mb-2 cursor-pointer font-normal leading-[21px] opacity-80 hover:underline sm:text-[10px] md:text-xs"
                      onClick={() => handleClick(item.link)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-end gap-6 border-b-[1px] border-lightBorder pb-5 max-sm:flex-col ">
          {OtherFooterLinks.map((item: string) => (
            <p className="text-[13.13px] font-normal leading-4 text-white" key={item}>
              {item}
            </p>
          ))}
        </div>
        <div className="mb-[30px] mt-6 flex items-start justify-center font-sans font-normal text-input dark:text-foreground max-lg:text-sm max-sm:text-xs sm:items-center lg:text-base">
          <p className="mr-1">&copy;</p>
          <p className="opacity-80">{FooterTerms.label}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
