"use client";
import { useEffect } from "react";

import { useAuth } from "@clerk/nextjs";
import { identifyMixPanleUser, updateUserInMixpanel } from "@/mixpanel/mixpanel";
import { useGetProfileDetails } from "@/services/profile/apiHooks";

function IdentifyMixpanel() {
  const { isSignedIn } = useAuth();
  const { data: profileData } = useGetProfileDetails();

  useEffect(() => {
    if (isSignedIn && profileData) {
      identifyMixPanleUser(profileData?.data?.id);
      updateUserInMixpanel({
        id: profileData?.data?.id,
        email: profileData?.data?.email,
        name: profileData?.data?.first_name,
        first_name: profileData?.data?.first_name,
        last_name: profileData?.data?.last_name,
      });
    }
  }, [isSignedIn, profileData]);

  return null;
}

export default IdentifyMixpanel;
