import CustomModal from "@/components/custom/CustomModal";
import {
  SignUpConstant,
  localStorageKeyNames,
  DEFAULT_SIGNUP_VALUE_FROM_HEADER,
  UI_ELEMENTS,
  AI_PROJECTS,
  COMPONENTS,
} from "@/constants";
import { MODAL_NAME } from "@/constants/modal.constant";
import { RootContext } from "@/providers/ContextProvider";
import React, { Suspense, useContext } from "react";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";
import { RightArrowIcon } from "@/icons";
type signUpProp = {
  signuptextprop?: string;
};

function SignOutButton({ signuptextprop = SignUpConstant.signup }: signUpProp) {
  const pathName = usePathname();
  const isComponentPage = pathName.includes(UI_ELEMENTS) || pathName.includes(COMPONENTS);

  const { setClerkModal } = useContext(RootContext);
  const IsAiPage = pathName.startsWith(AI_PROJECTS);
  const handleClerk = () => {
    trackMixpanelEvent(MIXPANEL_EVENTS.SIGNUP_CLICK, {});
    localStorage.setItem(localStorageKeyNames.signUpFromHeader, DEFAULT_SIGNUP_VALUE_FROM_HEADER);
    setClerkModal({
      isModalOpen: true,
      modalName: MODAL_NAME.CLERK_SIGNUP_FLOW,
    });
  };

  return (
    <div className="flex">
      <Suspense fallback={<Loading />}>
        <CustomModal fromHeader={true} />
      </Suspense>
      {!isComponentPage && !IsAiPage && (
        <button
          onClick={handleClerk}
          className="group flex items-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:text-white "
        >
          {signuptextprop === SignUpConstant.signupitsfree ? (
            <>
              <span className="mr-1">{signuptextprop}</span>
              <span className="transition-all duration-500 group-hover:translate-x-2">
                <RightArrowIcon />
              </span>
            </>
          ) : (
            <>{signuptextprop}</>
          )}
        </button>
      )}
    </div>
  );
}

export default SignOutButton;
