import type React from "react";
import { motion } from "framer-motion";

interface ContactInfoItem {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  description: string;
  color: string; // kept in interface for compatibility but not used for gradient
}

interface ContactInfoListProps {
  items: ContactInfoItem[];
  interactive?: boolean;
  loading?: boolean;
}

const ContactInfoList = ({
  items,
  interactive = false,
  loading = false,
}: ContactInfoListProps) => {
  return (
    <div className="space-y-4 sm:space-y-5 w-full">
      {items.map((info, index) => (
        <motion.div
          key={info.label}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.8 + index * 0.1,
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={interactive ? { scale: 1.015, x: 4 } : undefined}
          className="group flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl w-full transition-all duration-300"
          style={{
            background: "rgba(7,7,10,0.75)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            cursor: interactive ? "pointer" : "default",
          }}
          onMouseEnter={(e) => {
            if (!interactive) return;
            const el = e.currentTarget as HTMLDivElement;
            el.style.border = "1px solid rgba(239,68,68,0.4)";
            el.style.boxShadow = "0 6px 28px rgba(0,0,0,0.5), 0 0 24px rgba(239,68,68,0.08)";
          }}
          onMouseLeave={(e) => {
            if (!interactive) return;
            const el = e.currentTarget as HTMLDivElement;
            el.style.border = "1px solid rgba(255,255,255,0.07)";
            el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.35)";
          }}
        >
          {/* Icon box */}
          <motion.div
            whileHover={interactive ? { scale: 1.1, rotate: 5 } : undefined}
            className="flex-shrink-0 p-3 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.28)",
              boxShadow: "0 0 14px rgba(239,68,68,0.1)",
            }}
          >
            <info.icon
              className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300"
              style={{ color: "rgba(239,68,68,0.9)" }}
            />
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <p
              className="font-body text-xs uppercase tracking-widest mb-1"
              style={{ color: "rgba(239,68,68,0.7)" }}
            >
              {info.label}
            </p>

            {loading ? (
              <div className="space-y-1.5">
                <div
                  className="h-5 w-44 rounded animate-pulse"
                  style={{ background: "rgba(239,68,68,0.08)" }}
                />
                <div
                  className="h-3.5 w-32 rounded animate-pulse"
                  style={{ background: "rgba(239,68,68,0.05)" }}
                />
              </div>
            ) : (
              <>
                <p
                  className="font-body font-semibold text-sm sm:text-base mb-0.5 break-all"
                  style={{ color: "rgba(215,215,230,0.95)" }}
                >
                  {info.value}
                </p>
                <p
                  className="font-body text-xs sm:text-sm break-words leading-relaxed"
                  style={{ color: "rgba(120,120,140,0.85)" }}
                >
                  {info.description}
                </p>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactInfoList;