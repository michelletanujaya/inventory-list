import { useEffect, useRef } from "react";

export const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      // Allow horizontal scrolling with vertical wheel on desktop
      if (e.deltaY !== 0 && element.scrollWidth > element.clientWidth) {
        e.preventDefault();
        element.scrollLeft += e.deltaY;
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, []);

  return scrollRef;
};
