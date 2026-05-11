"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import TechStackIcon from "../components/about/TechStackIcon";
import { Code2, Database, UserCircle, MapPin, Calendar } from "lucide-react";
import { adminService, AboutPageData } from "../lib/adminService";

interface AboutProps {
  initialData: AboutPageData | null;
  standalone?: boolean;
  sectionId?: string;
}

const About = ({ initialData, standalone = true, sectionId }: AboutProps) => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(initialData);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;
    const fetchData = async () => {
      try {
        const data = await adminService.getAboutPageData();
        setAboutData(data);
      } catch (error) {
        console.error("Failed to fetch about page data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialData]);

  const content = (
    <>
      <style jsx global>{`
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes about-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes float-icon-inv {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(10px); }
        }
        .ring-spin  { animation: ring-spin 22s linear infinite; }
        .float-up   { animation: float-icon 4s ease-in-out infinite; }
        .float-down { animation: float-icon-inv 4s ease-in-out infinite; }
      `}</style>

      <section
        id={sectionId}
        className="relative section-padding min-h-screen overflow-hidden"
      >
        {/* ── Ambient orbs ──────────────────────────── */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.1) 0%, transparent 70%)",
            filter: "blur(6px)",
            animation: "about-orb-drift 16s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.07) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* ── Subtle grid ───────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239,68,68,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239,68,68,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        <div className="container-responsive relative z-10">


          {/* ── Two-column: image + content ───────────── */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">

            {/* LEFT — Avatar ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm">

                {/* Spinning conic ring */}
                <div
                  className="ring-spin absolute -inset-6 sm:-inset-8 rounded-full pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 60%, rgba(239,68,68,0.55) 75%, transparent 85%, rgba(239,68,68,0.3) 95%, transparent)",
                    filter: "blur(10px)",
                    opacity: 0.9,
                  }}
                />

                {/* Static outer ring */}
                <div
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                />

                {/* Avatar frame */}
                <div
                  className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden z-10"
                  style={{
                    border: "2px solid rgba(239,68,68,0.4)",
                    boxShadow:
                      "0 0 40px rgba(239,68,68,0.2), 0 0 80px rgba(239,68,68,0.08)",
                  }}
                >
                  {aboutData?.profileImage ? (
                    <Image
                      src={aboutData.profileImage}
                      alt="Maaz Younas"
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full animate-pulse"
                      style={{ background: "rgba(239,68,68,0.08)" }}
                    />
                  )}
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(4,4,6,0.45) 0%, transparent 55%)",
                    }}
                  />
                </div>

                {/* Floating icon badges */}
                <div
                  className="float-up absolute -top-3 -right-3 sm:-top-5 sm:-right-5 p-2.5 sm:p-3 rounded-xl z-20"
                  style={{
                    background: "rgba(7,7,10,0.9)",
                    border: "1px solid rgba(239,68,68,0.35)",
                    boxShadow: "0 0 20px rgba(239,68,68,0.2)",
                  }}
                >
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#ef4444" }} />
                </div>
                <div
                  className="float-down absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 p-2.5 sm:p-3 rounded-xl z-20"
                  style={{
                    background: "rgba(7,7,10,0.9)",
                    border: "1px solid rgba(239,68,68,0.35)",
                    boxShadow: "0 0 20px rgba(239,68,68,0.2)",
                  }}
                >
                  <Database className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#ef4444" }} />
                </div>

                {/* Location pill */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs whitespace-nowrap z-20"
                  style={{
                    background: "rgba(7,7,10,0.92)",
                    border: "1px solid rgba(239,68,68,0.28)",
                    color: "rgba(180,180,200,0.85)",
                  }}
                >
                  <MapPin className="w-3 h-3" style={{ color: "#ef4444" }} />
                  Pakistan · Remote Worldwide
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT — Content ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <h1 className="font-display font-bold text-metallic-animated mb-4 break-words"
                style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
              >
                About Me
              </h1>

              <h2
                className="font-body font-semibold text-lg sm:text-xl mb-5 break-words"
                style={{ color: "rgba(239,68,68,0.9)" }}
              >
                {aboutData?.tagline ? (
                  aboutData.tagline
                ) : (
                  <span
                    className="inline-block h-5 w-56 rounded animate-pulse"
                    style={{ background: "rgba(239,68,68,0.12)" }}
                  />
                )}
              </h2>

              <div
                className="font-body text-sm sm:text-base leading-relaxed text-justify break-words space-y-3 mb-8"
                style={{ color: "rgba(155,155,175,0.9)" }}
              >
                {aboutData?.bio ? (
                  <p>{aboutData.bio}</p>
                ) : (
                  <>
                    {[100, 83, 66].map((w, i) => (
                      <div
                        key={i}
                        className="h-4 rounded animate-pulse"
                        style={{
                          width: `${w}%`,
                          background: "rgba(239,68,68,0.08)",
                        }}
                      />
                    ))}
                  </>
                )}
              </div>

              {/* Experience pill */}
              <div className="flex items-center gap-2 mb-8">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-body text-xs"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.22)",
                    color: "rgba(200,200,215,0.8)",
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                  3+ Years of Professional Experience
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: "3+",  label: "Years Experience" },
                  { value: "15+", label: "Projects Completed" },
                  { value: "15+", label: "Happy Clients" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl"
                    style={{
                      background: "rgba(7,7,10,0.7)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                    }}
                    whileHover={{
                      borderColor: "rgba(239,68,68,0.5)",
                      boxShadow: "0 0 20px rgba(239,68,68,0.12)",
                    }}
                  >
                    <span
                      className="font-display font-bold text-2xl sm:text-3xl leading-none mb-1"
                      style={{
                        background: "linear-gradient(135deg,#ef4444,#fca5a5)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="font-body text-xs leading-tight break-words"
                      style={{ color: "rgba(130,130,150,0.85)" }}
                    >
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Tech Stack ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tech stack header */}
            <div className="text-center mb-10">
              <h2
                className="font-display font-bold text-metallic break-words"
                style={{ fontSize: "clamp(1.5rem,3.5vw,2.2rem)" }}
              >
                Tech Stack
              </h2>
            </div>

            {/* Divider line */}
            <div
              className="w-full h-px mb-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(239,68,68,0.3) 30%, rgba(239,68,68,0.3) 70%, transparent)",
              }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
              {aboutData?.techStack?.length ? (
                aboutData.techStack.map((tech, index) => (
                  <TechStackIcon
                    key={tech.name}
                    name={tech.name}
                    icon={tech.icon}
                    index={index}
                  />
                ))
              ) : (
                [...Array(6)].map((_, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="w-16 h-16 rounded-2xl animate-pulse"
                      style={{ background: "rgba(239,68,68,0.08)" }}
                    />
                    <div
                      className="h-3 w-14 rounded animate-pulse"
                      style={{ background: "rgba(239,68,68,0.06)" }}
                    />
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );

  if (!standalone) return content;
  return <Layout>{content}</Layout>;
};

export default About;