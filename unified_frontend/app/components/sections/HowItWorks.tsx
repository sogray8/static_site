"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: "connect",
    title: "Connect",
    description:
      "Link your wallet securely. No private keys shared, no custody transferred. You remain in complete control.",
    icon: <ConnectIcon />,
  },
  {
    id: "discover",
    title: "Discover",
    description:
      "Tell us your goals in plain language. Our AI analyzes opportunities across protocols to find your optimal strategy.",
    icon: <DiscoverIcon />,
  },
  {
    id: "execute",
    title: "Execute",
    description:
      "Review and approve transactions. One signature deploys sophisticated multi-protocol strategies.",
    icon: <ExecuteIcon />,
  },
  {
    id: "monitor",
    title: "Monitor",
    description:
      "Track performance in real-time. Receive intelligent alerts. Let autonomous rebalancing optimize continuously.",
    icon: <MonitorIcon />,
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="how-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-deep)]" />

      {/* Premium gradient mesh */}
      <div className="ambient-mesh" />

      {/* Ambient glows */}
      <div
        className="ambient-glow ambient-glow-blue"
        style={{
          width: "50vw",
          height: "50vw",
          top: "10%",
          left: "-15%",
          opacity: 0.06,
        }}
      />
      <div
        className="ambient-glow ambient-glow-cyan"
        style={{
          width: "40vw",
          height: "40vw",
          bottom: "20%",
          right: "-10%",
          opacity: 0.05,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
        >
          <span className="pill mb-6 inline-flex">
            <span className="pill-dot" />
            The Journey
          </span>
          <h2
            id="how-heading"
            className="text-display-lg mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            How <span className="gradient-text">Unified</span> Works
          </h2>
          <p className="text-body-md max-w-xl mx-auto">
            From connection to continuous optimization. A seamless flow designed
            for clarity.
          </p>
        </motion.div>

        {/* Steps - morphing flow */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-[var(--color-accent-electric)] via-[var(--color-cyan)]/50 to-[var(--color-teal)]"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: prefersReducedMotion ? 0.01 : 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <StepItem
                key={step.id}
                step={step}
                index={index}
                isInView={isInView}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  step,
  index,
  isInView,
  isLast,
}: {
  step: Step;
  index: number;
  isInView: boolean;
  isLast: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-center gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.7,
        delay: prefersReducedMotion ? 0 : 0.2 + index * 0.15,
      }}
    >
      {/* Content */}
      <div
        className={`flex-1 text-center md:text-left ${
          isEven ? "" : "md:text-right"
        }`}
      >
        <h3
          className="text-xl md:text-2xl font-medium text-[var(--color-text-primary)] mb-3"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {step.title}
        </h3>
        <p className="text-body-md max-w-sm mx-auto md:mx-0">{step.description}</p>
      </div>

      {/* Center node */}
      <div className="relative z-10 order-first md:order-none">
        <motion.div
          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
          style={{
            background: isLast
              ? "linear-gradient(135deg, var(--color-accent-electric), var(--color-cyan))"
              : "var(--color-elevated)",
            border: isLast ? "none" : "1px solid rgba(255,255,255,0.1)",
            boxShadow: isLast ? "0 0 40px rgba(56, 189, 248, 0.3)" : "none",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.4 + index * 0.15,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            {step.icon}
          </motion.div>
        </motion.div>
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

// Icon components with consistent styling
function ConnectIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--color-text-primary)]"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function DiscoverIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--color-text-primary)]"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  );
}

function ExecuteIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--color-text-primary)]"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
