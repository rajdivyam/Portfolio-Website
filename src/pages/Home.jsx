import { lazy, Suspense } from 'react';
import Hero from '../components/sections/Hero';

/* Lazy-loaded sections for better performance */
const About = lazy(() => import('../components/sections/About'));
const Skills = lazy(() => import('../components/sections/Skills'));
const Projects = lazy(() => import('../components/sections/Projects'));
const Experience = lazy(() => import('../components/sections/Experience'));
const Certifications = lazy(() => import('../components/sections/Certifications'));
const Achievements = lazy(() => import('../components/sections/Achievements'));
const Activities = lazy(() => import('../components/sections/Activities'));
const Services = lazy(() => import('../components/sections/Services'));
const Statistics = lazy(() => import('../components/sections/Statistics'));
const FAQ = lazy(() => import('../components/sections/FAQ'));
const Contact = lazy(() => import('../components/sections/Contact'));

/**
 * Home — main landing page assembling all sections
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Statistics />
        <Certifications />
        <Achievements />
        <Activities />
        <Services />
        <FAQ />
        <Contact />
      </Suspense>
    </main>
  );
}
