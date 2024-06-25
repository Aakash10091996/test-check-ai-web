import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MODAL_NAME } from "@/constants/modal.constant";
import { useSignIn } from "@clerk/nextjs";
import type { OAuthStrategy } from "@clerk/nextjs/server";
import { usePathname, useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { GoogleLogo } from "@/icons/GoogleLogo";
import { montserrat700 } from "@/styles/fonts";
import { useTheme } from "next-themes";

type Props = {
  handleAuthType: (value: boolean, name: string, status?: boolean) => void;
};
const CustomSignIn: React.FC<Props> = ({ handleAuthType }) => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [isAuthenticating, setIsAuthenticating] = useState("");
  useEffect(() => {
    if (pathname === "/sign-in" || pathname === "/sign-up") {
      setTheme("light");
    }
  }, [pathname, setTheme]);
  const [clerkError, setClerkError] = useState({
    email: "",
    password: "",
  });

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
    return signIn?.authenticateWithRedirect({
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
      const result = await signIn.create({
        identifier: userDetails.email,
        password: userDetails.password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/auth-success");
      } else {
        console.log(result);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setClerkError({
        email: "",
        password: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
      err.errors.forEach((errorDetails: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (errorDetails.meta.paramName === "identifier") {
          setClerkError((prevData) => {
            return {
              ...prevData,
              email: "Invalid Email",
            };
          });
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
  const handleSignUpClick = () => {
    if (pathname === "/sign-in") {
      setTheme("light");
      router.push("/sign-up");
    } else {
      handleAuthType(true, MODAL_NAME.CLERK_SIGNUP_FLOW, true);
    }
  };

  return (
    <Card className=" flex h-[560px] w-[423px] items-center justify-center bg-transparent text-black max-lg:h-[470px] max-lg:w-[320px] max-lg:items-center max-lg:rounded-lg max-lg:border-none">
      <CardContent className="w-[380px] max-lg:w-[320px] max-lg:items-center max-lg:justify-center max-lg:pb-4 max-lg:pt-3">
        <div className="grid gap-4 py-6 max-lg:w-[100%]">
          <div
            className={`text-center text-2xl font-bold max-lg:py-3  lg:mb-6 ${montserrat700.className}`}
          >
            Sign In
          </div>
          <div className="grid grid-cols-1 gap-2 max-lg:gap-y-3">
            <Button
              onClick={() => handleOAuth("oauth_github")}
              variant="ghost"
              className="flex h-10 justify-between border border-slate-300 hover:border-none hover:bg-slate-100 hover:text-black focus-visible:invisible max-lg:h-9 "
              disabled={!!isAuthenticating || isLoading}
            >
              <div className="flex items-center justify-start ">
                <GitHubLogoIcon className="mr-3 size-4" />
                Continue with GitHub
              </div>
              {isAuthenticating === "oauth_github" && <LoadingSpinner size="14px" />}
            </Button>
            <Button
              onClick={() => handleOAuth("oauth_google")}
              variant="ghost"
              className="flex h-10 justify-between border border-slate-300 hover:border-none hover:bg-slate-100 hover:text-black max-lg:h-9"
              disabled={!!isAuthenticating || isLoading}
            >
              <div className="flex items-center justify-start">
                <GoogleLogo className="mr-3 size-4" />
                Continue with Google
              </div>
              {isAuthenticating === "oauth_google" && <LoadingSpinner size="14px" />}
            </Button>
          </div>
          <div className="relative py-6 max-lg:py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-300" />
              <span className="px-4 text-sm text-black max-lg:px-2">or</span>
              <span className="w-full border-t border-slate-300" />
            </div>
          </div>

          <div className="space-y-0">
            <div className="flex h-[85px] flex-col gap-1">
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
            <div className="flex h-[85px] flex-col gap-1">
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

            <div className="space-y-3">
              <Button
                disabled={!!isAuthenticating || isLoading}
                onClick={handleSubmit}
                className="flex w-full gap-3 text-sm font-semibold "
              >
                {isLoading && <LoadingSpinner size="14px" />}
                <span>CONTINUE</span>
              </Button>
              <p className="flex items-center justify-center max-lg:text-sm">
                Don&apos;t have an account?
                <span
                  onClick={handleSignUpClick}
                  className="cursor-pointer pl-1 font-semibold text-primary"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomSignIn;
