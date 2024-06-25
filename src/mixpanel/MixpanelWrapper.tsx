"use client";

import { useHotjar } from "@/hooks/Hotjar";
import { useMixpanel } from "@/mixpanel/mixpanel";

function MixpanelWrapper({ children: children }: { children: React.ReactNode }) {
  const isMixpanelInitiated = useMixpanel();
  useHotjar(isMixpanelInitiated);

  // const pathname = usePathname();

  // useEffect(() => {
  //   if (isMixpanelInitiated && pathname) {
  //     const pageUrl = `${pathname}${window.location.search ? `?${window.location.search}` : ""}`;
  //     trackMixPanelpageView({ page: pageUrl });
  //   }
  // }, [isMixpanelInitiated, pathname]);

  return children;
}

export default MixpanelWrapper;
