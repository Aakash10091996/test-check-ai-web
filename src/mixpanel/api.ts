import apiClient from "@/config/apiClient";
import type { ApiResponse } from "@/mixpanel/types";

const ANALYTICS_URL = `/analytics`;

export const analyticsApi = {
  checkIfIpBlocked: async (): Promise<ApiResponse> => {
    return apiClient
      .get<ApiResponse>(`${ANALYTICS_URL}/verifyIpBlocked`)
      .then((response) => response.data!)
      .catch((error: unknown) => {
        console.error("Failed to fetch or parse the response: ", error);
        throw new Error("Failed to fetch or parse the response");
      });
  },
};
