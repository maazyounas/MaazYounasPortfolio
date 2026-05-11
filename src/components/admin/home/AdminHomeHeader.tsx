import { RefreshCw, Save } from "lucide-react";

interface AdminHomeHeaderProps {
  onReset: () => void;
  onSave: () => void;
}

const AdminHomeHeader = ({ onReset, onSave }: AdminHomeHeaderProps) => {
  return (
    <div className="glass rounded-2xl border border-border/50 p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-metallic">
            Home Page Management
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Customize your home page hero section and motivational quotes
          </p>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button
            onClick={onReset}
            className="px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground border border-border/50 hover:border-border rounded-xl hover:bg-secondary/50 transition-all duration-200 flex items-center gap-2 flex-1 lg:flex-none justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 flex items-center gap-2 flex-1 lg:flex-none justify-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeHeader;
