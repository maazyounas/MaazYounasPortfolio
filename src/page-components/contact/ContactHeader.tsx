import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const ContactHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-12 sm:mb-16 lg:mb-20"
    >
      

      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-bold text-metallic-animated mb-4 sm:mb-6 break-words px-4"
        style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
      >
        Let&apos;s Talk
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="font-body text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-4 break-words"
        style={{ color: "rgba(150,150,165,0.9)" }}
      >
        Have a project in mind or want to discuss opportunities? I&apos;m always
        excited to hear about new ideas and collaborate on innovative projects.
      </motion.p>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mx-auto mt-8 h-px max-w-xs"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(239,68,68,0.5) 30%, rgba(239,68,68,0.5) 70%, transparent)",
        }}
      />
    </motion.div>
  );
};

export default ContactHeader;