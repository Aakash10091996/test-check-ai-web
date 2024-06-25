export type CLERK_ERROR_MESSAGE = {
  code: string;
  longMessage: string;
  message: string;
  meta: {
    paramName: string;
  };
};

export type CLERK_ERROR_TYPE = {
  clerkError: boolean;
  errors: CLERK_ERROR_MESSAGE[];
};
