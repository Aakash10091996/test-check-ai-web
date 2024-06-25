import { useState, useEffect } from "react";

// Custom hook to check if the current viewport matches a specified media query
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Function to update the matches state based on the media query
    const updateMatches = () => {
      setMatches(window.matchMedia(query).matches);
    };

    // Initial update
    updateMatches();

    // Add event listener for window resize
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", updateMatches);

    // Cleanup event listener on component unmount
    return () => mediaQueryList.removeEventListener("change", updateMatches);
  }, [query]); // Re-run the effect if the query changes

  return matches;
}

export default useMediaQuery;
