import {
  FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt,
  FaDocker, FaAws, FaFigma, FaHtml5, FaCss3Alt,
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiMongodb, SiPostgresql, SiRedis, SiFirebase,
  SiExpress, SiGraphql, SiPrisma,
  SiCplusplus, SiRedux, SiVite,
  SiVercel, SiNetlify, SiGithubactions,
  SiPostman, SiLinux, SiNginx,
  SiFramer, SiSocketdotio, SiMysql,
} from 'react-icons/si';

/**
 * skills — categorized skills with icons and proficiency levels (0-100)
 */
const skills = {
  categories: [
    {
      name: 'Frontend',
      color: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'React.js', icon: FaReact, level: 95 },
        { name: 'Next.js', icon: SiNextdotjs, level: 88 },
        { name: 'TypeScript', icon: SiTypescript, level: 85 },
        { name: 'JavaScript', icon: SiJavascript, level: 95 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92 },
        { name: 'HTML5', icon: FaHtml5, level: 98 },
        { name: 'CSS3', icon: FaCss3Alt, level: 95 },
        { name: 'Redux', icon: SiRedux, level: 85 },
        { name: 'Framer Motion', icon: SiFramer, level: 82 },
      ],
    },
    {
      name: 'Backend',
      color: 'from-green-500 to-emerald-400',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 92 },
        { name: 'Express.js', icon: SiExpress, level: 90 },
        { name: 'GraphQL', icon: SiGraphql, level: 78 },
        { name: 'REST APIs', icon: SiPostman, level: 94 },
        { name: 'Socket.io', icon: SiSocketdotio, level: 80 },
        { name: 'Prisma', icon: SiPrisma, level: 82 },
      ],
    },
    {
      name: 'Database',
      color: 'from-purple-500 to-pink-400',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 90 },
        { name: 'MySQL', icon: SiMysql, level: 85 },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 82 },
        { name: 'Firebase', icon: SiFirebase, level: 85 },
      ],
    },
    {
      name: 'Languages',
      color: 'from-orange-500 to-amber-400',
      skills: [
        { name: 'JavaScript', icon: SiJavascript, level: 95 },
        { name: 'TypeScript', icon: SiTypescript, level: 85 },
        { name: 'Python', icon: FaPython, level: 80 },
        { name: 'Java', icon: FaJava, level: 75 },
        { name: 'C++', icon: SiCplusplus, level: 78 },
      ],
    },
    {
      name: 'Tools',
      color: 'from-cyan-500 to-blue-400',
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 92 },
        { name: 'Docker', icon: FaDocker, level: 78 },
        { name: 'Vite', icon: SiVite, level: 88 },
        { name: 'Postman', icon: SiPostman, level: 90 },
        { name: 'Figma', icon: FaFigma, level: 75 },
        { name: 'Linux', icon: SiLinux, level: 80 },
      ],
    },
    {
      name: 'Cloud & DevOps',
      color: 'from-indigo-500 to-violet-400',
      skills: [
        { name: 'AWS', icon: FaAws, level: 72 },
        { name: 'Vercel', icon: SiVercel, level: 90 },
        { name: 'Netlify', icon: SiNetlify, level: 85 },
        { name: 'GitHub Actions', icon: SiGithubactions, level: 80 },
        { name: 'Nginx', icon: SiNginx, level: 70 },
      ],
    },
  ],
};

export default skills;
