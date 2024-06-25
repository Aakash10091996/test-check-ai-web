"use client";
import Link from "next/link";
import { Label } from "@/components/ui";
import { COMPONENTS, DefaultAllComponentItem, BreadcrumbsPageOptions } from "@/constants";
import { setToLocalStorage, useBreadcrumbs, useComponentsView } from "@/utils";
import RightArrowOutlinedIcon from "@/icons/RightArrowOutlinedIcon";
import { colors } from "@/styles/colors";
import { DataProvider } from "@/providers/PromptDataContext";
// import PromptInput from "@/components/pages/uiElementsPage/PromptInput";
import AiInput from "@/components/pages/landingPage/AiInput";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useState, useContext } from "react";
import { cn } from "@/lib/utils";
// import { useHeroScroll } from "@/hooks/uiElements/useHeroScroll";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import { RootContext } from "@/providers/ContextProvider";

interface BreadcrumbsProps {
  isScrolled?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  className?: string;
}

interface BreadcrumbLabelProps {
  label: string;
  styles?: string;
}

function Breadcrumbs({ isScrolled, setIsOpen, className }: BreadcrumbsProps) {
  const { breadcrumbsSelection, selectedElement } = useBreadcrumbs();
  const { isComponentView, framework } = useComponentsView();

  const pathname = usePathname();
  // const category = pathname.split("/");
  const currentComponent = pathname.split("/").pop();

  const [currentUILib, setCurrentUILib] = useState(framework);
  const { selectedUILib } = useContext(RootContext);
  const { createNewAiComponent } = useCreateNewComponent();

  const handleComponentCreation = (value: string) => {
    void createNewAiComponent(
      value,
      pathname.includes(COMPONENTS) && currentUILib ? currentUILib : selectedUILib,
      "",
      true
    );
  };

  // const router = useRouter();
  // const [isComonentClicked, setIsComonentClicked] = useState(false);
  // const isComonentClicked = getFromLocalStorage("compClick") ?? false;
  // useEffect(() => {
  //   if (
  //     setIsOpen &&
  //     category.includes("components") &&
  //     // category.includes("All") &&
  //     !isComonentClicked
  //   ) {
  //     setIsOpen(false);
  //   } else if (setIsOpen && category.includes("uielements") && !isComonentClicked) {
  //     setIsOpen(false);
  //   }
  // }, [category, setIsOpen, isComonentClicked]);

  const getActiveScreen = (): string => {
    return (
      BreadcrumbsPageOptions.find((item) => item.value === breadcrumbsSelection.page)?.label ?? ""
    );
  };

  const handleToggleSidebar = (e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (setIsOpen) {
      setToLocalStorage("compClick", true);
      setIsOpen(true);
    }
    if (setIsOpen && !isComponentView) {
      setIsOpen(true);
    } else {
      setIsOpen && setIsOpen(true);
    }
  };

  return (
    <div
      className={cn(
        "flex grow items-center justify-start gap-1 align-middle font-openSans py-0",
        className
      )}
    >
      {/* The was the purecode link not required for now */}
      {/* <Link href="/" className="mt-[-2px] font-openSans">
        <BreadcrumbLabel label="Purecode" styles="cursor-pointer" />
      </Link>
      <RightArrowOutlinedIcon width="15" height="15" color={colors.breadcrumbGrey.foreground} /> */}
      {isComponentView && selectedElement !== DefaultAllComponentItem ? (
        <Link
          href={`${COMPONENTS}/${framework}/${DefaultAllComponentItem}`}
          className="mt-[-2px]"
          onClick={handleToggleSidebar}
        >
          <BreadcrumbLabel label={breadcrumbsSelection.page} styles="cursor-pointer" />
        </Link>
      ) : (
        <div
          className="cursor-pointer text-xs font-normal leading-[21.87px]"
          onClick={handleToggleSidebar}
        >
          {getActiveScreen()}
        </div>
      )}
      {selectedElement && (
        <RightArrowOutlinedIcon width="15" height="15" color={colors.breadcrumbGrey.foreground} />
      )}
      <BreadcrumbLabel label={currentComponent ?? ""} styles="text-foreground" />
      <DataProvider>
        <div className={`mx-6 w-[75%] max-lg:hidden ${!isScrolled && "hidden"} grow`}>
          <AiInput
            isScrolled={true}
            className="grow"
            isComponentPage
            setCurrentUILib={setCurrentUILib}
            handleSubmit={handleComponentCreation}
          />
        </div>
      </DataProvider>
    </div>
  );
}

export default Breadcrumbs;

function BreadcrumbLabel({ label, styles = "" }: BreadcrumbLabelProps) {
  return (
    <Label className={`text-xs font-normal leading-[21.87px] text-breadcrumbGrey ${styles}`}>
      {label}
    </Label>
  );
}
