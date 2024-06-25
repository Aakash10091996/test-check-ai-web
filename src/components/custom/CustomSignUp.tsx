/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MODAL_NAME } from "@/constants/modal.constant";
import { useSignUp } from "@clerk/nextjs";
import type { OAuthStrategy } from "@clerk/nextjs/server";
import { usePathname, useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { GoogleLogo } from "@/icons/GoogleLogo";
import type { CLERK_ERROR_MESSAGE, CLERK_ERROR_TYPE } from "@/types/clerk";
import PricingComponent from "@/components/common/payment/PricingComponent";
import { montserrat700, montserrat900 } from "@/styles/fonts";
import { PRICING_PLANS_SIGNUP, pricingText, signupPricing } from "@/constants/pricing";
import Exclamatory from "@/icons/Exclamatory";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from "@/components/ui/popover";
import { PricingTickIcon } from "@/icons/PricingTick";
import { useTheme } from "next-themes";
import { RightArrowIcon } from "@/icons";
import Typewriter from "@/components/custom/TypeWriterEffect";
import { TypeWritingText } from "@/components/common/payment/TypeWritingText";

type Props = {
  handleAuthType: (value: boolean, name: string, status?: boolean) => void;
};

const CustomSignUp: React.FC<Props> = ({ handleAuthType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (pathname === "/sign-in" || pathname === "/sign-up") {
      setTheme("light");
    }
  }, [pathname, setTheme]);
  const { isLoaded, signUp, setActive } = useSignUp();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [clerkError, setClerkError] = useState({
    email: "",
    password: "",
  });

  const [isAuthenticating, setIsAuthenticating] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOAuth = (strategy: OAuthStrategy) => {
    setIsAuthenticating(strategy);
    return signUp?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-success",
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      const result = await signUp.create({
        emailAddress: userDetails.email,
        password: userDetails.password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/auth-success");
      } else {
        console.log(result);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
    } catch (err: CLERK_ERROR_TYPE | any) {
      setClerkError({
        email: "",
        password: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      err?.errors.forEach((errorDetails: CLERK_ERROR_MESSAGE) => {
        if (errorDetails?.meta?.paramName === "email_address") {
          setClerkError((prevData) => {
            return {
              ...prevData,
              email:
                errorDetails?.code === "form_identifier_exists"
                  ? errorDetails.message
                  : "Email is not valid",
            };
          });
        } else if (errorDetails.meta.paramName === "password") {
          setClerkError((prevData) => {
            return {
              ...prevData,
              password: "Invalid Password",
            };
          });
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error("error", err.errors[0].longMessage);
    }
    setIsLoading(false);
  };

  const handleSignInClick = () => {
    if (pathname === "/sign-up") {
      router.push("/sign-in");
    } else {
      handleAuthType(true, MODAL_NAME.CLERK_SIGNIN_FLOW, true);
    }
  };

  const typeWritingText = pathname.includes("/sign-up")
    ? pricingText.START_YOUR_FREE_TRIAL_TODAY
    : TypeWritingText();

  return (
    <div className="flex w-full items-center justify-center">
      <div className="block w-[578px] max-lg:hidden">
        <div className="bg-img-signup flex flex-col rounded-l-2xl">
          <PricingComponent />
        </div>
      </div>
      <Card className="flex w-[423px] items-center justify-center rounded-none bg-transparent !p-0 text-black max-lg:w-[320px] max-lg:flex-col max-lg:border-none">
        <CardContent className="grid w-[380px] space-y-4 p-0 max-lg:w-[320px] max-lg:pt-2 ">
          <div className="bg-img-signup m-0 w-full p-0">
            <div className="hidden bg-transparent max-lg:block">
              <div
                className={`ml-2 h-[80px] w-[300px] text-center text-[28px] text-black ${montserrat700.className}`}
              >
                <Typewriter sentence={typeWritingText} />
              </div>
              <div
                className={`flex items-center justify-center gap-1 py-4 font-bold leading-none focus-visible:invisible`}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="link"
                      size="icon"
                      className=" -mr-3 p-0 hover:cursor-pointer focus-visible:invisible"
                    >
                      <Exclamatory />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="absolute -ml-[87px] -mt-[12px] flex w-[310px] min-w-[30%] flex-col items-start justify-start gap-4 border-2 border-black bg-black p-2 text-white">
                    <PopoverArrow />
                    {signupPricing.map((item, index) => (
                      <div key={index} className="flex items-center justify-center gap-2">
                        <PricingTickIcon height="14" width="14" />
                        <Label className="text-start text-[11px] font-bold">{item}</Label>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
                <Label className={`ml-2 text-[24px] ${montserrat700.className} `}>
                  ${PRICING_PLANS_SIGNUP[2].PRICE}
                </Label>
              </div>
              <div className="flex w-full justify-center pb-2">
                <Label className="text-center text-[20px] font-normal opacity-70">
                  ${PRICING_PLANS_SIGNUP[0].PRICE}/month {pricingText.AFTER_TRIAL}
                </Label>
              </div>
            </div>
          </div>

          <div className="px-8 max-lg:gap-4 lg:space-y-4">
            <div
              className={`mb-16 text-center text-[24px] font-bold text-black max-lg:hidden ${montserrat700.className}`}
            >
              {pricingText.SIGN_UP_FOR_FREE}
            </div>

            <div className="grid grid-cols-1 gap-2 max-lg:space-y-2">
              <Button
                onClick={() => handleOAuth("oauth_github")}
                variant="ghost"
                className="flex  h-10 justify-between border border-slate-300 hover:border-none hover:bg-slate-100 hover:text-black focus-visible:invisible "
                disabled={!!isAuthenticating || isLoading}
              >
                <div className="flex items-center justify-start">
                  <GitHubLogoIcon className="mr-3 size-4" />
                  Continue with GitHub
                </div>
                {isAuthenticating === "oauth_github" && <LoadingSpinner size="14px" />}
              </Button>
              <Button
                onClick={() => handleOAuth("oauth_google")}
                variant="ghost"
                className="flex h-10 justify-between border border-slate-300 hover:border-none hover:bg-slate-100 hover:text-black"
                disabled={!!isAuthenticating || isLoading}
              >
                <div className="flex items-center justify-start">
                  <GoogleLogo className="mr-3 size-4" />
                  Continue with Google
                </div>
                {isAuthenticating === "oauth_google" && <LoadingSpinner size="14px" />}
              </Button>
            </div>
            <div className="relative max-lg:py-4 lg:py-5">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-300" />
                <span className="px-4 text-sm text-black max-lg:px-2 ">or</span>
                <span className="w-full border-t border-slate-300" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex h-[80px] flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  disabled={!!isAuthenticating || isLoading}
                  value={userDetails.email}
                  onChange={handleChange}
                  className="border border-slate-300 bg-white text-black hover:border-blue-500 "
                />
                {clerkError.email ? (
                  <span className="text-xs text-red500">{clerkError.email}</span>
                ) : null}
              </div>

              <div className="flex h-[80px] flex-col gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  disabled={!!isAuthenticating || isLoading}
                  value={userDetails.password}
                  onChange={handleChange}
                  type="password"
                  className="border border-slate-300 bg-white text-black hover:border-blue-500 "
                />
                {clerkError.password ? (
                  <span className="text-xs text-red500">{clerkError.password}</span>
                ) : null}
              </div>

              <Button
                disabled={!!isAuthenticating || isLoading}
                onClick={handleSubmit}
                className="flex w-full gap-3 px-12 text-sm font-semibold max-lg:py-3"
              >
                {isLoading && <LoadingSpinner size="14px" />}
                <span>Start Free Trial</span>
                <RightArrowIcon />
              </Button>
              <p className="flex items-center justify-center py-3">
                Already have an account?
                <span
                  onClick={handleSignInClick}
                  className="cursor-pointer pl-1 font-semibold text-primary"
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomSignUp;
