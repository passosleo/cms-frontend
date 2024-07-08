import { useState, useEffect } from "react";

export function useBreakpoints() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width < 1025) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isMobile,
  };
}
