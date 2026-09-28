import { useEffect, useState } from 'react';

/** Devuelve el id de la sección que ocupa el centro de la pantalla. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const nodes = ids.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => !!n);
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
