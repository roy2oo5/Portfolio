"use client";

import { Network, Server, Database, Cloud } from "lucide-react";

const SKILL_GROUPS = [
  {
    iconName: "network" as const,
    label: "Systems & Networks",
    route: "/sys/net",
    color: "#10b981",
    items: [
      "TCP/IP socket mechanics",
      "HTTP/1.1 & HTTP/2 lifecycle",
      "WebSockets",
      "WebRTC · STUN/TURN · Coturn",
      "DNS configuration",
      "Nginx reverse proxy",
      "SSL/TLS automation",
      "PgBouncer connection pooling",
    ],
  },
  {
    iconName: "server" as const,
    label: "Backend & Languages",
    route: "/backend/lang",
    color: "#0284c7",
    items: ["Node.js", "Express", "TypeScript", "Go", "C++", "Python · FastAPI", "Java"],
  },
  {
    iconName: "database" as const,
    label: "Databases & Stores",
    route: "/data/stores",
    color: "#10b981",
    items: [
      "PostgreSQL",
      "Redis · pub/sub · caching",
      "MongoDB",
      "SQLite",
    ],
  },
  {
    iconName: "cloud" as const,
    label: "Cloud & DevOps",
    route: "/infra/ops",
    color: "#0284c7",
    items: [
      "Docker",
      "AWS · EC2 · S3 · ECR",
      "Google Cloud Run",
      "Linux · Fedora / Ubuntu",
      "Git · GitHub Actions CI/CD",
    ],
  },
];

function GroupIcon({ name, color }: { name: "network" | "server" | "database" | "cloud"; color: string }) {
  const props = { size: 14, style: { color } };
  if (name === "network")  return <Network {...props} />;
  if (name === "server")   return <Server {...props} />;
  if (name === "database") return <Database {...props} />;
  return <Cloud {...props} />;
}

export default function Skills() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeader label="core competencies" route="/competencies" />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SKILL_GROUPS.map((group, gi) => (
          <div
            key={group.label}
            className={`reveal reveal-delay-${(gi % 4) + 1} group/card rounded-xl p-5 border relative overflow-hidden transition-all duration-300 cursor-default`}
            style={{
              backgroundColor: "#131720",
              borderColor: "#1e2430",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = group.color + "55";
              e.currentTarget.style.boxShadow = `0 0 0 1px ${group.color}18, 0 8px 32px rgba(0,0,0,0.3)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1e2430";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Subtle corner glow */}
            <div
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${group.color}18, transparent 70%)` }}
            />

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <GroupIcon name={group.iconName} color={group.color} />
              <span
                className="text-xs font-semibold"
                style={{ color: "#f1f5f9", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {group.label}
              </span>
              <span
                className="ml-auto text-xs opacity-30"
                style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {group.route}
              </span>
            </div>

            {/* Tag chips */}
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded text-xs border transition-all duration-150 cursor-default"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#94a3b8",
                    backgroundColor: "#0c0e12",
                    borderColor: "#1e2430",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = group.color;
                    e.currentTarget.style.borderColor = group.color + "55";
                    e.currentTarget.style.backgroundColor = group.color + "0d";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#94a3b8";
                    e.currentTarget.style.borderColor = "#1e2430";
                    e.currentTarget.style.backgroundColor = "#0c0e12";
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeader({ label, route }: { label: string; route: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs font-semibold uppercase"
        style={{ color: "#10b981", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}
      >
        {label}
      </span>
      <span className="flex-1 h-px" style={{ backgroundColor: "#1e2430" }} />
      <span
        className="text-xs opacity-35"
        style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {route}
      </span>
    </div>
  );
}
