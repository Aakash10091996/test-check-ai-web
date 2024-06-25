"use client";
import type { Dispatch, SetStateAction } from "react";
import React, { createContext, useState } from "react";

import type { AiThemePayload, Theme, ThemeProps } from "@/types/theme";
import usePricing from "@/hooks/pricing/usePricing";
import type { ProfileDetails, Subscription } from "@/types/profile";
import {
  DEFAULT_THEME,
  Default_UI_Lib,
  GLOBAL_DEFAULT_THEME,
  default_Tab_Value,
} from "@/constants";
import { MODAL_NAME } from "@/constants/modal.constant";
import type { LatestGuestCreatedComponentDetail } from "@/types/ai";

interface Props {
  children: JSX.Element;
}

export interface clerkModalType {
  isModalOpen: boolean;
  modalName: string;
}

interface FailedAPIPromptDetailsType {
  prompt: string;
  status: boolean;
}

interface ContextType {
  selectedUILib: string;
  setSelectedUILib: Dispatch<SetStateAction<string>>;
  subscriptionMetrics: {
    activeSubscription: Subscription | null;
    isSubscriptionLoading: boolean;
    isSubscriptionError: boolean;
    setActiveSubscription: Dispatch<SetStateAction<Subscription | null>>;
    totalThemeComponents: number;
    setTotalThemeComponents: Dispatch<SetStateAction<number>>;
    setCanceledSubscription: Dispatch<SetStateAction<Subscription | null>>;
    activeSubscriptionResponse: Subscription | null;
  };
  profileMetrics: {
    profileData: ProfileDetails | null;
    isProfileLoading: boolean;
    setProfileData: Dispatch<SetStateAction<ProfileDetails | null>>;
  };
  // theme for ai button
  theme: ThemeProps;
  setTheme: Dispatch<SetStateAction<ThemeProps>>;
  theme_upload: string;
  setThemeUpload: Dispatch<SetStateAction<string>>;
  activeTheme: Theme | null;
  setActiveTheme: Dispatch<SetStateAction<Theme | null>>;
  aiThemePayload: AiThemePayload | null;
  setAiThemePayload: Dispatch<SetStateAction<AiThemePayload | null>>;
  // theme for global theme
  globalTheme: ThemeProps;
  setGlobalTheme: Dispatch<SetStateAction<ThemeProps>>;
  activeGlobalTheme: Theme | null;
  setActiveGlobalTheme: Dispatch<SetStateAction<Theme | null>>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  createThemeButtonClicked: boolean;
  setcreateThemeButtonClicked: Dispatch<SetStateAction<boolean>>;
  newComponentVersionLoading: boolean;
  setNewComponentVersionLoading: Dispatch<SetStateAction<boolean>>;
  openOnScroll: boolean;
  setOpenOnScroll: Dispatch<SetStateAction<boolean>>;
  clerkModal: clerkModalType;
  setClerkModal: Dispatch<SetStateAction<clerkModalType>>;
  isClickFromFreeTrial: boolean;
  setIsClickFromFreeTrial: Dispatch<SetStateAction<boolean>>;
  activeOutputView: string;
  setActiveOutputView: Dispatch<SetStateAction<string>>;
  newEnteredAiPrompt: string;
  setNewEnteredAiPrompt: Dispatch<SetStateAction<string>>;
  latestGuestCreatedComponentDetails: LatestGuestCreatedComponentDetail;
  setLatestGuestCreatedComponentDetails: Dispatch<
    SetStateAction<LatestGuestCreatedComponentDetail>
  >;
  componentCreationLoading: boolean;
  setIsComponentCreationLoading: Dispatch<SetStateAction<boolean>>;
  dummyComponentCreationStatus: boolean;
  setDummyComponentCreationStatus: Dispatch<SetStateAction<boolean>>;
  failedAPIPromptDetails: FailedAPIPromptDetailsType;
  setFailedAPIPrompt: Dispatch<SetStateAction<FailedAPIPromptDetailsType>>;
}

