"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import {
  ExternalLink,
  Github,
  Code2,
  Sparkles,
  Eye,
  Share2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Layers,
  Star,
  Copy,
} from "lucide-react";
import { adminService, Project } from "../lib/adminService";
import { toast } from "sonner";

/* ──────────────────────────────────────────────────────────
   SKELETON
   ────────────────────────────────────────────────────────── */
const SkeletonBlock = ({ h = "h-4", w = "w-full", className = "" }) => (
  <div
    className={`rounded-xl animate-pulse ${h} ${w} ${className}`}
    style={{ background: "rgba(239,68,68,0.07)" }}
  />
);

const ProjectSkeleton = () => (
  <Layout>
    <section className="relative section-padding min-h-screen overflow-hidden">
      <div className="container-responsive max-w-4xl relative z-10">
        <SkeletonBlock h="h-8" w="w-28" className="mb-8" />
        <SkeletonBlock h="h-7" w="w-36" className="mx-auto mb-6" />
        <SkeletonBlock h="h-12" w="w-full" className="mb-3" />
        <SkeletonBlock h="h-8" w="w-2/3" className="mx-auto mb-10" />
        <div className="aspect-video rounded-2xl mb-10" style={{ background: "rgba(239,68,68,0.07)" }} />
        <div className="space-y-3 mb-10">
          <SkeletonBlock /><SkeletonBlock w="w-5/6" /><SkeletonBlock w="w-4/5" />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl p-6 space-y-3" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)" }}>
            <SkeletonBlock h="h-5" w="w-1/2" />
            <SkeletonBlock h="h-4" w="w-2/3" />
          </div>
          <div className="rounded-2xl p-6 space-y-3" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)" }}>
            <SkeletonBlock h="h-5" w="w-1/2" />
            <div className="flex flex-wrap gap-2">{[...Array(5)].map((_, i) => <SkeletonBlock key={i} h="h-7" w="w-16" />)}</div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          {[...Array(3)].map((_, i) => <SkeletonBlock key={i} h="h-12" w="w-36" />)}
        </div>
      </div>
    </section>
  </Layout>
);

