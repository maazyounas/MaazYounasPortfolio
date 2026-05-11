import type React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Hash, Save, X } from "lucide-react";
import { Project } from "../../../lib/adminService";

interface ProjectModalProps {
  open: boolean;
  editItem: Partial<Project> | null;
  newTech: string;
  setNewTech: (value: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onClose: () => void;
  onSave: () => void;
  onAddTech: () => void;
  onRemoveTech: (tech: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (update: Partial<Project>) => void;
}

const ProjectModal = ({
  open,
  editItem,
  newTech,
  setNewTech,
  fileInputRef,
  onClose,
  onSave,
  onAddTech,
  onRemoveTech,
  onImageUpload,
  onChange,
}: ProjectModalProps) => {
  if (!open || !editItem) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">
              {editItem.id ? "Edit Project" : "Add New Project"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={editItem.title || ""}
                onChange={(e) => onChange({ title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project title..."
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editItem.featured || false}
                  onChange={(e) => onChange({ featured: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">
                  Featured Project (Shows first in user interface)
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              value={editItem.description || ""}
              onChange={(e) => onChange({ description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Describe your project..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={editItem.category || "web"}
                onChange={(e) => onChange({ category: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="design">UI/UX Design</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Complexity Level
              </label>
              <select
                value={editItem.complexity || "intermediate"}
                onChange={(e) =>
                  onChange({
                    complexity: e.target.value as
                      | "beginner"
                      | "intermediate"
                      | "advanced",
                  })
                }
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Project Image
            </label>
            <div className="flex items-center gap-4">
              {editItem.image && (
                <Image
                  src={editItem.image}
                  alt="Project"
                  width={96}
                  height={96}
                  className="rounded-lg object-cover border"
                />
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload Image
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">
                  <ExternalLink className="w-4 h-4 inline mr-2" /> Live Demo
                  URL
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editItem.showLink !== false}
                    onChange={(e) => onChange({ showLink: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Show on frontend
                </label>
              </div>
              <input
                type="url"
                value={editItem.link || ""}
                onChange={(e) => onChange({ link: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://demo.example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">
                  <Github className="w-4 h-4 inline mr-2" /> GitHub URL
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editItem.showGithub !== false}
                    onChange={(e) =>
                      onChange({ showGithub: e.target.checked })
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Show on frontend
                </label>
              </div>
              <input
                type="url"
                value={editItem.github || ""}
                onChange={(e) => onChange({ github: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Technologies Used
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {(editItem.tech || []).map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                >
                  <Hash className="w-3 h-3" />
                  {tech}
                  <button
                    onClick={() => onRemoveTech(tech)}
                    className="text-blue-500 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onAddTech()}
                className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add technology..."
              />
              <button
                onClick={onAddTech}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-6 border-t">
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editItem.id ? "Update Project" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
