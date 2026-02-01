"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Protocol {
  name: string;
  tvl: string;
  color: string;
}

const protocols: Protocol[] = [
  { name: "Aave", tvl: "$21.4B", color: "#B6509E" },
  { name: "Morpho", tvl: "$4.2B", color: "#2775CA" },
  { name: "Pendle", tvl: "$3.1B", color: "#15B088" },
  { name: "Curve", tvl: "$1.9B", color: "#FF4C4C" },
  { name: "Balancer", tvl: "$1.2B", color: "#1E1E1E" },
];

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="trust-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-deep)]" />

      {/* Gradient mesh */}
      <div className="ambient-mesh" />

      {/* Subtle ambient glow */}
      <div
        className="ambient-glow ambient-glow-blue"
        style={{
          width: "60vw",
          height: "60vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.06,
        }}
      />

      <div className="relative section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
        >
          <span className="pill mb-6 inline-flex">
            <span className="pill-dot" />
            Built on Trust
          </span>
          <h2
            id="trust-heading"
            className="text-display-md mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Integrated with Leading Protocols
          </h2>
          <p className="text-body-md max-w-xl mx-auto">
            Unified connects you to battle-tested DeFi infrastructure securing
            billions in total value locked.
          </p>
        </motion.div>

        {/* Protocol logos */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: 0.2 }}
        >
          {protocols.map((protocol, index) => (
            <motion.div
              key={protocol.name}
              className="group relative flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.5,
                delay: prefersReducedMotion ? 0 : 0.1 * index,
              }}
            >
              {/* Protocol icon placeholder */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${protocol.color}20, ${protocol.color}10)`,
                  border: `1px solid ${protocol.color}30`,
                }}
              >
                <span
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: protocol.color }}
                >
                  {protocol.name.charAt(0)}
                </span>
              </div>

              {/* Protocol name */}
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                {protocol.name}
              </span>

              {/* TVL tooltip on hover */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[var(--color-elevated)] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-xs font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                  TVL: {protocol.tvl}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Combined TVL stat */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-[var(--color-text-tertiary)]">
                Combined Protocol TVL
              </span>
            </div>
            <span
              className="text-2xl md:text-3xl font-semibold gradient-text-accent"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              $97B+
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
