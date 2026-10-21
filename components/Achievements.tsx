"use client";

import { Trophy } from "lucide-react";
import { SectionHeader } from "./Skills";

const ACHIEVEMENTS = [
  {
    rank: "1st Place",
    event: "Solveathon Hackathon",
    org: "Sahyadri Institute of Technology",
    badge: "gold",
    num: "01",
  },
  {
    rank: "Top 60 Finalist",
    event: "HackVerse 26-Hour National Hackathon",
    org: "MIT Bengaluru",
    badge: "silver",
    num: "02",
  },
  {
    rank: "Consolation Prize",
    event: "CodeSprint National Hackathon",
    org: "St. Aloysius",
    badge: "bronze",
    num: "03",
  },
];

const BADGE: Record<string, { color: string; bg: string; border: string }> = {
  gold:   { color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)" },
  silver: { color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)" },
  bronze: { color: "#b45309", bg: "rgba(180,83,9,0.08)",    border: "rgba(180,83,9,0.2)" },
};

export default function Achievements() {
  return (
    <section id="achievements" className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeader label="honors & hackathons" route="/achievements" />

      <div className="mt-8 flex flex-col gap-3">
        {ACHIEVEMENTS.map((item, i) => {
          const p = BADGE[item.badge];
          return (
            <div
              key={item.event}
              className={`reveal reveal-delay-${i + 1} group flex items-center gap-5 rounded-xl px-5 py-4 border transition-all duration-250 cursor-default`}
              style={{ backgroundColor: "#131720", borderColor: "#1e2430" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = p.border;
                e.currentTarget.style.boxShadow = `0 0 0 1px ${p.border}, 0 8px 32px rgba(0,0,0,0.3)`;
                e.currentTarget.style.backgroundColor = "#161c27";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e2430";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.backgroundColor = "#131720";
              }}
            >
              {/* Index */}
              <span
                className="shrink-0 text-xs opacity-20 font-bold"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f1f5f9" }}
              >
                {item.num}
              </span>

              {/* Badge */}
              <span
                className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: p.color,
                  backgroundColor: p.bg,
                  borderColor: p.border,
                  minWidth: "7.5rem",
                  textAlign: "center",
                }}
              >
                {item.rank}
              </span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug" style={{ color: "#f1f5f9" }}>
                  {item.event}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {item.org}
                </p>
              </div>

              <Trophy
                size={15}
                className="shrink-0 opacity-40 group-hover:opacity-80 transition-opacity duration-200"
                style={{ color: p.color }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
