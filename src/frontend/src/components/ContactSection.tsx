import { AlertCircle, CheckCircle, Send } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { useSubmitContact } from "../hooks/useQueries";

function RippleButton({
  children,
  onClick,
  disabled,
  className,
  type,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn || disabled) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
    onClick?.();
  };

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      className={`ripple-container ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

const socialLinks = [
  {
    icon: SiLinkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "#0077b5",
  },
  { icon: SiX, href: "https://x.com", label: "X / Twitter", color: "#ffffff" },
  {
    icon: SiGithub,
    href: "https://github.com",
    label: "GitHub",
    color: "#ffffff",
  },
  {
    icon: SiInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "#e4405f",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const { mutate: submitContact, isPending } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitState("idle");
    submitContact(formData, {
      onSuccess: () => {
        setSubmitState("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitState("idle"), 5000);
      },
      onError: () => {
        setSubmitState("error");
        setTimeout(() => setSubmitState("idle"), 5000);
      },
    });
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #060a16 0%, #03040a 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />

      {/* Decorative orbs */}
      <div
        className="absolute top-1/4 -left-32 w-72 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,255,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-72 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-4">
            ◈ Let's Build Together
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
            Get <span className="gradient-text">In Touch</span>
          </h2>
          <p className="font-body text-white/50 text-base max-w-xl mx-auto mt-4">
            Have a project in mind? Let's discuss how Veinbit can help you build
            something remarkable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-strong glow-border-blue rounded-2xl p-8 space-y-5"
            >
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Send us a Message
              </h3>

              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-body text-sm text-white/60 block mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  data-ocid="contact.input"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="John Smith"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="font-body text-sm text-white/60 block mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  data-ocid="contact.input"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="john@company.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="font-body text-sm text-white/60 block mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us about your project..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all resize-none"
                />
              </div>

              {/* Submit button */}
              <RippleButton
                type="submit"
                data-ocid="contact.submit_button"
                disabled={isPending}
                className="w-full btn-gradient text-[#03040a] font-body font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-[#03040a]/30 border-t-[#03040a] rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </RippleButton>

              {/* Status messages */}
              {submitState === "success" && (
                <motion.div
                  data-ocid="contact.success_state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-400 font-body text-sm p-3 rounded-xl bg-emerald-400/10 border border-emerald-400/20"
                >
                  <CheckCircle size={16} />
                  Message sent! We'll get back to you within 24 hours.
                </motion.div>
              )}
              {submitState === "error" && (
                <motion.div
                  data-ocid="contact.error_state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 font-body text-sm p-3 rounded-xl bg-red-400/10 border border-red-400/20"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email us directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Right: Map + Social */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Map */}
            <div
              className="glass glow-border-blue rounded-2xl overflow-hidden"
              style={{ height: "280px" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.5!2d67.0!3d24.86!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM2LjAiTiA2N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                data-ocid="contact.map_marker"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    "invert(90%) hue-rotate(180deg) brightness(0.8) saturate(1.2)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Veinbit Technologies Location"
              />
            </div>

            {/* Contact Info */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-bold text-white text-base mb-4">
                Contact Information
              </h3>
              {[
                { label: "Email", value: "hello@veinbit.com", icon: "✉" },
                { label: "Phone", value: "+1 (555) 000-0000", icon: "📞" },
                { label: "Location", value: "Karachi, Pakistan", icon: "📍" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <div className="font-mono text-xs text-white/30 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="font-body text-sm text-white/70">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
                      whileHover={{
                        scale: 1.1,
                        y: -3,
                        boxShadow: `0 0 20px ${social.color}40`,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
