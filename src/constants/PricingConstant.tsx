import { LogoProIcon } from "@/icons";

export const SUBSCRIPTION_DURATIONS = [
  {
    title: "Monthly",
    db_name: "monthly",
    discount: "",
    value: 0,
  },
  // {
  //   title: "Annual",
  //   db_name: "yearly",
  //   discount: " -20% off",
  //   value: 1,
  // },
];
export const SUBSCRIPTION_PLANS = {
  FREE: "free",
  PRO_MONTHLY: "pro_monthly",
  PRO_YEARLY: "pro_yearly",
  PREMIUM_MONTHLY: "premium_monthly",
  PREMIUM_YEARLY: "premium_yearly",
};

export const COMMON_FEATURE_LIST_FOR_CHECKOUT = [
  { text: "Custom Theming", rating: 1 },
  { text: "Unlimited generations", rating: 1 },
  { text: "Unlimited component updates", rating: 1 },
  { text: "Private generations", rating: 1 },
  { text: "Add multiple users", rating: 1 },
  { text: "SAML SSO", rating: 1 },
  { text: "Data Privacy assurance", rating: 1 },
  { text: "Flexible Commercial Terms", rating: 1 },
];
export const PRICING_PLANS = [
  {
    TITLE: (
      <div className="mt-6">
        <LogoProIcon />
      </div>
    ),
    ALIAS: "Without",
    HEADING: "Start your 7 day",
    SUB_HEADING:
      "For individual developers, freelancers and students that want to code front-end faster and happier",
    FEATURES_LIST: [
      "Custom Theming",
      "Unlimited generations",
      "VS Code Extension",
      "Private generations",
      "Data Privacy assurance",
      "Flexible Commercial Terms",
    ],
    BUTTON: "Start a Free Trial",
    db_name: "pro",
    PRICING: {
      MONTHY: "19",
      YEARLY: "279",
    },
    SUBSCRIPTION_SCHEME: {
      MONTHY: SUBSCRIPTION_PLANS.PRO_MONTHLY,
      YEARLY: SUBSCRIPTION_PLANS.PREMIUM_YEARLY,
    },
    COLOR: "primary",
    SUBTEXT: "Asterisk with Cancel subscription at any time",
  },
  {
    TITLE: "Premium",
    ALIAS: "With",
    HEADING: "Premium",
    SUB_HEADING: "Best option for individual developers looking to speed up their development.",
    FEATURES_LIST: [
      "Unlimited component generations",
      "Unlimited components monthly",
      "Unlimited component iterations/updates",
      "Custom Theming",
      "Private generations",
      "Data Privacy assurance",
      "Flexible Commercial Terms",
    ],
    BUTTON: "Start Free Trial",
    PRICING: {
      MONTHY: "39",
      YEARLY: "369",
    },
    SUBSCRIPTION_SCHEME: {
      MONTHY: SUBSCRIPTION_PLANS.PREMIUM_MONTHLY,
      YEARLY: SUBSCRIPTION_PLANS.PREMIUM_YEARLY,
    },
    COLOR: "primary",
    db_name: "premium",
    SUBTEXT: "",
  },
  {
    TITLE: "Enterprise",
    ALIAS: "",
    HEADING: "Enterprise",
    SUB_HEADING:
      "For organizations that want to speed up their front end development with added support, security, & functionality",
    FEATURES_LIST: [
      "Unlimited generations",
      "Custom Theming",
      "Private generations",
      "VS Code Extension",
      "Add multiple users",
      "SAML SSO",
    ],
    COLOR: "primary",
    BUTTON: "Talk to Sales",
    CONTACT: "Contact Us",
    db_name: "",
    SUBTEXT: "",
  },
];

export const PRICING_BENEFITS = [
  "Unlimited generations",
  "Custom Theming",
  "Private generations",
  "VS Code Extension",
  "Add multiple users",
  "SAML SSO",
];

export const columns = [
  { Header: "List Item", accessor: "listItem" },
  { Header: "Pro", accessor: "pro" },
  { Header: "Premium", accessor: "premium" },
  { Header: "Enterprise", accessor: "enterprise" },
];
