"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    let raf: number;
    let cx = -300,
      cy = -300;
    let tx = -300,
      ty = -300;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      // ease toward target
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.background = `radial-gradient(600px circle at ${cx}px ${cy}px, rgba(16,185,129,0.055) 0%, rgba(2,132,199,0.025) 40%, transparent 70%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={canvasRef} id="cursor-glow" aria-hidden="true" />;
}

