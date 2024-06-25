import { useEffect, useState } from "react";

export function useHeroScroll(enableScroll?: boolean): [boolean, (value: boolean) => void] {
  const [scrollPosition, setScrollPosition] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (enableScroll) {
        const scroll = window.scrollY > 0;
        setScrollPosition(scroll);
      }
      return;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [global.scrollY, enableScroll]);

  return [scrollPosition, setScrollPosition];
}
