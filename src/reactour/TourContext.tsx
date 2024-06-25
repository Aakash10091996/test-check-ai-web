/**
 * @module TourProvider
 */

import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

/**
 * Interface for Tour Context properties.
 *
 * @interface TourContextProps
 * @property {() => void} startTour - Function to start the tour.
 * @property {() => void} stopTour - Function to stop the tour.
 * @property {boolean} isTourOpen - Indicates whether the tour is currently open.
 * @property {number} currentStep - The current step of the tour.
 * @property {(step: number) => void} goToStep - Function to navigate to a specific step in the tour.
 */
interface TourContextProps {
  startTour: () => void;
  stopTour: () => void;
  isTourOpen: boolean;
  currentStep: number;
  goToStep: (step: number) => void;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

/**
 * TourProvider component that provides tour-related state and functions to its children.
 *
 * @param {object} props - The properties object.
 * @param {ReactNode} props.children - The child components that will have access to the tour context.
 * @returns {JSX.Element} The TourProvider component.
 */
export const TourProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  /**
   * Function to start the tour. Resets to the first step and opens the tour.
   */
  const startTour = () => {
    setCurrentStep(0); // Reset to the first step
    setIsTourOpen(true);
  };

  /**
   * Function to stop the tour. Resets to the first step and closes the tour.
   */
  const stopTour = () => {
    setIsTourOpen(false);
    setCurrentStep(0); // Reset to the first step
  };

  /**
   * Function to navigate to a specific step in the tour.
   *
   * @param {number} step - The step to navigate to.
   */
  const goToStep = (step: number) => setCurrentStep(step);

  return (
    <TourContext.Provider value={{ startTour, stopTour, isTourOpen, currentStep, goToStep }}>
      {children}
    </TourContext.Provider>
  );
};

/**
 * Custom hook to use the tour context.
 *
 * @throws Will throw an error if used outside of a TourProvider.
 * @returns {TourContextProps} The tour context properties and functions.
 */
export const useTour = (): TourContextProps => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
