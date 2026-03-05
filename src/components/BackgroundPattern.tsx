"use client";

/**
 * Lightweight background pattern.
 * - Mobile: grain texture only (no blurred orbs to save GPU)
 * - Desktop: static pre-blurred orbs + grain (no Framer Motion animation)
 */
export default function BackgroundPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Static orbs - hidden on mobile, CSS only, no JS animation */}
      <div className="hidden md:block">
        <div
          className="absolute rounded-full bg-purple/[0.03] will-change-transform"
          style={{ width: 300, height: 300, left: "10%", top: "20%", filter: "blur(100px)" }}
        />
        <div
          className="absolute rounded-full bg-purple/[0.03] will-change-transform"
          style={{ width: 400, height: 400, left: "80%", top: "60%", filter: "blur(133px)" }}
        />
        <div
          className="absolute rounded-full bg-purple/[0.03] will-change-transform"
          style={{ width: 250, height: 250, left: "50%", top: "80%", filter: "blur(83px)" }}
        />
      </div>
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
