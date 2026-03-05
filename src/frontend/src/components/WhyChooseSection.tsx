import { motion } from "motion/react";

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
  glowClass: string;
}

const features: Feature[] = [
  {
    icon: "🚀",
    title: "Innovation-Driven",
    description:
      "We leverage the latest technologies and forward-thinking methodologies to deliver solutions that keep you ahead of the competition.",
    color: "#00c8ff",
    glowClass: "glow-border-blue",
  },
  {
    icon: "👥",
    title: "Expert Team",
    description:
      "Seasoned developers, designers, and strategists with global experience across diverse industries and technology stacks.",
    color: "#8b5cf6",
    glowClass: "glow-border-purple",
  },
  {
    icon: "⚡",
    title: "Scalable Technologies",
    description:
      "Future-proof architectures engineered to scale with your business — from startup to enterprise without painful rewrites.",
    color: "#06ffd4",
    glowClass: "glow-border-cyan",
  },
  {
    icon: "🛡️",
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security measures, rigorous testing protocols, and 99.9% uptime guarantee across all our deployments.",
    color: "#00c8ff",
    glowClass: "glow-border-blue",
  },
];

export default function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080d1f 0%, #060a16 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />

      {/* Decorative orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,255,0.04) 0%, transparent 60%)",
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
            ◈ Our Differentiators
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
            Why Choose <span className="gradient-text">Veinbit?</span>
          </h2>
          <p className="font-body text-white/50 text-base max-w-xl mx-auto mt-4">
            We don't just write code. We architect solutions that create lasting
            business value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              data-ocid={`why.item.${i + 1}`}
              className={`feature-block glass ${feature.glowClass} rounded-2xl p-7 group`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <motion.div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${feature.color}12`,
                    border: `1px solid ${feature.color}25`,
                  }}
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  {feature.icon}
                </motion.div>

                <div>
                  <h3
                    className="font-display font-bold text-lg text-white mb-2"
                    style={{ textShadow: `0 0 20px ${feature.color}20` }}
                  >
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-white/55 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Animated bottom gradient */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${feature.color}60, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
