"use client";
import { Button } from "@/components/ui";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import type { ReactourStepContentArgs } from "reactour";

interface CustomHelperProps {
  current: number;
  totalSteps: number;
  gotoStep: (step: number) => void;
  close: () => void;
  content: React.ReactNode | ((args: ReactourStepContentArgs) => React.ReactNode);
}

const CustomHelper: React.FC<CustomHelperProps> = ({
  current,
  totalSteps,
  gotoStep,
  close,
  content,
}) => {
  return (
    <div className="mx-auto max-w-xs rounded-lg bg-white p-4 pt-2 shadow-lg">
      <div className="flex items-center justify-end">
        <div />
        <span className="text-sm text-gray-600">
          {current + 1} / {totalSteps}
        </span>
        <Button className="ml-6 text-gray-500" onClick={close} variant={"ghost"}>
          Skip
        </Button>
      </div>
      <div className="mt-2">
        {typeof content === "function"
          ? content({ close, goTo: gotoStep, inDOM: true, step: current })
          : content}
      </div>
      <div className="mt-4 flex flex-row-reverse items-center justify-between">
        {current < totalSteps - 1 && (
          <Button
            className="flex items-center gap-1 rounded bg-primary px-4 py-2 text-white transition-all duration-300 hover:scale-105"
            onClick={() => gotoStep(current + 1)}
          >
            Next
            <ArrowRightIcon />
          </Button>
        )}
        {current === totalSteps - 1 && (
          <Button
            className="rounded bg-green500 px-4 py-2 text-white transition-all duration-300 hover:scale-105"
            onClick={close}
          >
            Finish
          </Button>
        )}
        {current > 0 && (
          <Button
            className="flex items-center gap-1 rounded border-primary bg-transparent px-4 py-2 font-semibold text-primary transition-all duration-300 hover:scale-105 hover:text-primary dark:bg-transparent"
            variant={"outline"}
            onClick={() => gotoStep(current - 1)}
          >
            <ArrowLeftIcon />
            Prev
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomHelper;
