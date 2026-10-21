import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Home() {
  return (
    <div
      className="min-h-screen relative selection:bg-emerald-500 selection:text-black overflow-x-hidden"
      style={{ backgroundColor: "#0c0e12" }}
    >
      {/* Background dot grid for authentic engineering documentation vibe */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(#334155 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Dynamic interactive network topology & socket mesh canvas */}
      <InteractiveBackground />

      {/* Dynamic cursor spotlight glow */}
      <CursorGlow />

      {/* Main page layout */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Achievements />
          <Education />
        </main>
        <Footer />
      </div>
    </div>
  );
}
