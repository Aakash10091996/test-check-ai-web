import HeroText from "@/components/pages/uiElementsPage/HeroText";
// import PromptInput from "@/components/pages/uiElementsPage/PromptInput";
import AISamplePrompt from "@/components/pages/landingPage/AISamplePrompt";
import { DataProvider } from "@/providers/PromptDataContext";
import { removeHyphen, useBreadcrumbs, useComponentsView } from "@/utils";
import { AllComponents, defaultElement, COMPONENTS } from "@/constants";
import AiInput from "@/components/pages/landingPage/AiInput";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState, useContext } from "react";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import { RootContext } from "@/providers/ContextProvider";

function HeroSection({ isScrolled }: { isScrolled: boolean }) {
  const { selectedElement } = useBreadcrumbs();
  const pathname = usePathname();
  const element: string = selectedElement ? removeHyphen(selectedElement ?? "") : defaultElement;
  const isAllComponentPage = pathname.includes(AllComponents);
  const { framework } = useComponentsView();
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

  return (
    <div className={cn("flex flex-col")}>
      <div className="mx-1 flex flex-col items-center justify-center overflow-hidden align-middle font-montserrat font-bold max-lg:mt-20 sm:mx-2">
        <HeroText isScrolled={isScrolled} />
      </div>
      <div
        className={cn(
          isScrolled ? "sticky top-28 z-40 hidden max-md:z-50 lg:top-28" : "h-fit",
          " transition-all duration-3000"
        )}
      >
        <DataProvider>
          <div className="mb-3 flex  w-full items-end justify-center gap-2 px-4 max-lg:flex-col max-lg:items-center sm:px-4 md:px-10 lg:px-10 xl:px-44">
            <div className="w-full max-custom:ml-0">
              <AiInput
                component={element}
                isScrolled={false}
                isComponentPage
                setCurrentUILib={setCurrentUILib}
                handleSubmit={handleComponentCreation}
              />
              {!isScrolled && (
                <AISamplePrompt
                  component={element}
                  isAllComponentPage={isAllComponentPage}
                  handleComponentCreation={handleComponentCreation}
                />
              )}
            </div>
          </div>
        </DataProvider>
      </div>
    </div>
  );
}

export default HeroSection;
