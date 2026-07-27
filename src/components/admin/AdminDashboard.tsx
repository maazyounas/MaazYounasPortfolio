"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Eye,
  Calendar,
  FolderKanban,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  FileText,
  Upload,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  Analytics,
  Project,
  Quote,
  adminService,
} from "../../lib/adminService";
import { toast } from "sonner";

interface AdminDashboardProps {
  analytics: Analytics;
  projects: Project[];
  quotes: Quote[];
  resumeUrl?: string;
  onUpdate?: () => void;
  isLoading?: boolean;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue: string;
  trend: number;
  color: string;
}

// Skeleton Components
const StatCardSkeleton = () => (
  <div className="glass rounded-xl p-4 sm:p-6 border border-border/50 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-secondary/50 rounded-xl" />
      <div className="w-16 h-6 bg-secondary/50 rounded" />
    </div>
    <div className="w-20 h-4 bg-secondary/50 rounded mb-2" />
    <div className="w-24 h-8 bg-secondary/50 rounded" />
  </div>
);

const AdminDashboard = ({
  analytics,
  projects,
  quotes,
  resumeUrl = "",
  onUpdate,
  isLoading = false,
}: AdminDashboardProps) => {
  const [todayLabel, setTodayLabel] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setTodayLabel(
      new Date().toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Resume size must be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      await adminService.uploadResume(file);
      toast.success("Resume uploaded successfully!");
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  const handleResumeDelete = async () => {
    if (!confirm("Are you sure you want to delete your resume? This will remove the link from the navbar.")) return;

    setDeleting(true);
    try {
      await adminService.deleteResume();
      toast.success("Resume deleted successfully");
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete resume");
    } finally {
      setDeleting(false);
    }
  };

  // Calculate metrics
  const activeProjects = projects.filter((p) => p.visible).length;
  const unreadQuotes = quotes.filter((q) => !q.read).length;
  const popularProjects = [...projects]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);
  const recentInquiries = [...quotes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <StatCardSkeleton key={i} />)}
        </div>
        <div className="h-96 bg-secondary/20 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header & Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border/30 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-metallic-animated">Portfolio Intelligence</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Analytics and management hub. Last updated {new Date(analytics.lastUpdated).toLocaleTimeString()}.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 text-xs font-medium text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          {todayLabel}
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard 
          icon={<Eye className="w-6 h-6 text-blue-400" />}
          label="Global Reach"
          value={analytics.totalViews.toLocaleString()}
          subValue={`${analytics.uniqueVisitors} unique visitors`}
          trend={+15}
          color="blue"
        />
        <StatCard 
          icon={<FolderKanban className="w-6 h-6 text-emerald-400" />}
          label="Project Activity"
          value={activeProjects.toString()}
          subValue={`${projects.length - activeProjects} draft projects`}
          trend={+2}
          color="emerald"
        />
        <StatCard 
          icon={<Mail className="w-6 h-6 text-orange-400" />}
          label="Engagement"
          value={quotes.length.toString()}
          subValue={`${unreadQuotes} pending inquiries`}
          trend={unreadQuotes > 0 ? -unreadQuotes : 0}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Recent Inquiries
            </h3>
            <button className="text-xs text-primary hover:underline font-medium">View All</button>
          </div>
          <div className="glass-neon rounded-3xl border border-border/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody className="divide-y divide-border/20">
                  {recentInquiries.length > 0 ? recentInquiries.map((iq) => (
                    <tr key={iq.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${iq.read ? 'bg-secondary text-muted-foreground' : 'bg-primary/20 text-primary'}`}>
                            {iq.author?.[0] || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{iq.author || 'Anonymous'}</p>
                            <p className="text-[10px] text-muted-foreground">{iq.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[300px]">
                          {iq.text}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(iq.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground italic text-sm">
                        No recent inquiries found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Resume Management & Project Highlights */}
        <div className="space-y-6">
          {/* Resume Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 px-2">
              <FileText className="w-5 h-5 text-primary" />
              Resume Management
            </h3>
            <div className="glass-neon rounded-3xl p-6 border border-border/40 space-y-4">
              {resumeUrl ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold truncate">Active Resume</p>
                      <a 
                        href={resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1 mt-0.5"
                      >
                        View File
                      </a>
                    </div>
                  </div>
                  <button
                    disabled={deleting}
                    onClick={handleResumeDelete}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-destructive/30 hover:border-destructive hover:bg-destructive/10 text-destructive text-sm font-semibold transition-all"
                  >
                    {deleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Remove Resume
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-border/60 rounded-3xl space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">No Resume Uploaded</p>
                    <p className="text-xs text-muted-foreground mt-1">Upload PDF or DOC format</p>
                  </div>
                </div>
              )}

              <div className="relative">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <label
                  htmlFor="resume-upload"
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-primary hover:bg-primary/95 text-white text-sm font-semibold cursor-pointer transition-all shadow-lg shadow-primary/20 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {resumeUrl ? "Upload New Version" : "Upload Resume"}
                </label>
              </div>
            </div>
          </div>

          {/* Project Highlights */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 px-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Top Projects
            </h3>
            <div className="space-y-4">
              {popularProjects.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ x: 5 }}
                  className="glass rounded-2xl p-4 border border-border/40 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary overflow-hidden relative">
                    {p.image ? (
                      <Image 
                        src={p.image} 
                        alt={p.title} 
                        fill
                        className="object-cover group-hover:scale-110 transition-transform" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FolderKanban className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold truncate">{p.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Eye className="w-3 h-3" /> {p.views || 0}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-primary">
                        {p.featured ? 'Featured' : ''}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon, label, value, subValue, trend, color }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-neon rounded-3xl p-6 border border-border/40 relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${color}-500/5 rounded-full blur-3xl transition-all group-hover:bg-${color}-500/10`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 border border-${color}-500/20`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${trend >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-destructive/10 text-destructive'}`}>
        {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-metallic mb-1">{value}</h3>
      <p className="text-xs text-muted-foreground/70">{subValue}</p>
    </div>
  </motion.div>
);

export default AdminDashboard;
