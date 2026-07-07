import { motion } from 'framer-motion';
import { FaHeart, FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import personalInfo from '../../data/personalInfo';

const quickLinks = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
];

/**
 * Footer — premium footer with quick links, social links, and gradient top border
 */
export default function Footer() {
  const { theme } = useTheme();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={`relative ${
      theme === 'dark' ? 'bg-dark-surface' : 'bg-light-surface'
    }`}>
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-heading font-bold text-sm">
                {personalInfo.initials}
              </div>
              <span className={`font-heading font-bold text-xl ${
                theme === 'dark' ? 'text-white' : 'text-light-text'
              }`}>
                {personalInfo.firstName}
                <span className="gradient-text">.</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed mb-6 ${
              theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
            }`}>
              {personalInfo.tagline}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {personalInfo.socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 hover:bg-primary/20 text-dark-muted hover:text-primary'
                        : 'bg-black/5 hover:bg-primary/10 text-light-muted hover:text-primary'
                    }`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-heading font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-light-text'
            }`}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className={`text-sm transition-colors hover:text-primary ${
                      theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-heading font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-light-text'
            }`}>Get In Touch</h4>
            <div className={`space-y-3 text-sm ${
              theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'
            }`}>
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t text-center text-sm ${
          theme === 'dark' ? 'border-white/5 text-dark-subtle' : 'border-black/5 text-light-subtle'
        }`}>
          <p className="flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()} {personalInfo.name}. Made with
            <FaHeart className="text-red-500 text-xs" />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
