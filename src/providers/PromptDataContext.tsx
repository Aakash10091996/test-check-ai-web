"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

type PromptDataContextType = {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
};

const PromptDataContext = createContext<PromptDataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<string>("");

  return (
    <PromptDataContext.Provider value={{ data, setData }}>{children}</PromptDataContext.Provider>
  );
};

export const usePromptDataContextContext = () => {
  const context = useContext(PromptDataContext);
  if (!context) {
    throw new Error(" PromptDataContext");
  }
  return context;
};
