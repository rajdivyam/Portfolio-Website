import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaChevronDown } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import {
  FaReact, FaNodeJs, FaPython,
} from 'react-icons/fa';
import {
  SiTypescript, SiMongodb, SiNextdotjs,
} from 'react-icons/si';
import gsap from 'gsap';
import { useTypingAnimation } from '../../hooks/useTypingAnimation';
import MagneticButton from '../ui/MagneticButton';
import personalInfo from '../../data/personalInfo';
import { useTheme } from '../../context/ThemeContext';

const floatingIcons = [
  { Icon: FaReact, color: '#61DAFB', size: 28, x: '10%', y: '20%', delay: 0 },
  { Icon: FaNodeJs, color: '#68A063', size: 26, x: '85%', y: '15%', delay: 0.5 },
  { Icon: SiTypescript, color: '#3178C6', size: 24, x: '75%', y: '70%', delay: 1 },
  { Icon: SiMongodb, color: '#47A248', size: 26, x: '15%', y: '75%', delay: 1.5 },
  { Icon: SiNextdotjs, color: '#fff', size: 26, x: '90%', y: '45%', delay: 2 },
  { Icon: FaPython, color: '#3776AB', size: 24, x: '5%', y: '50%', delay: 2.5 },
];

/**
 * Hero — eye-catching hero section with typing animation, floating icons, and parallax
 */
export default function Hero() {
  const typedText = useTypingAnimation(personalInfo.roles, 80, 40, 2000);
  const containerRef = useRef(null);
  const { theme } = useTheme();

  // GSAP parallax for gradient orbs
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to('.hero-orb-1', { x: x * 30, y: y * 30, duration: 1 });
      gsap.to('.hero-orb-2', { x: x * -20, y: y * -20, duration: 1 });
      gsap.to('.hero-orb-3', { x: x * 15, y: y * 15, duration: 1 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-0"
    >
      {/* Animated gradient orbs */}
      <div className="hero-orb-1 absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="hero-orb-2 absolute bottom-[15%] right-[10%] w-96 h-96 rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />
      <div className="hero-orb-3 absolute top-[50%] left-[50%] w-64 h-64 rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

      {/* Floating Tech Icons */}
      {floatingIcons.map(({ Icon, color, size, x, y, delay }, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none hidden md:block"
          style={{ left: x, top: y, color }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
        >
          <Icon size={size} className="opacity-30" />
        </motion.div>
      ))}

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column: Content */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6 flex justify-center lg:justify-start">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-primary/5 text-primary border border-primary/15'
              }`}>
                <HiSparkles className="text-accent" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={fadeUp}
              className={`text-lg md:text-xl mb-3 ${
                theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
              }`}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 tracking-tight leading-none"
            >
              <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>
                {personalInfo.firstName}{' '}
              </span>
              <span className="gradient-text">{personalInfo.lastName}</span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div variants={fadeUp} className="mb-6 h-10 flex items-center justify-center lg:justify-start">
              <span className={`text-xl md:text-2xl font-medium ${
                theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
              }`}>
                {'< '}
              </span>
              <span className="text-xl md:text-2xl font-medium gradient-text mx-1">
                {typedText}
              </span>
              <span className="animate-pulse text-primary text-2xl">|</span>
              <span className={`text-xl md:text-2xl font-medium ${
                theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
              }`}>
                {' />'}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className={`text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed ${
                theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
              }`}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <MagneticButton
                href={personalInfo.resumeUrl}
                download
                variant="primary"
              >
                <FaDownload className="text-current transition-transform duration-300 group-hover:translate-y-0.5" size={14} />
                Download Resume
              </MagneticButton>
              <MagneticButton
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                variant="secondary"
              >
                <HiSparkles className="text-current transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" size={14} />
                Hire Me
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-4 mt-8">
              {personalInfo.socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white/[0.03] border border-white/10 text-dark-muted hover:text-white hover:border-primary/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                        : 'bg-black/[0.03] border border-black/10 text-light-muted hover:text-light-text hover:border-primary/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                    }`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Profile Photo */}
          <motion.div
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative group">
              {/* Outer Decorative Gradient Border */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-[4px] shadow-[0_0_50px_rgba(124,58,237,0.25)] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_60px_rgba(124,58,237,0.4)]">
                <div className="w-full h-full rounded-[20px] overflow-hidden bg-dark-bg">
                  <img
                    src="/images/profile.jpg"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: '50% 45%' }}
                  />
                </div>
              </div>

              {/* Decorative Tech Badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-dark-surface/90 border border-white/10 p-3 rounded-2xl flex items-center gap-2 shadow-xl backdrop-blur-md"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <FaReact size={16} className="animate-spin-slow" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-dark-muted font-medium uppercase tracking-wider">Expertise</p>
                  <p className="text-xs font-bold text-white">React.js</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-dark-surface/90 border border-white/10 p-3 rounded-2xl flex items-center gap-2 shadow-xl backdrop-blur-md"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                  <FaNodeJs size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-dark-muted font-medium uppercase tracking-wider">Backend</p>
                  <p className="text-xs font-bold text-white">Node.js</p>
                </div>
              </motion.div>

              {/* Online indicator */}
              <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-green-500 border-4 border-dark-bg shadow-lg" />
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl -z-10 animate-glow-pulse" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className={`flex flex-col items-center gap-2 ${
            theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
          }`}
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <FaChevronDown size={14} />
        </button>
      </motion.div>
    </section>
  );
}
