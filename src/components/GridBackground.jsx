import React from "react";

export default function GridBackground({ id, children }) {
  return (
    <section id={id} className="relative min-h-screen flex items-center" style={{ backgroundColor: "#000" }}>
      {/* Grid: 40px間隔／黒地に薄い線 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)
          `
        }}
      />
      {/* 中央フェード */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "#000",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
          maskImage: "radial-gradient(ellipse at center, transparent 20%, black)"
        }}
      />
      {/* 中身 */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
