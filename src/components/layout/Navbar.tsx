"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
} from "lucide-react";

const navLinks = [
  {
    href: "/#home",
    hash: "#home",
    label: "Home",
    sectionId: "home",
  },
  {
    href: "/#section",
    hash: "#services",
    label: "Services",
    sectionId: "services",
  },
  {
    href: "/#about",
    hash: "#about",
    label: "About",
    sectionId: "about",
  },
  {
    href: "/#projects",
    hash: "#projects",
    label: "Projects",
    sectionId: "projects",
  },
  {
    href: "/#contact",
    hash: "#contact",
    label: "Contact",
    sectionId: "contact",
  },
];

function ActivePill() {
  return (
    <motion.span
      layoutId="nav-active-pill"
      className="absolute inset-0 rounded-full z-0"
      style={{
        background: "linear-gradient(135deg,#ef4444 0%,#9f1239 100%)",
        boxShadow: "0 0 18px rgba(239,68,68,0.65), 0 0 6px rgba(239,68,68,0.4)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 34 }}
    />
  );
}

const Navbar = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("#home");
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("dark");

    // Fetch dynamic resume URL
    fetch("/api/admin/resume-url")
      .then((res) => res.json())
      .then((data) => {
        if (data.resumeUrl) setResumeUrl(data.resumeUrl);
      })
      .catch((err) => console.error("Error fetching resume URL:", err));

    return () => {
      document.body.style.paddingTop = "0px";
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((hash: string, sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({
  behavior: "smooth",
  block: "start",
});

      window.history.pushState(null, "", hash);
      setActiveSection(hash);
    }
  }, []);

  const handleClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      hash: string,
      sectionId: string,
    ) => {
      e.preventDefault();
      scrollToSection(hash, sectionId);
    },
    [scrollToSection],
  );

  // Active section tracking with Intersection Observer
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = navLinks
      .map((link) => ({
        id: link.sectionId,
        element: document.getElementById(link.sectionId),
      }))
      .filter((section) => section.element !== null);

    const observerOptions = {
      rootMargin: "-80px 0px -40% 0px", // Adjusted for navbar height
      threshold: [0.2, 0.4, 0.6],
    };

    const observer = new IntersectionObserver((entries) => {
      // Get all visible sections
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        const activeId = visibleSections[0].target.id;
        setActiveSection(`#${activeId}`);
      }
    }, observerOptions);

    sections.forEach((section) => {
      if (section.element) observer.observe(section.element);
    });

    // Check initial hash in URL
    if (
      window.location.hash &&
      navLinks.some((l) => l.hash === window.location.hash)
    ) {
      const sectionId = window.location.hash.replace("#", "");
      setActiveSection(window.location.hash);
      const element = document.getElementById(sectionId);
      if (element) {
  setTimeout(() => {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}
    }

    return () => {
      sections.forEach((section) => {
        if (section.element) observer.unobserve(section.element);
      });
      observer.disconnect();
    };
  }, [pathname]);

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        .syne {
          font-family: var(--font-syne), sans-serif;
        }
        .outfit {
          font-family: var(--font-outfit), sans-serif;
        }

        /* Add scroll margin to all sections for better scroll targeting */
        #home,
        #about,
        #projects,
        #contact ,
        #services{
          scroll-margin-top: 10px;
        }

        @keyframes logo-pulse {
          0%,
          100% {
            box-shadow: 0 0 14px rgba(239, 68, 68, 0.5);
          }
          50% {
            box-shadow: 0 0 28px rgba(239, 68, 68, 0.8);
          }
        }

        @keyframes word-shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes shimmer-sweep {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(220%);
          }
        }
      `}</style>

      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-2 pb-2 pointer-events-none"
        style={{
          background: "rgba(7,7,10,0.9)", // 👈 THIS FIXES BLEED
          backdropFilter: "blur(10px)", // optional for smoothness
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <motion.div
          animate={{
            boxShadow: scrolled
              ? "0 8px 30px rgba(0,0,0,0.6)"
              : "0 4px 20px rgba(0,0,0,0.4)",
          }}
          transition={{ duration: 0.3 }}
          className="pointer-events-auto w-full max-w-[98%] flex items-center justify-between gap-3 px-3 lg:py-2 py-1 rounded-full relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)", // same as navlinks
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",

            border: "1px solid rgba(255,255,255,0.08)",

            boxShadow: scrolled
              ? "0 8px 30px rgba(0,0,0,0.6)"
              : "0 4px 20px rgba(0,0,0,0.4)",

            transition: "all 0.3s ease",
          }}
        >
          {/* ── LEFT: Logo ───────────────────────────────── */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home", "home");
            }}
            className="flex items-center gap-2.5 select-none flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.12, rotate: -8 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              className="relative w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
              style={{
                background: "linear-gradient(145deg,#ef4444 0%,#9f1239 100%)",
                animation: "logo-pulse 2.8s ease-in-out infinite",
              }}
            >
              <span
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 100%)",
                }}
              />
              <span className="relative z-10 syne text-white font-bold text-base leading-none">
                M
              </span>
            </motion.div>

            {/* Wordmark — desktop only */}
            <span
              className="syne hidden md:block text-[17px] font-bold tracking-[-0.01em]"
              style={{
                background: "linear-gradient(90deg,#f87171,#fca5a5,#f87171)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "word-shimmer 4s linear infinite",
              }}
            >
              MaazYounas
            </span>
          </Link>

          {/* ── CENTER: Pill nav — DESKTOP ONLY ──────────── */}
          <nav
            className="hidden lg:flex items-center rounded-full px-1 py-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === "/" && activeSection === link.hash;
              return (
                <Link
                  key={link.hash}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.hash, link.sectionId)}
                  className="relative outfit px-4 py-1.5 rounded-full text-sm font-medium select-none transition-colors duration-150"
                  style={{
                    color: isActive ? "#fff" : "rgba(190,190,205,0.65)",
                  }}
                >
                  {isActive && <ActivePill />}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT: Resume CTA ─────────────────────────── */}
          {resumeUrl && (
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-semibold outfit overflow-hidden select-none flex-shrink-0"
              style={{
                background: "linear-gradient(135deg,#ef4444,#be123c)",
                boxShadow: "0 0 20px rgba(239,68,68,0.5)",
              }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(100deg,transparent 30%,rgba(255,255,255,0.22) 50%,transparent 70%)",
                  animation: "shimmer-sweep 2.5s linear infinite",
                  animationDelay: "0.8s",
                }}
              />
              <FileText className="relative z-10 w-3.5 h-3.5" />
              <span className="relative z-10  sm:inline">Resume</span>
              <Download className="relative z-10 w-3.5 h-3.5" />
            </motion.a>
          )}
        </motion.div>
      </motion.header>
    </>
  );
};

export default Navbar;
