import { motion } from 'motion/react';
import { ArrowUpRight, Database, Globe, Radar } from 'lucide-react';
import { earlyProjects, profile, projectsSection, type Project } from '../data/content';
import { useI18n } from '../lib/i18n';
import { GithubIcon } from '../lib/brand-icons';
import { Card, MagneticLink, Reveal, SectionHeading, Tag, ease } from './ui';

const nodeIcons = [Globe, Radar, Database];

/** Diagrama del pipeline con "paquetes" de datos viajando entre etapas. */
function Pipeline() {
  const { tr } = useI18n();
  const nodes = projectsSection.featured.nodes;

  return (
    <div className="flex flex-col items-stretch rounded-3xl border border-line bg-paper p-4 sm:p-6">
      {nodes.map((node, i) => {
        const Icon = nodeIcons[i];
        return (
          <div key={node.detail} className="flex flex-col items-stretch">
            <motion.div
              className="relative flex items-center gap-4 rounded-2xl border border-line bg-surface p-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.6, ease }}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <p className="font-medium">{tr(node.title)}</p>
                <p className="truncate font-mono text-xs text-muted">{node.detail}</p>
              </div>
              <span className="ml-auto font-mono text-xs text-subtle">0{i + 1}</span>
            </motion.div>

            {i < nodes.length - 1 ? (
              <div className="relative mx-auto h-10 w-px bg-line-strong">
                {[0, 1].map((d) => (
                  <motion.span
                    key={d}
                    aria-hidden
                    className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent"
                    initial={{ top: '0%', opacity: 0 }}
                    animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: d * 0.8 + i * 0.3, ease: 'linear' }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { tr } = useI18n();
  const initials = project.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  return (
    <Reveal delay={index * 0.08} y={24} className="h-full">
      <a href={project.url} target="_blank" rel="noreferrer" className="block h-full">
        <Card className="flex h-full flex-col overflow-hidden">
          <div className="relative h-40 overflow-hidden" style={{ background: `hsl(${project.hue} 45% 93%)` }}>
            <span
              aria-hidden
              className="absolute -bottom-5 left-5 text-[6.5rem] leading-none font-semibold tracking-[-0.06em] transition-transform duration-700 group-hover:-translate-y-1.5"
              style={{ color: `hsl(${project.hue} 40% 78%)` }}
            >
              {initials}
            </span>
            <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-black/10 bg-surface/80 transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <p className="font-mono text-xs text-accent">{tr(project.tagline)}</p>
            <h4 className="mt-2 text-xl font-semibold tracking-[-0.02em]">{project.name}</h4>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{tr(project.description)}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <span className="sr-only">{tr(projectsSection.visit)}</span>
          </div>
        </Card>
      </a>
    </Reveal>
  );
}

export function Projects() {
  const { tr } = useI18n();
  const f = projectsSection.featured;

  return (
    <section id="proyectos" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeading index="05" kicker={tr(projectsSection.kicker)} title={tr(projectsSection.title)} />

        <Reveal y={30} className="mt-14">
          <div className="grid gap-10 rounded-[2rem] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div className="flex flex-col">
              <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">{tr(f.label)}</p>
              <h3 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{tr(f.title)}</h3>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{tr(f.description)}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            <Pipeline />
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{tr(projectsSection.earlyTitle)}</h3>
          <p className="mt-2 text-muted">{tr(projectsSection.earlySubtitle)}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {earlyProjects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <MagneticLink
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink"
          >
            <GithubIcon className="size-4" />
            {tr(projectsSection.more)}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </MagneticLink>
        </Reveal>
      </div>
    </section>
  );
}
