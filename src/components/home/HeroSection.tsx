import {
  ArrowRight,
  Sparkles,
  Code,
  Palette,
  Zap,
  Star,
  Globe,
  Users,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import CodeBubbles from "../effects/CodeBubbles";
import ParticlesBackground from "../effects/ParticlesBackground";
import { HomePageData } from "../../lib/adminService";

/* ──────────────────────────────────────────────────────────
   QUOTE DISPLAY (Server Component — shows first quote)
   ────────────────────────────────────────────────────────── */
interface QuoteDisplayProps {
  className?: string;
  textClassName?: string;
  quotes: string[];
}

const QuoteDisplay = ({
  className = "",
  textClassName = "",
  quotes = [],
}: QuoteDisplayProps) => {
  const quote =
    quotes[0] ||
    "Transforming Ideas Into Digital Reality";

  return (
    <div
      className={`relative flex items-center justify-center lg:justify-start overflow-hidden ${className}`}
    >
      <p
        className={`w-full text-center lg:text-left break-words ${textClassName}`}
      >
        {quote}
      </p>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────
   FLOATING STAT CARD
   ────────────────────────────────────────────────────────── */
interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
  className?: string;
}

const StatCard = ({
  value,
  label,
  delay = 0,
  className = "",
}: StatCardProps) => (
  <div
    className={`glass-card p-4 flex flex-col gap-1 select-none ${className}`}
    style={{
      background: "rgba(7,7,10,0.82)",
      border: "1px solid rgba(239,68,68,0.22)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
    }}
  >
    <span
      className="font-display font-bold leading-none"
      style={{
        fontSize: "clamp(1.6rem,3vw,2.2rem)",
        background: "linear-gradient(135deg,#ef4444,#fca5a5)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {value}
    </span>
    <span className="text-xs font-body text-muted-foreground leading-tight">
      {label}
    </span>
  </div>
);

interface SkillPillProps {
  icon: React.ReactNode;
  label: string;
}

const SkillPill = ({ icon, label }: SkillPillProps) => (
  <div
    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body font-medium transition-transform hover:scale-105 hover:-translate-y-0.5"
    style={{
      background: "rgba(239,68,68,0.08)",
      border: "1px solid rgba(239,68,68,0.28)",
      color: "rgba(220,220,230,0.85)",
    }}
  >
    <span style={{ color: "#ef4444" }}>{icon}</span>
    {label}
  </div>
);

/* ──────────────────────────────────────────────────────────
   MAIN HERO SECTION
   ────────────────────────────────────────────────────────── */
interface HeroSectionProps {
  initialHomeData: HomePageData | null;
  initialQuotes: string[];
}

const HeroSection = ({ initialHomeData, initialQuotes }: HeroSectionProps) => {
  const homeData = initialHomeData;
  const displayQuotes =
    initialQuotes && initialQuotes.length > 0
      ? initialQuotes
      : [
          "Transforming Ideas Into Digital Reality",
          "Building The Future With Clean Code",
          "Where Design Meets Functionality",
          "Crafting Exceptional User Experiences",
        ];

  return (
    <>
      <style>{`
        @keyframes hero-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, -30px) scale(1.06); }
          66%       { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes hero-badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
        }
        @keyframes stat-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes availability-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .hero-orb       { animation: hero-orb-drift 14s ease-in-out infinite; }
        .stat-float-1   { animation: stat-float 5s ease-in-out infinite; }
        .stat-float-2   { animation: stat-float 5s ease-in-out infinite 1.6s; }
        .stat-float-3   { animation: stat-float 5s ease-in-out infinite 3.2s; }
        .availability-dot { animation: availability-blink 2s ease-in-out infinite; }
        .scroll-dot     { animation: stat-float 2s ease-in-out infinite; }
      `}</style>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="hero-orb absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.18) 0%, rgba(239,68,68,0.06) 45%, transparent 72%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.1) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239,68,68,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239,68,68,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        <CodeBubbles />
        <ParticlesBackground />

        {/* ── Main content ──────────────────────────── */}
        <div className="container-responsive relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-0 sm:pb-12 lg:pb-10">
          {" "}
          <div className="max-w-6xl mx-auto">
            {/* ── Top availability badge ──────────────── */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-body font-medium select-none"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.35)",
                  animation: "hero-badge-pulse 2.8s ease-in-out infinite",
                  color: "rgba(220,220,230,0.9)",
                }}
              >
                <Sparkles
                  className="w-3.5 h-3.5"
                  style={{ color: "#ef4444" }}
                />
                {homeData?.heroTagline ||
                  "Available for new projects · Full Stack Developer"}
              </div>
            </div>

            {/* ── Two-column layout ───────────────────── */}
            <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-12 xl:gap-16 items-start">
              {/* LEFT COLUMN ──────────────────────────── */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Main headline / quote display */}
                <div className="mb-8 w-full">
                  <QuoteDisplay
                    className="min-h-[110px] sm:min-h-[90px] lg:min-h-[130px]"
                    textClassName="font-display font-bold leading-[1.1] tracking-tight text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-metallic-animated not-italic"
                    quotes={displayQuotes}
                  />
                </div>

                {/* Description */}
                <p
                  className="font-body text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0"
                  style={{ color: "rgba(160,160,175,0.9)" }}
                >
                  {homeData?.heroDescription ||
                    "I specialize in creating responsive, performant web applications that not only look beautiful but solve real-world problems. Let's build something amazing together."}
                </p>

                {/* Skill pills */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                  <SkillPill icon={<Code className="w-4 h-4" />} label="Clean Code" />
                  <SkillPill icon={<Palette className="w-4 h-4" />} label="Modern Design" />
                  <SkillPill icon={<Zap className="w-4 h-4" />} label="Fast & Responsive" />
                  <SkillPill icon={<Globe className="w-4 h-4" />} label="SEO Optimized" />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
                  {(homeData?.showProjects ?? true) && (
                    <Link href="/#projects" className="w-full sm:w-auto">
                      <button className="btn-primary w-full sm:w-auto px-8 py-3 text-sm sm:text-base hover:scale-105 hover:-translate-y-0.5 transition-transform">
                        Explore My Work
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  )}
                  <Link href="/#contact" className="w-full sm:w-auto">
                    <button className="btn-ghost w-full sm:w-auto px-8 py-3 text-sm sm:text-base hover:scale-105 hover:-translate-y-0.5 transition-transform">
                      Start a Project
                    </button>
                  </Link>
                </div>

                {/* Horizontal stat strip — mobile only */}
                <div
                  className="flex lg:hidden items-center justify-center gap-8 mt-8 pt-6 w-full"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {[
                    { value: "15+", label: "Projects" },
                    { value: "3+", label: "Years Exp." },
                    { value: "100%", label: "Satisfaction" },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-0.5">
                      <span
                        className="font-display font-bold text-2xl leading-none"
                        style={{
                          background: "linear-gradient(135deg,#ef4444,#fca5a5)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {s.value}
                      </span>
                      <span
                        className="font-body text-xs"
                        style={{ color: "rgba(140,140,155,0.8)" }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Scroll indicator */}
                <div className="flex flex-col items-center mt-10 lg:hidden">
                  <div
                    className="w-6 h-10 rounded-full flex justify-center"
                    style={{ border: "2px solid rgba(239,68,68,0.5)" }}
                  >
                    <div
                      className="scroll-dot w-1 h-3 rounded-full mt-2"
                      style={{ background: "#ef4444" }}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN — Floating stat cards (desktop only) ── */}
              <div className="hidden lg:flex flex-col gap-4 pt-0">
                {/* Featured card */}
                <div
                  className="stat-float-1 rounded-2xl p-5 flex flex-col gap-3"
                  style={{
                    background: "rgba(7,7,10,0.85)",
                    border: "1px solid rgba(239,68,68,0.28)",
                    boxShadow:
                      "0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), 0 0 40px rgba(239,68,68,0.08)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-body text-xs uppercase tracking-widest"
                      style={{ color: "rgba(239,68,68,0.8)" }}
                    >
                      Projects Shipped
                    </span>
                    <TrendingUp className="w-4 h-4" style={{ color: "#ef4444" }} />
                  </div>
                  <span
                    className="font-display font-bold leading-none"
                    style={{
                      fontSize: "3.5rem",
                      background: "linear-gradient(135deg,#ef4444 0%,#fca5a5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    15+
                  </span>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: "rgba(140,140,160,0.8)" }}
                  >
                    Successfully delivered across multiple industries worldwide
                  </p>
                  {/* mini star rating */}
                  <div className="flex items-center gap-1.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" style={{ color: "#ef4444" }} />
                    ))}
                    <span
                      className="font-body text-xs ml-1"
                      style={{ color: "rgba(180,180,195,0.7)" }}
                    >
                      Client Rated
                    </span>
                  </div>
                </div>

                {/* Two smaller cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="stat-float-2">
                    <StatCard value="3+" label="Years of Experience" delay={0.45} />
                  </div>
                  <div className="stat-float-3">
                    <StatCard value="100%" label="Client Satisfaction" delay={0.55} />
                  </div>
                </div>

                {/* Trusted by / partners strip */}
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(7,7,10,0.7)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                    <span
                      className="font-body text-xs uppercase tracking-widest"
                      style={{ color: "rgba(140,140,160,0.7)" }}
                    >
                      Tech Stack
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js",
                      "React",
                      "TypeScript",
                      "Tailwind",
                      "Node.js",
                      "MongoDB",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="font-body text-xs px-2.5 py-1 rounded-lg"
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          color: "rgba(210,210,225,0.8)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
