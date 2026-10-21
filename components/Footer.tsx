"use client";

import { useEffect, useState } from "react";
import { Terminal, ArrowUp, Activity, GitBranch } from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState(2026);
  const [ping, setPing] = useState(24);

  useEffect(() => {
    setYear(new Date().getFullYear());
    // Simulate organic network ping latency jitter
    const interval = setInterval(() => {
      setPing(Math.floor(22 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t mt-20 relative z-10" style={{ borderColor: "#1e2430" }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Top row: Brand + Telemetry + Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center gap-3">
            {/* Terminal brand */}
            <div className="flex items-center gap-2">
              <Terminal size={14} style={{ color: "#10b981" }} />
              <span
                className="text-xs font-semibold tracking-tight"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#f1f5f9",
                }}
              >
                royston<span style={{ color: "#10b981" }}>@</span>portfolio
              </span>
            </div>

            <span className="text-slate-700 hidden sm:inline" aria-hidden="true">•</span>

            {/* Live telemetry badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#131720] border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">sys: nominal</span>
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Activity size={10} className="text-emerald-500" />
                {ping}ms
              </span>
            </div>
          </div>

          {/* Interactive Back to Top button */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border transition-all duration-200 cursor-pointer self-start sm:self-auto"
            style={{
              backgroundColor: "#131720",
              borderColor: "#1e2430",
              color: "#94a3b8",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#2d3748";
              e.currentTarget.style.color = "#f1f5f9";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1e2430";
              e.currentTarget.style.color = "#94a3b8";
              e.currentTarget.style.transform = "translateY(0px)";
            }}
            aria-label="Scroll back to top"
          >
            <span>return top</span>
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform duration-200 text-emerald-400" />
          </button>
        </div>

        {/* Bottom row: System build & Copyright info aligned */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <GitBranch size={12} className="text-emerald-500/80 shrink-0" />
            <span>v2.4.0-prod · Next.js 16 &amp; Tailwind CSS</span>
          </div>

          <div className="text-left sm:text-right">
            © {year} Royston Menezes. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
