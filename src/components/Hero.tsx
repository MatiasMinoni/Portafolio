import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Download, Mail } from 'lucide-react';
import { contact, experience, hero, profile } from '../data/content';
import { useI18n } from '../lib/i18n';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../lib/brand-icons';
import { CodeWindow } from './CodeWindow';
import { MagneticLink, ease } from './ui';

const currentCompanies = experience.filter((job) => job.roles.some((r) => r.end === null)).map((job) => job.company);

function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2800);
    return () => window.clearInterval(id);
  }, [words.length]);

  const word = words[index % words.length];
  return (
    <span className="relative flex min-h-[1.25em] overflow-hidden sm:inline-flex sm:min-h-0 sm:align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="accent-serif inline-block pr-[0.08em] pb-1 text-[1.12em] leading-none whitespace-nowrap text-accent"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { tr, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const codeY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  const socials = [
    { href: profile.github, label: 'GitHub', icon: <GithubIcon className="size-[17px]" /> },
    { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedinIcon className="size-[17px]" /> },
    {
      href: `${profile.whatsapp}?text=${encodeURIComponent(tr(contact.whatsappText))}`,
      label: 'WhatsApp',
      icon: <WhatsappIcon className="size-[17px]" />,
    },
    { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail className="size-[17px]" /> },
  ];

  return (
    <section id="inicio" ref={ref} className="relative flex min-h-[100svh] items-center pt-32 pb-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <motion.p
            {...show(0.05)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {tr(hero.eyebrow)}
          </motion.p>

          <h1 className="mt-7 text-[clamp(3.25rem,9vw,6.75rem)] leading-[0.95] font-semibold tracking-[-0.055em]">
            <span className="sr-only">{profile.name}</span>
            {['Matias', 'Minoni'].map((word, i) => (
              <span key={word} aria-hidden className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.1 + i * 0.1, ease }}
                >
                  {word}
                  {i === 1 ? <span className="text-accent">.</span> : null}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...show(0.35)} className="mt-7 text-2xl font-medium tracking-[-0.02em] text-ink sm:text-[1.9rem]">
            {tr(hero.lead)} <RotatingWords key={lang} words={tr(hero.rotating)} />
          </motion.p>

          <motion.p {...show(0.45)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {tr(hero.description)}
          </motion.p>

          <motion.div {...show(0.55)} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticLink
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              {tr(hero.ctaPrimary)}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </MagneticLink>
            <MagneticLink
              href={profile.cv}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink"
            >
              <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              {tr(hero.ctaSecondary)}
            </MagneticLink>
          </motion.div>

          <motion.div {...show(0.65)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ul className="flex items-center gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-subtle">
              {tr(hero.currently)}{' '}
              {currentCompanies.map((c, i) => (
                <span key={c}>
                  <span className="font-medium text-ink">{c}</span>
                  {i < currentCompanies.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          </motion.div>
        </div>

        <motion.div
          style={{ y: codeY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="min-w-0"
        >
          <CodeWindow start />
        </motion.div>
      </div>

      <a
        href="#sobre-mi"
        aria-label={tr(hero.scroll)}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] text-subtle uppercase transition-colors hover:text-ink md:flex"
      >
        {tr(hero.scroll)}
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="size-3.5" />
        </motion.span>
      </a>
    </section>
  );
}
