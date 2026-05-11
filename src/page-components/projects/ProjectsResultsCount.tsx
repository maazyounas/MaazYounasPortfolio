import { motion } from "framer-motion";

interface ProjectsResultsCountProps {
  filteredCount: number;
  totalCount: number;
  selectedTech: string;
  searchQuery: string;
}

const ProjectsResultsCount = ({
  filteredCount,
  totalCount,
  selectedTech,
  searchQuery,
}: ProjectsResultsCountProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-6 sm:mb-8 flex justify-center"
    >
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs sm:text-sm"
        style={{
          background: "rgba(7,7,10,0.7)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(140,140,160,0.85)",
        }}
      >
        <span
          className="font-semibold"
          style={{
            background: "linear-gradient(135deg,#ef4444,#fca5a5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {filteredCount}
        </span>
        <span>of</span>
        <span>{totalCount} projects</span>
        {selectedTech !== "all" && (
          <>
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: "rgba(239,68,68,0.6)" }}
            />
            <span style={{ color: "rgba(239,68,68,0.8)" }}>{selectedTech}</span>
          </>
        )}
        {searchQuery && (
          <>
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: "rgba(239,68,68,0.6)" }}
            />
            <span>
              matching{" "}
              <span style={{ color: "rgba(239,68,68,0.8)" }}>
                &ldquo;{searchQuery}&rdquo;
              </span>
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectsResultsCount;