import  { useState, useEffect } from "react";

export const useResponsiveWidth = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [window.innerWidth]);
  return width;
};

