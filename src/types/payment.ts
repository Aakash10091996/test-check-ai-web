import type { ReactNode } from "react";

export interface PaymentSetupResponse {
  clientSecret: string;
  publishableKey: string;
}

export interface PricingPlan {
  TITLE: ReactNode;
  HEADING: string;
  ALIAS: string;
  SUB_HEADING: string;
  FEATURES_LIST: string[];
  BUTTON: string;
  db_name: string;
  PRICING?: {
    MONTHY?: string;
    YEARLY?: string;
  };
  MONTHLY_PRICING?: string;
  ANNUAL_PRICING?: string;
  SUBSCRIPTION_SCHEME?: {
    MONTHY?: string;
    YEARLY?: string;
  };
  COLOR?: string;
  SUBTEXT?: string;
}
