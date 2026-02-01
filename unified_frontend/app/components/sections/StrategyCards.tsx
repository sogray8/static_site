"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Strategy {
  name: string;
  description: string;
  apy: string;
  risk: "low" | "medium" | "high";
  protocols: string[];
  tags: string[];
}

const strategies: Strategy[] = [
  {
    name: "Stable Yield",
    description:
      "Conservative stablecoin strategies optimized for consistent returns with minimal volatility.",
    apy: "4-8%",
    risk: "low",
    protocols: ["Aave", "Morpho"],
    tags: ["Stablecoins", "Low volatility"],
  },
  {
    name: "ETH Maximizer",
    description:
      "Leverage liquid staking derivatives across multiple protocols to maximize ETH-denominated returns.",
    apy: "8-15%",
    risk: "medium",
    protocols: ["Pendle", "Aave"],
    tags: ["LST", "ETH exposure"],
  },
  {
    name: "Yield Arbitrage",
    description:
      "AI-optimized allocation across yield sources, automatically rebalancing for optimal risk-adjusted returns.",
    apy: "12-25%",
    risk: "medium",
    protocols: ["Curve", "Balancer", "Pendle"],
    tags: ["Multi-protocol", "Active"],
  },
  {
    name: "Delta Neutral",
    description:
      "Market-neutral strategies that generate yield regardless of market direction through sophisticated hedging.",
    apy: "15-35%",
    risk: "high",
    protocols: ["Aave", "Morpho", "Curve"],
    tags: ["Hedged", "Advanced"],
  },
];

const riskConfig = {
  low: {
    label: "Low Risk",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  medium: {
    label: "Medium Risk",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  high: {
    label: "Higher Risk",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
};

export default function StrategyCards() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="strategies"
      className="relative py-24 md:py-32"
      aria-labelledby="strategies-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]" />

      {/* Premium gradient mesh */}
      <div className="ambient-mesh" />

      {/* Ambient glow */}
      <div
        className="ambient-glow ambient-glow-blue"
        style={{
          width: "60vw",
          height: "60vw",
          top: "20%",
          right: "-20%",
          opacity: 0.08,
        }}
      />
      <div
        className="ambient-glow ambient-glow-cyan"
        style={{
          width: "40vw",
          height: "40vw",
          bottom: "10%",
          left: "-10%",
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
            Strategies
          </span>
          <h2
            id="strategies-heading"
            className="text-display-lg mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Curated <span className="gradient-text">Yield Strategies</span>
          </h2>
          <p className="text-body-md max-w-xl mx-auto">
            From conservative stablecoin yields to sophisticated delta-neutral
            positions. Choose your risk tolerance, we handle the rest.
          </p>
        </motion.div>

        {/* Strategy grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {strategies.map((strategy, index) => (
            <StrategyCard
              key={strategy.name}
              strategy={strategy}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          className="mt-12 text-center text-xs text-[var(--color-text-tertiary)] max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 0.8 }}
        >
          APY ranges are historical estimates and not guarantees of future
          performance. All DeFi strategies carry inherent risks including smart
          contract risk and market volatility.
        </motion.p>
      </div>
    </section>
  );
}

function StrategyCard({
  strategy,
  index,
  isInView,
}: {
  strategy: Strategy;
  index: number;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const risk = riskConfig[strategy.risk];

  return (
    <motion.article
      className="group glass border-gradient p-6 md:p-8 rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.1 * index,
      }}
      whileHover={{ y: -4 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3
            className="text-xl font-medium text-[var(--color-text-primary)] mb-1"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {strategy.name}
          </h3>
          <div className="flex items-center gap-2">
            {/* Risk indicator */}
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                background: risk.bgColor,
                color: risk.color,
                border: `1px solid ${risk.borderColor}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: risk.color }}
              />
              {risk.label}
            </span>
          </div>
        </div>

        {/* APY */}
        <div className="text-right">
          <div
            className="text-2xl font-semibold gradient-text-accent"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {strategy.apy}
          </div>
          <div className="text-xs text-[var(--color-text-tertiary)]">APY</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-2">
        {strategy.description}
      </p>

      {/* Protocols */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-[var(--color-text-tertiary)]">
          Protocols:
        </span>
        <div className="flex gap-1">
          {strategy.protocols.map((protocol) => (
            <span
              key={protocol}
              className="px-2 py-0.5 rounded bg-[var(--color-elevated)] text-xs text-[var(--color-text-secondary)]"
            >
              {protocol}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {strategy.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full border border-white/10 text-xs text-[var(--color-text-tertiary)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover arrow */}
      <div className="mt-6 flex items-center text-[var(--color-accent-electric)] opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm font-medium">Learn more</span>
        <svg
          className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.article>
  );
}
