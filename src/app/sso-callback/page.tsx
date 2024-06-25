import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <AuthenticateWithRedirectCallback
      afterSignInUrl="/auth-success"
      afterSignUpUrl="/auth-success"
      redirectUrl="/auth-success"
    />
  );
};

export default page;
