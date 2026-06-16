import { useContext } from "react";
import { AnimContext } from "./AnimContext";

export function useAnim() {
  const ctx = useContext(AnimContext);
  if (!ctx) {
    throw new Error("useAnim must be used inside <AnimProvider>");
  }
  return ctx;
}