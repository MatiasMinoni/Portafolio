import { motion } from 'motion/react';
import { Database, LayoutTemplate, Radar, Server, Smartphone, Sparkles } from 'lucide-react';
import { services, type ServiceIcon } from '../data/content';
import { useI18n } from '../lib/i18n';
import { SectionHeading, SpotlightCard, ease } from './ui';

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
    <section id="servicios" className="relative mx-auto max-w-6xl px-5 pb-28 sm:px-8 md:pb-36">
      <SectionHeading kicker={tr(services.kicker)} title={tr(services.title)} />

      <motion.ul
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {services.items.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <motion.li
              key={item.title.en}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.97 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
              }}
            >
              <SpotlightCard className="h-full p-7" color={i % 2 ? '155 140 255' : '110 242 192'}>
                <div className="flex items-start justify-between">
                  <motion.span
                    className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent text-mint"
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <Icon className="size-5" strokeWidth={1.6} />
                  </motion.span>
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{tr(item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{tr(item.description)}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[0.68rem] text-muted transition-colors group-hover:text-fg/80"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
