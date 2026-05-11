import type React from "react";
import { ChevronDown, ChevronUp, Upload } from "lucide-react";
import { AboutPageData } from "../../../lib/adminService";

interface AboutProfileSectionProps {
  formData: AboutPageData;
  expanded: boolean;
  onToggle: () => void;
  onChange: (next: AboutPageData) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditImage?: () => void;
}

const AboutProfileSection = ({
  formData,
  expanded,
  onToggle,
  onChange,
  onImageUpload,
  onEditImage,
}: AboutProfileSectionProps) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="px-6 py-4 flex items-center justify-between bg-gray-800 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Profile Information</h3>
        <button onClick={onToggle}>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="px-6 pb-6 space-y-6 pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex flex-col items-center md:items-start">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-700 bg-gray-900 shadow-xl">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <Upload className="w-8 h-8" />
                    </div>
                  )}
                </div>
                
                {formData.profileImage && (
                  <button
                    onClick={onEditImage}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full"
                    title="Adjust frame"
                  >
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/30">
                      Adjust Frame
                    </span>
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full mt-4">
                <label className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600">
                  <Upload className="w-4 h-4" />
                  {formData.profileImage ? "Change Photo" : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[10px] text-gray-500 text-center">
                  Max 5MB • PNG, JPG, WebP
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) =>
                    onChange({ ...formData, tagline: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Your professional tagline"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => onChange({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none transition-all"
                  rows={4}
                  placeholder="Professional biography"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutProfileSection;
