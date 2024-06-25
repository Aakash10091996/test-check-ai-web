import type { Config } from "tailwindcss";
import { colors } from "./src/styles/colors";
import { screens } from "./src/styles/breakpoints";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        montserrat: "var(--font-montserrat)",
        openSans: "var(--font-open-sans)",
      },
      screens: screens,
      colors: colors,
      height: {
        header_height: "var(--header-height)",
        theme: "550px",
      },
      margin: {
        header_height: "var(--header-height)",
      },
      boxShadow: {
        suggestionShadow:
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
        bottomPoniter: "0px 0px 0px 0px gray",
        glow: "0 0 8px #eee",
        blue: "0px 2px 10px 4px rgba(59, 130, 246, 0.5)",
        btnSpanShadow: "0 0 35px 26px var(--shadow-color)",
      },
      width: {
        theme: "404px",
      },
      backgroundImage: () => ({
        "pricing-gradient":
          "linear-gradient(121deg, #268663 26.8%, #5780B2 49.36%, #42378D 68.58%)",
        "home-gradient-dark":
          "linear-gradient(180deg, rgba(9, 24, 62, 0.00) 0%, #09183E 51.5%, rgba(9, 24, 62, 0.03) 100%)",
        "home-gradient-light":
          "linear-gradient(180deg, rgba(245, 242, 255, 0.00) 2.83%, #F5F2FF 51.15%, rgba(245, 242, 255, 0.00) 95.75%)",
        "gradient-custom":
          "linear-gradient(180deg, rgba(245,242,255,1) 0%, rgba(245,242,255,0) 100%)",
        "gradient-custom-dark": "linear-gradient(180deg, #09183E 0%, rgba(9, 24, 62, 0.00) 100%)",
        "speed-up-gradient":
          "linear-gradient(90deg, #7366FF 56.6%, #EC787F 76.61%, #FFC170 94.26%)",
        "animated-text": "linear-gradient(90deg, #7366FF 56.6%, #AD6FC2 100%)",
        "btn-gradient-rotation":
          "linear-gradient( var(--gradient-angle) , #0D6EFD ,#ffffff40, #c0c0c0)",
        "percentage-gradient": "linear-gradient(90deg , #ED7D7E 50%, #FFC170 100%)",
        "prompting-guide-gradient-lg": "linear-gradient(23deg, #f0ac2b 50%, #1d3f86 50%)",
        "prompting-guide-gradient-md": "linear-gradient(30deg, #f0ac2b 50%, #1d3f86 50%)",
        "prompting-guide-gradient-sm": "linear-gradient(45deg, #f0ac2b 50%, #1d3f86 50%)",
        "prompting-guide-gradient-max-sm": "linear-gradient(60deg, #f0ac2b 50%, #1d3f86 50%)",
        "component-page-gradiant-dark":
          "linear-gradient(0deg, rgba(9, 24, 62, 0) 0%, rgba(9,24,62,1) 51%, rgba(9, 24, 62, 0) 100%)",
        "component-page-gradiant-light":
          "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(188,209,249,.25) 40%, rgba(188,209,249,.25) 60%, rgba(255,255,255,1) 100%)",
        sectionGradient:
          "radial-gradient(circle, rgba(38,5,91,.8) 0%, rgba(38,5,91,.3) 25%, rgba(255,255,255,.6) 50%)",
        sectionGradientDark: "radial-gradient(circle, rgba(31,10,64,1) 0%, rgba(0,0,0,1) 100%)",
        overlay: "linear-gradient(180deg, #fff 20%, transparent 100%)",
        overlayDark: "linear-gradient(180deg, #000 20%, transparent 100%)",
        overlayBottom: "linear-gradient(180deg, transparent 20%, #fff 100%)",
        overlayBottomDark: "linear-gradient(180deg, transparent 20%, #000 100%)",
        carouselLeftDark:
          "linear-gradient(270deg, rgba(5,2,11, 0) 0%, rgba(5,2,11,1) 50%, rgba(5,2,11,1) 100%)",
        carouselRightDark:
          "linear-gradient(270deg, rgba(5,2,11,1) 0%, rgba(5,2,11,1) 50%, rgba(5,2,11, 0) 100%)",
        carouselLeft:
          "linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)",
        carouselRight:
          "linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)",
      }),
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      wordWrap: {
        "word-wrap": "break-word",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        rotateAndDisappear: {
          "0%": {
            opacity: "1",
            transform: "rotate(0deg)",
          },
          "50%": {
            opacity: "0",
            transform: "rotate(180deg)",
          },
          "100%": {
            opacity: "1",
            transform: "rotate(360deg)",
          },
        },
        slideRight: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(200%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        animationOnLeave: {
          "0%": {
            "--gradient-angle": "225deg",
          },
          "100%": {
            "--gradient-angle": "45deg",
          },
        },
        animationOnHover: {
          "0%": {
            "--gradient-angle": "45deg",
          },
          "100%": {
            "--gradient-angle": "225deg",
          },
        },
      },
      animation: {
        slideLeft: "slideLeft 200s ease-in-out infinite",
        slideRight: "slideRight 200s ease-in-out infinite",
        "stars-spin": "rotateAndDisappear 2s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.2s ease-out forwards",
        animationOnLeave: "animationOnLeave 1.3s forwards",
        animationOnHover: "animationOnHover .75s forwards",
      },
      transitionDuration: {
        "5000": "5000ms",
        "3000": "3000ms",
      },
    },
  },
  variants: {
    extend: {
      translate: ["group-hover"], // Enable translate for group hover state
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
