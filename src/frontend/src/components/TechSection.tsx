import { motion } from "motion/react";

interface Tech {
  name: string;
  icon: string;
  color: string;
  bg: string;
  description: string;
}

const technologies: Tech[] = [
  {
    name: "Python",
    icon: "🐍",
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.08)",
    description: "AI & Backend",
  },
  {
    name: "React",
    icon: "⚛",
    color: "#00c8ff",
    bg: "rgba(0, 200, 255, 0.08)",
    description: "Frontend",
  },
  {
    name: "Django",
    icon: "🌿",
    color: "#06ffd4",
    bg: "rgba(6, 255, 212, 0.08)",
    description: "Web Framework",
  },
  {
    name: "Flutter",
    icon: "📱",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.08)",
    description: "Mobile Apps",
  },
  {
    name: "AWS",
    icon: "☁",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.08)",
    description: "Cloud Platform",
  },
  {
    name: "Docker",
    icon: "🐳",
    color: "#00c8ff",
    bg: "rgba(0, 200, 255, 0.08)",
    description: "Containerization",
  },
];

export default function TechSection() {
  return (
    <section
      id="technologies"
      className="relative py-24 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080d1f 0%, #060a16 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />

      {/* Decorative orbs */}
      <div
        className="absolute bottom-0 left-1/3 w-72 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,255,0.05) 0%, transparent 70%)",
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
          <span className="section-label block mb-4">◈ Tools We Master</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="font-body text-white/50 text-base max-w-xl mx-auto mt-4">
            Industry-leading technologies carefully chosen for performance,
            scalability, and developer experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              data-ocid={`tech.item.${i + 1}`}
              className="tech-card glass rounded-2xl p-5 text-center group cursor-pointer"
              style={{
                background: tech.bg,
                border: `1px solid ${tech.color}20`,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow: `0 0 30px ${tech.color}30, 0 8px 24px rgba(0,0,0,0.3)`,
                border: `1px solid ${tech.color}50`,
              }}
            >
              {/* Icon */}
              <motion.div
                className="text-4xl mb-3 tech-glow-hover block mx-auto"
                whileHover={{ rotate: [0, -5, 5, -3, 0] }}
                transition={{ duration: 0.4 }}
                style={{ filter: `drop-shadow(0 0 8px ${tech.color}50)` }}
              >
                {tech.icon}
              </motion.div>

              <div className="font-display font-bold text-sm text-white mb-0.5">
                {tech.name}
              </div>
              <div
                className="font-mono text-xs"
                style={{ color: tech.color, opacity: 0.7 }}
              >
                {tech.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech marquee / additional stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "Redis",
            "Kubernetes",
            "TensorFlow",
            "Next.js",
            "GraphQL",
            "MongoDB",
            "Terraform",
            "GitOps",
            "Nginx",
          ].map((item) => (
            <span
              key={item}
              className="font-mono text-xs px-3 py-1.5 rounded-full text-white/40 border border-white/10 hover:border-cyan-400/30 hover:text-white/60 transition-all duration-200 cursor-default"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
