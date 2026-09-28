import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { RotateCcw } from 'lucide-react';

const code = `import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
  maxConcurrency: 10,
  async requestHandler({ page, pushData }) {
    const items = await page.$$eval('.item', parse);
    await pushData(items);
  },
});

await crawler.run(['https://example.com']);`;

const output = [
  { text: '$ npx tsx crawler.ts', cls: 'text-[#e6e6ea]' },
  { text: 'INFO  PlaywrightCrawler: Starting the crawl', cls: 'text-[#93b4ff]' },
  { text: '✓ example.com/?page=1  48 items', cls: 'text-[#8fe3b0]' },
  { text: '✓ example.com/?page=2  52 items', cls: 'text-[#8fe3b0]' },
  { text: '✓ Crawl finished · 0 errors', cls: 'text-[#8fe3b0]' },
];

type Token = { text: string; cls: string };

const tokenRe =
  /('(?:[^'\\]|\\.)*')|\b(import|from|const|new|async|await)\b|\b([A-Z][A-Za-z]+)\b|([A-Za-z_$][\w$]*)(?=\()|\b(\d+)\b|([{}()[\],.;:])/g;

function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const m of src.matchAll(tokenRe)) {
    const index = m.index ?? 0;
    if (index > last) tokens.push({ text: src.slice(last, index), cls: 'text-[#e6e6ea]' });
    const cls = m[1]
      ? 'text-[#8fe3b0]'
      : m[2]
        ? 'text-[#b9a8ff]'
        : m[3]
          ? 'text-[#93b4ff]'
          : m[4]
            ? 'text-[#f5d68a]'
            : m[5]
              ? 'text-[#ff9fb2]'
              : 'text-[#7c7f8c]';
    tokens.push({ text: m[0], cls });
    last = index + m[0].length;
  }
  if (last < src.length) tokens.push({ text: src.slice(last), cls: 'text-[#e6e6ea]' });
  return tokens;
}

function renderTokens(tokens: Token[], count: number) {
  const out = [];
  let remaining = count;
  for (let i = 0; i < tokens.length && remaining > 0; i++) {
    const t = tokens[i];
    const text = t.text.slice(0, remaining);
    remaining -= text.length;
    out.push(
      <span key={i} className={t.cls}>
        {text}
      </span>,
    );
  }
  return out;
}

/** Editor + terminal que "escribe" un crawler, como guiño al scraping. */
export function CodeWindow({ start }: { start: boolean }) {
  const tokens = useMemo(() => tokenize(code), []);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [run, setRun] = useState(0);
  const done = count >= code.length;

  useEffect(() => {
    if (!start || !inView) return;
    if (reduce) {
      setCount(code.length);
      return;
    }
    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= code.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 4;
      });
    }, 20);
    return () => window.clearInterval(id);
  }, [start, inView, reduce, run]);

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-2xl border border-black/80 bg-code shadow-[0_40px_80px_-40px_rgb(20_20_23/0.55),0_0_0_1px_rgb(255_255_255/0.04)_inset]">
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[0.7rem] text-[#a3a5b0]">crawler.ts</span>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="ml-auto grid size-7 place-items-center rounded-md text-[#7c7f8c] transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Replay"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto px-3.5 py-4 font-mono text-[0.62rem] leading-[1.7] sm:px-5 sm:text-[0.78rem]">
          <div className="relative w-max min-w-full">
            <pre aria-hidden className="invisible">
              {code}
            </pre>
            <pre className="absolute inset-0" aria-label="Crawler de ejemplo con Playwright y Crawlee">
              {renderTokens(tokens, count)}
              <span className={`ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-[#93b4ff] ${done ? 'animate-blink' : ''}`} />
            </pre>
          </div>
        </div>

        <div className="border-t border-white/[0.07] bg-black/30 px-4 py-3 font-mono text-[0.7rem] leading-relaxed sm:px-5">
          {output.map((line, i) => (
            <motion.p
              key={`${run}-${i}`}
              className={`${line.cls} whitespace-pre`}
              initial={{ opacity: 0, x: -8 }}
              animate={done ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ delay: done ? 0.15 + i * 0.35 : 0, duration: 0.35 }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
