import { Plus } from "lucide-react";

interface ProjectsHeaderProps {
  total: number;
  onAdd: () => void;
}

const ProjectsHeader = ({ total, onAdd }: ProjectsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Projects Management
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your portfolio projects ({total} total)
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsHeader;
