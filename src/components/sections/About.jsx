import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaBullseye, FaHeart, FaAward } from 'react-icons/fa';
import { HiSparkles, HiLightBulb, HiAcademicCap, HiRocketLaunch } from 'react-icons/hi2';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import personalInfo from '../../data/personalInfo';
import { useTheme } from '../../context/ThemeContext';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const valueIcons = [HiLightBulb, HiSparkles, HiAcademicCap, HiRocketLaunch];

/**
 * About — professional intro, career objective, education, strengths, and core values
 */
export default function About() {
  const { theme } = useTheme();

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me better — my journey, values, and what drives me."
        />

        {/* Intro + Career Objective */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Professional Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <FaBriefcase className="text-primary" />
                </div>
                <h3 className={`text-xl font-heading font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-light-text'
                }`}>Who I Am</h3>
              </div>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
              }`}>
                {personalInfo.about}
              </p>
            </GlassCard>
          </motion.div>

          {/* Career Objective */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="p-8 h-full" glowColor="rgba(124, 58, 237, 0.15)">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <FaBullseye className="text-secondary" />
                </div>
                <h3 className={`text-xl font-heading font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-light-text'
                }`}>Career Objective</h3>
              </div>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
              }`}>
                {personalInfo.careerObjective}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Education Timeline */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h3 variants={fadeUp} className={`text-2xl font-heading font-semibold mb-8 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-light-text'
          }`}>
            <FaGraduationCap className="text-accent" />
            Education
          </motion.h3>

          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 pl-8 md:pl-12 flex flex-col gap-8">
            {personalInfo.education.map((edu, index) => (
              <motion.div key={index} variants={fadeUp} className="relative group w-full">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[57px] top-8 w-4 h-4 rounded-full bg-dark-bg border-4 border-primary shadow-[0_0_10px_rgba(37,99,235,0.5)] z-10 transition-all duration-300 group-hover:scale-125 group-hover:border-accent" />

                <GlassCard className="hover:border-primary/25 hover:shadow-[0_8px_30px_rgba(37,99,235,0.06)] transition-all duration-300 w-full" glowColor="rgba(6, 182, 212, 0.12)">
                  <div className="p-6 md:p-8 text-left w-full">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                      <div>
                        <h4 className={`text-lg md:text-xl font-heading font-semibold tracking-tight ${
                          theme === 'dark' ? 'text-white' : 'text-light-text'
                        }`}>{edu.degree}</h4>
                        <p className="text-accent text-sm font-semibold mt-1">{edu.institution}</p>
                      </div>
                      <div className="flex flex-wrap items-center md:items-end gap-2 shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider ${
                          theme === 'dark'
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-primary/5 text-primary border border-primary/15'
                        }`}>{edu.year}</span>
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                          theme === 'dark' ? 'bg-white/5 text-dark-muted border border-white/5' : 'bg-black/5 text-light-muted border border-black/5'
                        }`}>{edu.grade}</span>
                      </div>
                    </div>
                    <p className={`text-sm leading-relaxed max-w-3xl ${
                      theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                    }`}>{edu.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h3 variants={fadeUp} className={`text-2xl font-heading font-semibold mb-8 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-light-text'
          }`}>
            <FaHeart className="text-red-400" />
            Core Values
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {personalInfo.coreValues.map((value, index) => {
              const Icon = valueIcons[index] || HiSparkles;
              return (
                <motion.div key={index} variants={fadeUp}>
                  <GlassCard className="p-6 text-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-xl gradient-text" />
                    </div>
                    <h4 className={`font-heading font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-light-text'
                    }`}>{value.title}</h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                    }`}>{value.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Strengths */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-24 pt-4"
        >
          <motion.h3 variants={fadeUp} className={`text-2xl font-heading font-semibold mb-8 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-light-text'
          }`}>
            <FaAward className="text-primary" />
            Strengths
          </motion.h3>
          <div className="flex flex-wrap gap-4 justify-start">
            {personalInfo.strengths.map((strength, index) => (
              <motion.span
                key={index}
                variants={fadeUp}
                className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2.5 ${
                  theme === 'dark'
                    ? 'bg-white/[0.03] border border-white/10 text-dark-muted hover:text-white hover:border-primary/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                    : 'bg-black/[0.03] border border-black/10 text-light-muted hover:text-light-text hover:border-primary/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.1)]'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                {strength}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
