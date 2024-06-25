import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type UseRouteMatch = (routes: string[]) => boolean;
/**
 * Hook to check if the current pathname matches any of the specified routes.
 *
 * @typedef {function(string[]): boolean} UseRouteMatch
 * @param {string[]} routes - Array of route strings to match against the current pathname.
 * @returns {boolean} - Returns true if the current pathname matches any of the specified routes, false otherwise.
 *
 * @example
 * // Usage
 * const isMatch = useRouteMatch(['/dashboard', '/dashboard/post']);
 * if (isMatch) {
 *   // Do something if the route matches
 * }
 */

export const useRouteMatch: UseRouteMatch = (routes) => {
  const pathname = usePathname();
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (pathname) {
      const pathArray = pathname.split("/").filter(Boolean);
      const match = routes.some((route) => pathArray.includes(route));
      setIsMatch(match);
    }
  }, [pathname, routes]);

  return isMatch;
};
