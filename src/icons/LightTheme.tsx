import React from "react";

function DarkThemeIcon() {
  return (
    <svg
      width="24"
      height="24"
      className="absolute size-[1.2rem] scale-0 transition-all duration-700 dark:scale-100 dark:stroke-[#fff] dark:hover:fill-yellow dark:hover:stroke-yellow"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22L12 21M12 3L12 2M4.92892 19.0711L5.63603 18.364M18.364 5.63605L19.0711 4.92894M2 12L3 12M21 12L22 12M4.92896 4.92894L5.63606 5.63605M18.364 18.364L19.0711 19.0711M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default DarkThemeIcon;
