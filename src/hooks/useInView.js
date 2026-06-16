import { useEffect, useRef, useState } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [entry, setEntry] = useState(null);
  const hasTriggeredRef = useRef(false);

  const { threshold = 0.3, rootMargin = "0px", triggerOnce = false } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);

        if (triggerOnce && hasTriggeredRef.current) {
          return;
        }

        const isVisible = observerEntry.isIntersecting;
        setIsInView(isVisible);

        // marks as triggered if visible. this is so it doesnt render again
        if (isVisible && triggerOnce) {
          hasTriggeredRef.current = true;
        }
      },
      {
        threshold: Array.isArray(threshold) ? threshold : [threshold],
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView, entry };
}

export default useInView;