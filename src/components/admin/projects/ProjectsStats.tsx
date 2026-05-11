import { Eye, FolderOpen, Grid3x3, Star } from "lucide-react";

interface ProjectsStatsProps {
  total: number;
  visible: number;
  hidden: number;
  featured: number;
}

const ProjectsStats = ({ total, visible, hidden, featured }: ProjectsStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
        </div>
        <p className="text-2xl font-bold mt-2">{total}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Visible</span>
        </div>
        <p className="text-2xl font-bold mt-2">{visible}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Featured</span>
        </div>
        <p className="text-2xl font-bold mt-2">{featured}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
        <div className="flex items-center gap-2">
          <Grid3x3 className="w-5 h-5 text-purple-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Hidden</span>
        </div>
        <p className="text-2xl font-bold mt-2">{hidden}</p>
      </div>
    </div>
  );
};

export default ProjectsStats;
