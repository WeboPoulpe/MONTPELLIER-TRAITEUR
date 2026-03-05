"use client";

import { motion } from "framer-motion";

const orbs = [
  { size: 300, x: "10%", y: "20%", delay: 0, duration: 25 },
  { size: 400, x: "80%", y: "60%", delay: 2, duration: 30 },
  { size: 250, x: "50%", y: "80%", delay: 4, duration: 20 },
  { size: 350, x: "70%", y: "10%", delay: 1, duration: 28 },
  { size: 200, x: "20%", y: "70%", delay: 3, duration: 22 },
];

export default function BackgroundPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple/[0.03]"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            filter: `blur(${orb.size / 3}px)`,
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
