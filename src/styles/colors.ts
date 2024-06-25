const hsl = (hslVariableString: string) => `hsl(var(${hslVariableString}))`;
const hsla = (hslVariableString: string) => `hsla(var(${hslVariableString}))`;

export const colors = {
  black: hsl("--black"),
  white: hsl("--white"),
  "theme-background": hsl("--theme-background"),
  "theme-custom-button": hsl("--theme-custom-button"),
  "theme-custom-selected": hsl("--theme-custom-selected"),
  "theme-cancel-button": hsl("--theme-cancel-button"),
  // ----demo color
  iconBlueCustom: "#3585FD",
  mycolor: {
    DEFAULT: hsl("--mycolor"),
    foreground: hsl("--mycolor-foreground"),
  },

  border: hsl("--border"),
  input: hsl("--input"),
  ring: hsl("--ring"),
  footer: hsl("--footer"),
  tailwind: hsl("--tailwind-blue"),
  background: hsl("--background"),
  foreground: hsl("--foreground"),
  primary: {
    DEFAULT: hsl("--primary"),
    foreground: hsl("--primary-foreground"),
  },
  secondary: {
    DEFAULT: hsl("--secondary"),
    foreground: hsl("--secondary-foreground"),
  },
  error: {
    DEFAULT: hsl("--error"),
    foreground: hsl("--error-foreground"),
  },
  muted: {
    DEFAULT: hsl("--muted"),
    foreground: hsl("--muted-foreground"),
  },
  accent: {
    DEFAULT: hsl("--accent"),
    foreground: hsl("--accent-foreground"),
  },
  popover: {
    DEFAULT: hsl("--popover"),
    foreground: hsl("--popover-foreground"),
  },
  card: {
    DEFAULT: hsl("--card"),
    foreground: hsl("--card-foreground"),
  },
  annual: {
    DEFAULT: hsl("--pricing-annual"),
    foreground: hsl("--pricing-annual"),
  },

  lightBlueText: {
    DEFAULT: hsl("--lightBlue-text"),
  },

  darkGreyText: {
    DEFAULT: hsl("--darkGrey-text"),
    foreground: hsl("--grey-text"),
  },

  mediumGreyText: {
    DEFAULT: hsl("--mediumGrey-text"),
    foreground: hsl("--grey-text"),
  },

  lightGreyText: {
    DEFAULT: hsl("--lightGrey-text"),
    foreground: hsl("--grey-text"),
  },
  extraLightGreyText: {
    DEFAULT: hsl("--extralightGrey-text"),
    foreground: hsl("--grey-text"),
  },

  iconBlue: {
    DEFAULT: hsl("--mobileicons-blue"),
  },
  output: {
    DEFAULT: hsl("--output"),
    foreground: hsl("--output-foreground"),
  },
  logoPurple: {
    DEFAULT: hsl("--logo-purple"),
  },
  heroSecYellow: {
    DEFAULT: hsl("--hero-sec-yellow"),
  },
  heroSecPink: {
    DEFAULT: hsl("--hero-sec-pink"),
  },
  lightGrayBackground: {
    DEFAULT: hsl("--light-gray-background"),
  },
  testimonialText: {
    DEFAULT: hsl("--testimonial-text"),
  },
  breadcrumbGrey: {
    DEFAULT: hsl("--breadcrumb-grey"),
    foreground: hsl("--breadcrumb-arrow"),
  },
  lightGray: {
    DEFAULT: hsl("--light-grey-text"),
  },
  lightBlack: {
    DEFAULT: hsl("--light-black-text"),
  },
  lightGrayBg: {
    DEFAULT: hsl("--light-grey-bg"),
  },
  lightGrayBorder: {
    DEFAULT: hsl("--light-grey-border"),
  },
  lightSecGray: {
    DEFAULT: hsl("--light-grey-sec-text"),
  },
  likeEmojiGray: {
    DEFAULT: hsl("--like-emoji-grey"),
  },
  likeEmojiHoverGray: {
    DEFAULT: hsl("--like-emoji-hover-grey"),
  },
  likeEmojiStrokeBlue: {
    DEFAULT: hsl("--like-emoji-stroke-blue"),
  },
  likeEmojiStrokeBlueSelected: {
    DEFAULT: hsl("--like-emoji-stroke-blue-selected"),
  },
  boxShadow: {
    DEFAULT: hsl("--box-shadow"),
  },
  primaryBoxShadow: {
    DEFAULT: hsl("--primary-box-shadow"),
  },
  breadcrumbGreyText: {
    DEFAULT: hsl("--breadcrumb-grey-text"),
  },
  darkGrayText: {
    DEFAULT: hsl("--dark-gray-text"),
  },
  whiteSecText: {
    DEFAULT: hsl("--white-sec-text"),
    foreground: hsl("--white-sec-foreground-text"),
  },
  darkBlueBg: {
    DEFAULT: hsl("--dark-blue-bg"),
    foreground: hsl("--dark-blue-card-bg"),
  },
  lightBlueBg: {
    DEFAULT: hsl("--light-blue-bg"),
    foreground: hsl("--light-blue-card-bg"),
  },
  landingBg: {
    DEFAULT: hsl("--landing-bg"),
  },
  lightBlueBorder: {
    DEFAULT: hsl("--light-blue-border"),
    foreground: hsl("--light-blue-border-variant"),
  },
  blackShadeText: {
    DEFAULT: hsl("--black-shade-text"),
  },
  blueOverlay: {
    DEFAULT: hsl("--blue-overlay"),
  },
  greyOverlay: {
    DEFAULT: hsl("--grey-overlay"),
  },
  purpleGradient: {
    DEFAULT: hsl("--purple-gradient"),
  },
  redGradient: {
    DEFAULT: hsl("--red-gradient"),
  },
  yellowGradient: {
    DEFAULT: hsl("--yellow-gradient"),
  },
  greyWhite: {
    DEFAULT: hsl("--grey-white"),
    foreground: hsl("--grey-white-variant"),
  },
  pureBlack: {
    DEFAULT: hsl("--pure-black"),
    foreground: hsl("--black-variant"),
  },
  blackVariant: {
    DEFAULT: hsl("--black-variant-border"),
    foreground: hsl("--black-variant-sec-border"),
  },
  backgroundGradient: {
    DEFAULT: hsl("--backgroundGradient"),
  },
  monacoBg: {
    DEFAULT: hsl("--monaco-bg"),
  },
  pricingCard: {
    DEFAULT: hsl("--pricing-card"),
  },
  pricingPoweredText: {
    DEFAULT: hsl("--pricing-powered-text"),
  },
  success: hsl("--success"),
  warning: hsl("--warning"),

  //BLUE
  blue50: hsl("--blue-50"),
  blue100: hsl("--blue-100"),
  blue200: hsl("--blue-200"),
  blue300: hsl("--blue-300"),
  blue400: hsl("--blue-400"),
  blue500: hsl("--blue-500"),
  blue600: hsl("--blue-600"),
  blue700: hsl("--blue-700"),
  blue800: hsl("--blue-800"),
  blue900: hsl("--blue-900"),
  blue900_02: hsla("--blue-900-02"),

  //INDIGO
  indigo: hsl(" --indigo"),
  indigo50: hsl(" --indigo-50"),
  indigo100: hsl(" --indigo-100"),
  indigo200: hsl(" --indigo-200"),
  indigo300: hsl(" --indigo-300"),
  indigo400: hsl(" --indigo-400%"),
  indigo500: hsl(" --indigo-500"),
  indigo600: hsl(" --indigo-600"),
  indigo700: hsl(" --indigo-700"),
  indigo800: hsl(" --indigo-800"),
  indigo900: hsl(" --indigo-900"),

  //PURPLE
  purple: hsl("--purple"),
  purple50: hsl("--purple-50"),
  purple100: hsl("--purple-100"),
  purple200: hsl("--purple-200"),
  purple300: hsl("--purple-300"),
  purple400: hsl("--purple-400"),
  purple500: hsl("--purple-500"),
  purple600: hsl("--purple-600"),
  purple700: hsl("--purple-700"),
  purple800: hsl("--purple-800"),
  purple900: hsl("--purple-900"),

  pink: hsl("--pink"),
  pink50: hsl("--pink-50"),
  pink100: hsl("--pink-100"),
  pink200: hsl("--pink-200"),
  pink300: hsl("--pink-300"),
  pink400: hsl("--pink-400"),
  pink500: hsl("--pink-500"),
  pink600: hsl("--pink-600"),
  pink700: hsl("--pink-700"),
  pink800: hsl("--pink-800"),
  pink900: hsl("--pink-900"),

  red: hsl("--red"),
  red50: hsl("--red-50"),
  red100: hsl("--red-100"),
  red200: hsl("--red-200"),
  red300: hsl("--red-300"),
  red400: hsl("--red-400"),
  red500: hsl("--red-500"),
  red600: hsl("--red-600"),
  red700: hsl("--red-700"),
  red800: hsl("--red-800"),
  red900: hsl("--red-900"),

  orange: hsl("--orange"),
  orange50: hsl("--orange-50"),
  orange100: hsl("--orange-100"),
  orange200: hsl("--orange-200"),
  orange300: hsl("--orange-300"),
  orange400: hsl("--orange-400"),
  orange500: hsl("--orange-500"),
  orange600: hsl("--orange-600"),
  orange700: hsl("--orange-700"),
  orange800: hsl("--orange-800"),
  orange900: hsl("--orange-900"),

  yellow: hsl("--yellow"),
  yellow50: hsl("--yellow-50"),
  yellow100: hsl("--yellow-100"),
  yellow200: hsl("--yellow-200"),
  yellow300: hsl("--yellow-300"),
  yellow400: hsl("--yellow-400"),
  yellow500: hsl("--yellow-500"),
  yellow600: hsl("--yellow-600"),
  yellow700: hsl("--yellow-700"),
  yellow800: hsl("--yellow-800"),
  yellow900: hsl("--yellow-900"),

  green: hsl("--green"),
  green50: hsl("--green-50"),
  green100: hsl("--green-100"),
  green200: hsl("--green-200"),
  green300: hsl("--green-300"),
  green400: hsl("--green-400"),
  green500: hsl("--green-500"),
  green600: hsl("--green-600"),
  green700: hsl("--green-700"),
  green800: hsl("--green-800"),
  green900: hsl("--green-900"),

  teal: hsl("--teal"),
  teal50: hsl("--teal-50"),
  teal100: hsl("--teal-100"),
  teal200: hsl("--teal-200"),
  teal300: hsl("--teal-300"),
  teal400: hsl("--teal-400"),
  teal500: hsl("--teal-500"),
  teal600: hsl("--teal-600"),
  teal700: hsl("--teal-700"),
  teal800: hsl("--teal-800"),
  teal900: hsl("--teal-900"),

  cyan: hsl("--cyan"),
  cyan50: hsl("--cyan-50"),
  cyan100: hsl("--cyan-100"),
  cyan200: hsl("--cyan-200"),
  cyan300: hsl("--cyan-300"),
  cyan400: hsl("--cyan-400"),
  cyan500: hsl("--cyan-500"),
  cyan600: hsl("--cyan-600"),
  cyan700: hsl("--cyan-700"),
  cyan800: hsl("--cyan-800"),
  cyan900: hsl("--cyan-900"),

  black100: hsl("--black-100"),
  black200: hsl("--black-200"),
  black300: hsl("--black-300"),
  black400: hsl("--black-400"),
  black500: hsl("--black-500"),
  black600: hsl("--black-600"),
  black700: hsl("--black-700"),
  black800: hsl("--black-800"),
  black900: hsl("--black-900"),
  bgFab: {
    DEFAULT: hsl("--bg-fab"),
  },
  bgCodeEditor: {
    DEFAULT: hsl("--bg-code-editor"),
  },
  editorActiveTab: {
    DEFAULT: hsl("--editor-active-tab"),
  },
  uiLibSelect: {
    DEFAULT: hsl("--uiLibSelect"),
  },
  uiLibSelectHover: {
    DEFAULT: hsl("--uiLibSelectHover"),
  },
  labelText: {
    DEFAULT: hsl("--labelText"),
    foreground: hsl("--greyLabelText"),
  },
  inputBox: {
    DEFAULT: hsl("--input-bg"),
    foreground: hsl("--input-border"),
  },
  blackVariantBg: {
    DEFAULT: hsl("--black-variant-bg"),
  },
  orangeBg: {
    DEFAULT: hsl("--orange-bg"),
    foreground: hsl("--orange-light-bg"),
  },
  greyLabelText: {
    DEFAULT: hsl("--greyLabelText"),
    foreground: hsl("--grey-label-text-variant"),
  },
  blueBgVariant: {
    DEFAULT: hsl("--blue-bg-variant"),
    foreground: hsl("--blue-bg-variant-sec"),
  },
  purpleBgVariant: {
    DEFAULT: hsl("--purple-bg-variant"),
  },
  lightBorder: {
    DEFAULT: hsl("--light-border"),
  },
  blackBgVariant: {
    DEFAULT: hsl("--black-bg-variant"),
    foreground: hsl("--black-bg-sec-variant"),
  },
  blackBgNewVariant: {
    DEFAULT: hsl("--black-bg-new-variant"),
    foreground: hsl("--black-bg-new-variant-sec"),
  },
  errorVariant: {
    DEFAULT: hsl("--error-variant"),
  },
  buttonGrey: {
    DEFAULT: hsl("--button-grey"),
  },
  buttonGreyLight: {
    DEFAULT: hsl("--button-grey-light"),
  },
  aiBackground: {
    DEFAULT: hsl("--ai-background"),
  },
  aiBackgroundDark: {
    DEFAULT: hsl("--ai-background-dark"),
  },
  textColorBase: {
    DEFAULT: hsl("--text-color-base"),
  },
  promptBackground: {
    DEFAULT: hsl("--prompt-background"),
  },
  "yellow500/20": {
    DEFAULT: hsla("--yellow500-20"),
  },
  componentcard: {
    DEFAULT: hsl("--component-card"),
  },
};
