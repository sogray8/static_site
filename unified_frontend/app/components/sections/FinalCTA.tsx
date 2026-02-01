"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-40 md:py-52 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-void)]" />

      {/* Premium gradient mesh */}
      <div className="ambient-mesh" />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[80vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.1) 0%, rgba(34, 211, 238, 0.05) 30%, transparent 70%)",
        }}
      />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.15), transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.12), transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative section-container">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Pre-headline */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.6,
              delay: 0.2,
            }}
          >
            <span className="pill">
              <span className="pill-dot" />
              Ready to Begin?
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h2
            id="cta-heading"
            className="text-display-xl mb-8 text-balance"
            style={{ fontFamily: "var(--font-dm-sans)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.8,
              delay: 0.3,
            }}
          >
            <span className="block text-[var(--color-text-primary)]">
              The Future of DeFi
            </span>
            <span className="block gradient-text">Speaks Your Language</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-body-xl max-w-xl mx-auto mb-14"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.6,
              delay: 0.5,
            }}
          >
            Join thousands of users who have simplified their DeFi experience.
            One conversation is all it takes.
          </motion.p>

          {/* CTA Button - Premium styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.6,
              delay: 0.6,
            }}
          >
            <button
              type="button"
              className="group relative inline-flex items-center gap-4 px-12 py-5 rounded-full text-lg font-medium text-white overflow-hidden focus-ring"
              aria-label="Launch the Unified application"
            >
              {/* Animated gradient background */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-bright)] via-[var(--color-accent)] to-[var(--color-cyan)] animate-gradient"
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Glow */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[var(--color-accent-electric)]/40" />

              {/* Button content */}
              <span className="relative z-10">Launch Unified</span>
              <svg
                className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Trust badges - more refined */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.6,
              delay: 0.8,
            }}
          >
            {[
              { icon: AuditIcon, label: "Audited by Trail of Bits" },
              { icon: LockIcon, label: "Non-Custodial" },
              { icon: CodeIcon, label: "Open Source" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--color-surface)]/50 border border-white/5"
              >
                <Icon className="w-4 h-4 text-[var(--color-accent-electric)]" />
                <span className="text-sm text-[var(--color-text-tertiary)]">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AuditIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
