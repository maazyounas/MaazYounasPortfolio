import { motion } from "framer-motion";
import { ExternalLink, Github, Pencil, Star, Trash2 } from "lucide-react";
import { Project } from "../../../lib/adminService";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (project: Project) => void;
}

const ProjectCard = ({ project, onEdit, onDelete, onToggleFeatured }: ProjectCardProps) => {
  const formatDate = (value?: string) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toISOString().slice(0, 10);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className={`rounded-xl border transition-all duration-300 group ${
        project.visible
          ? "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          : "border-gray-100 dark:border-gray-800 opacity-60"
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex-shrink-0 mb-4">
          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 rounded-lg object-cover"
              loading="lazy"
            />
            <div className="absolute top-2 right-2">
              {project.featured && (
                <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> Featured
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    project.complexity === "beginner"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : project.complexity === "intermediate"
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                  }`}
                >
                  {project.complexity || "intermediate"}
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                  {project.category || "web"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFeatured(project)}
                className="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
                title={project.featured ? "Unfeature" : "Feature"}
              >
                <Star
                  className={`w-4 h-4 ${
                    project.featured
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
              <button
                onClick={() => onEdit(project)}
                className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                title="Edit project"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                title="Delete project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.slice(0, 4).map((tech, idx) => (
              <span
                key={`${tech}-${idx}`}
                className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              {project.link && project.showLink !== false && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" /> Demo
                </a>
              )}
              {project.github && project.showGithub !== false && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 text-sm flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3 h-3" /> Code
                </a>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(project.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
