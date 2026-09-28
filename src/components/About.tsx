import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, MapPin } from 'lucide-react';
import { about, aboutStats, hero, profile } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Counter, Reveal, SectionHeading, TiltCard, ease } from './ui';

function Portrait() {
  const { tr } = useI18n();
  const [failed, setFailed] = useState(false);

  return (
    <TiltCard className="mx-auto w-full max-w-[17rem] sm:max-w-[22rem]" max={8}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] p-px">
        <motion.div
          aria-hidden
          className="absolute -inset-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,var(--color-mint)_60deg,transparent_120deg,transparent_180deg,var(--color-violet)_240deg,transparent_300deg)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative h-full overflow-hidden rounded-[calc(2rem-1px)] bg-ink-850">
          {failed ? (
            <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(110_242_192/0.25),transparent_55%),radial-gradient(circle_at_80%_90%,rgb(155_140_255/0.3),transparent_55%)]">
              <span className="font-display text-8xl font-bold tracking-tighter text-fg/90">{profile.initials}</span>
            </div>
          ) : (
            <img
              src={profile.photo}
              alt={tr(about.photoAlt)}
              className="h-full w-full object-cover grayscale-[35%] transition duration-700 hover:scale-105 hover:grayscale-0"
              loading="lazy"
              onError={() => setFailed(true)}
            />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/95 via-ink-950/50 to-transparent p-5 pt-16">
            <p className="font-display text-lg font-semibold">{profile.fullName}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-3.5 text-mint" />
              {profile.location}
            </p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function About() {
  const { tr } = useI18n();

  return (
    <section id="sobre-mi" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-36">
      <div className="grid items-start gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28" y={40}>
          <Portrait />
        </Reveal>

        <div>
          <SectionHeading kicker={tr(about.kicker)} title={tr(about.title)} />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {tr(about.paragraphs).map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.08} y={20}>
                <p className={i === 0 ? 'text-fg/90' : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>

          <motion.dl
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {aboutStats.map((stat) => (
              <motion.div
                key={stat.label.en}
                className="bg-ink-900 p-6 sm:p-7"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              >
                <dt className="sr-only">{tr(stat.label)}</dt>
                <dd>
                  <span className="text-gradient font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-2 block text-sm text-muted">{tr(stat.label)}</span>
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          <Reveal delay={0.2} className="mt-8">
            <a
              href={profile.cv}
              download
              className="group inline-flex items-center gap-2 text-sm font-medium text-mint"
            >
              <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
              <span className="bg-gradient-to-r from-mint to-mint bg-[length:0%_1px] bg-[position:left_bottom] bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                {tr(hero.ctaSecondary)}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
