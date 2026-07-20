"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  depth: number;
}

const PARTICLE_COUNT = 45;

const createParticles = (): Particle[] =>
  Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const depth = Math.random();
    return {
      id: i,
      x: Math.random() * 100, // percentage position
      y: Math.random() * 100,
      size: Math.random() * 6 + 4, // 4px to 10px
      duration: 12 + depth * 18,
      delay: Math.random() * 10,
      drift: Math.random() * 60 - 30, // smaller drift to prevent overflow
      depth,
    };
  });

const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    setParticles(createParticles());
  }, []);

  return (
    <>
      <style>{`
        @keyframes css-particle-anim {
          0% {
            transform: translate(0px, 0px) scale(0.5);
            opacity: 0;
          }
          33% {
            transform: translate(var(--drift-1), var(--y-1)) scale(1);
            opacity: var(--max-op);
          }
          66% {
            transform: translate(var(--drift-2), var(--y-2)) scale(1);
            opacity: var(--max-op);
          }
          100% {
            transform: translate(0px, var(--y-3)) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {particles?.map((p) => {
          const blur =
            p.depth > 0.7 ? "blur-sm" : p.depth > 0.4 ? "blur-[1px]" : "";
          const opacity = 0.2 + p.depth * 0.6; // slight lower opacity for depth

          return (
            <div
              key={p.id}
              className={`absolute rounded-full ${blur}`}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, rgba(255,0,0,${opacity}) 0%, rgba(255,0,0,${
                  opacity * 0.5
                }) 50%, transparent 100%)`,
                boxShadow: `0 0 ${p.size * 2}px rgba(255,0,0,${opacity})`,
                
                // CSS Variables for keyframes
                "--drift-1": `${p.drift}px`,
                "--drift-2": `${-p.drift}px`,
                "--y-1": `${-p.size * 20}px`,
                "--y-2": `${-p.size * 40}px`,
                "--y-3": `${-p.size * 60}px`,
                "--max-op": opacity,
                
                animation: `css-particle-anim ${p.duration}s ease-in-out ${p.delay}s infinite`,
                opacity: 0, // start invisible
              } as React.CSSProperties}
            />
          );
        })}
      </div>
    </>
  );
};

export default ParticlesBackground;
