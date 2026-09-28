# Portafolio · Matias Minoni

Portafolio personal de **Matias Alberto Minoni**, Backend Engineer (Node.js · Python · Go) especializado en scraping avanzado, automatización e integraciones con IA.

## Stack

- [React 19](https://react.dev) + [Vite](https://vite.dev) + TypeScript
- [Motion](https://motion.dev) para todas las animaciones (intro, scroll, layout, hover, etc.)
- [Tailwind CSS v4](https://tailwindcss.com)
- [EmailJS](https://www.emailjs.com) para el formulario de contacto
- [simple-icons](https://simpleicons.org) y [lucide](https://lucide.dev) para los íconos

## Desarrollo

```bash
npm install
npm run dev       # servidor local en http://localhost:5173
npm run build     # typecheck + build de producción en dist/
npm run preview   # sirve el build de producción
```

## Editar el contenido

Todos los textos y datos (perfil, experiencia, stack, proyectos, formación, contacto) están en
[`src/data/content.ts`](src/data/content.ts), con cada texto en español (`es`) e inglés (`en`).
El sitio detecta el idioma del navegador y se puede cambiar con el selector ES/EN.

- **Foto**: `profile.photo` (si no carga, se muestra un monograma).
- **CV descargable**: `public/cv-matias-minoni.pdf`.
- **EmailJS**: las claves públicas están en `emailjsConfig` y se pueden sobreescribir con las variables
  `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y `VITE_EMAILJS_PUBLIC_KEY`.
  El formulario envía `user_name`, `user_email`, `reply_to` y `message`.

## Deploy

- **Netlify**: `netlify.toml` ya define `npm run build` y publica `dist/`.
- **Vercel**: detecta Vite automáticamente, no requiere configuración.

## Accesibilidad

Las animaciones respetan la preferencia del sistema `prefers-reduced-motion`: si está activa, los movimientos se
reducen a transiciones de opacidad y el carrusel de tecnologías se detiene.

## Diseño

Tema claro con tipografía Geist, acentos en Instrument Serif itálica y un único color de acento (`--color-accent`).
Los tokens de color y tipografía están en [`src/index.css`](src/index.css). En los títulos, el texto entre
asteriscos (`*así*`) se muestra como acento en serif itálica.
