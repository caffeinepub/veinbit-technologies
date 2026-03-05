import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  width: Math.random() * 3 + 1,
  height: Math.random() * 3 + 1,
  left: Math.random() * 100,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.6 + 0.2,
}));

const FLOATING_ICONS = [
  { icon: "⚡", x: "8%", y: "20%", delay: "0s", cls: "floating-icon" },
  {
    icon: "🔷",
    x: "92%",
    y: "15%",
    delay: "1.5s",
    cls: "floating-icon-reverse",
  },
  { icon: "◈", x: "5%", y: "70%", delay: "3s", cls: "floating-icon-slow" },
  { icon: "◉", x: "94%", y: "75%", delay: "0.8s", cls: "floating-icon" },
  { icon: "⬡", x: "15%", y: "85%", delay: "2s", cls: "floating-icon-reverse" },
  { icon: "✦", x: "85%", y: "50%", delay: "4s", cls: "floating-icon-slow" },
];

const HERO_STATS = [
  { value: "150+", label: "Projects" },
  { value: "80+", label: "Clients" },
  { value: "30+", label: "Technologies" },
  { value: "5+", label: "Years" },
];

function ParticleBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            left: `${p.left}%`,
            bottom: "-10px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

function RippleButton({
  children,
  onClick,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
    onClick?.(e);
  };

  return (
    <button
      ref={btnRef}
      type="button"
      className={`ripple-container ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #03040a 0%, #050a18 50%, #080d1f 100%)",
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />

      {/* Mouse-following glow */}
      <div
        className="mouse-glow"
        aria-hidden="true"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />

      {/* 3D Scene — full background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Suspense
          fallback={
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "url('/assets/generated/hero-network-sphere.dim_1200x800.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.4,
              }}
            />
          }
        >
          <HeroScene />
        </Suspense>
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {FLOATING_ICONS.map((item) => (
          <div
            key={item.icon}
            className={`absolute text-xl opacity-20 text-cyan-400 ${item.cls}`}
            style={{ left: item.x, top: item.y, animationDelay: item.delay }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="section-label inline-block px-4 py-1.5 glass rounded-full glow-border-blue text-xs sm:text-sm">
            ◈ Next-Gen Technology Solutions
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-6"
        >
          <span className="block text-white">Innovating</span>
          <span className="block gradient-text glow-text-blue">the Future</span>
          <span className="block text-white">with Technology</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="font-body text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Veinbit Technologies delivers cutting-edge Software, AI, Web &amp;
          Mobile solutions that transform businesses worldwide. We engineer
          tomorrow&apos;s digital infrastructure today.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <RippleButton
            data-ocid="hero.primary_button"
            onClick={() =>
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-gradient text-[#03040a] font-body font-semibold px-8 py-4 rounded-xl text-base shadow-neon-blue"
          >
            Explore Our Solutions
          </RippleButton>

          <motion.button
            type="button"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-outline-glow font-body font-medium text-white/80 hover:text-white px-8 py-4 rounded-xl text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a Project →
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-black text-2xl md:text-3xl gradient-text">
                {stat.value}
              </div>
              <div className="font-body text-xs text-white/40 tracking-widest uppercase mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToAbout}
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>

      <ParticleBackground />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #03040a)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
