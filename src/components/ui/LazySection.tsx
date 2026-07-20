"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { useInView } from "framer-motion";

interface LazySectionProps {
  children: ReactNode;
  minHeight?: string;
  margin?: string;
}

export const LazySection = ({ 
  children, 
  minHeight = "100vh", 
  margin = "400px 0px" 
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger load when the section is within 400px of the viewport
  const isInView = useInView(ref, { once: true, margin });
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isInView && !shouldRender) {
      setShouldRender(true);
    }
  }, [isInView, shouldRender]);

  return (
    <div ref={ref} style={{ minHeight: shouldRender ? "auto" : minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
};
