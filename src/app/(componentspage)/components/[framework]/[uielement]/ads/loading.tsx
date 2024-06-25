import React from "react";

function Loading() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex size-28 animate-spin items-center justify-center rounded-full border-8 border-greyOverlay border-t-primary text-4xl text-primary"></div>
    </div>
  );
}

export default Loading;
