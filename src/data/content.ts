import type { SimpleIcon } from 'simple-icons';
import {
  siAndroid,
  siDocker,
  siElasticsearch,
  siExpo,
  siExpress,
  siFastify,
  siFlask,
  siGit,
  siGo,
  siGooglecloud,
  siGooglegemini,
  siJavascript,
  siLaravel,
  siMongodb,
  siMongoose,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siPostgresql,
  siPrisma,
  siPuppeteer,
  siPython,
  siRabbitmq,
  siReact,
  siRedis,
  siSequelize,
  siTypescript,
  siVite,
  siVuedotjs,
} from 'simple-icons';

/**
 * Todo el contenido del portafolio vive en este archivo.
 * Cada texto visible tiene su versión en español (es) e inglés (en).
 */

export type Lang = 'es' | 'en';
export type L<T = string> = Record<Lang, T>;

export const profile = {
  name: 'Matias Minoni',
  fullName: 'Matias Alberto Minoni',
  initials: 'MM',
  email: 'matiminoni@hotmail.com',
  phone: '+54 11 2254-7796',
  phoneHref: 'tel:+541122547796',
  whatsapp: 'https://wa.me/5491122547796',
  linkedin: 'https://www.linkedin.com/in/matias-alberto-minoni-b1b750183/',
  github: 'https://github.com/MatiasMinoni',
  photo: 'https://i.ibb.co/RQwPG95/crop1.jpg',
  cv: '/cv-matias-minoni.pdf',
  location: 'Saavedra, Buenos Aires, AR',
};

/** Claves públicas de EmailJS (se pueden sobreescribir con variables VITE_EMAILJS_*). */
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_6tkph46',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_derttml',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'i5JaqjiKDWMG2t4y5',
};

export const nav: { id: string; label: L }[] = [
  { id: 'sobre-mi', label: { es: 'Sobre mí', en: 'About' } },
  { id: 'stack', label: { es: 'Stack', en: 'Stack' } },
  { id: 'experiencia', label: { es: 'Experiencia', en: 'Experience' } },
  { id: 'proyectos', label: { es: 'Proyectos', en: 'Projects' } },
  { id: 'formacion', label: { es: 'Formación', en: 'Education' } },
  { id: 'contacto', label: { es: 'Contacto', en: 'Contact' } },
];

export const hero = {
  eyebrow: { es: 'Backend Engineer · Buenos Aires, AR', en: 'Backend Engineer · Buenos Aires, AR' },
  lead: { es: 'Construyo', en: 'I build' },
  rotating: {
    es: ['APIs robustas', 'pipelines de scraping', 'automatizaciones', 'integraciones con IA', 'sistemas en producción'],
    en: ['robust APIs', 'scraping pipelines', 'automation tools', 'AI integrations', 'production systems'],
  },
  description: {
    es: 'Ingeniero de software con más de 5 años de experiencia en Node.js, Python y Go. Especializado en scraping avanzado, automatización de procesos e integraciones con IA.',
    en: 'Software engineer with 5+ years of experience in Node.js, Python and Go. Specialized in advanced scraping, process automation and AI integrations.',
  },
  ctaPrimary: { es: 'Hablemos', en: "Let's talk" },
  ctaSecondary: { es: 'Descargar CV', en: 'Download CV' },
  scroll: { es: 'Scroll', en: 'Scroll' },
  currently: { es: 'Hoy trabajo en', en: 'Currently at' },
};

export const about = {
  kicker: { es: 'Sobre mí', en: 'About me' },
  title: {
    es: 'Versatilidad técnica, del backend al *navegador automatizado*.',
    en: 'Technical versatility, from the backend to the *automated browser*.',
  },
  paragraphs: {
    es: [
      'Soy Full Stack Software Engineer con más de 5 años de experiencia, especializado en desarrollo backend, integraciones complejas, automatización de procesos y troubleshooting de sistemas en producción.',
      'Mi mayor fortaleza es la versatilidad: paso con naturalidad de construir APIs robustas (Node.js, Go, Python) a interfaces web modernas (React/Next.js, Vue/Nuxt) y pipelines de datos a medida.',
      'Me apasionan el web scraping avanzado y la automatización: diseñé herramientas de automatización de navegador con Playwright y Crawlee, y pipelines de extracción de datos desde aplicaciones móviles (APKs de Android/iOS).',
      'Trabajo con mucha autonomía y criterio técnico. Me siento cómodo refactorizando y manteniendo sistemas complejos en producción, y también diseñando soluciones desde cero.',
    ],
    en: [
      "I'm a Full Stack Software Engineer with 5+ years of experience, specializing in backend development, complex integrations, process automation and production-level troubleshooting.",
      'My technical edge lies in versatility — seamlessly transitioning between building robust APIs (Node.js, Go, Python), modern web interfaces (React/Next.js, Vue/Nuxt) and custom data pipelines.',
      "I'm highly passionate about advanced web scraping and automation, having designed browser-automation tools (Playwright/Crawlee) and extraction pipelines for mobile applications (Android/iOS APKs).",
      'I operate with strong autonomy and technical judgment, comfortable refactoring and maintaining complex production systems, as well as architecting greenfield solutions.',
    ],
  },
  photoAlt: { es: 'Foto de Matias Minoni', en: 'Photo of Matias Minoni' },
};

