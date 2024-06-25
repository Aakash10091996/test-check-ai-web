import { useComponentsView } from "@/utils";
import { DefaultAllComponentItem } from "@/constants";
import AllComponentsTab from "@/components/pages/componentsListingPage/AllComponentsTab";
import ComponentCardsListing from "@/components/pages/componentsListingPage/ComponentCardsListing";
import PageNavbar from "@/components/pages/componentsListingPage/PageNavbar";
import MobileAiInput from "@/components/pages/componentsListingPage/MobileAiInput";
import useScrolled from "@/hooks/uiElements/useGetScrolled";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

function RenderCardList({
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  const { uiElement } = useComponentsView();
  const { isScrolling, isScrolled } = useScrolled(null, 100);
  const { uielement } = useParams();
  return (
    <>
      <nav
        className={cn(
          "flex max-lg:fixed z-10 max-lg:top-16 max-lg:left-0 max-lg:w-full max-lg:transition-transform max-lg:duration-300 lg:px-5 max-lg:p-3",
          isScrolling ? "max-lg:-translate-y-full" : "max-lg:translate-y-0",
          "lg:sticky top-16  lg:h-20 items-center",
          isOpen ? "lg:-ml-6" : "lg:-mx-14",
          isScrolled ? "bg-background/85 backdrop-blur-3xl" : "bg-transparent"
        )}
      >
        <PageNavbar setIsOpen={setIsOpen!} isOpen={isOpen!} />
      </nav>
      <div
        className={cn(
          "fixed z-10 top-[120px] left-0 w-full transition-transform duration-500",
          isScrolling ? "-translate-y-full" : "translate-y-0",
          "lg:hidden",
          uielement === "All" ? "block" : isScrolled ? "block" : "hidden",
          "px-1"
        )}
      >
        <MobileAiInput />
      </div>
      {uiElement === DefaultAllComponentItem ? <AllComponentsTab /> : <ComponentCardsListing />}
    </>
  );
}

export default RenderCardList;
