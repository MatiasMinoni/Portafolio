import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Briefcase, MapPin } from 'lucide-react';
import { experience, experienceSection, type Job } from '../data/content';
import { useI18n } from '../lib/i18n';
import { formatDuration, formatMonth } from '../lib/dates';
import { Card, SectionHeading, Tag, ease } from './ui';

function JobCard({ job, index }: { job: Job; index: number }) {
  const { tr, lang } = useI18n();
  const current = job.roles.some((r) => r.end === null);

  return (
    <motion.li
      className="relative pl-12 sm:pl-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease, delay: index * 0.05 }}
    >
      {/* Nodo en la línea de tiempo */}
      <span className="absolute top-8 left-4 grid size-5 -translate-x-1/2 place-items-center sm:left-8">
        {current ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-accent/30"
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        ) : null}
        <span className={`relative size-3 rounded-full border-2 ${current ? 'border-accent bg-accent' : 'border-line-strong bg-paper'}`} />
      </span>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-[1.75rem]">{job.company}</h3>
          {job.kind ? (
            <span className="rounded-full border border-line bg-sunken px-2.5 py-0.5 font-mono text-[0.68rem] text-muted">
              {tr(job.kind)}
            </span>
          ) : null}
          {current ? (
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.68rem] text-accent">
              {tr(experienceSection.current)}
            </span>
          ) : null}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-subtle">
          <MapPin className="size-3.5" />
          {tr(job.location)}
        </p>

        <ul className="mt-6 space-y-3">
          {job.roles.map((role) => (
            <li
              key={`${role.title.en}-${role.start}`}
              className="flex flex-col gap-1 border-l border-line pl-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="flex items-center gap-2 font-medium text-ink">
                <Briefcase className="size-4 shrink-0 text-accent" strokeWidth={1.7} />
                {tr(role.title)}
              </span>
              <span className="font-mono text-xs text-muted sm:text-right">
                {formatMonth(role.start, lang)} — {role.end ? formatMonth(role.end, lang) : tr(experienceSection.present)}
                <span className="whitespace-nowrap text-subtle"> · {formatDuration(role.start, role.end, lang)}</span>
              </span>
            </li>
          ))}
        </ul>

        {job.description ? (
          <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-muted sm:text-base">
            {tr(job.description).map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent/70" />
                {line}
              </li>
            ))}
          </ul>
        ) : null}

        {job.tags ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}
      </Card>
    </motion.li>
  );
}

export function Experience() {
  const { tr } = useI18n();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experiencia" className="relative mx-auto max-w-5xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index="04" kicker={tr(experienceSection.kicker)} title={tr(experienceSection.title)} />

      <ol ref={ref} className="relative mt-16 space-y-8">
        <span aria-hidden className="absolute top-0 bottom-0 left-4 w-px bg-line sm:left-8" />
        <motion.span
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-px origin-top bg-accent sm:left-8"
          style={{ scaleY }}
        />
        {experience.map((job, i) => (
          <JobCard key={job.company} job={job} index={i} />
        ))}
      </ol>
    </section>
  );
}
