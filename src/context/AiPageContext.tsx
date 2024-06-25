"use client";

import type { Dispatch } from "react";
import { createContext } from "react";
import { Default_UI_Lib } from "@/constants";

type DispatchFunction = Dispatch<{
  type: string;
  payload: string | { planDurationIndex?: number; planIndex?: number } | boolean;
}>;

export interface InitialState {
  selectedUiLib: string;
  selectedPricingParams: {
    planDurationIndex: number;
    planIndex: number;
  };
  selectedSuggestionPrompt: string;
  isFeedbackModalOpen: boolean;
}

export const initialState = {
  selectedUiLib: Default_UI_Lib.value,
  selectedPricingParams: {
    planDurationIndex: 0,
    planIndex: 1,
  },
  selectedSuggestionPrompt: "",
  failedAPIPromptDetails: { prompt: "", status: false },
  isFeedbackModalOpen: false,
};

export const AiPageActionTypes = {
  SET_UI_LIB: "SET_UI_LIB",
  SET_SELECTED_PRICING_PARAMS: "SET_SELECTED_PRICING_PARAMS",
  SET_SELECTED_SUGGESTION_PROMPT: "SET_SELECTED_SUGGESTION_PROMPT",
  SET_FEEDBACK_MODAL_OPEN: "SET_FEEDBACK_MODAL_OPEN",
};

interface SetUiLibAction {
  type: typeof AiPageActionTypes.SET_UI_LIB;
  payload: string;
}

interface SetSelectedPricingParamsAction {
  type: typeof AiPageActionTypes.SET_SELECTED_PRICING_PARAMS;
  payload: { planDurationIndex?: number; planIndex?: number };
}

interface SetSelectedSuggestionPromptAction {
  type: typeof AiPageActionTypes.SET_SELECTED_SUGGESTION_PROMPT;
  payload: string;
}
interface SetFeedbackModalOpenAction {
  type: typeof AiPageActionTypes.SET_FEEDBACK_MODAL_OPEN;
  payload: boolean;
}

export type AiPageAction =
  | SetUiLibAction
  | SetSelectedPricingParamsAction
  | SetFeedbackModalOpenAction
  | SetSelectedSuggestionPromptAction;

const defaultDispatch: DispatchFunction = () => {
  // dummy initial dispatch function
};

export const AiPageContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<AiPageAction>;
}>({
  state: initialState,
  dispatch: defaultDispatch,
});
