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
