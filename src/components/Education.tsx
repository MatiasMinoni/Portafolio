import { motion } from 'motion/react';
import { Award, GraduationCap } from 'lucide-react';
import { education } from '../data/content';
import { useI18n } from '../lib/i18n';
import { formatMonth } from '../lib/dates';
import { Card, Reveal, SectionHeading, ease } from './ui';

export function Education() {
  const { tr, lang } = useI18n();
  const uni = education.university;

  return (
    <section id="formacion" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index="06" kicker={tr(education.kicker)} title={tr(education.title)} />

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Reveal y={40}>
            <Card className="p-7 sm:p-9">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                <GraduationCap className="size-6" strokeWidth={1.6} />
              </span>
              <p className="mt-7 font-mono text-xs text-muted">
                {formatMonth(uni.start, lang)} — {formatMonth(uni.end, lang)}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.75rem]">{tr(uni.degree)}</h3>
              <p className="mt-2 text-muted">{uni.institution}</p>
            </Card>
          </Reveal>

          <Reveal y={40} delay={0.1}>
            <Card className="p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <Award className="size-5 text-accent" strokeWidth={1.7} />
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{tr(education.certificationsTitle)}</h3>
              </div>
              <motion.ul
                className="mt-6 flex flex-wrap gap-2.5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
              >
                {education.certifications.map((c) => (
                  <motion.li
                    key={c.en}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                    className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm text-ink/85"
                  >
                    {tr(c)}
                  </motion.li>
                ))}
              </motion.ul>
            </Card>
          </Reveal>
        </div>

        <Reveal y={40} delay={0.15} className="h-full">
          <Card className="h-full p-7 sm:p-9">
            <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">{education.coursesInstitution}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.75rem]">{tr(education.coursesLabel)}</h3>

            <ol className="relative mt-8 space-y-7 border-l border-line pl-7">
              {education.courses.map((course, i) => {
                const name = typeof course.name === 'string' ? course.name : tr(course.name);
                return (
                  <motion.li
                    key={name}
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease }}
                  >
                    <span className="absolute top-1.5 -left-[calc(1.75rem+5px)] size-2.5 rounded-full border-2 border-accent bg-surface" />
                    <p className="text-lg font-medium tracking-[-0.01em]">{name}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {formatMonth(course.start, lang)} — {formatMonth(course.end, lang)}
                    </p>
                  </motion.li>
                );
              })}
            </ol>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
