import { useEffect, useState } from "react";
import { AnimContext } from "./AnimContext";

export function AnimProvider({ children }) {
  const [isPageVisible, setIsPageVisible] = useState(() =>
    typeof document !== "undefined" ? !document.hidden : true
  );

  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // tab visibility
  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // reduced motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotion = (e) => setReducedMotion(e.matches);
    
    if (media.addEventListener) {
      media.addEventListener("change", handleMotion);
      return () => media.removeEventListener("change", handleMotion);
    }
  }, []);

  const shouldAnimate = isPageVisible && !reducedMotion;

  return (
    <AnimContext.Provider value={{ isPageVisible, reducedMotion, shouldAnimate }}>
      {children}
    </AnimContext.Provider>
  );
}