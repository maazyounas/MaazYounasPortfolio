import { Search } from "lucide-react";

interface FilterState {
  search: string;
  category: string;
  complexity: string;
  featured: string;
}

interface ProjectsToolbarProps {
  filterState: FilterState;
  setFilterState: (state: FilterState) => void;
}

const ProjectsToolbar = ({ filterState, setFilterState }: ProjectsToolbarProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={filterState.search}
              onChange={(e) =>
                setFilterState({ ...filterState, search: e.target.value })
              }
              className="pl-10 pr-4 py-2 w-full md:w-64 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filterState.category}
            onChange={(e) =>
              setFilterState({ ...filterState, category: e.target.value })
            }
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm"
          >
            <option value="all">All Categories</option>
            <option value="web">Web Development</option>
            <option value="mobile">Mobile App</option>
            <option value="design">UI/UX Design</option>
            <option value="other">Other</option>
          </select>
          <select
            value={filterState.complexity}
            onChange={(e) =>
              setFilterState({ ...filterState, complexity: e.target.value })
            }
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select
            value={filterState.featured}
            onChange={(e) =>
              setFilterState({ ...filterState, featured: e.target.value })
            }
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm"
          >
            <option value="all">All Projects</option>
            <option value="featured">Featured Only</option>
            <option value="normal">Not Featured</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProjectsToolbar;
