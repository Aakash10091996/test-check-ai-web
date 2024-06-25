import { useState, useEffect, useRef } from "react";

interface Options {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionInfo {
  isIntersecting: boolean;
  intersectionRatio: number;
  boundingClientRect: DOMRectReadOnly;
  intersectionRect: DOMRectReadOnly;
  rootBounds: DOMRectReadOnly | null;
  target: Element;
  time: DOMHighResTimeStamp;
}

interface UseIntersectionObserverResult {
  intersections: IntersectionInfo[];
}

/**
 * Custom hook to observe intersection changes for elements matching a selector.
 *
 * @param {string} selector - The CSS selector to target elements.
 * @param {Options} [options] - Optional settings for the Intersection Observer.
 * @param {Element | null} [options.root=null] - The element that is used as the viewport for checking visibility. Defaults to the browser viewport if not specified.
 * @param {string} [options.rootMargin='0px'] - Margin around the root element. Can have values similar to the CSS margin property, e.g., '10px 20px 30px 40px' (top, right, bottom, left).
 * @param {number | number[]} [options.threshold=0] - A single number or an array of numbers indicating at what percentage of the target's visibility the observer's callback should execute. For example, a value of 0.5 means the callback will be executed when 50% of the target is visible in the viewport.
 *
 * @returns {UseIntersectionObserverResult} - An object containing an array of intersection details.
 *
 * @example
 * // Usage example in a React component:
 * import React from 'react';
 * import useIntersectionObserver from './useIntersectionObserver';
 *
 * const MyComponent = () => {
 *   const { intersections } = useIntersectionObserver('[data-view="input"]', {
 *     root: null, // Using the viewport as the root
 *     rootMargin: '0px 0px -50px 0px', // Start checking 50px before the element enters the viewport
 *     threshold: 0.5, // Callback will be executed when 50% of the element is visible
 *   });
 *
 *   return (
 *     <div>
 *       <div style={{ height: '100vh' }}>Scroll down to see the inputs</div>
 *       <input data-view="input" style={{ margin: '100px 0' }} />
 *       <input data-view="input" style={{ margin: '100px 0' }} />
 *       <div style={{ height: '100vh' }}></div>
 *       {intersections.map((info, index) => (
 *         <div key={index}>
 *           <p>{info.isIntersecting ? 'Input is in view' : 'Input is not in view'}</p>
 *           <div>
 *             <p>Intersection Ratio: {info.intersectionRatio}</p>
 *             <p>Bounding Client Rect: {JSON.stringify(info.boundingClientRect)}</p>
 *             <p>Intersection Rect: {JSON.stringify(info.intersectionRect)}</p>
 *             {info.rootBounds && <p>Root Bounds: {JSON.stringify(info.rootBounds)}</p>}
 *             <p>Target Element: {info.target.tagName}</p>
 *             <p>Time: {info.time}</p>
 *           </div>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */
export const useIntersectionObserver = (
  selector: string,
  options: Options = {}
): UseIntersectionObserverResult => {
  const { root = null, rootMargin = "0px", threshold = 0 } = options;

  const [intersections, setIntersections] = useState<IntersectionInfo[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      console.error(`No elements found with selector: ${selector}`);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const newIntersections = entries.map((entry) => ({
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          boundingClientRect: entry.boundingClientRect,
          intersectionRect: entry.intersectionRect,
          rootBounds: entry.rootBounds,
          target: entry.target,
          time: entry.time,
        }));
        setIntersections((prevIntersections) => [...prevIntersections, ...newIntersections]);
      },
      { root, rootMargin, threshold }
    );

    observerRef.current = observer;
    elements.forEach((element) => observer.observe(element));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selector, root, rootMargin, threshold]);

  return { intersections };
};
