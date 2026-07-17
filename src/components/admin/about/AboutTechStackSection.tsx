import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Search, X } from "lucide-react";
import { AboutPageData } from "../../../lib/adminService";
import {
  getIconComponent,
  loadAllIcons,
  type IconComponentType,
} from "./iconUtils";

interface TechItem {
  name: string;
  icon: string;
}

interface AboutTechStackSectionProps {
  formData: AboutPageData;
  expanded: boolean;
  newTech: string;
  selectedIcon: string;
  showIconPicker: boolean;
  iconQuery: string;
  onToggle: () => void;
  onChangeFormData: (next: AboutPageData) => void;
  onChangeNewTech: (value: string) => void;
  onChangeSelectedIcon: (value: string) => void;
  onToggleIconPicker: () => void;
  onChangeIconQuery: (value: string) => void;
  onAddTech: () => void;
  onRemoveTech: (index: number) => void;
}

const AboutTechStackSection = ({
  formData,
  expanded,
  newTech,
  selectedIcon,
  showIconPicker,
  iconQuery,
  onToggle,
  onChangeFormData,
  onChangeNewTech,
  onChangeSelectedIcon,
  onToggleIconPicker,
  onChangeIconQuery,
  onAddTech,
  onRemoveTech,
}: AboutTechStackSectionProps) => {
  const [allIcons, setAllIcons] = useState<[string, IconComponentType][]>([]);
  const [loadingIcons, setLoadingIcons] = useState(false);

  useEffect(() => {
    if (!expanded && !showIconPicker) return;

    let active = true;
    setLoadingIcons(true);

    loadAllIcons()
      .then((icons) => {
        if (!active) return;
        setAllIcons(Object.entries(icons) as [string, IconComponentType][]);
      })
      .finally(() => {
        if (active) setLoadingIcons(false);
      });

    return () => {
      active = false;
    };
  }, [expanded, showIconPicker]);

  const filteredIcons = allIcons.filter(([iconName]) =>
    iconName.toLowerCase().includes(iconQuery.toLowerCase()),
  );

  const DynamicIcon = ({ iconName }: { iconName: string }) => {
    const [ResolvedIconComponent, setResolvedIconComponent] =
      useState<IconComponentType | null>(null);

    useEffect(() => {
      let active = true;
      setResolvedIconComponent(null);

      getIconComponent(iconName).then((icon) => {
        if (active && icon) {
          setResolvedIconComponent(() => icon);
        }
      });

      return () => {
        active = false;
      };
    }, [iconName]);

    if (!ResolvedIconComponent) return null;
    return <ResolvedIconComponent className="w-5 h-5" />;
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="px-6 py-4 flex items-center justify-between bg-gray-800 border-b border-gray-700">
        <div>
          <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
          <p className="text-sm text-gray-400">
            {formData.techStack.length} technologies
          </p>
        </div>
        <button onClick={onToggle}>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="px-6 pb-6 space-y-6">
          <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="font-medium text-white">Add Technology</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technology Name
                </label>
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => onChangeNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && onAddTech()}
                  placeholder="e.g., React, Node.js"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Icon
                </label>
                <div className="relative">
                  <button
                    onClick={onToggleIconPicker}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white flex items-center justify-between hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {selectedIcon && (
                        <div className="text-blue-400">
                          <DynamicIcon iconName={selectedIcon} />
                        </div>
                      )}
                      <span className="text-gray-300">
                        {selectedIcon || "Select icon..."}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {showIconPicker && (
                    <div className="absolute z-50 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-96 overflow-hidden">
                      <div className="p-3 border-b border-gray-700">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="text"
                            value={iconQuery}
                            onChange={(e) => onChangeIconQuery(e.target.value)}
                            placeholder="Search icons..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>

                      <div className="overflow-y-auto max-h-64">
                        {loadingIcons ? (
                          <div className="p-3 text-sm text-gray-500">
                            Loading icons...
                          </div>
                        ) : (
                          <div className="grid grid-cols-8 gap-2 p-3">
                            {filteredIcons.slice(0, 96).map(([iconName, Icon]) => (
                              <button
                                key={iconName}
                                onClick={() => {
                                  onChangeSelectedIcon(iconName);
                                  onToggleIconPicker();
                                }}
                                className={`p-2 rounded flex items-center justify-center transition-colors ${
                                  selectedIcon === iconName
                                    ? "bg-blue-900/30 border border-blue-700"
                                    : "bg-gray-900 hover:bg-gray-700 border border-transparent"
                                }`}
                                title={iconName}
                              >
                                <Icon className="w-4 h-4 text-gray-300" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={onAddTech}
                disabled={!newTech.trim() || !selectedIcon}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Technology
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-white">
                Technologies ({formData.techStack.length})
              </h4>
              {formData.techStack.length > 0 && (
                <span className="text-sm text-gray-400">
                  Click Ã— to remove
                </span>
              )}
            </div>

            {formData.techStack.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {formData.techStack.map((tech, index) => {
                  return (
                    <div
                      key={`${tech.name}-${index}`}
                      className="p-3 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-blue-400">
                            <DynamicIcon iconName={tech.icon} />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-white text-sm">
                              {tech.name}
                            </div>
                            <div className="text-xs text-gray-500 font-mono">
                              {tech.icon}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveTech(index)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900/30">
                <div className="inline-flex p-4 rounded-full bg-gray-800 mb-4">
                  <div className="text-gray-500">?</div>
                </div>
                <h4 className="text-lg font-medium text-gray-300 mb-2">
                  No Technologies Added
                </h4>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Add technologies to showcase your skills
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutTechStackSection;