export const RootContext = createContext<ContextType>({
  selectedUILib: Default_UI_Lib.value,
  setSelectedUILib: () => {
    throw new Error("setSelectedUILib must be overridden");
  },
  subscriptionMetrics: {
    activeSubscription: null,
    isSubscriptionLoading: false,
    isSubscriptionError: false,
    setActiveSubscription: () => null,
    totalThemeComponents: 0,
    setTotalThemeComponents: () => null,
    setCanceledSubscription: () => null,
    activeSubscriptionResponse: null,
  },
  profileMetrics: {
    profileData: null,
    isProfileLoading: false,
    setProfileData: () => null,
  },
  theme: DEFAULT_THEME,
  setTheme: () => {
    throw new Error("setTheme must be overridden");
  },
  theme_upload: "//Paste your theme here",
  setThemeUpload: () => {
    throw new Error("setThemeUpload must be overridden");
  },
  activeTheme: null,
  setActiveTheme: () => {
    throw new Error("setActiveTheme must be overridden");
  },
  aiThemePayload: null,
  setAiThemePayload: () => {
    throw new Error("setAiThemePayload must be overridden");
  },
  globalTheme: GLOBAL_DEFAULT_THEME,
  setGlobalTheme: () => {
    throw new Error("setGlobalTheme must be overridden");
  },
  activeGlobalTheme: null,
  setActiveGlobalTheme: () => {
    throw new Error("setActiveGlobalTheme must be overridden");
  },
  openModal: false,
  setOpenModal: () => {
    throw new Error("setOpenModal must be overridden");
  },
  createThemeButtonClicked: false,
  setcreateThemeButtonClicked: () => {
    throw new Error("setcreateThemeButtonClicked must be overridden");
  },
  newComponentVersionLoading: false,
  setNewComponentVersionLoading: () => {
    throw new Error("setNewComponentVersionLoading must be overridden");
  },
  openOnScroll: false,
  setOpenOnScroll: () => {
    throw new Error("setOpenOnScroll must be overridden");
  },
  clerkModal: {
    isModalOpen: false,
    modalName: MODAL_NAME.CLERK_SIGNIN_FLOW,
  },
  setClerkModal: () => {
    throw new Error("setClerkModal must be overridden");
  },
  isClickFromFreeTrial: false,
  setIsClickFromFreeTrial: () => {
    throw new Error("isClickFromFreeTrial must be overridden");
  },
  activeOutputView: default_Tab_Value,
  setActiveOutputView: () => {
    throw new Error("activeOutputView must be overridden");
  },
  newEnteredAiPrompt: "",
  setNewEnteredAiPrompt: () => {
    throw new Error("newEnteredAiPrompt must be overridden");
  },
  latestGuestCreatedComponentDetails: {
    latestGuestCreatedComponentID: "",
    latestGuestCreatedComponentPrompt: "",
  },
  setLatestGuestCreatedComponentDetails: () => {
    throw new Error("latestGuestCreatedComponentID must be overridden");
  },
  componentCreationLoading: false,
  setIsComponentCreationLoading: () => {
    throw new Error("componentCreationLoading must be overridden");
  },
  dummyComponentCreationStatus: false,
  setDummyComponentCreationStatus: () => {
    throw new Error("dummyComponentCreationStatus must be overridden");
  },
  failedAPIPromptDetails: {
    prompt: "",
    status: false,
  },
  setFailedAPIPrompt: () => {
    throw new Error("failedAPIPromptDetails must be overridden");
  },
});