export type ServiceIcon = 'server' | 'radar' | 'smartphone' | 'sparkles' | 'layout' | 'database';

export const services = {
  kicker: { es: 'Qué hago', en: 'What I do' },
  title: { es: 'Áreas en las que aporto *más valor*', en: 'Where I add *the most value*' },
  items: [
    {
      icon: 'server' as ServiceIcon,
      title: { es: 'Backend & APIs', en: 'Backend & APIs' },
      description: {
        es: 'APIs REST robustas con Node.js (Express, Fastify), Go y Python (Flask). Diseño, refactor y mantenimiento de sistemas en producción.',
        en: 'Robust REST APIs with Node.js (Express, Fastify), Go and Python (Flask). Design, refactoring and maintenance of production systems.',
      },
      tags: ['Node.js', 'Go', 'Python', 'Fastify'],
    },
    {
      icon: 'radar' as ServiceIcon,
      title: { es: 'Scraping avanzado & automatización', en: 'Advanced scraping & automation' },
      description: {
        es: 'Herramientas de automatización de navegador y pipelines de extracción de datos con Playwright, Crawlee y Puppeteer.',
        en: 'Browser-automation tools and data extraction pipelines built with Playwright, Crawlee and Puppeteer.',
      },
      tags: ['Playwright', 'Crawlee', 'Puppeteer'],
    },
    {
      icon: 'smartphone' as ServiceIcon,
      title: { es: 'Extracción desde apps móviles', en: 'Mobile app data extraction' },
      description: {
        es: 'Análisis de APKs (Androguard) para construir pipelines de extracción de datos desde aplicaciones Android e iOS.',
        en: 'APK analysis (Androguard) to build data extraction pipelines for Android and iOS applications.',
      },
      tags: ['Androguard', 'APK', 'Android/iOS'],
    },
    {
      icon: 'sparkles' as ServiceIcon,
      title: { es: 'Integraciones con IA', en: 'AI integrations' },
      description: {
        es: 'Integración de modelos de OpenAI, Gemini y Vertex AI en productos, procesos y flujos de datos.',
        en: 'Integrating OpenAI, Gemini and Vertex AI models into products, processes and data flows.',
      },
      tags: ['OpenAI', 'Gemini', 'Vertex AI'],
    },
    {
      icon: 'layout' as ServiceIcon,
      title: { es: 'Frontend & mobile', en: 'Frontend & mobile' },
      description: {
        es: 'Interfaces web modernas con React/Next.js y Vue 3/Nuxt, y apps móviles con React Native y Expo.',
        en: 'Modern web interfaces with React/Next.js and Vue 3/Nuxt, and mobile apps with React Native and Expo.',
      },
      tags: ['React', 'Next.js', 'Vue', 'Expo'],
    },
    {
      icon: 'database' as ServiceIcon,
      title: { es: 'Datos, colas & DevOps', en: 'Data, queues & DevOps' },
      description: {
        es: 'PostgreSQL, MongoDB, Elasticsearch, Redis y RabbitMQ, con entornos reproducibles en Docker y Docker Compose.',
        en: 'PostgreSQL, MongoDB, Elasticsearch, Redis and RabbitMQ, with reproducible environments on Docker and Docker Compose.',
      },
      tags: ['PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'],
    },
  ],
};

export type StackCategory = 'lang' | 'backend' | 'front' | 'data' | 'scraping' | 'devops';

