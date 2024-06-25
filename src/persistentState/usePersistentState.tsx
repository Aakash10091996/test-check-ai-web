import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";

/**
 * A custom hook that manages state and persists it to localStorage.
 *
 * @template T - The type of the state.
 * @param {string} key - The key under which the state is stored in localStorage.
 * @param {T} initialValue - The initial value of the state.
 * @returns {[T, Dispatch<SetStateAction<T>>]} - Returns the current state and a function to update it.
 *
 * @example
 * const [count, setCount] = usePersistentState('count', 0);
 *
 * @example
 * const [user, setUser] = usePersistentState('user', { name: 'John Doe' });
 */
export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const isBrowser = typeof window !== "undefined";

  const [state, setState] = useState<T>(() => {
    if (isBrowser) {
      const storedValue = localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isBrowser]);

  return [state, setState];
}
