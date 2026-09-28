import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { footer, profile } from '../data/content';
import { useI18n } from '../lib/i18n';
import { GithubIcon, LinkedinIcon } from '../lib/brand-icons';

export function BackToTop() {
  const { tr } = useI18n();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 900));

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href="#inicio"
          aria-label={tr(footer.backToTop)}
          className="fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full border border-white/10 bg-ink-900/80 text-fg backdrop-blur-xl transition-colors hover:border-mint/50 hover:text-mint"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="size-5" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}

export function Footer() {
  const { tr } = useI18n();
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 text-sm text-muted sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-mint to-violet font-display text-xs font-bold text-ink-950">
            {profile.initials}
          </span>
          <span>
            © {new Date().getFullYear()} {profile.fullName}
          </span>
        </div>
        <p className="text-subtle">{tr(footer.madeWith)}</p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-mint">
            <GithubIcon className="size-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-mint">
            <LinkedinIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
