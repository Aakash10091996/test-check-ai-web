import { DataProvider } from "@/providers/PromptDataContext";
import { useState, useContext } from "react";
import AiInput from "@/components/pages/landingPage/AiInput";
import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import { RootContext } from "@/providers/ContextProvider";
import { useComponentsView } from "@/utils";
import { usePathname } from "next/navigation";
import { COMPONENTS } from "@/constants";

function MobileAiInput() {
  const pathname = usePathname();
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
    <div>
      <DataProvider>
        <div>
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

export default MobileAiInput;
