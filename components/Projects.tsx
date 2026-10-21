"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "./Skills";

type Project = {
  name: string;
  tagline: string;
  url?: string;
  overview: string;
  stack: string[];
  highlights: string[];
  method: string;
  methodColor: string;
};

const PROJECTS: Project[] = [
  {
    name: "Tenure",
    tagline: "thetenure.in",
    url: "https://thetenure.in",
    overview:
      "Production real-time backend platform for companion service scheduling and peer-to-peer communication.",
    stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Redis", "Docker", "AWS EC2", "S3", "WebRTC", "Coturn", "Nginx"],
    highlights: [
      "Implemented sub-50ms WebSocket signaling channels with Coturn TURN/STUN relays for symmetric NAT traversal.",
      "Built session token management with Redis caching, rate limiting, and PgBouncer connection pooling.",
      "Provisioned domain routing, Nginx reverse proxying, and automated SSL/TLS termination on AWS EC2.",
    ],
    method: "GET",
    methodColor: "#10b981",
  },
  {
    name: "NIGMA",
    tagline: "College Fest Web Platform",
    overview:
      "Central web portal and event management platform for the college festival — handling registration workflows, live schedule feeds, and team coordination.",
    stack: ["Node.js", "Express", "React", "PostgreSQL", "SQLite", "Tailwind CSS"],
    highlights: [
      "Engineered high-concurrency event registration endpoints with strict input sanitization and transaction-safe schema constraints.",
      "Built dynamic event schedule management and responsive mobile-first UI for attendees navigating parallel fest tracks.",
      "Optimized asset delivery and caching headers to ensure fast load times during peak on-campus traffic spikes.",
    ],
    method: "POST",
    methodColor: "#f59e0b",
  },
  {
    name: "Singularity",
    tagline: "Inter-Hospital Surplus Exchange",
    overview:
      "24-hour hackathon-winning platform for inter-hospital surplus medicine exchange and demand forecasting.",
    stack: ["FastAPI", "Python", "PostgreSQL", "React", "Docker"],
    highlights: [
      "Architected transactional database states to prevent double-claiming of perishable medical batches during simultaneous requests.",
      "Designed modular REST endpoints connecting hospital inventory logs with dynamic regional availability queries.",
    ],
    method: "GET",
    methodColor: "#0284c7",
  },
];

// 3D Tilt card
function TiltCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg) translateZ(4px)`;
    // Move inner glow to cursor position
    const shine = card.querySelector<HTMLElement>(".card-shine");
    if (shine) {
      const rx = ((e.clientX - rect.left) / rect.width)  * 100;
      const ry = ((e.clientY - rect.top)  / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${rx}% ${ry}%, rgba(255,255,255,0.04) 0%, transparent 60%)`;
    }
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    const shine = card.querySelector<HTMLElement>(".card-shine");
    if (shine) shine.style.background = "transparent";
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (card) {
      card.style.borderColor = project.methodColor + "44";
      card.style.boxShadow = `0 0 0 1px ${project.methodColor}18, 0 20px 60px rgba(0,0,0,0.5)`;
    }
  };

  return (
    <article
      ref={cardRef as React.Ref<HTMLElement>}
      className={`reveal reveal-delay-${(index % 3) + 1} tilt-card rounded-xl border overflow-hidden relative`}
      style={{
        backgroundColor: "#131720",
        borderColor: "#1e2430",
        transition: "transform 0.15s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {/* Cursor shine layer */}
      <div className="card-shine absolute inset-0 pointer-events-none z-10 rounded-xl transition-all duration-75" />

      {/* Terminal top bar */}
      <div
        className="px-5 py-3 flex items-center justify-between border-b"
        style={{ borderColor: "#1e2430" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#1e2430" }} />
            ))}
          </div>
          <span
            className="text-xs font-semibold"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: project.methodColor }}
          >
            {project.method}
          </span>
          <span
            className="text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#94a3b8", opacity: 0.6 }}
          >
            /api/{project.name.toLowerCase()}
          </span>
        </div>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs transition-colors duration-150"
            style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            {project.tagline} <ExternalLink size={10} />
          </a>
        ) : (
          <span className="text-xs" style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
            {project.tagline}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        <h3
          className="text-base font-semibold mb-2"
          style={{ color: "#f1f5f9", letterSpacing: "-0.025em" }}
        >
          {project.name}
        </h3>
        <p className="text-sm mb-4" style={{ color: "#94a3b8", lineHeight: "1.7" }}>
          {project.overview}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs border transition-all duration-150"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#94a3b8",
                backgroundColor: "#0c0e12",
                borderColor: "#1e2430",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = project.methodColor;
                e.currentTarget.style.borderColor = project.methodColor + "55";
                e.currentTarget.style.backgroundColor = project.methodColor + "0d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "#1e2430";
                e.currentTarget.style.backgroundColor = "#0c0e12";
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-2.5">
          {project.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-xs"
              style={{ color: "#94a3b8", lineHeight: "1.7" }}
            >
              <span
                className="shrink-0 mt-px text-xs"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: project.methodColor }}
              >
                →
              </span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeader label="featured projects" route="/projects" />
      <div className="mt-8 flex flex-col gap-5">
        {PROJECTS.map((project, i) => (
          <TiltCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
