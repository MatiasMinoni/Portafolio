import type { SimpleIcon } from 'simple-icons';
import { siGithub, siWhatsapp } from 'simple-icons';

type Props = { className?: string; title?: string };

function Svg({ path, className, title }: Props & { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <path d={path} />
    </svg>
  );
}

export function SimpleIconSvg({ icon, ...props }: Props & { icon: SimpleIcon }) {
  return <Svg path={icon.path} {...props} />;
}

export const GithubIcon = (props: Props) => <Svg path={siGithub.path} {...props} />;
export const WhatsappIcon = (props: Props) => <Svg path={siWhatsapp.path} {...props} />;

// LinkedIn ya no forma parte de simple-icons, así que se dibuja a mano.
const linkedinPath =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z';
export const LinkedinIcon = (props: Props) => <Svg path={linkedinPath} {...props} />;

/** Color de marca legible sobre fondo claro (las marcas muy claras se oscurecen). */
export function readableBrandColor(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.4 ? `color-mix(in oklab, #${hex} 62%, #141417)` : `#${hex}`;
}
