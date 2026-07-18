
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import TiltCard from "../ui/TiltCard";
import { adminService, Project } from "../../lib/adminService";

interface ProjectCardProps {
  project: Project;
  index: number;
  pinned?: boolean;
}

const ProjectCard = ({ project, index, pinned }: ProjectCardProps) => {
  const router = useRouter();

  const handleView = () => {
    adminService.addProjectView(project.id);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".action-button")) return;
    handleView();
    router.push(`/projects/${project.id}`);
  };

  const visibleTech = project.tech.slice(0, 3);
  const remainingTech = project.tech.length - 3;

  return (
    <div
      className="h-full cursor-pointer group"
      onClick={handleCardClick}
    >
      <TiltCard>
        <div
          className="relative h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            background: "rgba(7,7,10,0.85)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.border = "1px solid rgba(239,68,68,0.45)";
            el.style.boxShadow =
              "0 8px 40px rgba(0,0,0,0.6), 0 0 32px rgba(239,68,68,0.12)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.border = "1px solid rgba(255,255,255,0.07)";
            el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.45)";
          }}
        >
          {/* ── Featured badge ──────────────────────── */}
          {project.featured && (
            <div className="absolute top-3 left-3 z-20">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body text-[10px] sm:text-xs font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg,#ef4444,#be123c)",
                  boxShadow: "0 0 14px rgba(239,68,68,0.5)",
                }}
              >
                <Star className="w-2.5 h-2.5 fill-current" />
                Featured
              </div>
            </div>
          )}

          {/* ── Image ───────────────────────────────── */}
          <div
            className="relative h-44 sm:h-48 flex-shrink-0 overflow-hidden"
            style={{ background: "rgba(239,68,68,0.05)" }}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover sm:will-change-transform"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* gradient overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
              style={{
                background:
                  "linear-gradient(to top, rgba(4,4,6,0.7) 0%, rgba(4,4,6,0.2) 55%, transparent 100%)",
                opacity: 0.6,
              }}
            />

            {/* Hover action buttons */}
            <div
              className="action-button absolute inset-0 flex items-center justify-center gap-3 sm:backdrop-blur-md"
              style={{ background: "rgba(4,4,6,0.88)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {project.showLink && project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { e.stopPropagation(); handleView(); }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-body text-xs sm:text-sm font-medium text-white"
                  style={{
                    background: "linear-gradient(135deg,#ef4444,#be123c)",
                    boxShadow: "0 4px 16px rgba(239,68,68,0.45)",
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Live Demo
                </a>
              )}

              {project.showGithub && project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { e.stopPropagation(); handleView(); }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-body text-xs sm:text-sm font-medium transition-all duration-200"
                  style={{
                    background: "rgba(7,7,10,0.9)",
                    border: "1px solid rgba(239,68,68,0.35)",
                    color: "rgba(220,220,235,0.9)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(239,68,68,0.7)";
                    el.style.color = "#ef4444";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(239,68,68,0.35)";
                    el.style.color = "rgba(220,220,235,0.9)";
                  }}
                >
                  <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Code
                </a>
              )}
            </div>

            {/* Corner arrow */}
            <div
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                background: "rgba(7,7,10,0.88)",
                border: "1px solid rgba(239,68,68,0.3)",
              }}
            >
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#ef4444" }} />
            </div>
          </div>

          {/* ── Content ─────────────────────────────── */}
          <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1">
            {/* Title + underline */}
            <div className="mb-3 sm:mb-4">
              <h3
                className="font-display font-bold text-lg sm:text-xl mb-2 line-clamp-1 transition-colors duration-300 group-hover:text-red-400"
                style={{ color: "rgba(215,215,230,0.95)" }}
              >
                {project.title}
              </h3>
              {/* Animated bottom line via ref */}
              <div
                className="h-px transition-all duration-500"
                style={{
                  width: "3rem",
                  background: "linear-gradient(90deg,#ef4444,rgba(239,68,68,0.3))",
                }}
                ref={(el) => {
                  if (!el) return;
                  const card = el.closest(".group");
                  if (!card) return;
                  const expand = () => (el.style.width = "100%");
                  const shrink = () => (el.style.width = "3rem");
                  card.addEventListener("mouseenter", expand);
                  card.addEventListener("mouseleave", shrink);
                }}
              />
            </div>

            {/* Description */}
            <div className="mb-4 sm:mb-5 flex-1">
              <p
                className="font-body text-xs sm:text-sm leading-relaxed line-clamp-3 text-justify"
                style={{ color: "rgba(135,135,155,0.9)" }}
              >
                {project.description}
              </p>
            </div>

            {/* Tech badges */}
            <div
              className="mt-auto pt-3 sm:pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden flex-wrap">
                {visibleTech.map((tech, techIndex) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-2.5 py-1 font-body text-[10px] sm:text-xs rounded-lg cursor-default whitespace-nowrap font-medium transition-all duration-250"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "rgba(190,190,210,0.85)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.background = "rgba(239,68,68,0.15)";
                      el.style.borderColor = "rgba(239,68,68,0.45)";
                      el.style.color = "#ef4444";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.background = "rgba(239,68,68,0.08)";
                      el.style.borderColor = "rgba(239,68,68,0.2)";
                      el.style.color = "rgba(190,190,210,0.85)";
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {remainingTech > 0 && (
                  <span
                    className="px-2 sm:px-2.5 py-1 font-body text-[10px] sm:text-xs rounded-lg whitespace-nowrap font-semibold"
                    style={{
                      background: "rgba(239,68,68,0.14)",
                      border: "1px solid rgba(239,68,68,0.38)",
                      color: "#ef4444",
                    }}
                  >
                    +{remainingTech}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Gradient wash on hover */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(ellipse at top left, rgba(239,68,68,0.07) 0%, transparent 60%)",
            }}
          />

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(90deg, transparent, #ef4444 35%, #ef4444 65%, transparent)",
            }}
          />
        </div>
      </TiltCard>
    </div>
  );
};

export default ProjectCard;