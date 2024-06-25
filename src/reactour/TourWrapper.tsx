import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import type { ReactourStep } from "reactour";
import Tour from "reactour";
import CustomHelper from "@/reactour/CustomHelper";
import { useTour } from "@/reactour/TourContext";

interface TourWrapperProps {
  children: ReactNode;
  steps: ReactourStep[];
  disableInteraction?: boolean;
  onStepChange?: (currentStep: number, previousStep: number) => void;
}

const TourWrapper: React.FC<TourWrapperProps> = ({
  children,
  steps,
  disableInteraction = false,
  onStepChange,
}) => {
  const { isTourOpen, stopTour, currentStep, goToStep } = useTour();
  const [previousStep, setPreviousStep] = useState<number | null>(null);

  useEffect(() => {
    if (previousStep !== null && onStepChange) {
      onStepChange(currentStep, previousStep);
    }
    setPreviousStep(currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (isTourOpen && currentStep === steps.length) {
      stopTour();
    }
  }, [isTourOpen, currentStep]);

  return (
    <>
      <Tour
        onRequestClose={stopTour}
        steps={steps}
        isOpen={isTourOpen}
        rounded={5}
        accentColor="#007bff"
        disableInteraction={disableInteraction}
        CustomHelper={({ current, totalSteps, gotoStep, close, content }) => (
          <CustomHelper
            current={current}
            totalSteps={totalSteps}
            gotoStep={(step) => {
              goToStep(step);
              gotoStep(step);
            }}
            close={close}
            content={content}
          />
        )}
        startAt={currentStep}
      />
      {children}
    </>
  );
};

export default TourWrapper;
