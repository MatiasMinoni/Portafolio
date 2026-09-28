import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { stack, stackCategories, stackSection, type StackCategory, type Tech } from '../data/content';
import { useI18n } from '../lib/i18n';
import { readableBrandColor } from '../lib/brand-icons';
import { SectionHeading, TechGlyph, ease } from './ui';

const brandOf = (tech: Tech) => (tech.icon ? readableBrandColor(tech.icon.hex) : 'var(--color-accent)');

function MarqueeRow({ items, reverse = false }: { items: Tech[]; reverse?: boolean }) {
  return (
    <div className="group mask-fade-x flex overflow-hidden">
      <ul
        className="animate-marquee flex w-max shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? 'reverse' : 'normal', ['--marquee-duration' as string]: '55s' }}
      >
        {[...items, ...items].map((tech, i) => (
          <li
            key={`${tech.name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium whitespace-nowrap text-ink/80"
          >
            <span style={{ color: brandOf(tech) }}>
              <TechGlyph name={tech.name} icon={tech.icon} className="size-4" />
            </span>
            {tech.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  const { tr } = useI18n();
  const [filter, setFilter] = useState<StackCategory>('lang');
  const visible = stack.filter((t) => t.category === filter);
  const half = Math.ceil(stack.length / 2);

  return (
    <section id="stack" className="relative border-y border-line bg-surface/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          kicker={tr(stackSection.kicker)}
          title={tr(stackSection.title)}
          subtitle={tr(stackSection.subtitle)}
          center
        />
      </div>

      <motion.div
        className="mt-14 space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MarqueeRow items={stack.slice(0, half)} />
        <MarqueeRow items={stack.slice(half)} reverse />
      </motion.div>

      <div className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
        <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
          <div role="tablist" className="mx-auto flex w-max gap-1 rounded-full border border-line bg-surface p-1.5">
            {stackCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={filter === cat.id}
                onClick={() => setFilter(cat.id)}
                className={`relative rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                  filter === cat.id ? 'text-paper' : 'text-muted hover:text-ink'
                }`}
              >
                {filter === cat.id ? (
                  <motion.span
                    layoutId="stack-tab"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative font-medium">{tr(cat.label)}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mx-auto mt-10 flex min-h-[8.5rem] max-w-4xl flex-wrap content-start justify-center gap-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((tech, i) => (
              <motion.li
                layout
                key={tech.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.03, ease } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface py-3 pr-5 pl-3 transition-colors hover:border-line-strong"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-paper" style={{ color: brandOf(tech) }}>
                  <TechGlyph name={tech.name} icon={tech.icon} className="size-5" />
                </span>
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