export const ContextProvider = ({ children }: Props) => {
  const [selectedUILib, setSelectedUILib] = useState(Default_UI_Lib.value);
  const [theme, setTheme] = useState<ThemeProps>(DEFAULT_THEME);
  const [theme_upload, setThemeUpload] = useState<string>("//Paste your theme here");
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [aiThemePayload, setAiThemePayload] = useState<AiThemePayload | null>(null);

  const [globalTheme, setGlobalTheme] = useState<ThemeProps>(GLOBAL_DEFAULT_THEME);
  const [activeGlobalTheme, setActiveGlobalTheme] = useState<Theme | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [createThemeButtonClicked, setcreateThemeButtonClicked] = useState<boolean>(false);
  const [newComponentVersionLoading, setNewComponentVersionLoading] = useState<boolean>(false);

  const [openOnScroll, setOpenOnScroll] = useState<boolean>(false);
  const [clerkModal, setClerkModal] = useState({
    isModalOpen: false,
    modalName: MODAL_NAME.CLERK_SIGNIN_FLOW,
  });
  const [isClickFromFreeTrial, setIsClickFromFreeTrial] = useState(false);
  const [activeOutputView, setActiveOutputView] = useState(default_Tab_Value);
  const [newEnteredAiPrompt, setNewEnteredAiPrompt] = useState("");
  const [latestGuestCreatedComponentDetails, setLatestGuestCreatedComponentDetails] = useState({
    latestGuestCreatedComponentID: "",
    latestGuestCreatedComponentPrompt: "",
  });
  const [componentCreationLoading, setIsComponentCreationLoading] = useState(false);
  const [dummyComponentCreationStatus, setDummyComponentCreationStatus] = useState(false);
  const [failedAPIPromptDetails, setFailedAPIPrompt] = useState({
    prompt: "",
    status: false,
  });

  const contextValue = React.useMemo(() => {
    return {
      selectedUILib,
      setSelectedUILib,
      theme_upload,
      setThemeUpload,
      theme,
      setTheme,
      activeTheme,
      setActiveTheme,
      aiThemePayload,
      setAiThemePayload,
      globalTheme,
      setGlobalTheme,
      activeGlobalTheme,
      setActiveGlobalTheme,
      openModal,
      setOpenModal,
      createThemeButtonClicked,
      setcreateThemeButtonClicked,
      newComponentVersionLoading,
      setNewComponentVersionLoading,
      setOpenOnScroll,
      openOnScroll,
      clerkModal,
      setClerkModal,
      isClickFromFreeTrial,
      setIsClickFromFreeTrial,
      activeOutputView,
      setActiveOutputView,
      newEnteredAiPrompt,
      setNewEnteredAiPrompt,
      latestGuestCreatedComponentDetails,
      setLatestGuestCreatedComponentDetails,
      componentCreationLoading,
      setIsComponentCreationLoading,
      dummyComponentCreationStatus,
      setDummyComponentCreationStatus,
      failedAPIPromptDetails,
      setFailedAPIPrompt,
    };
  }, [
    selectedUILib,
    theme_upload,
    theme,
    activeTheme,
    aiThemePayload,
    globalTheme,
    activeGlobalTheme,
    openModal,
    createThemeButtonClicked,
    newComponentVersionLoading,
    openOnScroll,
    clerkModal,
    activeOutputView,
    newEnteredAiPrompt,
    latestGuestCreatedComponentDetails,
    componentCreationLoading,
    dummyComponentCreationStatus,
    failedAPIPromptDetails,
  ]);

  const {
    activeSubscription,
    isSubscriptionLoading,
    isSubscriptionError,
    setActiveSubscription,
    totalThemeComponents,
    profileData,
    setProfileData,
    setTotalThemeComponents,
    setCanceledSubscription,
    activeSubscriptionResponse,
  } = usePricing();

  return (
    <RootContext.Provider
      value={{
        ...contextValue,
        subscriptionMetrics: {
          activeSubscription,
          isSubscriptionLoading,
          isSubscriptionError,
          setActiveSubscription,
          totalThemeComponents,
          setTotalThemeComponents,
          setCanceledSubscription,
          activeSubscriptionResponse,
        },
        profileMetrics: {
          profileData,
          isProfileLoading: isSubscriptionLoading,
          setProfileData,
        },
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default ContextProvider;
