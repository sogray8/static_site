"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface ComparisonRow {
  feature: string;
  unified: string | boolean;
  traditional: string | boolean;
  highlight?: boolean;
}

const comparisons: ComparisonRow[] = [
  {
    feature: "Management Fee",
    unified: "0%",
    traditional: "1-2%",
  },
  {
    feature: "Performance Fee",
    unified: "10% of profits only",
    traditional: "20%+ on all gains",
    highlight: true,
  },
  {
    feature: "Withdrawal Fees",
    unified: "0%",
    traditional: "0.5-2%",
  },
  {
    feature: "Hidden Swap Fees",
    unified: false,
    traditional: true,
  },
  {
    feature: "Lock-up Periods",
    unified: "None",
    traditional: "30-90 days",
  },
  {
    feature: "Transparency",
    unified: "On-chain verifiable",
    traditional: "Black box",
    highlight: true,
  },
];

export default function FeeTransparency() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="fees-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-void)]" />

      {/* Premium gradient mesh */}
      <div className="ambient-mesh" />

      {/* Ambient glow */}
      <div
        className="ambient-glow ambient-glow-cyan"
        style={{
          width: "50vw",
          height: "50vw",
          top: "0%",
          left: "-20%",
          opacity: 0.08,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
          >
            <span className="pill mb-6 inline-flex">
              <span className="pill-dot" />
              Aligned Incentives
            </span>
            <h2
              id="fees-heading"
              className="text-display-lg mb-6"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              We Win When{" "}
              <span className="gradient-text">You Win</span>
            </h2>
            <p className="text-body-lg mb-8 max-w-lg">
              No management fees extracting value while you sleep. Our success
              is directly tied to your profits—the only way it should be.
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-xl glass border-gradient">
                <div
                  className="text-3xl md:text-4xl font-semibold gradient-text mb-2"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  0%
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)]">
                  Management fees
                </p>
              </div>
              <div className="p-6 rounded-xl glass border-gradient">
                <div
                  className="text-3xl md:text-4xl font-semibold text-[var(--color-accent-electric)] mb-2"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  10%
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)]">
                  Performance fee only
                </p>
              </div>
            </div>
          </motion.div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: 0.2 }}
          >
            <div className="rounded-2xl glass border-gradient overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 p-4 md:p-6 bg-[var(--color-elevated)]/50 border-b border-white/10">
                <div className="text-sm font-medium text-[var(--color-text-tertiary)]">
                  Feature
                </div>
                <div className="text-sm font-medium text-[var(--color-accent-electric)] text-center">
                  Unified
                </div>
                <div className="text-sm font-medium text-[var(--color-text-tertiary)] text-center">
                  Traditional
                </div>
              </div>

              {/* Table rows */}
              <div className="divide-y divide-white/5">
                {comparisons.map((row, index) => (
                  <motion.div
                    key={row.feature}
                    className={`grid grid-cols-3 gap-4 p-4 md:p-6 ${
                      row.highlight ? "bg-[var(--color-accent-electric)]/5" : ""
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: prefersReducedMotion ? 0.01 : 0.4,
                      delay: prefersReducedMotion ? 0 : 0.3 + index * 0.05,
                    }}
                  >
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      {row.feature}
                    </div>
                    <div className="text-center">
                      {typeof row.unified === "boolean" ? (
                        row.unified ? (
                          <CheckIcon className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <XIcon className="w-5 h-5 text-emerald-500 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">
                          {row.unified}
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      {typeof row.traditional === "boolean" ? (
                        row.traditional ? (
                          <CheckIcon className="w-5 h-5 text-red-400 mx-auto" />
                        ) : (
                          <XIcon className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-[var(--color-text-tertiary)]">
                          {row.traditional}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
