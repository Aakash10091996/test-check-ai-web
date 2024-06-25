import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
import { useGetProfileDetails } from "@/services/profile/apiHooks";
import type { ProfileDetails, Subscription } from "@/types/profile";
import { usePathname, useRouter } from "next/navigation";
import { AI_PROJECTS, CHECKOUT } from "@/constants";

// import { useDisclosure } from "@mantine/hooks";
// import toast from 'react-hot-toast'
// import { useSearchParams } from "react-router-dom";
// import { useGetUserAIDetails } from "marketplace/uielements/api/apiHooks";
// import { paymentFailedEvent, thankYouVisitEvent } from "shared/services/mixpanel";

const usePricing = () => {
  // const searchParams = useSearchParams();

  const [isOpenAiPricingModal, setIsOpenAiPricingModal] = useState(false);

  const {
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
    data: subscriptionDetails,
  } = useGetProfileDetails();
  // localStorage.getItem("token")

  const [pricingModalType, setPricingModalType] = useState("Quota Expired");

  const [profileData, setProfileData] = useState<ProfileDetails | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<Subscription | null>(null);
  const [totalThemeComponents, setTotalThemeComponents] = useState<number>(0);
  const [canceledSubscription, setCanceledSubscription] = useState<Subscription | null>(null);

  const [closePricingModalTriggered, setClosePricingModalTriggered] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!subscriptionDetails?.data) {
      setActiveSubscription(null);
      setCanceledSubscription(null);
      setProfileData(null);
    }

    if (subscriptionDetails?.data) {
      const { activeSubscription, ...rest } = subscriptionDetails.data;
      setProfileData(rest);

      if (activeSubscription) {
        const currentSubscription = activeSubscription;

        // const usedTextComponents =
        //   currentSubscription.total_component_generation_credits - currentSubscription.component_generation_credits;
        setTotalThemeComponents(subscriptionDetails?.data?.components_generated_with_theme);
        // const usedImageComponents =
        //   currentSubscription?.total_image_to_code_generation_credits -
        //   currentSubscription?.image_to_code_generation_credits;

        // currentSubscription.used_text_components = isNaN(usedTextComponents) ? 0 : usedTextComponents;
        // currentSubscription.used_image_components = isNaN(usedImageComponents)
        //   ? 0
        //   : usedImageComponents;

        setActiveSubscription(currentSubscription);
      } else if (pathname.includes(AI_PROJECTS) && !activeSubscription) {
        router.push(CHECKOUT);
      }
    }

    if (subscriptionDetails?.data?.canceledSubscription) {
      setCanceledSubscription(subscriptionDetails?.data?.canceledSubscription);
      if (pathname.includes(AI_PROJECTS)) {
        router.push(CHECKOUT);
      }
    }
  }, [subscriptionDetails]);

  // useEffect(() => {
  //   if (searchParams.get("fromPayment")) {
  //     if (searchParams.get("fromPayment") === "true") {
  //       // setTimeout(() => {
  //       // paymentSuccessEvent()
  //       //   thankYouVisitEvent();
  //       // }, 2000);
  //       // toast.success("Payment Successfull");
  //     } else if (searchParams.get("fromPayment") === "false") {
  //       // setTimeout(() => {
  //       // paymentFailedEvent();
  //       // }, 2000);
  //       // toast.error("Payment Failed");
  //     }
  //     // searchParams.delete("fromPayment");
  //     // setSearchParams(searchParams);
  //   }
  // }, [searchParams]);

  const openPricingModal = () => {
    setIsOpenAiPricingModal(true);
  };
  const closePricingModal = () => {
    setIsOpenAiPricingModal(false);
  };
  return {
    profileData,
    setProfileData,
    isSubscriptionLoading,
    isSubscriptionError,
    activeSubscription,
    setActiveSubscription,
    pricingModalType,
    setPricingModalType,
    closePricingModalTriggered,
    setClosePricingModalTriggered,
    canceledSubscription,
    isOpenAiPricingModal,
    openPricingModal,
    closePricingModal,
    totalThemeComponents,
    setTotalThemeComponents,
    setCanceledSubscription,
    activeSubscriptionResponse: subscriptionDetails?.data?.activeSubscription ?? null,
  };
};

export default usePricing;
