import { PORT, PROTOCOL, HOSTNAME, API_VERSION_URL } from "@/config/constants";
import { CustomFetch } from "@/utils";
import type { RequestConfig, ResponseData } from "@/utils";
import Cookies from "js-cookie";
const baseUrl = PORT
  ? `${PROTOCOL}://${HOSTNAME}:${PORT}/${API_VERSION_URL}`
  : `${PROTOCOL}://${HOSTNAME}/${API_VERSION_URL}`;

// Usage example:
const apiClient = new CustomFetch(baseUrl);

// Add request interceptor
apiClient.requestInterceptor((config: RequestConfig) => {
  // Modify the config here
  const sessionToken: string | undefined = Cookies.get("__session");

  config.headers.Authorization = `Bearer ${sessionToken ?? ""}`;
  if (
    (typeof localStorage !== "undefined" && config.url.includes("/chat-ai")) ||
    config.url.includes("components-ai")
  ) {
    config.headers.guestUserId = localStorage.getItem("guestId") ?? "";
  }

  return config;
});

// Add response interceptor
apiClient.responseInterceptor((data: ResponseData<unknown>) => {
  // Modify the data here
  if (data?.message) {
    // console.log("Response message:", data.message);
  }
  return data;
});

// Now when you make requests, the interceptors will be applied

export default apiClient;
