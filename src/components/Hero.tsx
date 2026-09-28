import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { contact, hero, profile } from '../data/content';
import { useI18n } from '../lib/i18n';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../lib/brand-icons';
import { CodeWindow } from './CodeWindow';
import { MagneticLink, ease } from './ui';

function AnimatedWord({ word, delay, ready }: { word: string; delay: number; ready: boolean }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em]">
      {word.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%', rotate: 8 }}
          animate={ready ? { y: 0, rotate: 0 } : undefined}
          transition={{ duration: 0.9, delay: delay + i * 0.04, ease }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2800);
    return () => window.clearInterval(id);
  }, [words.length]);

  const word = words[index % words.length];
  return (
    <span className="relative flex min-h-[1.3em] overflow-hidden sm:inline-flex sm:min-h-0 sm:align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="text-gradient inline-block pb-1 whitespace-nowrap"
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const { tr, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const codeY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const mx = useSpring(useMotionValue(50), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(35), { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgb(110 242 192 / 0.09), transparent 70%)`;

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease },
  });

  const socials = [
    { href: profile.github, label: 'GitHub', icon: <GithubIcon className="size-[18px]" /> },
    { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedinIcon className="size-[18px]" /> },
    {
      href: `${profile.whatsapp}?text=${encodeURIComponent(tr(contact.whatsappText))}`,
      label: 'WhatsApp',
      icon: <WhatsappIcon className="size-[18px]" />,
    },
    { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail className="size-[18px]" /> },
  ];

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - rect.left) / rect.width) * 100);
        my.set(((e.clientY - rect.top) / rect.height) * 100);
      }}
    >
      {/* Fondo */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <motion.div
          className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-mint/[0.13] blur-[120px]"
          animate={{ x: [0, 80, -20, 0], y: [0, 40, 90, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 size-[36rem] rounded-full bg-violet/[0.16] blur-[130px]"
          animate={{ x: [0, -90, 30, 0], y: [0, -50, 40, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 size-[28rem] rounded-full bg-sky/[0.10] blur-[120px]"
          animate={{ x: [0, 60, -60, 0], y: [0, -30, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.p
            {...show(0.1)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-mint" />
            </span>
            {tr(hero.eyebrow)}
          </motion.p>

          <h1 className="mt-7 font-display text-[clamp(3.4rem,10vw,7.25rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden className="block">
              <AnimatedWord word="Matias" delay={0.15} ready={ready} />
            </span>
            <span aria-hidden className="block">
              <AnimatedWord word="Minoni" delay={0.35} ready={ready} />
              <motion.span
                className="inline-block text-mint"
                initial={{ scale: 0 }}
                animate={ready ? { scale: 1 } : undefined}
                transition={{ delay: 0.85, type: 'spring', stiffness: 400, damping: 12 }}
              >
                .
              </motion.span>
            </span>
          </h1>

          <motion.p {...show(0.55)} className="mt-7 font-display text-2xl font-medium tracking-tight text-fg/90 sm:text-3xl">
            {tr(hero.lead)} <RotatingWords key={lang} words={tr(hero.rotating)} />
          </motion.p>

          <motion.p {...show(0.65)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {tr(hero.description)}
          </motion.p>

          <motion.div {...show(0.75)} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticLink
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_0_40px_-8px] shadow-mint/60"
            >
              {tr(hero.ctaPrimary)}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </MagneticLink>
            <MagneticLink
              href={profile.cv}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.07]"
            >
              <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              {tr(hero.ctaSecondary)}
            </MagneticLink>
          </motion.div>

          <motion.ul
            className="mt-10 flex items-center gap-3"
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } }}
          >
            {socials.map((s) => (
              <motion.li
                key={s.label}
                variants={{ hidden: { opacity: 0, y: 12, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1 } }}
              >
                <motion.a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-colors hover:border-mint/40 hover:text-mint"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {s.icon}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          style={{ y: codeY }}
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
          transition={{ duration: 1.1, delay: 0.5, ease }}
          className="min-w-0 [perspective:1200px]"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <CodeWindow start={ready} />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#sobre-mi"
        aria-label={tr(hero.scroll)}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] tracking-[0.3em] text-subtle uppercase md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.4 }}
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <motion.span
            className="size-1 rounded-full bg-mint"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        {tr(hero.scroll)}
      </motion.a>
    </section>
  );
}
