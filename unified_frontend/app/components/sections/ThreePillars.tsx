"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface PillarData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  visual: React.ReactNode;
}

const pillars: PillarData[] = [
  {
    id: "simplicity",
    title: "Simplicity",
    subtitle: "5 Protocols. 1 Conversation.",
    description:
      "No more switching between dashboards, comparing APYs manually, or wrestling with complex UIs. Unified transforms the chaos of DeFi into a single, intuitive conversation.",
    icon: <SimplifyIcon />,
    visual: <SimplicityVisual />,
  },
  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "AI That Evolves With You",
    description:
      "Our agents don't just execute—they educate. Start with guided recommendations, graduate to personalized advice, and eventually let autonomous strategies work while you sleep.",
    icon: <BrainIcon />,
    visual: <IntelligenceVisual />,
  },
  {
    id: "privacy",
    title: "Privacy",
    subtitle: "Your Gains. Your Business.",
    description:
      "Privacy-preserving technology ensures your strategies remain yours alone. Gain abstraction means your edge stays hidden from competitors and front-runners.",
    icon: <ShieldIcon />,
    visual: <PrivacyVisual />,
  },
];

export default function ThreePillars() {
  return (
    <section
      id="features"
      className="relative py-32 md:py-40"
      aria-labelledby="pillars-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-void)]" />

      {/* Gradient mesh */}
      <div className="ambient-mesh" />

      {/* Glow accents */}
      <div
        className="ambient-glow ambient-glow-blue"
        style={{
          width: "60vw",
          height: "60vw",
          top: "10%",
          left: "-20%",
        }}
      />
      <div
        className="ambient-glow ambient-glow-cyan"
        style={{
          width: "40vw",
          height: "40vw",
          bottom: "20%",
          right: "-10%",
        }}
      />

      <div className="relative section-container">
        {/* Section header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="pill">
              <span className="pill-dot" />
              The Foundation
            </span>
          </motion.div>
          <motion.h2
            id="pillars-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-xl text-balance"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Three Pillars of{" "}
            <span className="gradient-text">Unified</span>
          </motion.h2>
        </div>

        {/* Pillars */}
        <div className="space-y-40 md:space-y-56">
          {pillars.map((pillar, index) => (
            <PillarSection key={pillar.id} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarSection({
  pillar,
  index,
}: {
  pillar: PillarData;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
        isEven ? "" : "lg:[direction:rtl]"
      }`}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Visual */}
      <div
        className={`relative aspect-square max-w-lg mx-auto w-full ${
          isEven ? "" : "lg:[direction:ltr]"
        }`}
      >
        <div className="absolute inset-0 rounded-3xl border border-white/5 bg-[var(--color-surface)]/50 backdrop-blur-sm overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl border-gradient" />
          {pillar.visual}
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-6 ${isEven ? "" : "lg:[direction:ltr]"}`}>
        {/* Icon and label */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-electric)]/20 to-[var(--color-cyan)]/10 border border-[var(--color-accent-electric)]/20 flex items-center justify-center">
            {pillar.icon}
          </div>
          <span className="text-mono-sm text-[var(--color-accent-electric)]">
            {pillar.title}
          </span>
        </div>

        <h3
          className="text-display-md text-[var(--color-text-primary)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {pillar.subtitle}
        </h3>
        <p className="text-body-lg max-w-md">{pillar.description}</p>

        {/* Learn more link */}
        <a
          href={`#${pillar.id}`}
          className="inline-flex items-center gap-2 text-[var(--color-accent-electric)] text-sm font-medium group"
        >
          <span>Learn more</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

// Simplicity Visual: Chaos resolving into unified center
function SimplicityVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const chaosNodes = [
    { x: 15, y: 20, label: "Pendle", color: "#15B088" },
    { x: 82, y: 18, label: "Morpho", color: "#2775CA" },
    { x: 20, y: 78, label: "Curve", color: "#FF4C4C" },
    { x: 85, y: 75, label: "Aave", color: "#B6509E" },
    { x: 50, y: 88, label: "Balancer", color: "#1E1E1E" },
  ];

  return (
    <div ref={ref} className="relative w-full h-full p-8">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-electric)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {chaosNodes.map((node, i) =>
          chaosNodes.slice(i + 1).map((target, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${target.x}%`}
              y2={`${target.y}%`}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
              transition={{ duration: 1.5, delay: 0.3 + (i + j) * 0.1 }}
            />
          ))
        )}
        {/* Lines to center */}
        {chaosNodes.map((node, i) => (
          <motion.line
            key={`center-${i}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2="50%"
            y2="50%"
            stroke="var(--color-accent-electric)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 1, delay: 1 + i * 0.1 }}
          />
        ))}
      </svg>

      {/* Protocol nodes */}
      {chaosNodes.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[var(--color-elevated)] border border-white/10 flex items-center justify-center shadow-lg">
            <span
              className="text-lg font-bold"
              style={{ color: node.color }}
            >
              {node.label.charAt(0)}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Central unified node */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-[var(--color-accent-bright)] to-[var(--color-accent-deep)] flex items-center justify-center shadow-2xl">
            <span
              className="text-white text-lg md:text-xl font-semibold"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Unified
            </span>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-[var(--color-accent-electric)] blur-2xl opacity-30" />
        </div>
      </motion.div>
    </div>
  );
}

// Intelligence Visual: Evolution stages
function IntelligenceVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stages = [
    { icon: "book", label: "Educator", desc: "Learn as you go", active: false },
    { icon: "brain", label: "Advisor", desc: "Personalized guidance", active: false },
    { icon: "zap", label: "Executor", desc: "Autonomous action", active: true },
  ];

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-xs">
        {/* Vertical connection line */}
        <div className="absolute left-6 top-12 bottom-12 w-px bg-gradient-to-b from-[var(--color-accent-electric)] via-[var(--color-cyan)] to-[var(--color-teal)] opacity-30" />

        {/* Stages */}
        <div className="relative space-y-8">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.label}
              className="relative flex items-center gap-5"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
            >
              {/* Icon */}
              <div
                className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  stage.active
                    ? "bg-gradient-to-br from-[var(--color-accent-bright)] to-[var(--color-accent-deep)]"
                    : "bg-[var(--color-elevated)] border border-white/10"
                }`}
              >
                <StageIcon type={stage.icon} active={stage.active} />
                {stage.active && (
                  <div className="absolute inset-0 rounded-xl bg-[var(--color-accent-electric)] blur-xl opacity-40" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4
                  className={`text-base font-medium ${
                    stage.active
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {stage.label}
                </h4>
                <p className="text-sm text-[var(--color-text-tertiary)]">
                  {stage.desc}
                </p>
              </div>

              {/* Active indicator */}
              {stage.active && (
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent-electric)] shadow-lg shadow-[var(--color-accent-electric)]/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StageIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? "white" : "var(--color-text-tertiary)";

  switch (type) {
    case "book":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "brain":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" aria-hidden="true">
          <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" />
          <path d="M12 4.5v15" />
        </svg>
      );
    case "zap":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    default:
      return null;
  }
}

// Privacy Visual: Reversed prism with modern design
function PrivacyVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center p-8">
      <div className="relative w-72 h-72">
        {/* Incoming rays */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 288 288" aria-hidden="true">
          <defs>
            <linearGradient id="rayElectric" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rayCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rayTeal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rayIndigo" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="unifiedOutput" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#f9fafb" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f9fafb" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Incoming colored rays */}
          {[
            { y: 100, gradient: "rayElectric", delay: 0 },
            { y: 124, gradient: "rayCyan", delay: 0.1 },
            { y: 144, gradient: "rayTeal", delay: 0.2 },
            { y: 164, gradient: "rayIndigo", delay: 0.3 },
            { y: 188, gradient: "rayElectric", delay: 0.4 },
          ].map((ray, i) => (
            <motion.line
              key={i}
              x1="0"
              y1={ray.y}
              x2="130"
              y2="144"
              stroke={`url(#${ray.gradient})`}
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: ray.delay }}
            />
          ))}

          {/* Unified output ray */}
          <motion.line
            x1="158"
            y1="144"
            x2="288"
            y2="144"
            stroke="url(#unifiedOutput)"
            strokeWidth="4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.7 }}
          />
        </svg>

        {/* Privacy prism */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            {/* Prism shape */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 rotate-45 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-elevated)] border border-white/20 rounded-lg"
              style={{
                boxShadow:
                  "0 0 40px rgba(56, 189, 248, 0.2), inset 0 0 20px rgba(255,255,255,0.05)",
              }}
            />
            {/* Inner gradient */}
            <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 rotate-45 bg-gradient-to-br from-[var(--color-accent-electric)]/10 to-[var(--color-cyan)]/5 rounded-lg" />
          </div>
        </motion.div>

        {/* Labels */}
        <motion.div
          className="absolute left-2 top-1/2 -translate-y-1/2 text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-xs text-[var(--color-text-tertiary)]">Visible</p>
          <p className="text-xs text-[var(--color-text-tertiary)]">Activity</p>
        </motion.div>

        <motion.div
          className="absolute right-2 top-1/2 -translate-y-1/2 text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            Private
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            Unified Output
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Icon components
function SimplifyIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent-electric)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent-electric)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5" />
      <path d="M12 4.5a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 4.24 3 3 0 0 1-.34 5.58 2.5 2.5 0 0 1-2.96 3.08A2.5 2.5 0 0 1 12 19.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent-electric)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