export const stackCategories: { id: StackCategory; label: L }[] = [
  { id: 'lang', label: { es: 'Lenguajes', en: 'Languages' } },
  { id: 'backend', label: { es: 'Backend', en: 'Backend' } },
  { id: 'front', label: { es: 'Frontend & Mobile', en: 'Frontend & Mobile' } },
  { id: 'data', label: { es: 'Bases de datos & colas', en: 'Databases & queues' } },
  { id: 'scraping', label: { es: 'Scraping & automatización', en: 'Scraping & automation' } },
  { id: 'devops', label: { es: 'DevOps & IA', en: 'DevOps & AI' } },
];

export type Tech = { name: string; category: StackCategory; icon?: SimpleIcon };

export const stack: Tech[] = [
  { name: 'JavaScript', category: 'lang', icon: siJavascript },
  { name: 'TypeScript', category: 'lang', icon: siTypescript },
  { name: 'Python', category: 'lang', icon: siPython },
  { name: 'Go', category: 'lang', icon: siGo },
  { name: 'Node.js', category: 'backend', icon: siNodedotjs },
  { name: 'Express', category: 'backend', icon: siExpress },
  { name: 'Fastify', category: 'backend', icon: siFastify },
  { name: 'Flask', category: 'backend', icon: siFlask },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Laravel', category: 'backend', icon: siLaravel },
  { name: 'React', category: 'front', icon: siReact },
  { name: 'Next.js', category: 'front', icon: siNextdotjs },
  { name: 'Vue 3', category: 'front', icon: siVuedotjs },
  { name: 'Nuxt', category: 'front', icon: siNuxt },
  { name: 'Vite', category: 'front', icon: siVite },
  { name: 'React Native', category: 'front', icon: siReact },
  { name: 'Expo', category: 'front', icon: siExpo },
  { name: 'PostgreSQL', category: 'data', icon: siPostgresql },
  { name: 'MongoDB', category: 'data', icon: siMongodb },
  { name: 'Mongoose', category: 'data', icon: siMongoose },
  { name: 'Prisma', category: 'data', icon: siPrisma },
  { name: 'Sequelize', category: 'data', icon: siSequelize },
  { name: 'Elasticsearch', category: 'data', icon: siElasticsearch },
  { name: 'Redis', category: 'data', icon: siRedis },
  { name: 'RabbitMQ', category: 'data', icon: siRabbitmq },
  { name: 'Playwright', category: 'scraping' },
  { name: 'Crawlee', category: 'scraping' },
  { name: 'Puppeteer', category: 'scraping', icon: siPuppeteer },
  { name: 'Cheerio', category: 'scraping' },
  { name: 'BeautifulSoup', category: 'scraping' },
  { name: 'Androguard', category: 'scraping', icon: siAndroid },
  { name: 'Docker', category: 'devops', icon: siDocker },
  { name: 'Docker Compose', category: 'devops', icon: siDocker },
  { name: 'Git & GitHub', category: 'devops', icon: siGit },
  { name: 'OpenAI', category: 'devops' },
  { name: 'Gemini', category: 'devops', icon: siGooglegemini },
  { name: 'Vertex AI', category: 'devops', icon: siGooglecloud },
];

export const aboutStats: { value: number; suffix: string; label: L }[] = [
  { value: 5, suffix: '+', label: { es: 'años de experiencia', en: 'years of experience' } },
  { value: 4, suffix: '', label: { es: 'lenguajes: JS, TS, Python y Go', en: 'languages: JS, TS, Python & Go' } },
  { value: stack.length, suffix: '+', label: { es: 'tecnologías en mi stack', en: 'technologies in my stack' } },
  { value: 2, suffix: '', label: { es: 'empresas en las que trabajo hoy', en: 'companies I currently work at' } },
];

export const stackSection = {
  kicker: { es: 'Stack', en: 'Stack' },
  title: { es: 'Herramientas con las que *construyo*', en: 'Tools I *build* with' },
  subtitle: {
    es: 'De lenguajes y frameworks a bases de datos, colas, scraping e IA.',
    en: 'From languages and frameworks to databases, queues, scraping and AI.',
  },
};

export type Role = { title: L; start: string; end: string | null };

export type Job = {
  company: string;
  kind?: L;
  location: L;
  roles: Role[];
  description?: L<string[]>;
  tags?: string[];
};

