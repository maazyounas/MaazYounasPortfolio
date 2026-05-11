import { motion } from "framer-motion";
import { Eye, EyeOff, Key, Mail, Save } from "lucide-react";

interface ForgotCredentialsState {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPasswordVisibility {
  forgotNew: boolean;
  forgotConfirm: boolean;
}

interface ForgotPasswordFormProps {
  forgotCredentials: ForgotCredentialsState;
  showPasswords: ForgotPasswordVisibility;
  onChangeForgot: (next: ForgotCredentialsState) => void;
  onToggleShowPassword: (field: keyof ForgotPasswordVisibility) => void;
  onRequestReset: () => void;
  onResetWithCode: () => void;
  onBackToChange: () => void;
}

const ForgotPasswordForm = ({
  forgotCredentials,
  showPasswords,
  onChangeForgot,
  onToggleShowPassword,
  onRequestReset,
  onResetWithCode,
  onBackToChange,
}: ForgotPasswordFormProps) => {
  const canReset =
    forgotCredentials.resetCode &&
    forgotCredentials.newPassword &&
    forgotCredentials.confirmPassword &&
    forgotCredentials.newPassword === forgotCredentials.confirmPassword &&
    forgotCredentials.newPassword.length >= 8;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-foreground">
            Reset Your Password
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Enter your email to receive a reset code, then use that code to set a
          new password.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Your Email Address
            </label>
            <input
              type="email"
              value={forgotCredentials.email}
              onChange={(e) =>
                onChangeForgot({ ...forgotCredentials, email: e.target.value })
              }
              className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
              placeholder="admin@example.com"
            />
          </div>

          <button
            onClick={onRequestReset}
            disabled={!forgotCredentials.email}
            className="px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 w-full justify-center"
          >
            <Mail className="w-4 h-4" />
            Send Reset Code
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30">
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <Key className="w-4 h-4" />
            Enter Reset Code & New Password
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Reset Code
              </label>
              <input
                type="text"
                value={forgotCredentials.resetCode}
                onChange={(e) =>
                  onChangeForgot({
                    ...forgotCredentials,
                    resetCode: e.target.value,
                  })
                }
                className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 font-mono"
                placeholder="Enter the 6-digit code from your email"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  New Password
                </label>
                <div className="relative group">
                  <input
                    type={showPasswords.forgotNew ? "text" : "password"}
                    value={forgotCredentials.newPassword}
                    onChange={(e) =>
                      onChangeForgot({
                        ...forgotCredentials,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 bg-secondary/30 border border-border/50 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 pr-12"
                    placeholder="Enter new password"
                  />
                  <button
                    onClick={() => onToggleShowPassword("forgotNew")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                    type="button"
                  >
                    {showPasswords.forgotNew ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    type={showPasswords.forgotConfirm ? "text" : "password"}
                    value={forgotCredentials.confirmPassword}
                    onChange={(e) =>
                      onChangeForgot({
                        ...forgotCredentials,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3.5 bg-secondary/30 border ${
                      forgotCredentials.confirmPassword &&
                      forgotCredentials.newPassword !==
                        forgotCredentials.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-border/50 focus:border-green-500"
                    } rounded-xl focus:ring-2 focus:ring-green-500/20 transition-all duration-200 pr-12`}
                    placeholder="Confirm new password"
                  />
                  <button
                    onClick={() => onToggleShowPassword("forgotConfirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                    type="button"
                  >
                    {showPasswords.forgotConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={onResetWithCode}
              disabled={!canReset}
              className="px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 w-full justify-center mt-4"
            >
              <Save className="w-4 h-4" />
              Reset Password
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <button
            onClick={onBackToChange}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Go back to Change Password
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordForm;
