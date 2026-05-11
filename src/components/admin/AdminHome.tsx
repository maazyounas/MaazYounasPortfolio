"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { HomePageData, Quote, Project, adminService } from "../../lib/adminService";
import { toast } from "sonner";
import AdminHomeHeader from "./home/AdminHomeHeader";
import HeroSectionEditor from "./home/HeroSectionEditor";
import QuotesSection from "./home/QuotesSection";

interface AdminHomeProps {
  data: HomePageData;
  quotes: Quote[];
  projects: Project[];
  onUpdate: () => void;
}

const AdminHome = ({ data, quotes, projects, onUpdate }: AdminHomeProps) => {
  const [formData, setFormData] = useState<HomePageData>(data);
  const [newQuote, setNewQuote] = useState("");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    hero: true,
    quotes: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSave = async () => {
    try {
      await adminService.saveHomePageData(formData);
      toast.success("Home page settings saved successfully!", {
        description: "Your changes have been published.",
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });
      onUpdate();
    } catch (error) {
      toast.error("Failed to save changes", {
        description: "Please try again.",
      });
    }
  };

  const handleReset = () => {
    setFormData(data);
    toast.info("Changes reset to original", {
      description: "All unsaved changes have been discarded.",
    });
  };

  const handleAddQuote = () => {
    if (!newQuote.trim()) {
      toast.error("Please enter a quote");
      return;
    }

    const updatedQuotes = [
      ...quotes,
      {
        id: Date.now().toString(),
        text: newQuote,
        author: "Anonymous",
        category: "Motivation",
        visible: true,
        createdAt: new Date().toISOString(),
      },
    ];

    adminService.saveQuotes(updatedQuotes);
    setNewQuote("");
    toast.success("Quote added successfully", {
      description: "Your motivational quote has been published.",
    });
    onUpdate();
  };

  const handleDeleteQuote = (id: string) => {
    const updatedQuotes = quotes.filter((q) => q.id !== id);
    adminService.saveQuotes(updatedQuotes);
    toast.success("Quote deleted", {
      description: "The quote has been removed.",
    });
    onUpdate();
  };

  const toggleQuoteVisibility = (id: string) => {
    const updatedQuotes = quotes.map((q) =>
      q.id === id ? { ...q, visible: !q.visible } : q,
    );
    adminService.saveQuotes(updatedQuotes);
    toast.success(
      updatedQuotes.find(q => q.id === id)?.visible 
        ? "Quote is now visible" 
        : "Quote is now hidden",
      {
        description: "The quote visibility has been updated.",
      }
    );
    onUpdate();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      description: "Text has been copied to your clipboard.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <AdminHomeHeader onReset={handleReset} onSave={handleSave} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Section */}
        <HeroSectionEditor
          expanded={expandedSections.hero}
          onToggle={() => toggleSection("hero")}
          formData={formData}
          onChange={setFormData}
          onCopy={copyToClipboard}
        />

        {/* Motivational Quotes */}
        <QuotesSection
          expanded={expandedSections.quotes}
          onToggle={() => toggleSection("quotes")}
          quotes={quotes}
          newQuote={newQuote}
          onChangeNewQuote={setNewQuote}
          onAddQuote={handleAddQuote}
          onDeleteQuote={handleDeleteQuote}
          onToggleVisibility={toggleQuoteVisibility}
          onCopy={copyToClipboard}
        />
      </div>
    </motion.div>
  );
};

export default AdminHome;



