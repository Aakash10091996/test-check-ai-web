import { useEffect, useState } from "react";
import Hotjar from "@hotjar/browser";
import { NODE_ENV } from "@/config/constants";

export const useHotjar = (isMixpanelInitiated: boolean) => {
  const [isHotjarInitiated, setIsHotjarInitiated] = useState(false);

  useEffect(() => {
    if (
      NODE_ENV === "production" &&
      !isHotjarInitiated &&
      isMixpanelInitiated &&
      navigator.userAgent !== "Googlebot"
    ) {
      Hotjar.init(3719365, 6);
      setIsHotjarInitiated(true);
    }
  }, [isMixpanelInitiated]);
};
