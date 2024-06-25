import { LinkAuthenticationElement, PaymentElement } from "@stripe/react-stripe-js";

import { useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import type { StripeLinkAuthenticationElementChangeEvent } from "@stripe/stripe-js";
import { useCreateSubscription } from "@/services/payment/apiHooks";
import { PRICING_PLANS, SUBSCRIPTION_DURATIONS } from "@/constants/PricingConstant";
import { useToast } from "@/components/ui/use-toast";
import { AiPageContext } from "@/context/AiPageContext";
import { Button } from "@/components/ui";
import { pricingText } from "@/constants/pricing";
import {
  // AI_PROJECTS,
  PAYEMNT_SUCCESS,
} from "@/constants/headerRoutes";
import { useQueryClient } from "@tanstack/react-query";
import { proflieApi } from "@/services/profile/api";
import { RootContext } from "@/providers/ContextProvider";
import type { Subscription } from "@/types/profile";
import type { ResponseData } from "@/utils";
import { paymentApi } from "@/services/payment/api";
import {
  Toast_Message,
  // localStorageKeyNames
} from "@/constants";
import { openSans400 } from "@/styles/fonts";
// import useCreateNewComponent from "@/hooks/uiElements/useCreateNewComponent";
import { RightArrowIcon } from "@/icons";

export const CheckoutSection = () => {
  const {
    state: { selectedPricingParams },
  } = useContext(AiPageContext);

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    subscriptionMetrics: { activeSubscription, setActiveSubscription },
    profileMetrics: { profileData },
    // selectedUILib,
  } = useContext(RootContext);

  // const { createNewAiComponent } = useCreateNewComponent();

  const [emailForStripe, setEmailForStripe] = useState(profileData?.email ?? "");
  const router = useRouter();
  const { mutate: createSubscription } = useCreateSubscription({
    onSuccess: async (data: ResponseData<Subscription>) => {
      toast({
        title: Toast_Message.SubscriptionCreation,
      });
      setMessage(Toast_Message.SuccessPayment);
      // trackMixpanelEvent(MIXPANEL_EVENTS.TRIAL_START, {});
      queryClient.removeQueries({
        queryKey: proflieApi.getProfileDetails().key,
      });
      await queryClient.invalidateQueries({
        queryKey: paymentApi.createSubscription().key,
      });
      // const aiResults = sessionStorage.getItem("aiResults");
      if (data?.data) {
        setActiveSubscription(data.data);
      }
      // if (aiResults === null) {
      //   return router.push("/aiprojects");
      // }

      // const aiResultsData: unknown = JSON.parse(aiResults);
      // if (
      //   typeof aiResultsData === "object" &&
      //   aiResultsData !== null &&
      //   "newCompId" in aiResultsData &&
      //   "newCompVersion" in aiResultsData
      // ) {
      //   sessionStorage.removeItem("aiResults");
      //   return router.push(
      //   `${AI_PROJECTS}/${aiResultsData.newCompId as string}/${aiResultsData.newCompVersion as string}`
      // );
      // }
      // sessionStorage.removeItem("aiResults");
      setIsLoading(false);
      // void createNewAiComponent(
      //   localStorage.getItem(localStorageKeyNames.startNewChatPrompt) ?? "",
      //   selectedUILib,
      //   AI_PROJECTS + "?show-latest=true"
      // );
      router.replace(PAYEMNT_SUCCESS);
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: error?.message ?? Toast_Message.SomethingWrong,
      });
      setMessage(error?.message ?? Toast_Message.SomethingWrong);
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // const { error } = await stripe.confirmPayment({
    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      // confirmParams: { return_url: "http://localhost:3000/aiprojects" },
      redirect: "if_required",
    });

    // const { error } = await stripe.confirmSetup(
    //   clientSecret,
    //   {
    //     payment_method: {
    //     card: elements.getElement(PaymentElement),
    //     billing_details: {
    //       name: 'Jenny Rosen',
    //     },
    //    },
    //   confirmParams: {
    //     // Make sure to change this to your payment completion page
    //     return_url: `${window.location.origin}/completion`,
    //   },
    // });

    // const { error } = await stripe.confirmSetup({
    //   clientSecret,
    // // redirect : "if_required",
    // confirmParams : {
    //   return_url : "example.com/returnURL.php"
    // }}
    // )

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        if (error.message) {
          setMessage(error.message);
        }
      } else {
        setMessage("An unexpected error occured.");
      }
      setIsLoading(false);
    } else {
      // trackMixpanelEvent(MIXPANEL_EVENTS.CARD_SAVE, {});
      createSubscription({
        planType: PRICING_PLANS[selectedPricingParams.planIndex].db_name,
        planDuration: SUBSCRIPTION_DURATIONS[selectedPricingParams.planDurationIndex].db_name,
        paymentMethodId:
          setupIntent.payment_method !== null && typeof setupIntent.payment_method !== "string"
            ? setupIntent.payment_method.id
            : typeof setupIntent.payment_method === "string"
              ? setupIntent.payment_method
              : "",
        emailForStripe,
      });
    }
  };

  const handleEmailChange = (e: StripeLinkAuthenticationElementChangeEvent) => {
    setEmailForStripe(e.value.email);
  };

  return (
    <div className="w-full px-2 sm:w-[388px] sm:px-0">
      {/* <div
        className={`mb-4 text-[23.06px] font-semibold leading-9 ${montserrat600.className} text-black dark:text-white`}
      >
        {pricingText.CONFIRM_PAYMENT_DETAILS}
      </div> */}
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          onChange={handleEmailChange}
          options={{ defaultValues: { email: emailForStripe } }}
        />
        {/* <ShippingAddressElement onChange={handleAddressChange} options={{allowedCountries: ['US'] }} /> */}
        {/* <h4>Payment details</h4> */}
        <div className="mt-4">
          <PaymentElement
            options={{
              fields: { billingDetails: { name: "auto" } },
              terms: {
                card: "never",
              },
            }}
          />
        </div>
        <Button
          disabled={isLoading || !stripe || !elements || activeSubscription !== null}
          id="submit"
          className="mt-10 flex h-11 w-full items-center rounded-md bg-blue400 text-base font-medium leading-[44px]"
        >
          <div id="button-text text-[16px]">
            {activeSubscription !== null ? (
              "Subscribed"
            ) : isLoading ? (
              <div id="spinner">...</div>
            ) : (
              <div className="flex items-center gap-3">
                {pricingText.START_FREE_TRIAL}
                <RightArrowIcon />
              </div>
            )}
          </div>
        </Button>
        <div className="h-[4rem]">
          <div className={`text-xs font-normal ${openSans400.className} mt-4`}>
            {pricingText.TERMS_AND_CONDITIONS}
          </div>
          {message && <div id="payment-message">{message}</div>}
        </div>
      </form>
    </div>
  );
};
