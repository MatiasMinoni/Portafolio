import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, MapPin } from 'lucide-react';
import { about, aboutStats, hero, profile } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Counter, Reveal, SectionHeading, ease } from './ui';

function Portrait() {
  const { tr } = useI18n();
  const [failed, setFailed] = useState(false);

  return (
    <figure className="mx-auto w-full max-w-[17rem] sm:max-w-[21rem]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-sunken">
        {failed ? (
          <div className="grid h-full place-items-center">
            <span className="text-8xl font-semibold tracking-[-0.06em] text-ink/85">
              {profile.initials}
              <span className="text-accent">.</span>
            </span>
          </div>
        ) : (
          <img
            src={profile.photo}
            alt={tr(about.photoAlt)}
            className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="mt-4 flex items-center justify-between gap-3 px-1">
        <span className="text-sm font-medium">{profile.fullName}</span>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="size-3.5 text-accent" />
          Buenos Aires
        </span>
      </figcaption>
    </figure>
  );
}

export function About() {
  const { tr } = useI18n();

  return (
    <section id="sobre-mi" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid items-start gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28" y={30}>
            <Portrait />
          </Reveal>

          <div>
            <SectionHeading index="01" kicker={tr(about.kicker)} title={tr(about.title)} />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {tr(about.paragraphs).map((p, i) => (
                <Reveal key={p} delay={0.05 + i * 0.06} y={14}>
                  <p className={i === 0 ? 'text-ink' : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>

            <motion.dl
              className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              {aboutStats.map((stat) => (
                <motion.div
                  key={stat.label.en}
                  className="bg-surface p-6 sm:p-7"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, ease } } }}
                >
                  <dt className="sr-only">{tr(stat.label)}</dt>
                  <dd>
                    <span className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="mt-2 block text-sm text-muted">{tr(stat.label)}</span>
                  </dd>
                </motion.div>
              ))}
            </motion.dl>

            <Reveal delay={0.1} className="mt-8">
              <a href={profile.cv} download className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
                <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                <span className="border-b border-accent/30 pb-0.5 transition-colors group-hover:border-accent">
                  {tr(hero.ctaSecondary)}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
