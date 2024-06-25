"use client";
import Link from "next/link";
import { LogoIcon } from "@/icons";
// import SearchButton from "@/components/common/Header/SearchButton";
import { usePathname } from "next/navigation";
import { CHECKOUT, PAYEMNT_SUCCESS, PROMPTING_GUIDE } from "@/constants";
import MenuRoot from "@/components/common/Header/MenuRoot";

export default function Header() {
  const pathname = usePathname();
  const noHeaderRoutes = [CHECKOUT, PAYEMNT_SUCCESS, PROMPTING_GUIDE];
  return (
    <>
      {!noHeaderRoutes.includes(pathname) && (
        <header
          className={`sticky top-0 z-50 flex h-16 w-full items-center border-b ${pathname.length === 1 ? "bg-background " : "bg-aiBackgroundDark"} px-4 align-middle text-foreground shadow`}
        >
          <div className="flex items-center">
            <Link href="/" className="flex w-52 items-center sm:w-full">
              <LogoIcon />
            </Link>
          </div>
          <div className="flex grow items-end justify-end max-sm:h-1/2">
            {/* <SearchButton /> */}
          </div>
          <MenuRoot />
        </header>
      )}
    </>
  );
}
