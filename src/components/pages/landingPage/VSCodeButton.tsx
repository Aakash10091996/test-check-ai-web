"use client";

import { VSCODE_MARKETPLACE_URL, VSCODE_Unique_Identifier } from "@/config/constants";
import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
import { trackMixpanelEvent } from "@/mixpanel/mixpanel";
import type { ReactNode } from "react";

function VSCodeButton({ children }: { children: ReactNode }) {
  const handleVSCodeRedirection = () => {
    trackMixpanelEvent(MIXPANEL_EVENTS.VS_DOWNLOAD_CLICK, {});
    const url = `${VSCODE_MARKETPLACE_URL}${VSCODE_Unique_Identifier}`;
    window.open(url, "_blank");
  };

  return (
    <div className="inline-block cursor-pointer" onClick={handleVSCodeRedirection}>
      {children}
    </div>
  );
}

export default VSCodeButton;
