import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { nav, profile, type Lang } from '../data/content';
import { useI18n } from '../lib/i18n';
import { useActiveSection } from '../hooks/useActiveSection';
import { ease } from './ui';

const sectionIds = nav.map((n) => n.id);

export function LangToggle({ layoutId = 'lang-pill' }: { layoutId?: string }) {
  const { lang, setLang } = useI18n();
  const options: Lang[] = ['es', 'en'];
  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="relative flex rounded-full border border-white/10 bg-white/[0.03] p-1 font-mono text-xs"
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setLang(opt)}
          aria-pressed={lang === opt}
          className={`relative rounded-full px-3 py-1.5 uppercase transition-colors ${lang === opt ? 'text-ink-950' : 'text-muted hover:text-fg'}`}
        >
          {lang === opt ? (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-mint"
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            />
          ) : null}
          <span className="relative">{opt}</span>
        </button>
      ))}
    </div>
  );
}

export function Navbar({ ready }: { ready: boolean }) {
  const { tr } = useI18n();
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const diff = y - last.current;
    if (Math.abs(diff) > 6) {
      setHidden(diff > 0 && y > 240);
      last.current = y;
    }
    setScrolled(y > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -110 : 0, opacity: 1 } : { y: -90, opacity: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 backdrop-blur-xl transition-colors duration-500 ${
            scrolled || open ? 'border-white/10 bg-ink-900/75' : 'border-transparent bg-transparent'
          }`}
        >
          <a href="#inicio" className="group flex items-center gap-3 rounded-full pr-3 pl-1" onClick={() => setOpen(false)}>
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-mint to-violet font-display text-sm font-bold text-ink-950 transition-transform duration-500 group-hover:rotate-[360deg]">
              {profile.initials}
            </span>
            <span className="hidden font-display text-sm font-medium tracking-tight sm:inline">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === item.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active === item.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative">{tr(item.label)}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangToggle />
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {nav.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-4xl font-semibold tracking-tight"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease }}
                  >
                    <span className="font-mono text-sm text-mint">0{i + 1}</span>
                    <span className={active === item.id ? 'text-gradient' : ''}>{tr(item.label)}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
