import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useStats } from "../hooks/useQueries";

interface StatCounterProps {
  target: number;
  suffix?: string;
  label: string;
  delay?: number;
  ocid: string;
}

function StatCounter({
  target,
  suffix = "",
  label,
  delay = 0,
  ocid,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = Date.now() + delay * 1000;
    let raf: number;

    const tick = () => {
      const now = Date.now();
      if (now < startTime) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, delay]);

  return (
    <motion.div
      ref={ref}
      data-ocid={ocid}
      className="glass glow-border-blue rounded-2xl p-6 text-center group hover:glow-border-cyan transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
    >
      <div className="font-display font-black text-4xl md:text-5xl gradient-text mb-2 stat-value">
        {count}
        {suffix}
      </div>
      <div className="font-body text-sm text-white/50 tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  );
}

const floatingIcons = [
  { icon: "⚛", label: "React", x: "5%", y: "10%", cls: "floating-icon" },
  {
    icon: "🐍",
    label: "Python",
    x: "90%",
    y: "20%",
    cls: "floating-icon-reverse",
  },
  { icon: "☁", label: "Cloud", x: "8%", y: "80%", cls: "floating-icon-slow" },
  { icon: "🤖", label: "AI", x: "88%", y: "75%", cls: "floating-icon" },
  {
    icon: "📱",
    label: "Mobile",
    x: "50%",
    y: "5%",
    cls: "floating-icon-reverse",
  },
];

export default function AboutSection() {
  const { data: stats } = useStats();

  const statData = [
    {
      target: stats?.projectsCompleted ?? 150,
      suffix: "+",
      label: "Projects Completed",
      delay: 0,
      ocid: "about.section",
    },
    {
      target: stats?.clients ?? 80,
      suffix: "+",
      label: "Happy Clients",
      delay: 0.15,
      ocid: "about.section",
    },
    {
      target: stats?.technologiesUsed ?? 30,
      suffix: "+",
      label: "Technologies",
      delay: 0.3,
      ocid: "about.section",
    },
    {
      target: stats?.yearsOfExperience ?? 5,
      suffix: "+",
      label: "Years Experience",
      delay: 0.45,
      ocid: "about.section",
    },
  ];

  return (
    <section
      id="about"
      data-ocid="about.section"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #03040a 0%, #060a16 100%)",
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />

      {/* Floating tech icons */}
      {floatingIcons.map((item) => (
        <div
          key={item.label}
          className={`absolute text-2xl opacity-10 ${item.cls}`}
          style={{ left: item.x, top: item.y }}
          aria-hidden="true"
        >
          {item.icon}
        </div>
      ))}

      {/* Decorative blur orbs */}
      <div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">◈ Who We Are</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-center text-white mb-16"
        >
          About <span className="gradient-text">Veinbit Technologies</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Company description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="font-body text-lg text-white/70 leading-relaxed">
              At{" "}
              <span className="text-cyan-400 font-semibold">
                Veinbit Technologies
              </span>
              , we are a team of passionate engineers, designers, and
              strategists dedicated to building transformative digital products.
              We combine deep technical expertise with strategic thinking to
              deliver solutions that drive measurable business outcomes.
            </p>
            <p className="font-body text-base text-white/55 leading-relaxed">
              From AI-powered platforms and enterprise software to mobile apps
              and cloud infrastructure, we architect end-to-end solutions that
              are scalable, secure, and future-proof. Our multidisciplinary team
              works in close collaboration with clients to translate complex
              challenges into elegant technical solutions.
            </p>

            <div className="pt-2">
              <h3 className="font-display font-bold text-white text-lg mb-4">
                Our Core Values
              </h3>
              <div className="space-y-3">
                {[
                  "Innovation-first engineering culture",
                  "Transparent collaboration & agile delivery",
                  "Scalable, maintainable architectures",
                  "Security and performance by design",
                ].map((val, idx) => (
                  <motion.div
                    key={val}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx + 0.3 }}
                    className="flex items-center gap-3 font-body text-sm text-white/60"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    {val}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Stat counters */}
          <div className="grid grid-cols-2 gap-4">
            {statData.map((stat) => (
              <StatCounter
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                delay={stat.delay}
                ocid={stat.ocid}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
