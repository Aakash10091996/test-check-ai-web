export const CODE_DOWNLOAD_TYPES = {
  Individual: "individual",
  All: "all",
};

export const MIXPANEL_EVENTS = {
  // auth
  LOGIN_CLICK: "login_click",
  LOGIN_START: "login_start",
  LOGIN_SUCCESS: "login_success",
  SIGNUP_CLICK: "signup_click",
  SIGNUP_START: "signup_start",
  SIGNUP_SUCCESS: "signup_success",
  SIGNOUT_CLICK: "signout_click",

  VS_DOWNLOAD_CLICK: "vsdownload_click",
  COMPONENT_CLICK: "component_click",
  CODE_COPY: "code_copy",
  FRAMEWORK_SELECT: "framework_select",
  COMPONENT_VIEWPORT: "component_viewport",
  TUTORIAL_CLICK: "start_tour",

  // theme
  THEME_CLICK: "theme_click",
  THEME_SAVE: "theme_save",
  THEME_CREATE: "theme_create",
  THEME_UPLOAD: "uploadtheme_click",
  THEME_CUSTOMIZE: "customizetheme_click",
  CARD_SAVE: "card_save",
  TRIAL_START: "trial_start",
  THANKYOU_PAGE: "thankyou_page",

  // ai
  AIGENERATE_CLICK: "aigenerate_click",
  AIGENERATE_SUCCESS: "aigenerate_success",
  PROMPT_UPDATE: "prompt_update",
  VERSION_CLICK: "version_click",
  HISTORYTAB_DISPLAY: "historytab_display",
  CANVAS_CLICK: "canvas_click",
  CODE_CLICK: "code_click",
  NEWCOMPONENT_CLICK: "newcomponent_click",

  // tabs
  BROWSE_COMPONENTS_CLICK: "browsecomponents_click",
} as const;

export const BLOCK_USER_AGENT = {
  USER_AGENT_1: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0",
};
