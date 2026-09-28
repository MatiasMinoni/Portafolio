import { motion } from 'motion/react';
import { Database, LayoutTemplate, Radar, Server, Smartphone, Sparkles } from 'lucide-react';
import { services, type ServiceIcon } from '../data/content';
import { useI18n } from '../lib/i18n';
import { Card, SectionHeading, ease } from './ui';

const icons: Record<ServiceIcon, typeof Server> = {
  server: Server,
  radar: Radar,
  smartphone: Smartphone,
  sparkles: Sparkles,
  layout: LayoutTemplate,
  database: Database,
};

export function Services() {
  const { tr } = useI18n();

  return (
    <section id="servicios" className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
      <SectionHeading index="02" kicker={tr(services.kicker)} title={tr(services.title)} />

      <motion.ul
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      >
        {services.items.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <motion.li
              key={item.title.en}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <Card className="h-full p-7">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{tr(item.title)}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{tr(item.description)}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-sunken px-2.5 py-1 font-mono text-[0.68rem] text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
