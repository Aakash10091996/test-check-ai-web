"use client";

import { THEMETABS } from "@/constants";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import CreateTheme from "@/components/common/theme/CreateTheme";

interface ThemeProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isGlobal?: boolean;
  isAiPage?: boolean;
}

const CreateThemePopup = ({ setOpen, isGlobal, isAiPage = false }: ThemeProps) => {
  const [activeTab, setActiveTab] = useState<string>(THEMETABS.CHOOSE_FROM_SAVED.value);
  return (
    <div className="size-full p-4">
      <div className="flex h-10 items-center justify-center gap-1 rounded-lg bg-theme-cancel-button p-1 dark:bg-slate-800">
        {Object.keys(THEMETABS).map((key, i) => {
          return (
            <button
              className={`${activeTab === THEMETABS[key].value ? "bg-primary text-white" : ""} w-64 rounded-lg p-1 font-semibold`}
              key={`${key}-${i}`}
              onClick={() => {
                setActiveTab(THEMETABS[key].value);
              }}
            >
              {THEMETABS[key].label}
            </button>
          );
        })}
      </div>
      <CreateTheme setOpen={setOpen} isAiPage={isAiPage} isGlobal={isGlobal} field="theme_json" />
    </div>
  );
};

export default CreateThemePopup;
