import { Reorder } from "framer-motion";
import Image from "next/image";
import { Move } from "lucide-react";
import { Project } from "../../../lib/adminService";

interface ProjectsReorderListProps {
  projects: Project[];
  onReorder: (projects: Project[]) => void;
}

const ProjectsReorderList = ({ projects, onReorder }: ProjectsReorderListProps) => {
  return (
    <Reorder.Group axis="y" values={projects} onReorder={onReorder} className="space-y-4">
      {projects.map((project) => (
        <Reorder.Item key={project.id} value={project} className="list-none">
          <div className="bg-white dark:bg-gray-800 rounded-xl border p-4 cursor-grab active:cursor-grabbing">
            <div className="flex items-center gap-4">
              <Move className="w-5 h-5 text-gray-400" />
              <div className="flex-1 flex items-center gap-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Position: {project.order + 1}
              </div>
            </div>
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default ProjectsReorderList;
