import React from "react";

function Overlay() {
  return (
    <>
      <div className="absolute top-0 block h-10 w-full bg-overlay dark:bg-overlayDark lg:h-20" />
      <div className="absolute -top-10 block h-10 w-full bg-overlayBottom dark:bg-overlayBottomDark lg:-top-20 lg:h-20" />
      <div className="absolute bottom-0 block h-10 w-full bg-overlayBottom dark:bg-overlayBottomDark lg:h-20" />
      <div className="absolute -bottom-10 block h-10 w-full bg-overlay dark:bg-overlayDark lg:-bottom-20 lg:h-20" />
    </>
  );
}

export default Overlay;