/* ──────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────── */
const ProjectDescription = () => {
  const params = useParams<{ id: string | string[] }>();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projects = await adminService.getProjects();
        setAllProjects(projects);
        const found = projects.find((p) => p.id === id);
        if (found) {
          setProject(found);
          adminService.addProjectView(found.id);
        } else {
          toast.error("Project not found");
          router.push("/projects");
        }
      } catch {
        toast.error("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, router]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const currentIndex = allProjects.findIndex((p) => p.id === id);
  const nextProject = allProjects[currentIndex + 1];
  const prevProject = allProjects[currentIndex - 1];

  if (loading) return <ProjectSkeleton />;
  if (!project) return null;

  return (
    <Layout>
      <style jsx global>{`
        @keyframes pd-orb-drift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(30px,-20px) scale(1.06); }
        }
        @keyframes pd-image-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(239,68,68,0.15), 0 24px 64px rgba(0,0,0,0.6); }
          50%       { box-shadow: 0 0 60px rgba(239,68,68,0.25), 0 24px 64px rgba(0,0,0,0.6); }
        }
      `}</style>

      <section className="relative section-padding min-h-screen overflow-hidden">
        {/* ── Ambient orbs ──────────────────────────── */}
        <div
          className="absolute top-0 right-0 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(239,68,68,0.14) 0%, transparent 70%)",
            filter: "blur(4px)",
            animation: "pd-orb-drift 16s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        {/* ── Grid texture ──────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(239,68,68,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.6) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        <div className="container-responsive max-w-4xl relative z-10">

          {/* ── Back button ───────────────────────────── */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.back()}
            whileHover={{ x: -4 }}
            className="group flex items-center gap-2 mb-10 font-body text-sm font-medium transition-colors duration-200"
            style={{ color: "rgba(150,150,170,0.85)" }}
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              style={{ color: "rgba(239,68,68,0.8)" }}
            />
            Back to Projects
          </motion.button>

          {/* ── Featured badge ────────────────────────── */}
          {project.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex justify-center mb-5"
            >
              <div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg,#ef4444,#be123c)",
                  boxShadow: "0 0 20px rgba(239,68,68,0.5)",
                }}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                Featured Project
              </div>
            </motion.div>
          )}

          {/* ── Title block ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            <h1
              className="font-display font-bold text-metallic-animated mb-3 break-words"
              style={{ fontSize: "clamp(2rem, 5.5vw, 3.2rem)" }}
            >
              {project.title}
            </h1>
            {project.tagline && (
              <p
                className="font-body text-lg sm:text-xl"
                style={{ color: "rgba(150,150,170,0.85)" }}
              >
                {project.tagline}
              </p>
            )}

            {/* Decorative divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mt-6 h-px max-w-xs"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.55) 30%, rgba(239,68,68,0.55) 70%, transparent)",
              }}
            />
          </motion.div>

          {/* ── Hero image ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 rounded-2xl overflow-hidden cursor-pointer group"
            style={{ animation: "pd-image-glow 5s ease-in-out infinite" }}
            onClick={() => setSelectedImage(project.image)}
          >
            <div className="relative aspect-video">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                priority
              />
              {/* gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, rgba(4,4,6,0.55) 0%, transparent 55%)",
                  opacity: 0.5,
                }}
              />
              {/* hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(4,4,6,0.55)" }}
              >
                <div
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium text-white"
                  style={{
                    background: "rgba(239,68,68,0.85)",
                    boxShadow: "0 4px 20px rgba(239,68,68,0.4)",
                  }}
                >
                  <Eye className="w-4 h-4" />
                  View Full Image
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Description ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-10 p-6 sm:p-8 rounded-2xl"
            style={{
              background: "rgba(7,7,10,0.7)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2
              className="font-display font-bold text-lg sm:text-xl mb-4 flex items-center gap-2"
              style={{ color: "rgba(215,215,230,0.95)" }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "#ef4444" }} />
              About This Project
            </h2>
            <p
              className="font-body text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-justify"
              style={{ color: "rgba(140,140,162,0.9)" }}
            >
              {project.description}
            </p>
          </motion.div>

          {/* ── Category + Tech grid ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
          >
            {/* Category */}
            <div
              className="p-5 sm:p-6 rounded-2xl"
              style={{
                background: "rgba(7,7,10,0.75)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <h3
                className="font-display font-bold text-base sm:text-lg mb-3 flex items-center gap-2"
                style={{ color: "rgba(215,215,230,0.95)" }}
              >
                <Code2 className="w-4 h-4" style={{ color: "#ef4444" }} />
                Category
              </h3>
              <span
                className="font-body text-sm px-3 py-1.5 rounded-lg"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "rgba(239,68,68,0.9)",
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Technologies */}
            <div
              className="p-5 sm:p-6 rounded-2xl"
              style={{
                background: "rgba(7,7,10,0.75)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <h3
                className="font-display font-bold text-base sm:text-lg mb-3 flex items-center gap-2"
                style={{ color: "rgba(215,215,230,0.95)" }}
              >
                <Layers className="w-4 h-4" style={{ color: "#ef4444" }} />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + index * 0.04 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="font-body px-2.5 py-1 text-xs sm:text-sm rounded-lg cursor-default transition-all duration-200"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.22)",
                      color: "rgba(190,190,210,0.85)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.background = "rgba(239,68,68,0.16)";
                      el.style.borderColor = "rgba(239,68,68,0.5)";
                      el.style.color = "#ef4444";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.background = "rgba(239,68,68,0.08)";
                      el.style.borderColor = "rgba(239,68,68,0.22)";
                      el.style.color = "rgba(190,190,210,0.85)";
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Action buttons ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-14"
          >
            {project.showLink && project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                Live Demo
              </motion.a>
            )}

            {project.showGithub && project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost flex items-center gap-2 px-6 py-2.5 text-sm sm:text-base"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                View Code
              </motion.a>
            )}

            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-sm sm:text-base font-semibold transition-all duration-250"
              style={{
                background: "rgba(7,7,10,0.8)",
                border: copied
                  ? "1.5px solid rgba(34,197,94,0.6)"
                  : "1.5px solid rgba(255,255,255,0.12)",
                color: copied ? "rgba(74,222,128,0.9)" : "rgba(180,180,200,0.85)",
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Share
                </>
              )}
            </motion.button>
          </motion.div>

          {/* ── Prev / Next navigation ────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            {/* section label */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(90deg, rgba(239,68,68,0.35), transparent)",
                }}
              />
              <span
                className="font-body text-xs uppercase tracking-widest"
                style={{ color: "rgba(239,68,68,0.7)" }}
              >
                More Projects
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(270deg, rgba(239,68,68,0.35), transparent)",
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Prev */}
              {prevProject ? (
                <motion.button
                  onClick={() => router.push(`/projects/${prevProject.id}`)}
                  whileHover={{ scale: 1.02, x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl text-left transition-all duration-300"
                  style={{
                    background: "rgba(7,7,10,0.75)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(239,68,68,0.4)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(239,68,68,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:-translate-x-1"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" style={{ color: "#ef4444" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-body text-xs uppercase tracking-wider mb-0.5"
                      style={{ color: "rgba(239,68,68,0.7)" }}
                    >
                      Previous
                    </p>
                    <p
                      className="font-body text-sm font-medium truncate"
                      style={{ color: "rgba(215,215,230,0.9)" }}
                    >
                      {prevProject.title}
                    </p>
                  </div>
                </motion.button>
              ) : <div />}

              {/* Next */}
              {nextProject ? (
                <motion.button
                  onClick={() => router.push(`/projects/${nextProject.id}`)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl text-right sm:flex-row-reverse transition-all duration-300"
                  style={{
                    background: "rgba(7,7,10,0.75)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(239,68,68,0.4)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(239,68,68,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:translate-x-1"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                    }}
                  >
                    <ChevronRight className="w-5 h-5" style={{ color: "#ef4444" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-body text-xs uppercase tracking-wider mb-0.5"
                      style={{ color: "rgba(239,68,68,0.7)" }}
                    >
                      Next
                    </p>
                    <p
                      className="font-body text-sm font-medium truncate"
                      style={{ color: "rgba(215,215,230,0.9)" }}
                    >
                      {nextProject.title}
                    </p>
                  </div>
                </motion.button>
              ) : <div />}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Image lightbox modal ──────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              className="absolute top-4 right-4 p-2.5 rounded-xl z-10 transition-all duration-200"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.35)",
              }}
            >
              <X className="w-5 h-5" style={{ color: "#ef4444" }} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-[90vw] max-h-[90vh]"
            >
              <Image
                src={selectedImage}
                alt="Project preview"
                fill
                className="object-contain rounded-2xl"
                style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(239,68,68,0.15)" }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ProjectDescription;