import { useState, useEffect } from "react";

/**
 * Custom hook to check if any elements with the specified selector are in view when scrolled
 * and returns a boolean value.
 *
 * @param {string} selector - The selector string used to query elements.
 * @returns {boolean} - Returns true if any elements with the specified selector are in view, otherwise returns false.
 *
 * @example
 * // In your component file
 * import React from 'react';
 * import useElementInView from './useElementInView';
 *
 * const YourComponent = () => {
 *   const isInView = useElementInView('[data-in-view="ai-input"]');
 *
 *   return (
 *     <div>
 *       <div data-in-view="ai-input">Element 1</div>
 *       <div data-in-view="ai-input">Element 2</div>
 *       <div data-in-view="ai-input">Element 3</div>
 *       <div>
 *         Elements are {isInView ? 'in view' : 'not in view'}
 *       </div>
 *     </div>
 *   );
 * };
 */
export const useElementInView = (selector: string): boolean => {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        const anyInView = entries.some((entry) => entry.isIntersecting);
        setIsInView(anyInView);
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [selector]);

  return isInView;
};
