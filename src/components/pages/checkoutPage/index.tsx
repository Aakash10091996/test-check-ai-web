"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PricingSelectionForCheckoutPage from "@/components/pages/checkoutPage/PricingSelectionForCheckoutPage";
import { CheckoutSection } from "@/components/pages/checkoutPage/CheckoutSection";
import { useCreatePaymentSetup } from "@/services/payment/apiHooks";
import { fonts } from "@/constants/payment";
import { openSans600 } from "@/styles/fonts";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useTheme } from "next-themes";
import { LogoProIcon } from "@/icons";
import { colors } from "@/styles/colors";
import { SecuredByStripe } from "@/components/pages/checkoutPage/SecuredByStripe";
import { clearClerkSessionCookie, HeaderMenus } from "@/utils";
import { RootContext } from "@/providers/ContextProvider";
import { MODAL_NAME } from "@/constants/modal.constant";
import CustomModal from "@/components/custom/CustomModal";

function CheckoutPage() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const lastThemeRef = useRef("");
  const {
    users: { isLoaded, isSignedIn },
  } = HeaderMenus();
  const { setClerkModal, clerkModal } = useContext(RootContext);

  const { mutate: createPaymentSetup } = useCreatePaymentSetup({
    onSuccess: (setupData) => {
      if (setupData.data) {
        setStripePromise(
          loadStripe(setupData?.data?.publishableKey, {
            betas: ["link_beta_3", "elements_customers_beta_1"],
            apiVersion: "2020-08-27;link_beta=v1",
          })
        );
        setClientSecret(setupData.data.clientSecret);
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    lastThemeRef.current = theme!;
    setTheme("light");
    createPaymentSetup();
    window.addEventListener("beforeunload", function () {
      // Do something before the page is unloaded.
      if (lastThemeRef.current === "dark") {
        setTheme(lastThemeRef.current);
      }
    });
    return () => {
      if (lastThemeRef.current === "dark") {
        setTheme(lastThemeRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setClerkModal({
        isModalOpen: !isSignedIn,
        modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
      });
    }
  }, [isSignedIn, isLoaded]);

  // const checkDarkTheme = () => {
  //   return theme === "dark";
  // };

  return clerkModal.isModalOpen ? (
    <CustomModal hideTitle={true} />
  ) : clientSecret && !loading && stripePromise && theme === "light" ? (
    <div className="relative">
      <div
        className="absolute top-[-4rem] h-[4rem] w-full pt-[40px]"
        style={{
          minHeight: "100vh",
          // background: `radial-gradient(43.37% 87.96% at 55.06% 12.82%, ${checkDarkTheme() ? colors.blueBgVariant.DEFAULT : colors.purple50} 0%, ${checkDarkTheme() ? colors.blueBgVariant.foreground : colors.purpleBgVariant.DEFAULT} 100%)`,
          background: `radial-gradient(43.37% 87.96% at 55.06% 12.82%, ${colors.purple50} 0%, ${colors.purpleBgVariant.DEFAULT} 100%)`,
        }}
      >
        <div className="flex pt-[80px]  lg:gap-[40px]">
          <div className="hidden w-[47%] md:block"></div>
          <div className="m-auto mb-[20px] md:w-[53%]">
            <div className="w-full px-2 sm:w-[388px] sm:px-0">
              <LogoProIcon className="fill-black" />
            </div>
          </div>
        </div>
        <div className={`block justify-center ${openSans600.className} md:flex  lg:gap-[40px]`}>
          {/* <Button onClick={() => router.push("/aiprojects")}></Button> */}
          <div className="mt-[20px] flex justify-center md:w-[47%] lg:justify-end">
            <PricingSelectionForCheckoutPage />
          </div>
          <div className="mt-10 flex justify-center md:mt-0 md:w-[53%] md:justify-start">
            <div>
              <div className="h-[20px]" />
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  fonts,
                  // customerOptions,
                  appearance: {
                    theme: "stripe",
                    rules: {
                      ".Input": {
                        border: "1px solid black",
                        // padding: "0.85rem 0.75rem",
                      },
                      ".Label": {
                        fontWeight: "bold",
                      },
                    },
                    variables: {
                      // fontFamily: '"ROBOTO"',
                      borderRadius: "6px",
                      fontSizeSm: "13px",
                      gridRowSpacing: "15px",
                    },
                  },
                }}
              >
                <CheckoutSection />
              </Elements>
            </div>
          </div>
          <div className="my-[4rem] md:hidden" onClick={clearClerkSessionCookie}>
            <SecuredByStripe />
          </div>
        </div>
      </div>
    </div>
  ) : loading ? (
    <LoadingSpinner fullScreen />
  ) : (
    <h3>Could Not Load Payment details please refresh</h3>
  );
}
export default CheckoutPage;
