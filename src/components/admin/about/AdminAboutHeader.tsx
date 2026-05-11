import { Save } from "lucide-react";

interface AdminAboutHeaderProps {
  onSave: () => void;
}

const AdminAboutHeader = ({ onSave }: AdminAboutHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-white">About Page Management</h2>
        <p className="text-gray-400">Manage your profile and technologies</p>
      </div>
      <button
        onClick={onSave}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
      >
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  );
};

export default AdminAboutHeader;
