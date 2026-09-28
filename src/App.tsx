import { useCallback, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { Intro } from './components/Intro';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Stack } from './components/Stack';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { BackToTop, Footer } from './components/Footer';

const INTRO_KEY = 'mm-intro-seen';

function shouldPlayIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== '1';
  } catch {
    return true;
  }
}

export default function App() {
  const [intro, setIntro] = useState(shouldPlayIntro);
  const [ready, setReady] = useState(!intro);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage no disponible */
    }
    setIntro(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={() => setReady(true)}>
        {intro ? <Intro key="intro" onDone={finishIntro} /> : null}
      </AnimatePresence>

      <ScrollProgress />
      <Navbar ready={ready} />
      <div aria-hidden className="noise pointer-events-none fixed inset-0 z-[70] opacity-[0.035] mix-blend-overlay" />

      <main>
        <Hero ready={ready} />
        <About />
        <Services />
        <Stack />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