export const experience: Job[] = [
  {
    company: 'Wortise',
    location: { es: 'Argentina', en: 'Argentina' },
    roles: [{ title: { es: 'Desarrollador Backend', en: 'Backend Developer' }, start: '2026-01', end: null }],
  },
  {
    company: 'Netsocks.io',
    location: { es: 'Vicente López, Buenos Aires', en: 'Vicente López, Buenos Aires' },
    roles: [{ title: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' }, start: '2024-05', end: null }],
  },
  {
    company: 'Workana',
    kind: { es: 'Freelance', en: 'Freelance' },
    location: { es: 'Remoto · clientes de España', en: 'Remote · clients in Spain' },
    roles: [
      { title: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' }, start: '2023-06', end: '2024-05' },
      { title: { es: 'Desarrollador Backend', en: 'Backend Developer' }, start: '2022-12', end: '2024-05' },
    ],
    description: {
      es: [
        'Scraping de datos para "OutfitNova" y "Soydechollos", sitios españoles de artículos de indumentaria.',
        'Scrapers en JavaScript y Python con Puppeteer, Cheerio y BeautifulSoup.',
        'Almacenamiento y modelado de los datos recolectados en MongoDB.',
      ],
      en: [
        'Data scraping for "OutfitNova" and "Soydechollos", Spanish apparel e-commerce sites.',
        'Scrapers written in JavaScript and Python using Puppeteer, Cheerio and BeautifulSoup.',
        'Storage and modeling of the collected data in MongoDB.',
      ],
    },
    tags: ['JavaScript', 'Python', 'Puppeteer', 'Cheerio', 'BeautifulSoup', 'MongoDB'],
  },
];

export const experienceSection = {
  kicker: { es: 'Experiencia', en: 'Experience' },
  title: { es: 'Dónde estuve *construyendo*', en: "Where I've been *building*" },
  present: { es: 'Actualidad', en: 'Present' },
  current: { es: 'Actual', en: 'Current' },
};

export type Project = {
  name: string;
  tagline: L;
  description: L;
  tags: string[];
  url: string;
  hue: number;
};

export const projectsSection = {
  kicker: { es: 'Proyectos', en: 'Projects' },
  title: { es: 'Trabajo *destacado*', en: '*Selected* work' },
  featured: {
    label: { es: 'Caso freelance · Workana', en: 'Freelance case · Workana' },
    title: {
      es: 'Pipelines de scraping para e\u2011commerce de indumentaria',
      en: 'Scraping pipelines for apparel e\u2011commerce',
    },
    description: {
      es: 'Recolección automatizada de datos para OutfitNova y Soydechollos (España): scrapers en JavaScript y Python que extraen la información de múltiples tiendas y la almacenan estructurada en MongoDB.',
      en: 'Automated data collection for OutfitNova and Soydechollos (Spain): JavaScript and Python scrapers that extract information from multiple stores and store it, structured, in MongoDB.',
    },
    nodes: [
      { title: { es: 'Tiendas online', en: 'Online stores' }, detail: 'HTML · JS' },
      { title: { es: 'Scrapers', en: 'Scrapers' }, detail: 'Puppeteer · Cheerio · BS4' },
      { title: { es: 'Base de datos', en: 'Database' }, detail: 'MongoDB' },
    ],
    tags: ['JavaScript', 'Python', 'Puppeteer', 'Cheerio', 'BeautifulSoup', 'MongoDB'],
  },
  earlyTitle: { es: 'Primeros proyectos', en: 'Early projects' },
  earlySubtitle: {
    es: 'Donde empezó todo: proyectos de mi formación en desarrollo web.',
    en: 'Where it all started: projects from my web development training.',
  },
  visit: { es: 'Ver proyecto', en: 'View project' },
  more: { es: 'Más código en GitHub', en: 'More code on GitHub' },
};

export const earlyProjects: Project[] = [
  {
    name: 'Micro Store',
    tagline: { es: 'E-commerce en React', en: 'React e-commerce' },
    description: {
      es: 'Tienda con React (hooks, rutas, promesas y APIs) y Firebase como base de datos: controla el stock y genera los IDs de compra.',
      en: 'Store built with React (hooks, routing, promises and APIs) and Firebase as database: it checks stock and generates order IDs.',
    },
    tags: ['React', 'Firebase', 'React Router'],
    url: 'https://scintillating-sfogliatella-339b7b.netlify.app/',
    hue: 160,
  },
  {
    name: 'Skateam',
    tagline: { es: 'E-commerce de skates y sneakers', en: 'Skates & sneakers store' },
    description: {
      es: 'Sitio maquetado con HTML, CSS y Bootstrap, con SEO, grids y media queries para adaptarse a cualquier resolución.',
      en: 'Site built with HTML, CSS and Bootstrap, with SEO, grids and media queries to adapt to any screen size.',
    },
    tags: ['HTML', 'CSS', 'Bootstrap'],
    url: 'https://aesthetic-cheesecake-20a518.netlify.app/',
    hue: 250,
  },
  {
    name: 'LoL Minigame',
    tagline: { es: 'Juego de pelea en el navegador', en: 'Browser fighting game' },
    description: {
      es: 'Minijuego inspirado en League of Legends hecho con JavaScript puro: genera el DOM e importa los personajes desde archivos JSON.',
      en: 'League of Legends-inspired minigame in vanilla JavaScript: it builds the DOM and loads the characters from JSON files.',
    },
    tags: ['JavaScript', 'JSON', 'CSS'],
    url: 'https://snazzy-cucurucho-36e731.netlify.app/',
    hue: 20,
  },
];

export const education = {
  kicker: { es: 'Formación', en: 'Education' },
  title: { es: 'Aprendizaje *continuo*', en: 'Always *learning*' },
  university: {
    institution: 'UTN · Facultad Regional Avellaneda',
    degree: { es: 'Ingeniería en Informática', en: 'Computer Engineering' },
    start: '2023-01',
    end: '2025-01',
  },
  courses: [
    { name: 'Backend', start: '2022-07', end: '2022-12' },
    { name: 'React JS', start: '2022-04', end: '2022-07' },
    { name: 'JavaScript', start: '2022-04', end: '2022-06' },
    { name: { es: 'Diseño Web', en: 'Web Design' }, start: '2022-01', end: '2022-04' },
  ] as { name: string | L; start: string; end: string }[],
  coursesInstitution: 'Coderhouse',
  coursesLabel: { es: 'Carrera de desarrollo Full Stack', en: 'Full Stack development track' },
  certificationsTitle: { es: 'Certificaciones', en: 'Certifications' },
  certifications: [
    { es: 'JavaScript', en: 'JavaScript' },
    { es: 'HTML y CSS', en: 'HTML & CSS' },
    { es: 'Desarrollo Web', en: 'Web Development' },
    { es: 'Back end', en: 'Back end' },
    { es: 'Git y GitHub Fundamentos', en: 'Git & GitHub Fundamentals' },
  ] as L[],
};

export const contact = {
  kicker: { es: 'Contacto', en: 'Contact' },
  title: { es: '¿Tenés un proyecto en mente?', en: 'Have a project in mind?' },
  titleAccent: { es: 'Hablemos.', en: "Let's talk." },
  subtitle: {
    es: 'Escribime por el formulario o por el canal que prefieras. Respondo a la brevedad.',
    en: "Send me a message through the form or whichever channel you prefer. I'll get back to you soon.",
  },
  whatsappText: { es: 'Hola Matias, vi tu portafolio!', en: 'Hi Matias, I saw your portfolio!' },
  copy: { es: 'Copiar', en: 'Copy' },
  copied: { es: 'Copiado', en: 'Copied' },
  form: {
    name: { es: 'Nombre', en: 'Name' },
    namePh: { es: 'Tu nombre', en: 'Your name' },
    email: { es: 'Email', en: 'Email' },
    emailPh: { es: 'tu@email.com', en: 'you@email.com' },
    message: { es: 'Mensaje', en: 'Message' },
    messagePh: { es: 'Contame sobre tu proyecto…', en: 'Tell me about your project…' },
    send: { es: 'Enviar mensaje', en: 'Send message' },
    sending: { es: 'Enviando…', en: 'Sending…' },
    sent: { es: '¡Mensaje enviado!', en: 'Message sent!' },
    sentDetail: { es: 'Gracias por escribir, te respondo pronto.', en: "Thanks for reaching out, I'll reply soon." },
    again: { es: 'Enviar otro', en: 'Send another' },
    error: {
      es: 'No se pudo enviar. Probá de nuevo o escribime por email.',
      en: "Couldn't send it. Try again or email me directly.",
    },
  },
};

export const footer = {
  madeWith: { es: 'Hecho con React, Motion y Tailwind CSS.', en: 'Built with React, Motion and Tailwind CSS.' },
  backToTop: { es: 'Volver arriba', en: 'Back to top' },
};
