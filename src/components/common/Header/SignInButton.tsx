"use client";
import { Support } from "@/icons/Support";
import { logoutEvent } from "@/mixpanel/mixpanel";
import { HeaderMenus, clearClerkSessionCookie } from "@/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { COMPONENTS, UI_ELEMENTS, localStorageKeyNames } from "@/constants";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function SignInButton() {
  const pathName = usePathname();
  const isComponentPage = pathName.includes(UI_ELEMENTS) || pathName.includes(COMPONENTS);
  const { users } = HeaderMenus();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleSignOutClick = () => {
      logoutEvent();
      localStorage.removeItem(localStorageKeyNames.signUpFromHeader);
      localStorage.removeItem(localStorageKeyNames.startNewChatPrompt);
      localStorage.removeItem(localStorageKeyNames.signUpFromHeader);
      clearClerkSessionCookie();
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };

    if (isProfileOpen) {
      // Use a partial match selector for the unique portion of the class name
      const signOutBtns = document.querySelectorAll(
        'button[class*="cl-userButtonPopoverActionButton__signOut"]'
      );

      // Add click event listeners to the found buttons
      signOutBtns.forEach((btn) => {
        btn.addEventListener("click", handleSignOutClick);
      });

      // Clean up the event listeners when the component unmounts or state changes
      return () => {
        signOutBtns.forEach((btn) => {
          btn.removeEventListener("click", handleSignOutClick);
        });
      };
    }
  }, [isProfileOpen]);

  return (
    <div
      onClick={() => {
        setIsProfileOpen(!isProfileOpen);
      }}
    >
      {!isComponentPage && (
        <SignedIn>
          <div className="mb-0 ml-2 flex items-center gap-x-3 align-middle text-accent-foreground lg:ml-1">
            <UserButton afterSignOutUrl="/">
              <UserButton.UserProfilePage label="Support" url="custom" labelIcon={<Support />}>
                <div className="flex gap-2">
                  <text>Email</text>
                  <a href="mailto:accounts@purecodesoftware.com" className="hover:underline">
                    Accounts@purecodesoftware.com
                  </a>
                  <text>to cancel your trial or subscription</text>
                </div>
              </UserButton.UserProfilePage>
            </UserButton>
            {users.user && <p className="block lg:hidden ">{users.user?.fullName}</p>}
          </div>
        </SignedIn>
      )}
    </div>
  );
}

export default SignInButton;
