import { useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, Check, Copy, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { contact, emailjsConfig, profile } from '../data/content';
import { useI18n } from '../lib/i18n';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../lib/brand-icons';
import { Reveal, ease } from './ui';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function CopyEmail() {
  const { tr } = useI18n();
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${profile.email}`;
        }
      }}
      className="relative inline-flex h-8 min-w-24 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-white/10 px-3 text-xs text-muted transition-colors hover:border-mint/40 hover:text-mint"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'ok' : 'copy'}
          className="inline-flex items-center gap-1.5"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {copied ? <Check className="size-3.5 text-mint" /> : <Copy className="size-3.5" />}
          {copied ? tr(contact.copied) : tr(contact.copy)}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs tracking-wider text-muted uppercase">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  'w-full rounded-2xl border border-white/10 bg-ink-950/60 px-4 py-3.5 text-fg placeholder:text-subtle outline-none transition focus:border-mint/60 focus:bg-ink-950 focus:ring-4 focus:ring-mint/10';

function ContactForm() {
  const { tr } = useI18n();
  const f = contact.form;
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('user_name') ?? '').trim();
    const email = String(data.get('user_email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    setStatus('sending');
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          user_name: name,
          user_email: email,
          reply_to: email,
          from_name: name,
          // El email también va en el cuerpo por si la plantilla no usa {{user_email}}.
          message: `${message}\n\n— ${name} <${email}>`,
        },
        { publicKey: emailjsConfig.publicKey },
      );
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-ink-900/80 p-6 backdrop-blur sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            className="flex min-h-[24rem] flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease }}
          >
            <span className="grid size-20 place-items-center rounded-full bg-mint/10 ring-1 ring-mint/40">
              <svg viewBox="0 0 24 24" className="size-10 text-mint" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <motion.path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                />
              </svg>
            </span>
            <p className="mt-6 font-display text-2xl font-semibold">{tr(f.sent)}</p>
            <p className="mt-2 text-muted">{tr(f.sentDetail)}</p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-8 rounded-full border border-white/15 px-5 py-2.5 text-sm transition-colors hover:border-white/30"
            >
              {tr(f.again)}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={tr(f.name)}>
                <input name="user_name" required autoComplete="name" placeholder={tr(f.namePh)} className={inputCls} />
              </Field>
              <Field label={tr(f.email)}>
                <input
                  name="user_email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={tr(f.emailPh)}
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label={tr(f.message)}>
              <textarea name="message" required rows={6} placeholder={tr(f.messagePh)} className={`${inputCls} resize-none`} />
            </Field>

            <AnimatePresence>
              {status === 'error' ? (
                <motion.p
                  role="alert"
                  className="rounded-xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {tr(f.error)}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-mint px-6 py-4 font-semibold text-ink-950 disabled:cursor-wait disabled:opacity-80"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <AnimatePresence mode="wait" initial={false}>
                {status === 'sending' ? (
                  <motion.span
                    key="sending"
                    className="relative flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <LoaderCircle className="size-4 animate-spin" />
                    {tr(f.sending)}
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    className="relative flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {tr(f.send)}
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const { tr } = useI18n();

  const channels = [
    {
      icon: <WhatsappIcon className="size-5" />,
      label: 'WhatsApp',
      value: profile.phone,
      href: `${profile.whatsapp}?text=${encodeURIComponent(tr(contact.whatsappText))}`,
    },
    { icon: <LinkedinIcon className="size-5" />, label: 'LinkedIn', value: 'matias-alberto-minoni', href: profile.linkedin },
    { icon: <GithubIcon className="size-5" />, label: 'GitHub', value: 'MatiasMinoni', href: profile.github },
    { icon: <Phone className="size-5" strokeWidth={1.6} />, label: tr({ es: 'Teléfono', en: 'Phone' }), value: profile.phone, href: profile.phoneHref },
  ];

  return (
    <section id="contacto" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div aria-hidden className="absolute top-1/4 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-mint uppercase">
            <span className="h-px w-8 bg-mint/60" />
            {tr(contact.kicker)}
          </p>
        </Reveal>
        <h2 className="mt-5 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.03em]">
          <span className="block overflow-hidden pb-2">
            <motion.span
              key={tr(contact.title)}
              className="block"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              {tr(contact.title)}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              key={tr(contact.titleAccent)}
              className="text-gradient block"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
            >
              {tr(contact.titleAccent)}
            </motion.span>
          </span>
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg text-muted">{tr(contact.subtitle)}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <Reveal y={30}>
              <div className="rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-mint/[0.08] to-transparent p-6 sm:p-8">
                <div className="flex items-center gap-3 text-muted">
                  <Mail className="size-5 text-mint" strokeWidth={1.6} />
                  <span className="font-mono text-xs tracking-wider uppercase">Email</span>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-3 block font-display text-xl font-medium break-all transition-colors hover:text-mint sm:text-2xl"
                >
                  {profile.email}
                </a>
                <div className="mt-5">
                  <CopyEmail />
                </div>
              </div>
            </Reveal>

            <motion.ul
              className="grid gap-3 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              {channels.map((c) => (
                <motion.li
                  key={c.label}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                >
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-ink-850/80 p-4 transition-colors hover:border-mint/30"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-muted transition-colors group-hover:text-mint">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{c.label}</span>
                      <span className="block truncate text-xs text-muted">{c.value}</span>
                    </span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0 text-subtle transition-all duration-300 group-hover:rotate-45 group-hover:text-mint" />
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <Reveal delay={0.2}>
              <p className="flex items-center gap-2 px-2 pt-2 text-sm text-muted">
                <MapPin className="size-4 text-mint" />
                {profile.location}
              </p>
            </Reveal>
          </div>

          <Reveal y={40} delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
