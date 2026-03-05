import { motion } from "motion/react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technologies", href: "#technologies" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "veinbit.com";

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#03040a" }}
    >
      {/* Gradient top divider */}
      <div className="gradient-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 opacity-90 rounded-lg" />
              <span className="relative text-white font-display font-bold text-xs z-10">
                V
              </span>
            </div>
            <span className="gradient-text font-display font-bold text-lg tracking-tight">
              Veinbit
            </span>
            <span className="text-white/50 font-body text-sm hidden sm:block">
              Technologies
            </span>
          </motion.div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 font-body text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {[
              {
                icon: SiLinkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              { icon: SiX, href: "https://x.com", label: "X" },
              { icon: SiGithub, href: "https://github.com", label: "GitHub" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/20 transition-all duration-200"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={14} />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 my-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="font-body text-xs text-white/30">
            © {currentYear} Veinbit Technologies. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/25">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/60 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
