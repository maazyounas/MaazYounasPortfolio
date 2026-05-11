import { AnimatePresence, motion } from "framer-motion";

interface ProjectsTechFiltersProps {
  showFilters: boolean;
  isDesktop: boolean;
  selectedTech: string;
  allTechnologies: string[];
  techCounts: Record<string, number>;
  setSelectedTech: (tech: string) => void;
  setShowFilters: (value: boolean) => void;
}

const ProjectsTechFilters = ({
  showFilters,
  isDesktop,
  selectedTech,
  allTechnologies,
  techCounts,
  setSelectedTech,
  setShowFilters,
}: ProjectsTechFiltersProps) => {
  return (
    <AnimatePresence>
      {(showFilters || isDesktop) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedTech("all");
                setShowFilters(false);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                selectedTech === "all"
                  ? "bg-primary text-primary-foreground border-primary neon-glow-soft"
                  : "bg-secondary text-foreground border-border/50 hover:border-primary/50"
              }`}
            >
              All Projects ({techCounts.all})
            </motion.button>

            {allTechnologies.map((tech) => (
              <motion.button
                key={tech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedTech(tech);
                  setShowFilters(false);
                }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                  selectedTech === tech
                    ? "bg-primary text-primary-foreground border-primary neon-glow-soft"
                    : "bg-secondary text-foreground border-border/50 hover:border-primary/50"
                }`}
              >
                {tech} ({techCounts[tech]})
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectsTechFilters;
