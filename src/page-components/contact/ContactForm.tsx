import type React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send, Lock } from "lucide-react";

interface ContactFormProps {
  enabled: boolean;
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  isSubmitting: boolean;
  isSubmitted: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/* ── shared input style ─────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(7,7,10,0.7)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  color: "rgba(215,215,230,0.95)",
  outline: "none",
  fontFamily: "'Outfit', sans-serif",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const inputFocusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(239,68,68,0.6)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.12)";
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
  },
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "rgba(160,160,180,0.85)",
  marginBottom: "0.5rem",
};

const ContactForm = ({
  enabled,
  formData,
  isSubmitting,
  isSubmitted,
  onChange,
  onSubmit,
}: ContactFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      <div className="relative lg:sticky lg:top-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="p-5 sm:p-6 lg:p-8 rounded-2xl w-full"
          style={{
            background: "rgba(7,7,10,0.85)",
            border: "1px solid rgba(239,68,68,0.22)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03), 0 0 48px rgba(239,68,68,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Card header */}
          <div className="mb-6 sm:mb-8">
            <h2
              className="font-display font-bold text-xl sm:text-2xl mb-1.5 break-words"
              style={{ color: "rgba(215,215,230,0.95)" }}
            >
              Send a Message
            </h2>
            <p
              className="font-body text-xs sm:text-sm leading-relaxed break-words"
              style={{ color: "rgba(130,130,150,0.85)" }}
            >
              {enabled
                ? "Fill out the form below and I'll get back to you as soon as possible."
                : "The contact form is currently disabled. Please email me directly."}
            </p>
          </div>

          {/* Horizontal rule */}
          <div
            className="mb-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(239,68,68,0.4), rgba(239,68,68,0.1) 60%, transparent)",
            }}
          />

          {enabled && (
            <div className="space-y-5 sm:space-y-6 w-full">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <label htmlFor="name" style={labelStyle}>
                    Your Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    placeholder="Maaz Younas"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <label htmlFor="email" style={labelStyle}>
                    Email Address <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </motion.div>
              </div>

              {/* Subject */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 }}
              >
                <label htmlFor="subject" style={labelStyle}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={onChange}
                  placeholder="Project enquiry, collaboration..."
                  style={inputStyle}
                  {...inputFocusHandlers}
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <label htmlFor="message" style={labelStyle}>
                  Message <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={onChange}
                  rows={6}
                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                  style={{ ...inputStyle, resize: "none" }}
                  {...inputFocusHandlers}
                />
              </motion.div>

              {/* Submit button */}
              <motion.button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.03, y: isSubmitting || isSubmitted ? 0 : -2 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.97 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="relative w-full flex items-center justify-center gap-2 sm:gap-3 rounded-full font-body font-semibold text-white text-sm sm:text-base py-3 sm:py-3.5 overflow-hidden select-none disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: isSubmitted
                    ? "linear-gradient(135deg,#16a34a,#15803d)"
                    : "linear-gradient(135deg,#ef4444,#be123c)",
                  boxShadow: isSubmitted
                    ? "0 4px 20px rgba(22,163,74,0.4)"
                    : "0 4px 20px rgba(239,68,68,0.45)",
                  transition: "background 0.4s ease, box-shadow 0.4s ease",
                }}
              >
                {/* shimmer sweep */}
                {!isSubmitting && !isSubmitted && (
                  <span
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(100deg,transparent 30%,rgba(255,255,255,0.18) 50%,transparent 70%)",
                      animation: "shimmer-sweep 2.5s linear infinite",
                    }}
                  />
                )}

                {/* loading sweep bar */}
                {isSubmitting && (
                  <motion.span
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
                    }}
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full block"
                      />
                      Sending…
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>

              {/* Privacy note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex items-center justify-center gap-1.5 font-body text-xs text-center break-words leading-relaxed"
                style={{ color: "rgba(110,110,130,0.8)" }}
              >
                <Lock className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(239,68,68,0.5)" }} />
                Required fields marked{" "}
                <span style={{ color: "#ef4444" }}>*</span>. Your info is secure
                and never shared.
              </motion.p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactForm;