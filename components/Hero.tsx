"use client";

import { useState, useEffect, useRef } from "react";
import { FileText, MapPin, Mail } from "lucide-react";

const EMAIL = "roymenezes28@gmail.com";

const ROLES = [
  "Backend Engineer",
  "Systems Engineer",
  "Network Architect",
  "API Designer",
];

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Typewriter hook
function useTypewriter(words: string[], speed = 60, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const [waiting, setWaiting]     = useState(false);

  useEffect(() => {
    if (waiting) {
      const t = setTimeout(() => { setWaiting(false); setDeleting(true); }, pause);
      return () => clearTimeout(t);
    }
    const word = words[wordIdx];
    if (!deleting) {
      if (charIdx < word.length) {
        const t = setTimeout(() => {
          setDisplayed(word.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, speed);
        return () => clearTimeout(t);
      } else {
        setWaiting(true);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayed(word.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, speed / 2);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }
    }
  }, [charIdx, deleting, waiting, wordIdx, words, speed, pause]);

  return displayed;
}

// Magnetic button
function MagneticBtn({
  children,
  href,
  download,
  onClick,
  active,
}: {
  children: React.ReactNode;
  href?: string;
  download?: boolean;
  onClick?: () => void;
  active?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: "'JetBrains Mono', monospace",
    border: "1px solid",
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease",
    backgroundColor: active ? "rgba(16,185,129,0.12)" : "#131720",
    borderColor: active ? "rgba(16,185,129,0.4)" : "#1e2430",
    color: active ? "#10b981" : "#94a3b8",
    userSelect: "none",
  };

  if (onClick) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        style={base}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2d3748"; e.currentTarget.style.color = "#f1f5f9"; }}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      download={download}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noopener noreferrer"}
      style={base}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2d3748"; e.currentTarget.style.color = "#f1f5f9"; }}
    >
      {children}
    </a>
  );
}

// Quick stats
const STATS = [
  { value: "3+",   label: "Projects shipped" },
  { value: "50ms", label: "WebSocket latency" },
  { value: "24hr", label: "Hackathon sprint" },
];

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section id="top" className="relative max-w-4xl mx-auto px-6 pt-32 pb-20">
      {/* Open badge */}
      <div className="flex items-center gap-2 mb-8 reveal">
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
          style={{
            backgroundColor: "rgba(16,185,129,0.08)",
            borderColor: "rgba(16,185,129,0.25)",
            color: "#10b981",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span className="glow-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#10b981" }} />
          open to opportunities
        </span>
      </div>

      {/* Name */}
      <h1
        className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 reveal reveal-delay-1"
        style={{ color: "#f1f5f9", letterSpacing: "-0.04em", lineHeight: 1.1 }}
      >
        Royston Menezes
      </h1>

      {/* Typewriter role */}
      <div
        className="flex items-center gap-1 text-base mb-2 h-7 reveal reveal-delay-2"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#10b981" }}
      >
        <span style={{ color: "#94a3b8" }}>~/</span>
        {role}
        <span className="cursor-blink" />
      </div>

      {/* Location */}
      <div
        className="flex items-center gap-1.5 text-xs mb-8 reveal reveal-delay-2"
        style={{ color: "#94a3b8" }}
      >
        <MapPin size={12} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>Karnataka, India</span>
      </div>

      {/* Bio */}
      <p
        className="text-sm leading-loose max-w-xl mb-8 reveal reveal-delay-2"
        style={{ color: "#94a3b8", lineHeight: "1.8" }}
      >
        MCA student at{" "}
        <span style={{ color: "#f1f5f9" }}>Manipal Institute of Technology (MIT)</span>.
        Building scalable backend microservices, real-time communication systems, and
        low-latency network applications.
      </p>

      {/* Stats row */}
      <div className="flex flex-wrap gap-6 mb-10 reveal reveal-delay-3">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="float-up"
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
          >
            <div
              className="text-xl font-bold"
              style={{ color: "#f1f5f9", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.03em" }}
            >
              {s.value}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2 reveal reveal-delay-3">
        <MagneticBtn href="https://github.com/roy2oo5">
          <GithubIcon size={13} /> GitHub
        </MagneticBtn>
        <MagneticBtn href="https://www.linkedin.com/in/royston-menezes-28042oo5">
          <LinkedinIcon size={13} /> LinkedIn
        </MagneticBtn>
        <MagneticBtn href="/resume.pdf" download>
          <FileText size={13} /> Resume
        </MagneticBtn>
        <MagneticBtn href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}>
          <Mail size={13} /> Email
        </MagneticBtn>
      </div>

      {/* Divider */}
      <div className="mt-16 h-px" style={{ backgroundColor: "#1e2430" }} />
    </section>
  );
}
