"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
}

interface Packet {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  color: string;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (default off-screen)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 180, // Mouse connection proximity
      active: false,
    };

    // Responsive node density
    const nodeCount = Math.floor((width * height) / 18000);
    const nodes: Node[] = [];
    const packets: Packet[] = [];

    const colors = ["#10b981", "#0284c7", "#64748b"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1,
        baseAlpha: Math.random() * 0.4 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Spawns occasional packet transmission along active links
    let packetTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Draw subtle interactive crosshair coordinate guides around cursor
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        ctx.strokeStyle = "rgba(16, 185, 129, 0.04)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);

        // Horizontal guide
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();

        // Vertical guide
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();
        ctx.restore();
      }

      // Update and draw node positions
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently off boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse proximity interaction (slight gravitational pull / repulsion)
        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        let currentAlpha = node.baseAlpha;
        if (distMouse < mouse.radius) {
          const proximity = 1 - distMouse / mouse.radius;
          currentAlpha = Math.min(1, node.baseAlpha + proximity * 0.6);

          // Subtle interaction link to cursor
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${proximity * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Occasionally trigger packets toward mouse
          packetTimer++;
          if (packetTimer % 45 === 0 && packets.length < 12) {
            packets.push({
              fromX: node.x,
              fromY: node.y,
              toX: mouse.x,
              toY: mouse.y,
              progress: 0,
              speed: 0.035 + Math.random() * 0.02,
              color: node.color,
            });
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color === "#10b981"
          ? `rgba(16, 185, 129, ${currentAlpha})`
          : node.color === "#0284c7"
          ? `rgba(2, 132, 199, ${currentAlpha})`
          : `rgba(148, 163, 184, ${currentAlpha * 0.7})`;
        ctx.fill();

        // Connect nearby nodes (Node-to-Node mesh links)
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 110;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.14;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(30, 41, 59, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update & draw active data packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const curX = pkt.fromX + (pkt.toX - pkt.fromX) * pkt.progress;
        const curY = pkt.fromY + (pkt.toY - pkt.fromY) * pkt.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color === "#0284c7" ? "#38bdf8" : "#34d399";
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}

