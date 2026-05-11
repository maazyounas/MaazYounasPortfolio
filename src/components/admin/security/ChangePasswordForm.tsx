import { motion } from "framer-motion";
import { Eye, EyeOff, Key, Lock, Mail, RefreshCw, Save } from "lucide-react";

interface CredentialsState {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ShowPasswordsState {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface ChangePasswordFormProps {
  credentials: CredentialsState;
  showPasswords: ShowPasswordsState;
  onChangeCredentials: (next: CredentialsState) => void;
  onToggleShowPassword: (field: keyof ShowPasswordsState) => void;
  onReset: () => void;
  onSave: () => void;
}

const ChangePasswordForm = ({
  credentials,
  showPasswords,
  onChangeCredentials,
  onToggleShowPassword,
  onReset,
  onSave,
}: ChangePasswordFormProps) => {
  const canSave =
    credentials.currentPassword &&
    credentials.newPassword &&
    credentials.confirmPassword &&
    credentials.newPassword === credentials.confirmPassword &&
    credentials.newPassword.length >= 8;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Current Password</span>
            </div>
          </label>
          <div className="relative group">
            <input
              type={showPasswords.current ? "text" : "password"}
              value={credentials.currentPassword}
              onChange={(e) =>
                onChangeCredentials({
                  ...credentials,
                  currentPassword: e.target.value,
                })
              }
              className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 pr-12"
              placeholder="Enter your current password"
            />
            <button
              onClick={() => onToggleShowPassword("current")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              type="button"
            >
              {showPasswords.current ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Admin Email</span>
            </div>
          </label>
          <input
            type="email"
            value={credentials.email}
            readOnly
            className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl text-foreground/60 cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Contact support to change your email address
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-green-400" />
              <span>New Password</span>
            </div>
          </label>
          <div className="relative group">
            <input
              type={showPasswords.new ? "text" : "password"}
              value={credentials.newPassword}
              onChange={(e) =>
                onChangeCredentials({
                  ...credentials,
                  newPassword: e.target.value,
                })
              }
              className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 pr-12"
              placeholder="Enter new password"
            />
            <button
              onClick={() => onToggleShowPassword("new")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              type="button"
            >
              {showPasswords.new ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Key className="w-3 h-3" />
            Must be at least 8 characters long
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-green-400" />
              <span>Confirm Password</span>
            </div>
          </label>
          <div className="relative group">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              value={credentials.confirmPassword}
              onChange={(e) =>
                onChangeCredentials({
                  ...credentials,
                  confirmPassword: e.target.value,
                })
              }
              className={`w-full px-4 py-3.5 bg-secondary/30 border ${
                credentials.confirmPassword &&
                credentials.newPassword !== credentials.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-border/50 focus:border-green-500"
              } rounded-xl focus:ring-2 focus:ring-green-500/20 transition-all duration-200 pr-12`}
              placeholder="Confirm new password"
            />
            <button
              onClick={() => onToggleShowPassword("confirm")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              type="button"
            >
              {showPasswords.confirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {credentials.confirmPassword &&
            credentials.newPassword !== credentials.confirmPassword && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <EyeOff className="w-3 h-3" />
                Passwords do not match
              </p>
            )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          onClick={onReset}
          className="px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground border border-border/50 hover:border-border rounded-xl hover:bg-secondary/50 transition-all duration-200 flex items-center gap-2 justify-center"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Form
        </button>
        <button
          onClick={onSave}
          disabled={!canSave}
          className="px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 justify-center shadow-lg shadow-green-500/25 hover:shadow-green-500/40 flex-1"
        >
          <Save className="w-4 h-4" />
          Update Password
        </button>
      </div>
    </motion.div>
  );
};

export default ChangePasswordForm;
