interface ProjectSkeletonProps {
  viewMode: "grid" | "list";
}

const ProjectSkeleton = ({ viewMode }: ProjectSkeletonProps) => {
  return (
    <div
      className={`rounded-xl glass border border-border/50 p-4 animate-pulse ${
        viewMode === "grid" ? "h-[320px]" : "h-[140px]"
      }`}
    >
      <div className="w-full h-40 bg-muted rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
    </div>
  );
};

export default ProjectSkeleton;
