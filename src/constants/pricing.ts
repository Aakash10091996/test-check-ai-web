export const SUBSCRIPTION_PLANS = {
  FREE: "free",
  PRO_MONTHLY: "pro_monthly",
  PRO_YEARLY: "pro_yearly",
  PREMIUM_MONTHLY: "premium_monthly",
  PREMIUM_YEARLY: "premium_yearly",
};

export const PRICING_PLANS = [
  {
    TITLE: "Free",
    SUB_HEADING: "Try PureCode to see how great it is!",
    FEATURES_LIST: [
      "5 components monthly",
      // '3 image to code generations monthly',
      "Unlimited component iterations/updates",
      "Public generations",
      "Flexible Commercial Terms",
    ],
    BUTTON: "Choose Free",
    db_name: "free",
    PRICE: "0",
    ANNUAL_PRICING: "0",
    SUBSCRIPTION_SCHEME: {
      MONTHY: SUBSCRIPTION_PLANS.FREE,
    },
  },
  {
    TITLE: "Premium",
    SUB_HEADING: "Best option for individual developers looking to speed up their development.",
    FEATURES_LIST: [
      "Unlimited component generations",
      "Unlimited component iterations/updates",
      "Private generations",
      "Flexible Commercial Terms",
    ],
    BUTTON: "Confirm and Pay",
    PRICE: "10",
    DISCOUNT: "17%",
    MONTHLY_PRICING: "8",
    ANNUAL_PRICING: "8",
    SUBSCRIPTION_SCHEME: {
      MONTHY: SUBSCRIPTION_PLANS.PREMIUM_MONTHLY,
      YEARLY: SUBSCRIPTION_PLANS.PREMIUM_YEARLY,
    },
    db_name: "premium",
  },
  {
    TITLE: "Enterprise",
    SUB_HEADING: "This is the plan for those most serious about speeding up their day to day work!",
    FEATURES_LIST: [
      "Unlimited components generations",
      "Unlimited component iterations/updates",
      "Private generations",
      "Add multiple users",
      "Custom generations/month",
      "General commercial terms",
      "Data Privacy assurance",
      "SAML SSO",
      "Data Backup",
      "Flexible Commercial Terms",
    ],
    BUTTON: "Talk to Sales",
    CONTACT: "Contact Us",
    db_name: "pro",
  },
];
export const PRICING_PLANS_SIGNUP = [
  {
    TITLE: "Monthly",
    FEATURES_LIST: [
      "Unlimited component generations",
      "Unlimited component iterations/updates",
      "Private generations",
      "Flexible Commercial Terms",
    ],
    PRICE: "19",
    DISCOUNT: "20%",
    db_name: "premium",
  },
  {
    TITLE: "Annual",
    FEATURES_LIST: [
      "Unlimited components generations",
      "Custom Theming	",
      "VS Code Extension",
      "Private generations",
      "Data Privacy assurance",
      "Flexible Commercial Terms",
    ],
    DISCOUNT: "20%",
    ANNUAL_PRICING: "279",
    db_name: "pro",
  },
  {
    TITLE: "PreTrial",
    FEATURES_LIST: ["Unlimited components generations", "Custom Theming	", "VS Code Extension"],
    PRICE: "0 due today",
  },
];

export const signupPricing = [
  "Unlimited Component Generations and Updates",
  "Bring Your Own Custom Theme",
  // "Private Generations",
  "VS Code Extension",
];

export const pricingText = {
  START_YOUR_FREE_TRIAL_TODAY: "Start your free trial today",
  START_YOUR_14_DAY_FREE_TRIAL_NOW: "Start your 14 day free trial now.",
  SIGN_UP_FOR_FREE: "Sign up for free",
  YOUR_COMPONENT_IS_GENERATING: "Your component is generating",
  START_YOUR_7_DAY: "Start your 14 day free trial for unlimited generations",
  START_FREE_TRIAL: "Start Free Trial",
  GET_ACCESS_TO_PURECODE: "Get access to PureCode",
  CANCEL_SUBSCRIPTION: "Cancel anytime before the trial ends",
  HEADING_TEXT: "Start your 14 day",
  HEADING_TEXT_HIGHLIGHT: "UNLIMITED FREE TRIAL",
  HEADING_TEXT_PRICING_CHECKOUT_PAGE: "Start your 14 day FREE unlimited trial",
  PAY_FREQUENCY: "Pay frequency after trial",
  AFTER_TRIAL: "after trial",
  CONFIRM_PAYMENT_DETAILS: "Confirm your payment details. ",
  POWERED_BY: "PureCode is powered by generative AI",
  NEXT_CONFIRM_YOUR_PAYMENT_DETAILS: "Next: Confirm your payment details. ",
  ZERO_DUE: "$0 due now.",
  CANCEL_ANYTIME: "Cancel anytime.",
  PURECODE_AI: "PureCode AI Pro",
  COPILOT: "Copilot",
  POWERED_BY_GENERATIVE_AI: " is powered by generative AI",
  TERMS_AND_CONDITIONS:
    "By confirming your subscription, you allow PureCode Software, Inc. to charge you for future payments in accordance with their terms. You can always cancel your subscription.",
};
