import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { animate, motion, useInView, useReducedMotion, useSpring, type HTMLMotionProps } from 'motion/react';
import type { SimpleIcon } from 'simple-icons';
import { SimpleIconSvg } from '../lib/brand-icons';

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Convierte "texto *destacado*" en segmentos; lo destacado va en serif itálica. */
export function parseAccent(text: string) {
  return text.split('*').map((part, i) => ({ text: part, accent: i % 2 === 1 })).filter((s) => s.text);
}

export function SectionHeading({
  index,
  kicker,
  title,
  subtitle,
  center = false,
}: {
  index?: string;
  kicker: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  // Agrupa en palabras; la puntuación pegada a un destacado ("*texto*.") queda en la misma palabra.
  const words: { text: string; accent: boolean }[][] = [];
  let startNew = true;
  for (const seg of parseAccent(title)) {
    for (const piece of seg.text.split(/(\s+)/)) {
      if (!piece) continue;
      if (/^\s+$/.test(piece)) {
        startNew = true;
        continue;
      }
      if (startNew || words.length === 0) words.push([{ text: piece, accent: seg.accent }]);
      else words[words.length - 1].push({ text: piece, accent: seg.accent });
      startNew = false;
    }
  }

  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <motion.p
        className={`flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted uppercase ${center ? 'justify-center' : ''}`}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        {index ? <span className="text-accent">{index}</span> : null}
        {index ? <span className="h-px w-6 bg-line-strong" /> : null}
        {kicker}
      </motion.p>
      <h2 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance md:text-5xl lg:text-[3.5rem]">
        {words.map((parts, i) => (
          <span key={`${parts.map((p) => p.text).join('')}-${i}`} className="-mb-2 inline-block overflow-hidden pb-2 align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08 + i * 0.04, ease }}
            >
              {parts.map((part, j) =>
                part.accent ? (
                  <span key={j} className="accent-serif pr-[0.06em] text-[1.08em] text-accent">
                    {part.text}
                  </span>
                ) : (
                  <span key={j}>{part.text}</span>
                ),
              )}
            </motion.span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </h2>
      {subtitle ? (
        <Reveal delay={0.2} y={12}>
          <p className="mt-5 text-lg text-muted">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Botón/enlace que sigue levemente al cursor. */
export function MagneticLink({
  children,
  className,
  strength = 0.2,
  ...props
}: HTMLMotionProps<'a'> & { strength?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.a
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

/** Tarjeta base: blanca, borde fino y una elevación suave al pasar el mouse. */
export function Card({ children, className = '', ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={`group relative rounded-3xl border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_18px_40px_-24px_rgb(20_20_23/0.25)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/** Número que cuenta desde 0 cuando entra en pantalla. */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

/** Ícono de una tecnología (o monograma si la marca no tiene ícono). */
export function TechGlyph({ name, icon, className = 'size-5' }: { name: string; icon?: SimpleIcon; className?: string }) {
  if (icon) return <SimpleIconSvg icon={icon} className={className} />;
  const initials = name
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      aria-hidden
      className={`${className} inline-grid place-items-center rounded-md border border-current/40 font-mono text-[0.55rem] leading-none font-semibold`}
    >
      {initials}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[0.7rem] text-muted">{children}</span>
  );
}
