"use client";
import { localStorageKeyNames } from "@/constants";
import { pricingText } from "@/constants/pricing";
import { useEffect, useState } from "react";

export const TypeWritingText = () => {
  const [textState, settextState] = useState("");

  useEffect(() => {
    function checkLocalStorage() {
      const signup = localStorage.getItem(localStorageKeyNames.signUpFromHeader);
      const newChat = localStorage.getItem(localStorageKeyNames.startNewChatPrompt);

      if (signup ?? (newChat && signup)) {
        settextState(pricingText.START_YOUR_FREE_TRIAL_TODAY);
      } else {
        settextState(pricingText.YOUR_COMPONENT_IS_GENERATING);
      }
    }

    checkLocalStorage();

    window.addEventListener("storage", checkLocalStorage);

    return () => {
      window.removeEventListener("storage", checkLocalStorage);
    };
  }, []);

  return textState;
};
