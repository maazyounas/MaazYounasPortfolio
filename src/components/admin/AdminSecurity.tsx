"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail } from "lucide-react";
import { SecuritySettings, adminService } from "../../lib/adminService";
import { toast } from "sonner";
import AdminSecurityHeader from "./security/AdminSecurityHeader";
import AdminSecurityTabs from "./security/AdminSecurityTabs";
import ChangePasswordForm from "./security/ChangePasswordForm";
import ForgotPasswordForm from "./security/ForgotPasswordForm";

interface AdminSecurityProps {
  data: SecuritySettings;
  onUpdate: () => void;
}

const AdminSecurity = ({ data, onUpdate }: AdminSecurityProps) => {
  const [credentials, setCredentials] = useState({
    email: data.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [forgotCredentials, setForgotCredentials] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
    forgotNew: false,
    forgotConfirm: false,
  });

  const [activeTab, setActiveTab] = useState<"change" | "forgot">("change");

  const handleSave = async () => {
    // Validate inputs
    if (!credentials.currentPassword || !credentials.newPassword || !credentials.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (credentials.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (credentials.newPassword !== credentials.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await adminService.changeAdminPassword(
        credentials.currentPassword,
        credentials.newPassword,
        credentials.email
      );

      toast.success("Password updated successfully!", {
        description: "Your admin credentials have been updated.",
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });

      setCredentials({
        ...credentials,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      onUpdate();
    } catch (error: unknown) {
      toast.error("Failed to update password", {
        description: (error as Error).message || "Please check your current password and try again.",
      });
    }
  };

  const handleForgotPasswordRequest = async () => {
    if (!forgotCredentials.email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await adminService.sendPasswordResetEmail(forgotCredentials.email);
      toast.success("Reset code sent!", {
        description: "Check your email for the password reset code.",
        icon: <Mail className="w-5 h-5 text-blue-500" />,
      });
    } catch (error: unknown) {
      toast.error("Failed to send reset code", {
        description: (error as Error).message || "Please check your email and try again.",
      });
    }
  };

  const handleForgotPasswordReset = async () => {
    if (!forgotCredentials.resetCode || !forgotCredentials.newPassword || !forgotCredentials.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (forgotCredentials.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (forgotCredentials.newPassword !== forgotCredentials.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await adminService.resetPasswordWithCode(
        forgotCredentials.email,
        forgotCredentials.resetCode,
        forgotCredentials.newPassword
      );

      toast.success("Password reset successfully!", {
        description: "You can now log in with your new password.",
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });

      setForgotCredentials({
        email: "",
        resetCode: "",
        newPassword: "",
        confirmPassword: "",
      });

      setActiveTab("change");
      onUpdate();
    } catch (error: unknown) {
      toast.error("Failed to reset password", {
        description: (error as Error).message || "Invalid reset code or expired link.",
      });
    }
  };

  const toggleShowPassword = (field: keyof typeof showPasswords) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const resetForm = () => {
    setCredentials({
      email: data.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    toast.info("Form reset", {
      description: "All fields have been cleared.",
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
      <AdminSecurityHeader />

      {/* Tab Navigation */}
      <div className="glass rounded-2xl border border-border/50 overflow-hidden">
        <AdminSecurityTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="p-6">
          {/* Change Password Tab */}
          {activeTab === "change" && (
            <ChangePasswordForm
              credentials={credentials}
              showPasswords={{
                current: showPasswords.current,
                new: showPasswords.new,
                confirm: showPasswords.confirm,
              }}
              onChangeCredentials={setCredentials}
              onToggleShowPassword={toggleShowPassword}
              onReset={resetForm}
              onSave={handleSave}
            />
          )}

          {/* Forgot Password Tab */}
          {activeTab === "forgot" && (
            <ForgotPasswordForm
              forgotCredentials={forgotCredentials}
              showPasswords={{
                forgotNew: showPasswords.forgotNew,
                forgotConfirm: showPasswords.forgotConfirm,
              }}
              onChangeForgot={setForgotCredentials}
              onToggleShowPassword={toggleShowPassword}
              onRequestReset={handleForgotPasswordRequest}
              onResetWithCode={handleForgotPasswordReset}
              onBackToChange={() => setActiveTab("change")}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSecurity;
