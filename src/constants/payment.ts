import type { Appearance } from "@stripe/stripe-js";

export const appearance: Appearance = {
  theme: "night",
  variables: {
    borderRadius: "6px",
    fontSizeSm: "13px",
    gridRowSpacing: "15px",
  },
};

export const fonts = [
  {
    cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
  },
];
