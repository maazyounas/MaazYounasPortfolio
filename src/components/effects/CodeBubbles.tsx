"use client";

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
    <>
      <style>{`
        @keyframes css-bubble-anim {
          0% {
            transform: translate(0px, 0px) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          33% {
            transform: translate(var(--x-1), var(--y-1)) scale(1) rotate(10deg);
            opacity: 0.6;
          }
          66% {
            transform: translate(var(--x-2), var(--y-2)) scale(1) rotate(-10deg);
            opacity: 0.6;
          }
          100% {
            transform: translate(var(--x-3), var(--y-3)) scale(0.5) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {bubbles?.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              left: bubble.startX,
              top: bubble.startY,
              width: bubble.size * 2.5,
              height: bubble.size * 2.5,
              fontSize: bubble.size,
              
              // CSS Variables for keyframes
              "--x-1": `${Math.sin(bubble.id) * 10}px`,
              "--x-2": `${Math.sin(bubble.id) * 20}px`,
              "--x-3": `${Math.sin(bubble.id) * 30}px`,
              "--y-1": `${-bubble.size * 6}px`,
              "--y-2": `${-bubble.size * 12}px`,
              "--y-3": `${-bubble.size * 18}px`,
              
              animation: `css-bubble-anim ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
              opacity: 0,
            } as React.CSSProperties}
          >
            <span className="text-primary font-mono font-bold drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]">
              {bubble.text}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default CodeBubbles;
