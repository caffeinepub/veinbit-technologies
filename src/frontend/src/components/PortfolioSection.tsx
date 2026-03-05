import { CheckCircle, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

interface Project {
  id: number;
  name: string;
  platform: string;
  website: string;
  description: string;
  features: string[];
  tags: string[];
  gradient: string;
  glowColor: string;
  preview: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "3DS Group Website",
    platform: "WordPress",
    website: "https://3ds-group.com",
    description:
      "Developed a responsive corporate website using WordPress with modern UI, custom layout design, and optimized performance. The site delivers a seamless user experience across all devices.",
    features: [
      "Responsive layout",
      "Modern UI design",
      "Optimized speed",
      "SEO-friendly structure",
    ],
    tags: ["WordPress", "Corporate", "Responsive"],
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f2027 100%)",
    glowColor: "#8b5cf6",
    preview: "linear-gradient(135deg, #1a1033 0%, #0d1b3e 50%, #0a2040 100%)",
  },
  {
    id: 2,
    name: "NeuraFlow AI Platform",
    platform: "React + Python",
    website: "#",
    description:
      "AI-driven data analytics platform with real-time insights, ML model management, and automated reporting for enterprise clients.",
    features: [
      "Real-time analytics",
      "ML model registry",
      "Automated reports",
      "Role-based access",
    ],
    tags: ["AI/ML", "React", "Python"],
    gradient: "linear-gradient(135deg, #030d1f 0%, #0f1e3d 40%, #0a2836 100%)",
    glowColor: "#00c8ff",
    preview: "linear-gradient(135deg, #061228 0%, #0a2040 50%, #051520 100%)",
  },
  {
    id: 3,
    name: "CloudVault Mobile",
    platform: "Flutter",
    website: "#",
    description:
      "Cross-platform cloud storage mobile app with end-to-end encryption, offline sync, and seamless file management experience.",
    features: [
      "E2E encryption",
      "Offline sync",
      "iOS & Android",
      "Biometric auth",
    ],
    tags: ["Flutter", "Mobile", "Cloud"],
    gradient: "linear-gradient(135deg, #0a0a1f 0%, #1a0a2e 40%, #0f0f1e 100%)",
    glowColor: "#06ffd4",
    preview: "linear-gradient(135deg, #0a1228 0%, #120a2e 50%, #061828 100%)",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      data-ocid={`portfolio.card.${index + 1}`}
      className="portfolio-card glass rounded-2xl overflow-hidden cursor-pointer group"
      style={{ border: `1px solid ${project.glowColor}20` }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{
        y: -10,
        boxShadow: `0 20px 60px ${project.glowColor}20, 0 0 40px ${project.glowColor}10`,
        borderColor: `${project.glowColor}40`,
      }}
      onClick={() => onOpen(project)}
    >
      {/* Preview area */}
      <div
        className="h-48 relative overflow-hidden"
        style={{ background: project.preview }}
      >
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-40" />

        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${project.glowColor}80 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute w-32 h-32 rounded-full opacity-10 border"
            style={{ borderColor: project.glowColor }}
          />
          <div
            className="absolute w-48 h-48 rounded-full opacity-5 border"
            style={{ borderColor: project.glowColor }}
          />
        </div>

        {/* Platform badge */}
        <div className="absolute top-4 left-4">
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-full border"
            style={{
              color: project.glowColor,
              borderColor: `${project.glowColor}40`,
              background: `${project.glowColor}10`,
            }}
          >
            {project.platform}
          </span>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${project.glowColor}08` }}
        >
          <motion.button
            data-ocid={`portfolio.open_modal_button.${index + 1}`}
            className="font-body font-medium text-sm px-5 py-2 rounded-lg border text-white"
            style={{
              borderColor: `${project.glowColor}60`,
              background: `${project.glowColor}15`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            View Details
          </motion.button>
        </motion.div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-bold text-white text-base">
            {project.name}
          </h3>
          <ExternalLink
            size={14}
            className="text-white/30 group-hover:text-white/60 transition-colors mt-0.5 flex-shrink-0"
          />
        </div>
        <p className="font-body text-sm text-white/50 leading-relaxed line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded-md border border-white/10 text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "rgba(3,4,10,0.9)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          data-ocid="portfolio.dialog"
          className="relative glass-strong rounded-2xl max-w-lg w-full overflow-hidden z-10"
          style={{
            border: `1px solid ${project.glowColor}30`,
            boxShadow: `0 0 60px ${project.glowColor}15`,
          }}
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Preview header */}
          <div
            className="h-40 relative"
            style={{ background: project.preview }}
          >
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-24 h-24 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, ${project.glowColor}80 0%, transparent 70%)`,
                }}
              />
            </div>
            <div className="absolute top-4 left-4">
              <span
                className="font-mono text-xs px-2.5 py-1 rounded-full border"
                style={{
                  color: project.glowColor,
                  borderColor: `${project.glowColor}40`,
                  background: `${project.glowColor}10`,
                }}
              >
                {project.platform}
              </span>
            </div>

            <button
              type="button"
              data-ocid="portfolio.close_button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-display font-black text-xl text-white mb-3">
              {project.name}
            </h3>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-display font-semibold text-sm text-white/80 mb-3 uppercase tracking-wider">
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 font-body text-sm text-white/60"
                  >
                    <CheckCircle
                      size={14}
                      style={{ color: project.glowColor }}
                      className="flex-shrink-0"
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {project.website !== "#" && (
                <a
                  data-ocid="portfolio.link.1"
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 font-body font-semibold text-sm py-2.5 rounded-xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${project.glowColor}30, ${project.glowColor}15)`,
                    border: `1px solid ${project.glowColor}40`,
                    color: project.glowColor,
                  }}
                >
                  <ExternalLink size={14} />
                  Visit Website
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex-1 font-body font-medium text-sm py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #060a16 0%, #080d1f 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-4">◈ What We've Built</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="font-body text-white/50 text-base max-w-xl mx-auto mt-4">
            Real projects. Real impact. Explore a selection of our recent
            digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
