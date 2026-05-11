"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
} from "lucide-react";
import { Project, adminService } from "../../lib/adminService";
import { toast } from "sonner";
import ProjectsHeader from "./projects/ProjectsHeader";
import ProjectsStats from "./projects/ProjectsStats";
import ProjectsToolbar from "./projects/ProjectsToolbar";
import ProjectCard from "./projects/ProjectCard";
import ProjectsReorderList from "./projects/ProjectsReorderList";
import ProjectModal from "./projects/ProjectModal";

interface AdminProjectsProps {
  projects: Project[];
  onUpdate: () => void;
}

interface FilterState {
  search: string;
  category: string;
  complexity: string;
  featured: string;
}

const AdminProjects = ({
  projects: initialProjects,
  onUpdate,
}: AdminProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Partial<Project> | null>(null);
  const [newTech, setNewTech] = useState("");
  const [filterState, setFilterState] = useState<FilterState>({
    search: "",
    category: "all",
    complexity: "all",
    featured: "all",
  });
  const [isReordering, setIsReordering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Memoized calculations
  const stats = useMemo(
    () => ({
      total: projects.length,
      visible: projects.filter((p) => p.visible).length,
      hidden: projects.filter((p) => !p.visible).length,
      featured: projects.filter((p) => p.featured).length,
    }),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          !filterState.search ||
          project.title
            .toLowerCase()
            .includes(filterState.search.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(filterState.search.toLowerCase()) ||
          project.tech.some((tech) =>
            tech.toLowerCase().includes(filterState.search.toLowerCase()),
          );

        const matchesCategory =
          filterState.category === "all" ||
          project.category === filterState.category;
        const matchesComplexity =
          filterState.complexity === "all" ||
          project.complexity === filterState.complexity;
        const matchesFeatured =
          filterState.featured === "all" ||
          (filterState.featured === "featured" && project.featured) ||
          (filterState.featured === "normal" && !project.featured);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesComplexity &&
          matchesFeatured
        );
      })
      .sort((a, b) => {
        // Sort by featured first, then by order
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.order || 0) - (b.order || 0);
      });
  }, [projects, filterState]);

  // Effects
  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  // Handlers with useCallback
  const handleDelete = useCallback(
    async (id: string) => {
      if (!window.confirm("Are you sure you want to delete this project?"))
        return;

      try {
        await adminService.deleteProject(id);

        // 🔥 remove instantly from admin UI
        setProjects((prev) => prev.filter((p) => p.id !== id));

        toast.success("Project deleted successfully");

        // 🔁 also refetch for safety
        onUpdate();
      } catch (err) {
        toast.error("Failed to delete project");
      }
    },
    [onUpdate],
  );

  const handleToggleFeatured = useCallback(
    async (project: Project) => {
      try {
        await adminService.updateProject(project.id, {
          featured: !project.featured,
        });

        // 🔥 update local state instantly
        setProjects((prev) =>
          prev.map((p) =>
            p.id === project.id ? { ...p, featured: !p.featured } : p,
          ),
        );

        toast.success(`Project ${project.featured ? "unfeatured" : "featured"}`);
        onUpdate(); // optional safety refetch
      } catch (err) {
        toast.error("Failed to toggle featured status");
      }
    },
    [onUpdate],
  );

  const handleSave = useCallback(async () => {
    if (!editItem) return;
    if (!editItem.title?.trim() || !editItem.description?.trim()) {
      return toast.error("Title and description are required");
    }

    try {
      if (editItem.id) {
        await adminService.updateProject(editItem.id, editItem);
      } else {
        await adminService.addProject(editItem as Project);
      }
      setModalOpen(false);
      setEditItem(null);
      toast.success(editItem.id ? "Project updated" : "Project added");
      onUpdate();
    } catch (error) {
      toast.error("Failed to save project");
      console.error(error);
    }
  }, [editItem, onUpdate]);

  const createEmptyProject = useCallback(
    (): Partial<Project> => ({
      title: "",
      description: "",
      image: "",
      tech: [],
      link: "",
      github: "",
      featured: false,
      visible: true,
      category: "web",
      complexity: "intermediate",
      showGithub: true,
      showLink: true,
    }),
    [],
  );

  const openEditModal = useCallback((project: Partial<Project>) => {
    setEditItem(project);
    setModalOpen(true);
  }, []);

  const addTech = useCallback(() => {
    if (newTech.trim() && editItem) {
      setEditItem({
        ...editItem,
        tech: [...(editItem.tech || []), newTech.trim()],
      });
      setNewTech("");
    }
  }, [newTech, editItem]);

  const removeTech = useCallback(
    (techToRemove: string) => {
      if (editItem) {
        setEditItem({
          ...editItem,
          tech: (editItem.tech || []).filter((t) => t !== techToRemove),
        });
      }
    },
    [editItem],
  );

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editItem) return;

      if (!file.type.startsWith("image/"))
        return toast.error("Please select an image file");
      if (file.size > 5 * 1024 * 1024)
        return toast.error("Image size must be less than 5MB");

      const reader = new FileReader();
      reader.onload = (event) => {
        setEditItem({ ...editItem, image: event.target?.result as string });
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    },
    [editItem],
  );

  const handleReorder = useCallback((reorderedProjects: Project[]) => {
    const updatedProjects = reorderedProjects.map((project, index) => ({
      ...project,
      order: index,
    }));
    setProjects(updatedProjects);
  }, []);

  const saveOrder = useCallback(async () => {
    await Promise.all(
      projects.map((p, index) =>
        adminService.updateProject(p.id, { order: index }),
      ),
    );
    setIsReordering(false);
    toast.success("Project order saved");
    onUpdate();
  }, [projects, onUpdate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <ProjectsHeader
        total={projects.length}
        onAdd={() => openEditModal(createEmptyProject())}
      />

      {/* Stats */}
      <ProjectsStats
        total={stats.total}
        visible={stats.visible}
        hidden={stats.hidden}
        featured={stats.featured}
      />

      {/* Toolbar */}
      <ProjectsToolbar
        filterState={filterState}
        setFilterState={setFilterState}
      />

      {/* Projects Grid */}
      {isReordering ? (
        <ProjectsReorderList
          projects={filteredProjects}
          onReorder={handleReorder}
        />
      ) : (
        <>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {filterState.search
                  ? "Try adjusting your search terms"
                  : "Get started by adding your first project"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={(item) => openEditModal(item)}
                  onDelete={handleDelete}
                  onToggleFeatured={handleToggleFeatured}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Edit/Add Modal */}
      <ProjectModal
        open={modalOpen}
        editItem={editItem}
        newTech={newTech}
        setNewTech={setNewTech}
        fileInputRef={fileInputRef}
        onClose={() => {
          setModalOpen(false);
          setEditItem(null);
        }}
        onSave={handleSave}
        onAddTech={addTech}
        onRemoveTech={removeTech}
        onImageUpload={handleImageUpload}
        onChange={(update) => setEditItem({ ...(editItem || {}), ...update })}
      />
    </motion.div>
  );
};

export default AdminProjects;
