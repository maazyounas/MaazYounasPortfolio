"use client";

import type React from "react";
import { useState } from "react";
import { AboutPageData, adminService } from "../../lib/adminService";
import { toast } from "sonner";
import AdminAboutHeader from "./about/AdminAboutHeader";
import AboutProfileSection from "./about/AboutProfileSection";
import AboutTechStackSection from "./about/AboutTechStackSection";
import ImageAdjusterModal from "./about/ImageAdjusterModal";

interface AdminAboutProps {
  data: AboutPageData;
  onUpdate: () => void;
}

interface TechItem {
  name: string;
  icon: string;
}

const AdminAbout = ({ data, onUpdate }: AdminAboutProps) => {
  // Initialize techStack
  const initialTechStack: TechItem[] = Array.isArray(data.techStack)
    ? data.techStack.map(tech => 
        typeof tech === 'string' 
          ? { name: tech, icon: 'FaCode' }
          : tech
      )
    : [];

  const [formData, setFormData] = useState<AboutPageData>({
    ...data,
    techStack: initialTechStack
  });
  
  const [newTech, setNewTech] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    tech: true,
  });
  
  // Image Adjustment State
  const [adjustingImage, setAdjustingImage] = useState<string | null>(null);
  const [isAdjusterOpen, setIsAdjusterOpen] = useState(false);

  // Icon selection states
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>("FaReact");
  const [iconQuery, setIconQuery] = useState("");


  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSave = async () => {
    try {
      await adminService.saveAboutPageData(formData);
      toast.success("About page settings saved successfully");
      onUpdate();
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setAdjustingImage(result);
        setIsAdjusterOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmCrop = (croppedImage: string) => {
    setFormData({ ...formData, profileImage: croppedImage });
    setIsAdjusterOpen(false);
    toast.success("Profile photo adjusted!");
  };

  const handleEditExistingImage = () => {
    if (formData.profileImage) {
      setAdjustingImage(formData.profileImage);
      setIsAdjusterOpen(true);
    }
  };

  const addTech = () => {
    if (!newTech.trim()) {
      toast.error("Please enter a technology name");
      return;
    }

    if (!selectedIcon) {
      toast.error("Please select an icon");
      return;
    }

    const newTechItem: TechItem = {
      name: newTech,
      icon: selectedIcon
    };

    setFormData({
      ...formData,
      techStack: [...formData.techStack, newTechItem],
    });

    setNewTech("");
    setSelectedIcon("FaReact");
    setShowIconPicker(false);
    toast.success("Technology added");
  };

  const removeTech = (index: number) => {
    const updatedTechStack = [...formData.techStack];
    updatedTechStack.splice(index, 1);
    setFormData({
      ...formData,
      techStack: updatedTechStack,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminAboutHeader onSave={handleSave} />

      {/* Main Content */}
      <div className="space-y-6">
        {/* Profile Information */}
        <AboutProfileSection
          formData={formData}
          expanded={expandedSections.profile}
          onToggle={() => toggleSection("profile")}
          onChange={setFormData}
          onImageUpload={handleImageUpload}
          onEditImage={handleEditExistingImage}
        />

        {/* Tech Stack */}
        <AboutTechStackSection
          formData={formData}
          expanded={expandedSections.tech}
          newTech={newTech}
          selectedIcon={selectedIcon}
          showIconPicker={showIconPicker}
          iconQuery={iconQuery}
          onToggle={() => toggleSection("tech")}
          onChangeFormData={setFormData}
          onChangeNewTech={setNewTech}
          onChangeSelectedIcon={setSelectedIcon}
          onToggleIconPicker={() => setShowIconPicker(!showIconPicker)}
          onChangeIconQuery={setIconQuery}
          onAddTech={addTech}
          onRemoveTech={removeTech}
        />
      </div>

      {/* Image Adjuster Modal */}
      <ImageAdjusterModal
        imageSrc={adjustingImage}
        open={isAdjusterOpen}
        onClose={() => setIsAdjusterOpen(false)}
        onConfirm={handleConfirmCrop}
      />
    </div>
  );
};

export default AdminAbout;

