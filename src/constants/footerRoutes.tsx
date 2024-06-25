import {} from "@/icons";
import FacebookIcon from "@/icons/Facebook";
// import InstagramIcon from "@/icons/Instagram";
import LinkedInIcon from "@/icons/LinkedIn";
import TwitterIcon from "@/icons/Twitter";
// import YoutubeIcon from "@/icons/Youtube";
import type { RouteItem } from "@/constants";
import AppleIcon from "@/icons/Apple";
import PlaystoreIcon from "@/icons/Playstore";

export const FooterFollowIcons: RouteItem[] = [
  {
    id: 1,
    href: "https://twitter.com/generatecode",
    name: "Twitter",
    icon: <TwitterIcon />,
  },
  {
    id: 2,
    href: "https://www.linkedin.com/company/purecodesoftwarecompany",
    name: "LinkedIn",
    icon: <LinkedInIcon />,
  },
  {
    id: 3,
    href: "https://www.facebook.com/people/PureCode-Software/100064367730786/",
    name: "Facebook",
    icon: <FacebookIcon />,
  },
  // {
  //   id: 4,
  //   href: "/",
  //   name: "Instagram",
  //   icon: <InstagramIcon />,
  // },
  // {
  //   id: 5,
  //   href: "/",
  //   name: "Youtube",
  //   icon: <YoutubeIcon />,
  // },
];

export const FooterMobileApp: RouteItem[] = [
  {
    id: 1,
    href: "/",
    name: "Apple",
    icon: <AppleIcon />,
  },
  {
    id: 2,
    href: "/",
    name: "Playstore",
    icon: <PlaystoreIcon />,
  },
];

export const FooterLinks = [
  {
    name: "Components",
    links: [
      { title: "Tailwind Forms", link: "/components/tailwind/Form-Layout" },
      { title: "MUI Card", link: "/components/mui/Card" },
      { title: "MUI Form", link: "/components/mui/Form-Layout" },
      { title: "MUI Modal", link: "/components/mui/Modal" },
      { title: "MUI Header", link: "/components/mui/Header" },
      { title: "Tailwind Header", link: "/components/tailwind/Header" },
    ],
  },
  {
    name: "UI Elements",
    links: [
      { title: "Tailwind Button", link: "/uielements/tailwind/Button" },
      { title: "MUI Button", link: "/uielements/mui/Button" },
      { title: "MUI Table", link: "/uielements/mui/Table" },
      { title: "MUI Textfield", link: "/uielements/mui/Text-Field" },
      { title: "Tailwind Table", link: "/uielements/tailwind/Table" },
      { title: "MUI Checkbox", link: "/uielements/mui/Checkbox" },
      { title: "MUI Accordion", link: "/uielements/mui/Accordion" },
    ],
  },
  {
    name: "Frameworks",
    links: [
      { title: "Tailwind", link: "/tailwind" },
      { title: "MUI", link: "/mui" },
      { title: "CSS", link: "/css" },
    ],
  },

  {
    name: "Popular Blogs",
    links: [
      { title: "How to use Tailwind Config", link: "/blogs/tailwind-config/" },
      { title: "How to create a Tailwind Dropdown", link: "/blogs/tailwind-dropdown/" },
      { title: "Steps to Make Beautiful Tailwind Cards", link: "/blogs/tailwind-cards/" },
      { title: "All you need to know about Tailwind Buttons", link: "/blogs/tailwind-button/" },
      { title: "MUI Typography tutorial", link: "/blogs/material-ui-typography/" },
      { title: "Ultimate CSS Button generator", link: "/blogs/css-button-generator/" },
      { title: "MUI popper components", link: "/blogs/mui-popper/" },
    ],
  },
];

export const FooterTerms = {
  label:
    "Copyright PureCode AI 2024. All rights reserved. Read Terms of Service and Privacy Policy.",
  sublabel: ". All rights reserved. Read",
  termsAndServices: " Terms of Service",
  privacyPolicy: "Privacy Policy",
};

export const OtherFooterLinks = [
  "Legal",
  "Privacy Policy",
  "Security",
  "Sitemap",
  "Cookies Preferences",
];
