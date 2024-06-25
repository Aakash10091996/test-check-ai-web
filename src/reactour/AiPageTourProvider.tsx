import type { ReactNode } from "react";
import React from "react";
import TourWrapper from "@/reactour/TourWrapper";
import type { ReactourStep } from "reactour";
import { TourProvider } from "@/reactour/TourContext";
import Image from "next/image";
import selectthemeimage from "@/reactour/gifs/Select_Upload_Theme.gif";
import { PlusIcon, ColorPalleteOutlinedIcon, RefreshCanvasIcon, VSCodeOutlinedIcon } from "@/icons";
import CanvasIcon from "@/icons/Canvas";
import CodeIcon from "@/icons/Code";
import { BookmarkIcon } from "@radix-ui/react-icons";

interface AiPageTourProviderProps {
  children: ReactNode;
}

const AiPageTourWrapper: React.FC<AiPageTourProviderProps> = ({ children }) => {
  const steps: ReactourStep[] = [
    {
      selector: '[data-tut-aiprojects="step1-create-new-component"]',
      content: () => (
        <div className="relative flex items-center bg-white p-3 font-medium text-black">
          <div className="absolute -left-10 -top-10 flex items-center rounded-full bg-primary px-2 py-1 text-sm text-white">
            <PlusIcon color="currentColor" height={"18px"} width={"18px"} />
            <span>New Component</span>
          </div>
          <span>
            You can create a new component here when you need to start a new project. This is the
            first step towards building something amazing!
          </span>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut-aiprojects="step2-prompt-input"]',
      content: () => (
        <div className="relative flex items-center bg-white font-medium text-black">
          <div className="absolute -left-10 -top-10 flex items-center rounded-full bg-primary px-2 py-1 text-sm text-white">
            <span>Prompt here</span>
          </div>
          <span>
            Generate refined versions of your component by continuously iterating. Keep improving
            until it meets your needs perfectly!
          </span>
        </div>
      ),
      stepInteraction: false,
      highlightedSelectors: [
        '[data-tut-aiprojects-2="step2-versions"]',
        '[data-tut-aiprojects="step5-check-responsive-tablet"]',
      ],
    },
    {
      selector: '[data-tut-aiprojects="step3-theme-btn"]',
      content: () => (
        <div className="relative bg-white font-medium text-black ">
          <div className="absolute -left-10 -top-10 flex items-center rounded-full bg-primary px-2 py-1 text-sm text-white">
            <ColorPalleteOutlinedIcon size={"18px"} />
            <span className="pl-2">Theme</span>
          </div>
          <div className="mb-2 overflow-hidden rounded">
            <Image src={selectthemeimage} alt="sample gif..." />
          </div>
          <span>
            🎨 Select or upload a theme to maintain consistent styling across your project. A
            cohesive look enhances user experience!
          </span>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut-aiprojects="step4-generation-preview"]',
      content: () => (
        <div className="relative flex items-center bg-white font-medium text-black">
          <div className="absolute -left-10 -top-10 flex items-center rounded-full bg-primary px-2 py-1 text-sm text-white">
            <CanvasIcon />
            <span className="pl-2">Preview</span>
          </div>
          <span>
            View the live rendering of the selected component here. Instantly see your changes and
            make sure everything looks just right.
          </span>
        </div>
      ),
      stepInteraction: false,
      action: (domNode: Element) => {
        if (domNode instanceof HTMLElement) {
          domNode.click();
        }
      },
    },
    {
      selector: '[data-tut-aiprojects="step5-code-preview"]',
      content: () => (
        <div className="relative flex items-center bg-white font-medium text-black">
          <div className="absolute -left-10 -top-10 flex items-center rounded-full bg-primary px-2 py-1 text-sm text-white">
            <CodeIcon />
            <span className="pl-2">Code</span>
          </div>
          <span>
            Access and edit the code for the selected component on the fly. Make adjustments as
            needed and see the results immediately.
          </span>
        </div>
      ),
      stepInteraction: false,
      action: (domNode: Element) => {
        if (domNode instanceof HTMLElement) {
          domNode.click();
        }
      },
    },
    {
      selector: '[data-tut-aiprojects="step6-versions-preview"]',
      content: () => (
        <div className="relative flex items-center bg-white font-medium text-black">
          <div className="absolute -left-10 -top-10 flex items-center rounded-full bg-primary px-2 py-1 text-sm text-white">
            <RefreshCanvasIcon size={"16px"} />
            <span className="pl-2">Versions</span>
          </div>
          <span>
            Review different versions of the current component. Compare and choose the best version
            for your needs.
          </span>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut-aiprojects="step7-previous-components"]',
      content: () => (
        <div className="relative flex items-center bg-white font-medium text-black">
          <div className="absolute -left-10 -top-10 flex items-center rounded-full bg-primary px-2 py-1 text-sm text-white">
            <BookmarkIcon />
            <span className="pl-2">Component List</span>
          </div>
          <span>
            View components that were created previously. Reuse or modify them to save time and
            effort.
          </span>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut-aiprojects="step8-vscode-fab"]',
      content: () => (
        <div className="relative flex items-center bg-white font-medium text-black">
          <div className="absolute -left-10 -top-10 flex items-center rounded-full bg-primary px-2 py-1 text-sm text-white">
            <VSCodeOutlinedIcon size={"16px"} />
            <span className="pl-2">VSCode Extension</span>
          </div>
          <span>
            Purecode AI is best utilized in Visual Studio Code. We highly recommend downloading the
            Purecode AI extension for quick access. Speed up your workflow and enjoy easy navigation
            with this powerful tool!
          </span>
        </div>
      ),
      stepInteraction: false,
    },
  ];

  const handleStepChange = (currentStep: number, previousStep: number) => {
    if (previousStep === 4 && currentStep !== 4) {
      const previewStep = steps.find(
        (step) => step.selector === '[data-tut-aiprojects="step4-generation-preview"]'
      );
      if (previewStep?.action) {
        const domNode = document.querySelector(previewStep.selector!);
        if (domNode) {
          previewStep.action(domNode);
        }
      }
    }
  };

  return (
    <TourProvider>
      <TourWrapper steps={steps} onStepChange={handleStepChange}>
        {children}
      </TourWrapper>
    </TourProvider>
  );
};

export default AiPageTourWrapper;
