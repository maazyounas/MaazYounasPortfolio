"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import { Mail, MapPin, Phone, CheckCircle, Clock, Calendar } from "lucide-react";
import { toast } from "sonner";
import { adminService, ContactPageData } from "../lib/adminService";
import { sanitizeClientInput, validateContactForm } from "../lib/client/validation";
import ContactHeader from "./contact/ContactHeader";
import ContactInfoList from "./contact/ContactInfoList";

const ContactForm = dynamic(() => import("./contact/ContactForm"), {
  ssr: false,
});

interface ContactProps {
  initialData: ContactPageData | null;
  standalone?: boolean;
  sectionId?: string;
}

const Contact = ({ initialData, standalone = true, sectionId }: ContactProps) => {
  const [contactData, setContactData] = useState<ContactPageData | null>(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) return;
    const fetchData = async () => {
      try {
        const data = await adminService.getContactPageData();
        setContactData(data);
      } catch (error) {
        console.error("Failed to fetch contact page data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validated = validateContactForm(formData);
    const payload = {
      name: sanitizeClientInput(validated.name),
      email: sanitizeClientInput(validated.email),
      subject: sanitizeClientInput(validated.subject || "Portfolio inquiry"),
      message: sanitizeClientInput(validated.message),
    };

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setIsSubmitted(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      console.error("Contact form error:", error);
      const message = error instanceof Error ? error.message : "Failed to send message.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: contactData?.email || "",
      description: "I'll respond within 24 hours",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactData?.phone || "",
      description: "Mon – Fri, 9am – 5pm PKT",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactData?.location || "",
      description: "Available for remote work worldwide",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { label: "Response Time", value: "< 24h", icon: Clock },
    { label: "Projects Completed", value: "50+", icon: CheckCircle },
    { label: "Meeting Availability", value: "Flexible", icon: Calendar },
  ];

  const content = (
    <>
      <style jsx global>{`
        @keyframes contact-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(20px, -25px) scale(1.05); }
        }
      `}</style>

      <section
        id={sectionId}
        className="relative section-padding min-h-screen overflow-hidden scroll-mt-28"
      >
        {/* ── Ambient orbs ──────────────────────────── */}
        <div
          className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.13) 0%, transparent 70%)",
            filter: "blur(4px)",
            animation: "contact-orb-drift 16s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* ── Subtle grid ───────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239,68,68,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239,68,68,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />


        <div className="container-responsive relative z-10">
          <ContactHeader />

          {/* Main two-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 max-w-6xl mx-auto">
            {/* LEFT — info */}
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-8 w-full"
            >
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="font-display font-bold mb-3 sm:mb-4 break-words"
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                    color: "rgba(215,215,230,0.95)",
                  }}
                >
                  Get in Touch
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="font-body text-sm sm:text-base leading-relaxed break-words mb-6 sm:mb-8"
                  style={{ color: "rgba(140,140,160,0.88)" }}
                >
                  Feel free to reach out through any of these channels. I&apos;m
                  always happy to discuss new projects, creative ideas, or
                  opportunities to be part of your vision.
                </motion.p>
              </div>

              <ContactInfoList
                items={contactInfo}
                interactive
                loading={loading || !contactData}
              />
            </motion.div>

            {/* RIGHT — form */}
            <ContactForm
              enabled={contactData?.formEnabled ?? true}
              formData={formData}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>
    </>
  );

  if (!standalone) return content;
  return <Layout>{content}</Layout>;
};

export default Contact;
