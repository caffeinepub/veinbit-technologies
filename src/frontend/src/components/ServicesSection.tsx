import { motion } from "motion/react";
import { useRef, useState } from "react";

interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
  glowClass: string;
}

const services: Service[] = [
  {
    icon: "💻",
    title: "Software Development",
    description:
      "Custom software solutions tailored to your unique business needs. From MVPs to enterprise platforms, we build with precision.",
    color: "#00c8ff",
    glowClass: "glow-border-blue",
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    description:
      "Intelligent solutions powered by cutting-edge AI and ML algorithms — from predictive analytics to NLP and computer vision.",
    color: "#8b5cf6",
    glowClass: "glow-border-purple",
  },
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Modern, responsive web applications with exceptional UX. We craft performant frontends and robust backends.",
    color: "#06ffd4",
    glowClass: "glow-border-cyan",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps for iOS and Android built with Flutter and React Native for maximum reach and performance.",
    color: "#00c8ff",
    glowClass: "glow-border-blue",
  },
  {
    icon: "☁️",
    title: "Cloud Infrastructure",
    description:
      "Scalable cloud solutions on AWS, GCP and Azure — architecture design, migration, DevOps, and 24/7 monitoring.",
    color: "#8b5cf6",
    glowClass: "glow-border-purple",
  },
  {
    icon: "🔒",
    title: "Cybersecurity Solutions",
    description:
      "Protecting your digital assets with advanced security measures — penetration testing, compliance, and threat intelligence.",
    color: "#06ffd4",
    glowClass: "glow-border-cyan",
  },
];

interface TiltCardProps {
  service: Service;
  index: number;
}

function TiltCard({ service, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      data-ocid={`services.card.${index + 1}`}
      ref={cardRef}
      className={`tilt-card glass ${service.glowClass} rounded-2xl p-6 cursor-pointer relative overflow-hidden`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered
          ? "transform 0.05s linear, box-shadow 0.3s ease"
          : "transform 0.5s ease, box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${service.color}10 0%, transparent 60%)`,
        }}
      />

      {/* Icon */}
      <div
        className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-2xl"
        style={{
          background: `${service.color}15`,
          border: `1px solid ${service.color}30`,
        }}
      >
        {service.icon}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: `0 0 20px ${service.color}40` }}
        />
      </div>

      {/* Content */}
      <div className="relative">
        <h3
          className="font-display font-bold text-lg text-white mb-3"
          style={{ textShadow: `0 0 20px ${service.color}30` }}
        >
          {service.title}
        </h3>
        <p className="font-body text-sm text-white/55 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.color}60, transparent)`,
        }}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #060a16 0%, #080d1f 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />

      {/* Decorative orbs */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 pointer-events-none"
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
          <span className="section-label block mb-4">◈ What We Build</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="font-body text-white/50 text-base max-w-xl mx-auto mt-4">
            End-to-end technology services from concept to deployment,
            engineered to scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
