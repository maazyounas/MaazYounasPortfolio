"use client";

import { motion } from "framer-motion";
import {
  Code,
  Globe,
  Smartphone,
  Database,
  Figma,
  Rocket,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import ParticlesBackground from "../effects/ParticlesBackground";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom websites and web apps built with Next.js, React, and modern stacks. Fast, responsive, and SEO-friendly.",
    tag: "Next.js · React · TypeScript",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps using React Native. Native performance with a single codebase for iOS and Android.",
    tag: "React Native · Expo",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description:
      "Scalable server-side solutions, RESTful APIs, database design, and cloud integration (AWS, Vercel).",
    tag: "Node.js · Prisma · AWS",
  },
  {
    icon: Figma,
    title: "UI/UX Design",
    description:
      "User-centered design, wireframing, prototyping, and high-fidelity mockups in Figma or Adobe XD.",
    tag: "Figma · Adobe XD",
  },
  {
    icon: Globe,
    title: "E-commerce Solutions",
    description:
      "Online stores with secure payments, inventory management, and optimized conversion funnels.",
    tag: "Shopify · Stripe · WooCommerce",
  },
  {
    icon: Shield,
    title: "Consulting & Audits",
    description:
      "Code reviews, performance optimization, security audits, and technical strategy for your projects.",
    tag: "Audit · Strategy · Optimization",
  },
];

const ServicesSection = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes service-line-expand {
          from { width: 2.5rem; }
          to   { width: 100%; }
        }

        @keyframes service-icon-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
          50%       { box-shadow: 0 0 16px 4px rgba(239,68,68,0.25); }
        }
      `}</style>

      <section
        id="services"
        className="relative section-padding overflow-hidden"
      >
        {/* ── Ambient orbs ──────────────────────────── */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.12) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, transparent 70%)",
            filter: "blur(6px)",
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

        <ParticlesBackground />

        <div className="container-responsive relative z-10">

          {/* ── Section header ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            

            <h2 className="font-display font-bold mb-4 text-metallic-animated">
              Services I Offer
            </h2>
            <p className="font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(150,150,165,0.9)" }}
            >
              From concept to deployment, I provide end-to-end solutions tailored
              to your needs. Let's bring your ideas to life.
            </p>
          </motion.div>

          {/* ── Services grid ─────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="group relative"
              >
                {/* Hover gradient wash */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at top left, rgba(239,68,68,0.1) 0%, transparent 65%)",
                  }}
                />

                {/* Card */}
                <div
                  className="relative h-full flex flex-col p-6 rounded-2xl transition-all duration-350"
                  style={{
                    background: "rgba(7,7,10,0.82)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    // hover-override via CSS group trick handled by motion
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border =
                      "1px solid rgba(239,68,68,0.45)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 8px 40px rgba(0,0,0,0.55), 0 0 32px rgba(239,68,68,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border =
                      "1px solid rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 4px 24px rgba(0,0,0,0.4)";
                  }}
                >
                  {/* Top row: icon + arrow */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(239,68,68,0.12)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        animation: "service-icon-glow 3s ease-in-out infinite",
                        animationDelay: `${index * 0.4}s`,
                      }}
                    >
                      <service.icon
                        className="w-6 h-6 transition-colors duration-300 group-hover:text-red-400"
                        style={{ color: "rgba(239,68,68,0.85)" }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-red-400"
                    style={{ color: "rgba(220,220,235,0.95)" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-body text-sm leading-relaxed mb-5 flex-1"
                    style={{ color: "rgba(140,140,160,0.85)" }}
                  >
                    {service.description}
                  </p>

                  {/* Tech tag */}
                  <span
                    className="font-body text-xs px-3 py-1 rounded-lg self-start mb-4"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.18)",
                      color: "rgba(200,200,215,0.7)",
                    }}
                  >
                    {service.tag}
                  </span>

                  {/* Animated bottom line */}
                  <div
                    className="h-px transition-all duration-500"
                    style={{
                      width: "2.5rem",
                      background:
                        "linear-gradient(90deg,#ef4444,rgba(239,68,68,0.3))",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.width = "100%";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.width = "2.5rem";
                    }}
                    ref={(el) => {
                      if (!el) return;
                      const card = el.closest(".group");
                      if (!card) return;
                      const expand = () => (el.style.width = "100%");
                      const shrink = () => (el.style.width = "2.5rem");
                      card.addEventListener("mouseenter", expand);
                      card.addEventListener("mouseleave", shrink);
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Bottom CTA ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.55 }}
            className="text-center mt-16 flex flex-col items-center gap-5"
          >
            <p
              className="font-body text-base sm:text-lg"
              style={{ color: "rgba(150,150,165,0.85)" }}
            >
              Interested in working together?
            </p>
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm sm:text-base"
            >
              Let's discuss your project
              <Rocket className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;