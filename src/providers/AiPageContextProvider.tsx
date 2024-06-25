"use client";

import Loading from "@/app/loading";
import FeedbackModal from "@/components/common/FeedbackModal";
import type { AiPageAction, InitialState } from "@/context/AiPageContext";
import { AiPageContext, initialState, AiPageActionTypes } from "@/context/AiPageContext";
// import { getFromLocalStorage } from "@/utils/localstorage";
import { Suspense, useReducer, type ReactNode } from "react";

export const setUiLib = (uiLib: string) => ({
  type: AiPageActionTypes.SET_UI_LIB,
  payload: uiLib,
});

export const setPricingParams = (params: { planDurationIndex?: number; planIndex?: number }) => ({
  type: AiPageActionTypes.SET_SELECTED_PRICING_PARAMS,
  payload: params,
});

export const setSelectedSuggestionPrompt = (prompt: string) => ({
  type: AiPageActionTypes.SET_SELECTED_SUGGESTION_PROMPT,
  payload: prompt,
});

export const setFeedbackModalOpen = (status: boolean) => ({
  type: AiPageActionTypes.SET_FEEDBACK_MODAL_OPEN,
  payload: status,
});

const reducer = (state: InitialState, action: AiPageAction) => {
  switch (action.type) {
    case AiPageActionTypes.SET_UI_LIB: {
      return {
        ...state,
        selectedUiLib: action.payload as string,
      };
    }
    case AiPageActionTypes.SET_SELECTED_PRICING_PARAMS:
      return {
        ...state,
        selectedPricingParams: {
          ...state.selectedPricingParams,
          ...(typeof action.payload === "object" && { ...action.payload }),
        },
      };
    case AiPageActionTypes.SET_SELECTED_SUGGESTION_PROMPT: {
      return {
        ...state,
        selectedSuggestionPrompt: action.payload as string,
      };
    }
    case AiPageActionTypes.SET_FEEDBACK_MODAL_OPEN: {
      return {
        ...state,
        isFeedbackModalOpen: action.payload as boolean,
      };
    }
    default:
      return state;
  }
};
export const AiPageContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AiPageContext.Provider value={{ state, dispatch }}>
      <Suspense fallback={<Loading />}>
        <FeedbackModal />
      </Suspense>
      {children}
    </AiPageContext.Provider>
  );
};
