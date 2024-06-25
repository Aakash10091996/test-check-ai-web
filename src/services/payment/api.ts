import apiClient from "@/config/apiClient";
import type { PaymentSetupResponse } from "@/types/payment";
import type { Subscription } from "@/types/profile";

export const paymentApi = {
  createPaymentSetup: () => ({
    func: () => apiClient.post<PaymentSetupResponse>(`/payments/create-payment-setup`),
    key: ["createPaymentSetup"],
    successMessage: "",
    errorMessage: "",
  }),

  createSubscription: () => ({
    func: (data: {
      planType: string;
      planDuration: string;
      paymentMethodId: string;
      emailForStripe: string;
    }) => apiClient.post<Subscription>(`/payments/user-subscription`, data),
    key: ["createPaymentSetup"],
    successMessage: "",
    errorMessage: "",
  }),
};
