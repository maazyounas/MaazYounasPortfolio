"use client";

import { useState, useMemo, useEffect } from "react";
import Layout from "../components/layout/Layout";
import ProjectsHeader from "./projects/ProjectsHeader";
import ProjectsResultsCount from "./projects/ProjectsResultsCount";
import ProjectsResults from "./projects/ProjectsResults";
import { adminService, Project } from "../lib/adminService";

interface ProjectsProps {
  initialProjects: Project[];
  standalone?: boolean;
  sectionId?: string;
}

const Projects = ({
  initialProjects,
  standalone = true,
  sectionId,
}: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(initialProjects.length === 0);
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 640);
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (initialProjects.length > 0) return;
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [initialProjects]);

  const allTechnologies = useMemo(() => {
    return Array.from(
      new Set(projects.flatMap((project) => project.tech))
    ).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return [...projects]
      .filter((project) => {
        const matchesTech =
          selectedTech === "all" || project.tech.includes(selectedTech);
        const matchesSearch =
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTech && matchesSearch;
      })
      .sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
  }, [projects, selectedTech, searchQuery]);

  const techCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: projects.length };
    allTechnologies.forEach((tech) => {
      counts[tech] = projects.filter((p) => p.tech.includes(tech)).length;
    });
    return counts;
  }, [projects, allTechnologies]);

  const handleProjectView = (projectId: string) => {
    adminService.addProjectView(projectId);
  };

  const content = (
    <>
      <style jsx global>{`
        @keyframes projects-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-30px, 20px) scale(1.04); }
        }
      `}</style>

      <section
        id={sectionId}
        className="relative section-padding min-h-screen overflow-hidden scroll-mt-28"
      >
        {/* ── Ambient orbs ──────────────────────────── */}
        <div
          className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.12) 0%, transparent 70%)",
            filter: "blur(4px)",
            animation: "projects-orb-drift 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, transparent 70%)",
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
          <ProjectsHeader />

         

          <ProjectsResultsCount
            filteredCount={filteredProjects.length}
            totalCount={projects.length}
            selectedTech={selectedTech}
            searchQuery={searchQuery}
          />

          <ProjectsResults
            loading={loading}
            viewMode={viewMode}
            filteredProjects={filteredProjects}
            totalProjects={projects.length}
            selectedTech={selectedTech}
            searchQuery={searchQuery}
            onClearFilters={() => {
              setSelectedTech("all");
              setSearchQuery("");
            }}
            onProjectView={handleProjectView}
          />
        </div>
      </section>
    </>
  );

  if (!standalone) return content;
  return <Layout>{content}</Layout>;
};

export default Projects;