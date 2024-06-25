/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";

import { MIXPANEL_EVENTS } from "@/mixpanel/constant";
// import { BLOCK_USER_AGENT } from "@/mixpanel/constant";
import type { ApiResponse } from "@/mixpanel/types";
import { analyticsApi } from "@/mixpanel/api";
import { MIXPANEL_PROXY_URL, MIXPANEL_TOKEN, NODE_ENV } from "@/config/constants";
import type { MixPanelData } from "@/mixpanel/types";

let isClientBlocked = false;

declare global {
  interface Window {
    mixpanel: typeof mixpanel;
  }
}

export const useMixpanel = () => {
  const [isMixpanelInitiated, setIsMixpanelInitiated] = useState(false);

  useEffect(() => {
    if (MIXPANEL_TOKEN) {
      // const userAgentBotTest = navigator.userAgent;
      // if (userAgentBotTest === BLOCK_USER_AGENT.USER_AGENT_1) {
      //   setIsMixpanelInitiated(false);
      //   isClientBlocked = true;
      //   return;
      // }

      analyticsApi
        .checkIfIpBlocked()
        .then((response: ApiResponse) => {
          isClientBlocked = response.isBlocked;
          if (!isClientBlocked) {
            mixpanel.init(MIXPANEL_TOKEN!, {
              api_host: MIXPANEL_PROXY_URL!,
              debug: NODE_ENV === "development",
              track_pageview: "full-url",
              persistence: "localStorage",
              ignore_dnt: true,
            });
            window.mixpanel = mixpanel;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const isBlockedByMp = (mixpanel as any)?._?.isBlockedUA(navigator.userAgent);
            mixpanel.register({
              "Client IP": response.ipTocheck,
              "User Agent": navigator.userAgent,
            });
            if (!isBlockedByMp) {
              setIsMixpanelInitiated(true);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return isMixpanelInitiated;
};

const onlyExecuteIfMixPanelPresent = <T extends any[]>(func: (...args: T) => void) =>
  MIXPANEL_TOKEN && !isClientBlocked
    ? (...args: T) => {
        try {
          func(...args);
        } catch (error) {
          console.log("Mixpanel error", error);
        }
      }
    : // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {};

export const identifyMixPanleUser = onlyExecuteIfMixPanelPresent((userId: string | undefined) => {
  mixpanel.identify(userId);
});

export const trackMixPanelpageView = onlyExecuteIfMixPanelPresent(
  (data: Record<string, string>) => {
    mixpanel.track("$mp_web_page_view", data);
  }
);

export const updateMixPanelUser = onlyExecuteIfMixPanelPresent((data: MixPanelData) => {
  mixpanel.people.set(data);
});

export const logoutEvent = onlyExecuteIfMixPanelPresent(() => {
  mixpanel.track(MIXPANEL_EVENTS.SIGNOUT_CLICK, {});
  mixpanel.reset();
});

export const resetMixpanel = onlyExecuteIfMixPanelPresent(() => {
  mixpanel.reset();
});

export const updateUserInMixpanel = (userData: MixPanelData) => {
  updateMixPanelUser({
    id: userData?.id,
    $email: userData?.email,
    name: `${userData?.first_name}${userData?.last_name ? ` ${userData?.last_name}` : ""}`,
    first_name: userData?.first_name,
    last_name: userData?.last_name,
  });
};

export const processLoginSuccessInMixPanel = onlyExecuteIfMixPanelPresent(
  (userData: MixPanelData) => {
    identifyMixPanleUser(userData?.id);
    trackMixpanelEvent(MIXPANEL_EVENTS.LOGIN_SUCCESS, {
      email: userData?.email,
      userId: userData?.id,
      name: userData?.name,
    });
    updateUserInMixpanel(userData);
  }
);

type EventData = Record<string, any>;

export const trackMixpanelEvent = (
  eventType: (typeof MIXPANEL_EVENTS)[keyof typeof MIXPANEL_EVENTS],
  data: EventData
) => {
  const executeTracking = onlyExecuteIfMixPanelPresent((data: EventData) => {
    mixpanel.track(eventType, data);
  });

  executeTracking(data);
};
