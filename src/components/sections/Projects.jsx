import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import projects, { projectCategories } from '../../data/projects';
import { useTheme } from '../../context/ThemeContext';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

/**
 * Projects — filterable project cards with tech stacks and hover animations
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { theme } = useTheme();

  const filteredProjects = activeFilter === 'All'
    ? projects
    : activeFilter === 'Featured'
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Featured Projects"
          subtitle="A showcase of my recent work and creative solutions."
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projectCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                  : theme === 'dark'
                    ? 'bg-white/5 text-dark-muted hover:bg-white/10'
                    : 'bg-black/5 text-light-muted hover:bg-black/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={fadeUp} layout>
                <GlassCard className="group h-full flex flex-col overflow-hidden" glowColor="rgba(37, 99, 235, 0.12)">
                  {/* Project Image Placeholder */}
                  <div className={`relative h-48 overflow-hidden ${
                    theme === 'dark' ? 'bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10' : 'bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-5xl font-heading font-bold ${
                        theme === 'dark' ? 'text-white/10' : 'text-black/5'
                      }`}>
                        {project.title.charAt(0)}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium">
                        Featured
                      </div>
                    )}

                    {/* Hover overlay with links */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-3 pb-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub /> Code
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-primary/80 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2 hover:bg-primary transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt size={12} /> Demo
                      </motion.a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className={`text-lg font-heading font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-light-text'
                    }`}>{project.title}</h3>

                    <p className={`text-sm mb-4 flex-1 ${
                      theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                    }`}>{project.description}</p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                            theme === 'dark'
                              ? 'bg-primary/10 text-primary/80'
                              : 'bg-primary/5 text-primary'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className={`px-2.5 py-1 rounded-md text-xs ${
                          theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                        }`}>
                          +{project.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
