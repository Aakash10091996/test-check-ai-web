"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getFromLocalStorage,
  getToken,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localstorage";
import { useCallback, useContext, useEffect } from "react";
import { VSCODE_REDIRECT_URL } from "@/config/constants";
import { getVSCodeAuthToken } from "@/services/profile/api";
import { MODAL_NAME } from "@/constants/modal.constant";
import { RootContext } from "@/providers/ContextProvider";
import { useClerk } from "@clerk/nextjs";

function VSCodeRedirection() {
  const clerk = useClerk();
  const navigate = useRouter();
  const urlParams = useSearchParams();
  const { setClerkModal } = useContext(RootContext);

  const handleClerk = useCallback(() => {
    setClerkModal({
      isModalOpen: true,
      modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
    });
  }, [setClerkModal]);

  const resourceValue = urlParams.get("referral") ?? "";
  const windowId = urlParams.get("windowId") ?? "";
  const refStorage = getFromLocalStorage("referral");
  const windowIdStorage = getFromLocalStorage("windowId") as string | undefined;
  const sessionToken = getToken();

  const handleEscapePress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      removeFromLocalStorage("referral");
      removeFromLocalStorage("windowId");
    }
  }, []);

  const handleVSRedirection = useCallback(() => {
    if (sessionToken && clerk.user?.id) {
      getVSCodeAuthToken()
        .then((data) => {
          window.location.href = `${VSCODE_REDIRECT_URL}?token=${data?.data?.authToken}&windowId=${windowIdStorage ?? windowId}`;
        })
        .catch((err) => {
          console.log(err);
        });
      if (refStorage === "extension") {
        removeFromLocalStorage("referral");
        removeFromLocalStorage("windowId");
      }
      navigate.replace(window.location.pathname);
      return;
    }
  }, [sessionToken, refStorage, windowId, windowIdStorage, navigate, clerk.user?.id]);

  useEffect(() => {
    window.addEventListener("keydown", handleEscapePress);

    if (
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      (resourceValue === "extension" && sessionToken) ||
      (refStorage === "extension" && sessionToken)
    ) {
      handleVSRedirection();
      return;
    }

    if (resourceValue === "extension" && !sessionToken) {
      setToLocalStorage("referral", resourceValue);
      setToLocalStorage("windowId", windowId);
      handleClerk();
    }

    return () => {
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [resourceValue, refStorage, sessionToken, windowId, handleVSRedirection, handleEscapePress]);

  return null;
}

export default VSCodeRedirection;
