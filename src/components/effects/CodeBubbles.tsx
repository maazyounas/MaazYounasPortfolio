"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CodeBubble {
  id: number;
  text: string;
  size: number;
  duration: number;
  delay: number;
  startX: number;
  startY: number;
}

const codeSymbols = ["<>", "</>", "{}", "[]", "//", "/*", "*/", "=>", "!", "&&"];

const createBubbles = (width: number, height: number): CodeBubble[] =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i,
    text: codeSymbols[i % codeSymbols.length],
    size: Math.random() * 20 + 14,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 5,
    startX: Math.random() * (width - 60), // keep inside viewport
    startY: Math.random() * (height - 60),
  }));

const CodeBubbles = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [bubbles, setBubbles] = useState<CodeBubble[] | null>(null);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowSize.width > 0 && windowSize.height > 0) {
      setBubbles(createBubbles(windowSize.width, windowSize.height));
    }
  }, [windowSize.width, windowSize.height]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {bubbles?.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute flex items-center justify-center rounded-full"
          style={{
            left: bubble.startX,
            top: bubble.startY,
            width: bubble.size * 2.5,
            height: bubble.size * 2.5,
            fontSize: bubble.size,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            scale: [0.5, 1, 1, 0.5],
            y: [0, -bubble.size * 6, -bubble.size * 12, -bubble.size * 18],
            x: [
              0,
              Math.sin(bubble.id) * 10,
              Math.sin(bubble.id) * 20,
              Math.sin(bubble.id) * 30,
            ],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <span className="text-primary font-mono font-bold drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]">
            {bubble.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CodeBubbles;
