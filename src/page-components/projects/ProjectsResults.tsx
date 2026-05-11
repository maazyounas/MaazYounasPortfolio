import { AnimatePresence, motion } from "framer-motion";
import { Filter } from "lucide-react";
import ProjectCard from "../../components/projects/ProjectCard";
import { Project } from "../../lib/adminService";
import ProjectSkeleton from "./ProjectSkeleton";

interface ProjectsResultsProps {
  loading: boolean;
  viewMode: "grid" | "list";
  filteredProjects: Project[];
  totalProjects: number;
  selectedTech: string;
  searchQuery: string;
  onClearFilters: () => void;
  onProjectView: (projectId: string) => void;
}

const ProjectsResults = ({
  loading,
  viewMode,
  filteredProjects,
  totalProjects,
  selectedTech,
  searchQuery,
  onClearFilters,
  onProjectView,
}: ProjectsResultsProps) => {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeletons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              : "grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto"
          }
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectSkeleton key={i} viewMode={viewMode} />
          ))}
        </motion.div>
      ) : filteredProjects.length > 0 ? (
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr"
              : "grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto"
          }
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onProjectView(project.id)}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 sm:py-20 px-4"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Filter className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 break-words">
            No projects found
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-4 break-words">
            No projects match your current filters. Try adjusting your search or
            filter criteria.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearFilters}
            className="mt-2 sm:mt-4 px-6 py-2 btn-neon text-primary-foreground text-sm sm:text-base"
          >
            Clear Filters
          </motion.button>
          <p className="sr-only">
            {totalProjects} total projects, selected: {selectedTech}, search:
            {searchQuery}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectsResults;
