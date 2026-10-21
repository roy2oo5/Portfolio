"use client";

import { GraduationCap, Award, Calendar, CheckCircle2, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./Skills";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  note: string | null;
  current: boolean;
  courses: string[];
}

const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Manipal Institute of Technology, Manipal",
    period: "2026 – 2028",
    note: "Specialization in Distributed Systems & Networking",
    current: true,
    courses: [
      "Distributed Computing",
      "Network Protocols",
      "Advanced Database Systems",
      "Cloud Infrastructure",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Dr. NSAM First Grade College, Nitte University",
    period: "2023 – 2026",
    note: "Graduated with CGPA: 8.65 / 10",
    current: false,
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Object-Oriented Architecture",
    ],
  },
];

const CERTIFICATIONS = [
  {
    title: "Networking Fundamentals",
    issuer: "Akamai · Coursera",
    credentialId: "AKAMAI-NET-FUND-2024",
    link: "https://coursera.org",
    skills: ["TCP/IP", "DNS Resolution", "CDN Caching", "Edge Routing"],
  },
];

export default function Education() {
  return (
    <section id="education" className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeader label="education & certifications" route="/education" />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Timeline column */}
        <div className="md:col-span-8 flex flex-col gap-6">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-mono mb-1 flex items-center gap-2">
            <GraduationCap size={14} className="text-emerald-400" />
            <span>Academic Milestones</span>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
            {EDUCATION.map((edu, idx) => (
              <div
                key={edu.degree}
                className={`reveal reveal-delay-${idx + 1} relative group`}
              >
                {/* Node dot on timeline */}
                <div
                  className={`absolute -left-[29px] top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    edu.current
                      ? "border-emerald-400 bg-emerald-950/80 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                      : "border-slate-700 bg-slate-900 group-hover:border-emerald-500"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      edu.current ? "bg-emerald-400 animate-pulse" : "bg-slate-500 group-hover:bg-emerald-400"
                    }`}
                  />
                </div>

                {/* Card */}
                <div
                  className="rounded-xl p-5 border transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: "#131720",
                    borderColor: "#1e2430",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(16,185,129,0.35)";
                    e.currentTarget.style.transform = "translateX(4px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1e2430";
                    e.currentTarget.style.transform = "translateX(0px)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h3
                      className="text-sm font-semibold tracking-tight"
                      style={{ color: "#f1f5f9" }}
                    >
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-[#0c0e12] px-2.5 py-1 rounded-md border border-slate-800">
                      <Calendar size={11} className="text-slate-500" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-mono mb-3">
                    {edu.institution}
                  </p>

                  {/* Highlights/Note badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-3.5">
                    {edu.note && (
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono border"
                        style={{
                          color: "#10b981",
                          backgroundColor: "rgba(16,185,129,0.06)",
                          borderColor: "rgba(16,185,129,0.25)",
                        }}
                      >
                        <CheckCircle2 size={11} />
                        {edu.note}
                      </span>
                    )}
                    {edu.current && (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border"
                        style={{
                          color: "#0284c7",
                          backgroundColor: "rgba(2,132,199,0.08)",
                          borderColor: "rgba(2,132,199,0.25)",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        In Progress
                      </span>
                    )}
                  </div>

                  {/* Coursework chips */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block mb-2">
                      Key Coursework
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-[#0c0e12] border border-slate-800 hover:text-slate-200 hover:border-slate-700 transition-colors"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications column */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-mono mb-1 flex items-center gap-2">
            <Award size={14} className="text-cyan-400" />
            <span>Certifications</span>
          </div>

          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.title}
              className="reveal reveal-delay-2 rounded-xl p-5 border transition-all duration-300 relative overflow-hidden group"
              style={{
                backgroundColor: "#131720",
                borderColor: "#1e2430",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(2,132,199,0.35)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e2430";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400">
                  <Award size={18} />
                </div>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  aria-label="View credential"
                >
                  <ArrowUpRight size={15} />
                </a>
              </div>

              <h4 className="text-sm font-semibold text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors">
                {cert.title}
              </h4>
              <p className="text-xs font-mono text-slate-400 mb-3">
                {cert.issuer}
              </p>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block mb-2">
                  Verified Competencies
                </span>
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300/80 bg-cyan-950/20 border border-cyan-900/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Quick contact card / prompt */}
          <div
            className="reveal reveal-delay-3 rounded-xl p-4 border border-dashed border-slate-800 bg-[#0c0e12]/60 mt-auto"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-300 font-medium">Ready to deploy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Available for backend and distributed systems engineering roles starting 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
