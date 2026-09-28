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
          className="fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full border border-line bg-surface/90 text-ink shadow-[0_10px_30px_-18px_rgb(20_20_23/0.5)] backdrop-blur transition-colors hover:border-ink"
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
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 text-sm text-muted sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-ink text-[0.7rem] font-semibold text-paper">
            {profile.initials}
          </span>
          <span>
            © {new Date().getFullYear()} {profile.fullName}
          </span>
        </div>
        <p className="text-subtle">{tr(footer.madeWith)}</p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-ink">
            <GithubIcon className="size-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-ink">
            <LinkedinIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
