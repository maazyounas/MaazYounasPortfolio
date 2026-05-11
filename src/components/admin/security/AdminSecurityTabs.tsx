import { Key, Mail } from "lucide-react";

interface AdminSecurityTabsProps {
  activeTab: "change" | "forgot";
  onChange: (tab: "change" | "forgot") => void;
}

const AdminSecurityTabs = ({ activeTab, onChange }: AdminSecurityTabsProps) => {
  return (
    <div className="flex border-b border-border/50">
      <button
        onClick={() => onChange("change")}
        className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
          activeTab === "change"
            ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-500 border-b-2 border-blue-500"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
        }`}
      >
        <Key className="w-5 h-5 inline-block mr-2" />
        Change Password
      </button>
      <button
        onClick={() => onChange("forgot")}
        className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
          activeTab === "forgot"
            ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-500 border-b-2 border-amber-500"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
        }`}
      >
        <Mail className="w-5 h-5 inline-block mr-2" />
        Forgot Password
      </button>
    </div>
  );
};

export default AdminSecurityTabs;
