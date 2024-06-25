/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

export const setToLocalStorage = <T>(label: string, data: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(label, JSON.stringify(data));
  }
};

export const getFromLocalStorage = <T>(label: string): T | null => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(label);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        return item as T;
      }
    }
  }
  return null;
};

export const getToken = (): string | undefined => {
  if (typeof window !== "undefined") {
    return Cookies.get("__session") ?? undefined;
  }
  return undefined;
};

export const removeFromLocalStorage = (label: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(label);
  }
};

export const clearClerkSessionCookie = () => {
  // Set the cookie's value to an empty string
  document.cookie = "__session=; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/;";

  console.log("Clerk session cookie cleared.");
};
