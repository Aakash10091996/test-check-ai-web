import type { RefObject } from "react";
import { useState, useEffect } from "react";

/**
 * Custom hook that tracks the scroll position of an HTMLElement or the window,
 * checks if it has scrolled beyond a specified limit, and determines if the user is actively scrolling.
 *
 * @param {RefObject<HTMLElement>} ref - A React ref object pointing to the target element to monitor for scroll events. If null, the window is used.
 * @param {number} limit - The pixel threshold after which `isScrolled` should return `true`.
 * @returns {{scrollPosition: number; isScrolled: boolean; isScrolling: boolean;}} An object where the first element is the current scroll position, the second element is a boolean indicating whether the scroll position has exceeded the specified limit, and the third element is a boolean indicating if the user is actively scrolling.
 *
 * @example
 * ```tsx
 * import React, { useRef } from 'react';
 * import useScrolled from './useScrolled';
 *
 * const ScrollComponent: React.FC = () => {
 *   const scrollRef = useRef<HTMLDivElement>(null);
 *   const { scrollPosition, isScrolled, isScrolling } = useScrolled(scrollRef, 100);
 *
 *   return (
 *     <div ref={scrollRef} style={{ height: '200px', overflow: 'auto' }}>
 *       <div style={{ height: '500px' }}>
 *         Scroll down to see more content and check the scroll position!
 *       </div>
 *       <p>Scroll Position: {scrollPosition}px</p>
 *       {isScrolled && <p>You have scrolled more than 100 pixels!</p>}
 *       {isScrolling ? <p>User is actively scrolling</p> : <p>User is not scrolling</p>}
 *     </div>
 *   );
 * }
 *
 * export default ScrollComponent;
 * ```
 */

function useScrolled(
  ref: RefObject<HTMLElement> | null,
  limit: number
): {
  scrollPosition: number;
  isScrolled: boolean;
  isScrolling: boolean;
} {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const newScrollPosition = ref?.current?.scrollTop ?? window.scrollY;
      setScrollPosition(newScrollPosition);
      setIsScrolled(newScrollPosition > limit);
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // Adjust the delay as needed
    };

    const element = ref?.current ?? window;
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [ref, limit]);

  return { scrollPosition, isScrolled, isScrolling };
}

export default useScrolled;
