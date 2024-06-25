import type { ErrorData, ResponseData } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "@/services/payment/api";
import type { PaymentSetupResponse } from "@/types/payment";
import type { Subscription } from "@/types/profile";

export const useCreatePaymentSetup = (
  options: {
    onSuccess?: (data: ResponseData<PaymentSetupResponse>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = paymentApi.createPaymentSetup();

  return useMutation({
    mutationKey: key,
    mutationFn: func,
    retry: 3,
    retryDelay: 3000,
    onSuccess: (data: ResponseData<PaymentSetupResponse>) => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        console.log(successMessage);
        // toast message maybe
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};

export const useCreateSubscription = (
  options: {
    onSuccess?: (data: ResponseData<Subscription>) => void;
    onError?: (err: ErrorData) => void;
    showServerMessage?: boolean;
    showErrorMessage?: boolean;
  } = { showServerMessage: false, showErrorMessage: false }
) => {
  const { onSuccess, onError, showServerMessage, showErrorMessage } = options;
  const { key, successMessage, errorMessage, func } = paymentApi.createSubscription();

  return useMutation({
    mutationKey: key,
    mutationFn: func,
    onSuccess: (data: ResponseData<Subscription>) => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (showServerMessage) {
        console.log(successMessage);
        // toast message maybe
      }
    },
    onError: (e: ErrorData) => {
      if (onError) {
        onError(e);
      }
      if (showErrorMessage) {
        console.log(errorMessage);
        // toast message maybe
      }
    },
  });
};
