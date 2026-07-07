import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { useTheme } from '../../context/ThemeContext';

/* Placeholder GitHub data — replace with real API data or static content */
const repos = [
  { name: 'cloud-dashboard', description: 'Real-time SaaS analytics dashboard with charts and team collaboration.', stars: 128, forks: 34, language: 'TypeScript', color: '#3178C6' },
  { name: 'react-glass-ui', description: 'A modern glassmorphism component library for React applications.', stars: 256, forks: 48, language: 'JavaScript', color: '#F7DF1E' },
  { name: 'node-api-starter', description: 'Production-ready Node.js + Express REST API boilerplate with auth.', stars: 89, forks: 22, language: 'JavaScript', color: '#F7DF1E' },
  { name: 'portfolio-v3', description: 'This very portfolio website — built with React, Vite, and Framer Motion.', stars: 45, forks: 12, language: 'React', color: '#61DAFB' },
];

/* Contribution graph placeholder data — 52 weeks × 7 days */
const generateContributions = () => {
  const data = [];
  for (let week = 0; week < 52; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      weekData.push(Math.floor(Math.random() * 5)); // 0-4 intensity
    }
    data.push(weekData);
  }
  return data;
};

const contributions = generateContributions();
const intensityColors = {
  dark: ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'],
  light: ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'],
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * GitHubActivity — contribution graph + latest repos
 */
export default function GitHubActivity() {
  const { theme } = useTheme();
  const colors = intensityColors[theme];

  return (
    <section id="github" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="GitHub Activity"
          subtitle="My open-source contributions and recent projects."
        />

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <GlassCard className="p-6 overflow-x-auto">
            <div className="flex items-center gap-3 mb-4">
              <FaGithub className={`text-xl ${
                theme === 'dark' ? 'text-white' : 'text-light-text'
              }`} />
              <h3 className={`font-heading font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-light-text'
              }`}>Contribution Graph</h3>
            </div>

            <div className="flex gap-[3px] min-w-[700px]">
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <motion.div
                      key={`${wi}-${di}`}
                      className="w-[11px] h-[11px] rounded-sm"
                      style={{ backgroundColor: colors[level] }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (wi * 7 + di) * 0.0005, duration: 0.2 }}
                      title={`${level} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4">
              <span className={`text-xs ${
                theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'
              }`}>Less</span>
              {colors.map((color, i) => (
                <div
                  key={i}
                  className="w-[11px] h-[11px] rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span className={`text-xs ${
                theme === 'dark' ? 'text-dark-subtle' : 'text-light-subtle'
              }`}>More</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Repos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {repos.map((repo) => (
            <motion.div key={repo.name} variants={fadeUp}>
              <GlassCard className="p-5 group">
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-heading font-semibold text-primary group-hover:text-primary-light transition-colors ${
                    theme === 'dark' ? '' : ''
                  }`}>
                    {repo.name}
                  </h4>
                  <FaGithub className={theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'} />
                </div>

                <p className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                }`}>{repo.description}</p>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.color }} />
                    <span className={theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}>
                      {repo.language}
                    </span>
                  </span>
                  <span className={`flex items-center gap-1 text-xs ${
                    theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  }`}>
                    <FaStar size={11} /> {repo.stars}
                  </span>
                  <span className={`flex items-center gap-1 text-xs ${
                    theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                  }`}>
                    <FaCodeBranch size={11} /> {repo.forks}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
