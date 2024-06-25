import type { MutableRefObject } from "react";

/**
 * Defines the type for the scroll behavior.
 * @typedef {"auto" | "smooth"} ScrollBehavior
 */
type ScrollBehavior = "auto" | "smooth";

/**
 * Defines the logical positions for scrolling.
 * @typedef {"start" | "center" | "end" | "nearest"} ScrollLogicalPosition
 */
type ScrollLogicalPosition = "start" | "center" | "end" | "nearest";

/**
 * Defines the possible types for the scroll target.
 * @typedef {number | HTMLElement | MutableRefObject<HTMLElement | null>} ScrollTarget
 */
type ScrollTarget = number | HTMLElement | MutableRefObject<HTMLElement | null>;

/**
 * Interface for optional scroll behavior and logical positions for block and inline scrolling.
 * @interface ScrollOptions
 * @property {ScrollBehavior} [behavior] - The scroll behavior, can be "auto" or "smooth".
 * @property {ScrollLogicalPosition} [block] - The vertical alignment, can be "start", "center", "end", or "nearest".
 * @property {ScrollLogicalPosition} [inline] - The horizontal alignment, can be "start", "center", "end", or "nearest".
 */
interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

/**
 * Type definition for the custom hook function.
 * @typedef {(containerRef?: MutableRefObject<HTMLElement | null>) => (target: ScrollTarget, options?: ScrollOptions) => void} UseScrollTo
 */
type UseScrollTo = (
  containerRef?: MutableRefObject<HTMLElement | null>
) => (target: ScrollTarget, options?: ScrollOptions) => void;

/**
 * Custom hook to scroll to a specific target within a container or the window.
 *
 * @param {MutableRefObject<HTMLElement | null>} [containerRef] - Reference to the container element. Defaults to window if not provided.
 * @returns {(target: ScrollTarget, options?: ScrollOptions) => void} - Function to scroll to the target with specified options.
 *
 * @example
 * import React, { useRef } from "react";
 *
 * const ExampleComponent = () => {
 *   const containerRef = useRef<HTMLElement | null>(null);
 *   const targetRef = useRef<HTMLDivElement | null>(null);
 *   const scrollTo = useScrollTo(containerRef);
 *
 *   return (
 *     <div>
 *       <div ref={containerRef} style={{ height: "200px", overflowY: "scroll", border: "1px solid black" }}>
 *         <div style={{ height: "800px" }}>
 *           <div ref={targetRef} style={{ marginTop: "600px" }}>Scroll to me</div>
 *         </div>
 *       </div>
 *       <button onClick={() => scrollTo(targetRef, { behavior: "smooth", block: "start" })}>Scroll to Target</button>
 *       <div ref={containerRef} style={{ height: "200px", overflowY: "scroll", border: "1px solid black" }}>
 *         <div style={{ height: "800px" }}>
 *           <div ref={targetRef} style={{ marginTop: "600px" }}>Scroll to me</div>
 *         </div>
 *       </div>
 *       <button onClick={() => scrollTo(0, { behavior: "smooth", block: "start" })}>Scroll to Target</button>
 *     </div>
 *   );
 * };
 *
 * export default ExampleComponent;
 *
 */
export const useScrollTo: UseScrollTo = (containerRef) => {
  /**
   * Scrolls to a specific target within the container or window.
   *
   * @param {ScrollTarget} target - The target to scroll to. It can be a number, HTMLElement, or a ref to an HTMLElement.
   * @param {ScrollOptions} [options] - The scroll options. Defaults to smooth scrolling.
   * @returns {void}
   */
  const scrollTo = (target: ScrollTarget, options: ScrollOptions = { behavior: "smooth" }) => {
    const container = containerRef?.current ?? window;

    if (typeof target === "number") {
      // Scroll to a specific position in pixels
      if (container instanceof HTMLElement) {
        container.scrollTo({
          top: target,
          behavior: options.behavior,
        });
      } else {
        container.scrollTo({
          top: target,
          behavior: options.behavior,
        });
      }
    } else if (target instanceof HTMLElement) {
      // Scroll to a specific element
      if (container instanceof HTMLElement) {
        const containerTop = container.getBoundingClientRect().top;
        const targetTop = target.getBoundingClientRect().top;
        container.scrollTo({
          top: targetTop - containerTop,
          behavior: options.behavior,
        });
      } else {
        target.scrollIntoView(options);
      }
    } else if (target?.current instanceof HTMLElement) {
      // Scroll to a specific element referenced by a ref
      if (container instanceof HTMLElement) {
        const containerTop = container.getBoundingClientRect().top;
        const targetTop = target.current.getBoundingClientRect().top;
        container.scrollTo({
          top: targetTop - containerTop,
          behavior: options.behavior,
        });
      } else {
        target.current.scrollIntoView(options);
      }
    } else {
      console.error("Invalid target provided to scrollTo function");
    }
  };

  return scrollTo;
};
