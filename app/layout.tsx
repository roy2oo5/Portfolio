import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royston Menezes — Backend & Systems Engineer",
  description:
    "MCA student at Manipal Institute of Technology. Building scalable backend microservices, real-time communication systems, and low-latency network applications.",
  keywords: [
    "backend engineer",
    "systems engineer",
    "Node.js",
    "Go",
    "TypeScript",
    "WebRTC",
    "WebSocket",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
