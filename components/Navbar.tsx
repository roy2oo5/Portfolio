"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

const NAV_LINKS = [
  { label: "skills",        href: "#skills" },
  { label: "projects",      href: "#projects" },
  { label: "achievements",  href: "#achievements" },
  { label: "education",     href: "#education" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [activeId, setActiveId]       = useState<string>("");
  const [indicatorStyle, setIndicator] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Scroll background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Slide the underline indicator
  useEffect(() => {
    const activeHref = `#${activeId}`;
    const el = linkRefs.current.get(activeHref);
    const nav = navRef.current;
    if (!el || !nav) { setIndicator({ left: 0, width: 0 }); return; }
    const navRect = nav.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    setIndicator({ left: elRect.left - navRect.left, width: elRect.width });
  }, [activeId]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(12,14,18,0.92)" : "transparent",
        backdropFilter:   scrolled ? "blur(12px)" : "none",
        borderBottom:     scrolled ? "1px solid #1e2430" : "1px solid transparent",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2 group" style={{ textDecoration: "none" }}>
          <Terminal size={15} style={{ color: "#10b981" }} className="transition-transform group-hover:rotate-6 duration-200" />
          <span
            className="text-sm font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f1f5f9", letterSpacing: "-0.01em" }}
          >
            royston<span style={{ color: "#10b981" }}>@</span>dev
          </span>
        </a>

        {/* Nav */}
        <nav ref={navRef} className="relative flex items-center gap-1">
          {/* Sliding underline indicator */}
          {indicatorStyle.width > 0 && (
            <span
              className="nav-active-bar absolute bottom-0 h-px"
              style={{
                left:  indicatorStyle.left,
                width: indicatorStyle.width,
                backgroundColor: "#10b981",
                transition: "left 0.25s cubic-bezier(0.4,0,0.2,1), width 0.25s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          )}
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => { if (el) linkRefs.current.set(link.href, el); }}
                className="px-3 py-1.5 rounded text-xs transition-colors duration-150 relative"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: isActive ? "#f1f5f9" : "#94a3b8",
                  textDecoration: "none",
                  backgroundColor: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                }}
                onMouseEnter={(e) => { (e.currentTarget).style.color = "#f1f5f9"; }}
                onMouseLeave={(e) => { (e.currentTarget).style.color = isActive ? "#f1f5f9" : "#94a3b8"; }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
