import { useEffect } from 'react';
import { motion } from 'motion/react';
import { profile } from '../data/content';

const curtain = [0.76, 0, 0.24, 1] as const;

/** Pantalla de entrada: dibuja el monograma y se retira como un telón. */
export function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onDone, 1700);
    return () => window.clearTimeout(id);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: curtain }}
    >
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 64 40" className="w-28 overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="intro-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6ef2c0" />
              <stop offset="1" stopColor="#9b8cff" />
            </linearGradient>
          </defs>
          <motion.path
            d="M4 36V4l12 17 12-17v32M36 36V4l12 17 12-17v32"
            fill="none"
            stroke="url(#intro-g)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
        <div className="overflow-hidden">
          <motion.p
            className="font-mono text-xs tracking-[0.4em] text-muted uppercase"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.name}
          </motion.p>
        </div>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-mint to-violet"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}
