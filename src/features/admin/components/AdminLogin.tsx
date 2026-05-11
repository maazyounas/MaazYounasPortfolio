"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  User,
  Eye,
  EyeOff,
  RefreshCw,
  LogIn,
  Key,
} from "lucide-react";
import { toast } from "sonner";
import { sanitizeClientInput, validateAdminLogin } from "../../../lib/client/validation";

interface AdminLoginProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
  lockUntil: Date | null;
}

const AdminLogin = ({ onLogin, lockUntil }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Bot trap
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bot check
    if (honeypot) {
      console.warn("Bot activity detected via honeypot");
      toast.error("An error occurred. Please try again.");
      return;
    }

    try {
      const validated = validateAdminLogin({ username, email: username, password });
      setIsLoggingIn(true);
      const loginId = validated.username || validated.email || "";
      const success = await onLogin(sanitizeClientInput(loginId), validated.password);
      setIsLoggingIn(false);
    } catch (error) {
      setIsLoggingIn(false);
      const message = error instanceof Error ? error.message : "Invalid login input";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Dynamic Mesh Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.15) 0%, transparent 50%), 
                              radial-gradient(circle at 80% 70%, hsl(var(--primary) / 0.1) 0%, transparent 50%)`
          }}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]"
        />
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: "100vh", x: Math.random() * 100 + "%" }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: "-10vh",
            x: (Math.random() * 100 - 50) + "%"
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-primary/40 rounded-full blur-[1px] z-0"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-neon rounded-3xl shadow-2xl p-6 sm:p-10 border border-border/40 backdrop-blur-3xl overflow-hidden relative group">
          {/* Subtle edge highlight */}
          <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center mb-8 sm:mb-10 text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20 shadow-neon-sm"
            >
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-metallic-animated mb-2"
            >
              Admin Portal
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm text-muted-foreground tracking-widest uppercase font-medium"
            >
              Authorization Required
            </motion.p>
          </div>

          {lockUntil && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-start gap-3"
            >
              <ShieldAlert className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-destructive">Account Temporarily Locked</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Due to multiple failed attempts, access is restricted until {lockUntil.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field - Hidden from users */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                Identity
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-secondary/30 border border-border/50 rounded-2xl outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-sm sm:text-base placeholder:text-muted-foreground/50"
                  placeholder="Username or Email"
                  disabled={!!lockUntil}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                Credentials
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Key className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 sm:py-4 bg-secondary/30 border border-border/50 rounded-2xl outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-sm sm:text-base placeholder:text-muted-foreground/50"
                  placeholder="Secret Password"
                  disabled={!!lockUntil}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoggingIn || !!lockUntil}
              className="w-full py-3 sm:py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:grayscale"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Enter Portal
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t border-border/20 text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground/60 flex items-center justify-center gap-2 uppercase tracking-[0.2em]">
              <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
              Secure 256-Bit Encrypted Link
              <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
