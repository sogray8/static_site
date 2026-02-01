"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";

const ConvergenceVisual = dynamic(() => import("./ConvergenceVisual"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-sky-500/10 to-cyan-500/5 blur-3xl animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Premium gradient mesh background */}
      <div className="ambient-mesh" />

      {/* Hero gradient from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56, 189, 248, 0.12), transparent 70%)",
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Ambient glows */}
      <div
        className="ambient-glow ambient-glow-hero"
        style={{
          width: "70vw",
          height: "70vw",
          top: "-30%",
          left: "15%",
        }}
      />
      <div
        className="ambient-glow ambient-glow-cyan"
        style={{
          width: "50vw",
          height: "50vw",
          bottom: "0%",
          right: "-10%",
        }}
      />

      {/* 3D Visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full max-w-5xl mx-auto">
          <ConvergenceVisual />
        </div>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 section-container">
        <motion.div
          className="max-w-4xl mx-auto text-center pt-28 md:pt-36"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Premium pill badge */}
          <motion.div variants={itemVariants} className="mb-10">
            <span className="pill">
              <span className="pill-dot" />
              Securing $97B+ in Protocol Value
            </span>
          </motion.div>

          {/* Main headline - larger and more impactful */}
          <motion.h1
            variants={itemVariants}
            className="text-display-hero mb-8 text-balance"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <span className="block text-[var(--color-text-primary)]">
              One Conversation.
            </span>
            <span className="block gradient-text">Every Yield.</span>
            <span className="block text-[var(--color-text-primary)]">
              Complete Privacy.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-body-xl max-w-2xl mx-auto mb-12 text-balance"
          >
            AI agents navigate DeFi complexity while you maintain complete
            control. No dashboards. No decision fatigue. Just intelligent yield
            optimization that speaks your language.
          </motion.p>

          {/* CTAs - more prominent */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              type="button"
              className="btn-primary group"
              aria-label="Connect your cryptocurrency wallet to get started"
            >
              <WalletIcon className="w-5 h-5" />
              <span>Connect Your Wallet</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </button>
            <a
              href="#how-it-works"
              className="btn-secondary group"
              aria-label="Learn how Unified works"
            >
              <span>See How It Works</span>
              <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </a>
          </motion.div>

          {/* Trust indicators - refined styling */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          >
            {[
              { icon: ShieldIcon, label: "Audited Contracts" },
              { icon: LockIcon, label: "Non-Custodial" },
              { icon: KeyIcon, label: "Your Keys, Your Crypto" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 text-sm text-[var(--color-text-tertiary)]"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface)] border border-white/5 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[var(--color-accent-electric)]" />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--color-void), transparent)",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--color-accent-electric)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Icon components
function WalletIcon({ className }: { className?: string }) {
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
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
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
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
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
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}
