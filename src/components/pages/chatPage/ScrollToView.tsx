import { useEffect, useRef } from "react";

export const ScrollToView = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "instant" });
    }
  }, []);
  return <div ref={ref}></div>;
};
