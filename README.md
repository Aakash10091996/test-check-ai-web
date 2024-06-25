This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
#checking for deployment

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details..

# Hooks

# useScrollTo Hook

The `useScrollTo` hook is a custom React hook that allows you to scroll to a specific target within a container or the window. It supports various scroll options for both block and inline scrolling, with the ability to use smooth scrolling behavior.

## Usage

The `useScrollTo` hook returns a function that can be used to scroll to a target. The target can be a specific position in pixels, an HTML element, or a reference to an HTML element.

### Example

Here is an example of how to use the `useScrollTo` hook in a React component:

```jsx
import React, { useRef } from "react";
import { useScrollTo } from "./path/to/useScrollTo"; // Update the path to the location of the hook

const ExampleComponent = () => {
  const containerRef = (useRef < HTMLElement) | (null > null);
  const targetRef = (useRef < HTMLDivElement) | (null > null);
  const scrollTo = useScrollTo(containerRef);

  return (
    <div>
      <div
        ref={containerRef}
        style={{ height: "200px", overflowY: "scroll", border: "1px solid black" }}
      >
        <div style={{ height: "800px" }}>
          <div ref={targetRef} style={{ marginTop: "600px" }}>
            Scroll to me
          </div>
        </div>
      </div>
      <button onClick={() => scrollTo(targetRef, { behavior: "smooth", block: "start" })}>
        Scroll to Target
      </button>
    </div>
  );
};

export default ExampleComponent;
```

### Parameters

#### `containerRef`

- **Type**: `MutableRefObject<HTMLElement | null>`
- **Description**: (Optional) Reference to the container element. If not provided, the hook will default to the window for scrolling.

#### `target`

- **Type**: `number | HTMLElement | MutableRefObject<HTMLElement | null>`
- **Description**: The target to scroll to. It can be a number representing the pixel position, an HTML element, or a reference to an HTML element.

#### `options`

- **Type**: `ScrollOptions`
- **Description**: (Optional) The scroll options, including behavior, block, and inline alignment. Defaults to smooth scrolling.
  - **Properties**:
    - `behavior`: `"auto"` | `"smooth"`
    - `block`: `"start"` | `"center"` | `"end"` | `"nearest"`
    - `inline`: `"start"` | `"center"` | `"end"` | `"nearest"`

# useRouteMatch Hook

The `useRouteMatch` hook is a custom React hook designed for use with Next.js to check if the current pathname matches any of the specified routes.

## Usage

The `useRouteMatch` hook returns a boolean value indicating whether the current pathname matches any of the specified routes.

### Example

Here is an example of how to use the `useRouteMatch` hook in a React component:

```jsx
import React from "react";
import { useRouteMatch } from "./path/to/useRouteMatch"; // Update the path to the location of the hook

const ExampleComponent = () => {
  const isMatch = useRouteMatch(["/dashboard", "/dashboard/post"]);

  return (
    <div>
      {isMatch ? (
        <p>The current route matches one of the specified routes.</p>
      ) : (
        <p>The current route does not match any of the specified routes.</p>
      )}
    </div>
  );
};

export default ExampleComponent;
```

# useIntersectionObserver

Custom hook to observe intersection changes for elements matching a selector.

## Usage

```jsx
import React from "react";
import useIntersectionObserver from "./useIntersectionObserver";

const MyComponent = () => {
  const { intersections } = useIntersectionObserver('[data-view="input"]', {
    root: null, // Using the viewport as the root
    rootMargin: "0px 0px -50px 0px", // Start checking 50px before the element enters the viewport
    threshold: 0.5, // Callback will be executed when 50% of the element is visible
  });

  return (
    <div>
      <div style={{ height: "100vh" }}>Scroll down to see the inputs</div>
      <input data-view="input" style={{ margin: "100px 0" }} />
      <input data-view="input" style={{ margin: "100px 0" }} />
      <div style={{ height: "100vh" }}></div>
      {intersections.map((info, index) => (
        <div key={index}>
          <p>{info.isIntersecting ? "Input is in view" : "Input is not in view"}</p>
          <div>
            <p>Intersection Ratio: {info.intersectionRatio}</p>
            <p>Bounding Client Rect: {JSON.stringify(info.boundingClientRect)}</p>
            <p>Intersection Rect: {JSON.stringify(info.intersectionRect)}</p>
            {info.rootBounds && <p>Root Bounds: {JSON.stringify(info.rootBounds)}</p>}
            <p>Target Element: {info.target.tagName}</p>
            <p>Time: {info.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
```

### Parameters

#### `routes`

- **Type**: `string[]`
- **Description**: An array of route strings to match against the current pathname.

### Return Value

The `useRouteMatch` hook returns a boolean value:

- **Type**: `boolean`
- **Description**: Returns `true` if the current pathname matches any of the specified routes, `false` otherwise.

