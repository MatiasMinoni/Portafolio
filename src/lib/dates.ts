import type { Lang } from '../data/content';

function parse(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  return { y, m };
}

/** "may 2024" / "May 2024" */
export function formatMonth(ym: string, lang: Lang) {
  const { y, m } = parse(ym);
  const label = new Intl.DateTimeFormat(lang === 'es' ? 'es-AR' : 'en-US', { month: 'short', year: 'numeric' }).format(
    new Date(y, m - 1, 1),
  );
  return label.replace('.', '');
}

/** Duración inclusiva estilo LinkedIn: may 2024 → sep 2026 = "2 años 5 meses". */
export function formatDuration(start: string, end: string | null, lang: Lang, now = new Date()) {
  const s = parse(start);
  const e = end ? parse(end) : { y: now.getFullYear(), m: now.getMonth() + 1 };
  const total = Math.max(1, (e.y - s.y) * 12 + (e.m - s.m) + 1);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const words =
    lang === 'es'
      ? { y: (n: number) => (n === 1 ? 'año' : 'años'), m: (n: number) => (n === 1 ? 'mes' : 'meses') }
      : { y: (n: number) => (n === 1 ? 'yr' : 'yrs'), m: (n: number) => (n === 1 ? 'mo' : 'mos') };
  const parts = [];
  if (years) parts.push(`${years} ${words.y(years)}`);
  if (months) parts.push(`${months} ${words.m(months)}`);
  return parts.join(' ');
}
