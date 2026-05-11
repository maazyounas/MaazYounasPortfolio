import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Copy, Sparkles } from "lucide-react";
import { HomePageData } from "../../../lib/adminService";

interface HeroSectionEditorProps {
  expanded: boolean;
  onToggle: () => void;
  formData: HomePageData;
  onChange: (next: HomePageData) => void;
  onCopy: (text: string) => void;
}

const HeroSectionEditor = ({
  expanded,
  onToggle,
  formData,
  onChange,
  onCopy,
}: HeroSectionEditorProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass rounded-2xl border border-border/50 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-foreground">
              Hero Section
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Customize your main headline and description
            </p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-secondary/50">
          {expanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="p-6 pt-0 space-y-4">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                <div className="flex items-center justify-between">
                  <span>Main Tagline</span>
                  <span className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded">
                    {formData.heroTagline.length}/70
                  </span>
                </div>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.heroTagline}
                  onChange={(e) =>
                    onChange({ ...formData, heroTagline: e.target.value })
                  }
                  className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-lg font-semibold text-foreground placeholder:text-muted-foreground/50"
                  placeholder="Your amazing tagline..."
                  maxLength={70}
                />
                <button
                  onClick={() => onCopy(formData.heroTagline)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Copy tagline"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                <div className="flex items-center justify-between">
                  <span>Description</span>
                  <span className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded">
                    {formData.heroDescription.length}/160
                  </span>
                </div>
              </label>
              <div className="relative group">
                <textarea
                  value={formData.heroDescription}
                  onChange={(e) =>
                    onChange({ ...formData, heroDescription: e.target.value })
                  }
                  className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none text-foreground placeholder:text-muted-foreground/50"
                  rows={4}
                  placeholder="A brief description of who you are and what you do..."
                  maxLength={160}
                />
                <button
                  onClick={() => onCopy(formData.heroDescription)}
                  className="absolute right-3 top-3 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Copy description"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                This appears below your tagline. Keep it concise and engaging.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default HeroSectionEditor;