## Parameters

### selector

- **Type:** `string`
- **Description:** The CSS selector used to target elements for observation.

### options

- **Type:** `Options`
- **Description:** Optional settings for the Intersection Observer.

#### Properties:

- **root**
  - **Type:** `Element | null`
  - **Default:** `null`
  - **Description:** The element that is used as the viewport for checking visibility. Defaults to the browser viewport if not specified.
- **rootMargin**
  - **Type:** `string`
  - **Default:** `'0px'`
  - **Description:** Margin around the root element. Can have values similar to the CSS margin property, e.g., `'10px 20px 30px 40px'` (top, right, bottom, left).
- **threshold**
  - **Type:** `number | number[]`
  - **Default:** `0`
  - **Description:** A single number or an array of numbers indicating at what percentage of the target's visibility the observer's callback should execute. For example, a value of 0.5 means the callback will be executed when 50% of the target is visible in the viewport.

## Return Value

The `useIntersectionObserver` hook returns an object containing the following:

### intersections

- **Type:** `IntersectionInfo[]`
- **Description:** An array of intersection details for the observed elements.

#### Properties:

- **isIntersecting**
  - **Type:** `boolean`
  - **Description:** Indicates if the target element is intersecting the root.
- **intersectionRatio**
  - **Type:** `number`
  - **Description:** The ratio of the target's visibility within the root.
- **boundingClientRect**
  - **Type:** `DOMRectReadOnly`
  - **Description:** The target element's bounding client rect.
- **intersectionRect**
  - **Type:** `DOMRectReadOnly`
  - **Description:** The target element's intersection rect.
- **rootBounds**
  - **Type:** `DOMRectReadOnly | null`
  - **Description:** The root element's bounds rect.
- **target**
  - **Type:** `Element`
  - **Description:** The target element being observed.
- **time**
  - **Type:** `DOMHighResTimeStamp`
  - **Description:** The time at which the intersection was recorded.

# useElementInView Hook

A custom React hook to check if any elements with the specified selector are in view when scrolled and returns a boolean value.

## Usage

Here's an example of how to use the `useElementInView` hook in a React component:

```jsx
import React from "react";
import { useElementInView } from "./useElementInView";

const YourComponent = () => {
  const isInView = useElementInView('[data-in-view="ai-input"]');

  return (
    <div>
      <div data-in-view="ai-input">Element 1</div>
      <div data-in-view="ai-input">Element 2</div>
      <div data-in-view="ai-input">Element 3</div>
      <div>Elements are {isInView ? "in view" : "not in view"}</div>
    </div>
  );
};

export default YourComponent;
```

## Parameters

- `selector` (string): The selector string used to query elements.

## Returns

- `boolean`: Returns `true` if any elements with the specified selector are in view, otherwise returns `false`.

## usePersistentState Hook

### Description

A custom React hook that manages state and persists it to `localStorage`.

### Template Type

- **T**: The type of the state.

### Parameters

- **key**: `string` - The key under which the state is stored in `localStorage`.
- **initialValue**: `T` - The initial value of the state.

### Returns

- Returns the current state and a function to update it.
  - **[state, setState]**: `[T, Dispatch<SetStateAction<T>>]`

### Examples

```jsx
const [count, setCount] = usePersistentState("count", 0);
```

```jsx
const [user, setUser] = usePersistentState("user", { name: "John Doe" });
```

### Usage

using the `usePersistentState` we can create state managment hook as below mentioned

### Example code

```tsx
import { usePersistentState } from "@/persistentState/usePersistentState";
import type { Dispatch, SetStateAction } from "react";

/**
 * A custom hook that manages a boolean state with persistence in localStorage.
 *
 * @param {boolean} [initialValue=false] - The initial value of the isOpen state.
 * @returns {[boolean, Dispatch<SetStateAction<boolean>>]} - Returns the current isOpen state and a function to update it.
 *
 * @example
 * const [isOpen, setIsOpen] = useSidebarState();
 *
 * @example
 * const [isOpen, setIsOpen] = useSidebarState(true);
 */
function useSidebarState(
  initialValue: boolean = false
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isOpen, setIsOpen] = usePersistentState<boolean>("isOpen", initialValue);
  return [isOpen, setIsOpen];
}

export { useSidebarState };
```

---

### Parameters

- **initialValue**: `boolean` (optional) - The initial value of the `isOpen` state. Defaults to `false`.

### Returns

- Returns the current `isOpen` state and a function to update it.
  - **[isOpen, setIsOpen]**: `[boolean, Dispatch<SetStateAction<boolean>>]`

### Examples

```jsx
const [isOpen, setIsOpen] = useSidebarState();
```

```jsx
const [isOpen, setIsOpen] = useSidebarState(true);
```
