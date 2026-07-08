import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaCode,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

/**
 * personalInfo — all personal data in one place for easy customization
 */
const personalInfo = {
  name: 'Divyam Raj',
  firstName: 'Divyam',
  lastName: 'Raj',
  initials: 'DR',
  roles: [
    'Software Engineer',
    'Full Stack Developer',
    'MERN Stack Developer',
    'Problem Solver',
  ],
  tagline: 'Building the future, one line of code at a time.',
  bio: `I'm a passionate Software Engineer with a love for crafting elegant, scalable, and user-centric digital experiences. With expertise spanning the full stack — from pixel-perfect frontends to robust backend architectures — I transform complex problems into intuitive solutions.`,
  about: `I specialize in building modern web applications using the MERN stack and cutting-edge technologies. I am driven by curiosity, committed to clean code, and passionate about creating products that solve real-world problems.`,
  careerObjective: `To leverage my technical expertise and creative problem-solving skills to build innovative software solutions that impact millions of users, while continuously growing as an engineer at a forward-thinking technology company.`,
  email: 'rajdivyamgautam@gmail.com',
  phone: '+91 6202431977',
  location: 'Ghaziabad, PIN 201206',
  website: 'https://divyamraj.dev',
  resumeUrl: '/resume.pdf',

  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/rajdivyam', icon: FaGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/raj-divyam/', icon: FaLinkedinIn },
    { name: 'Twitter/X', url: 'https://x.com', icon: FaXTwitter },
    { name: 'Email', url: 'mailto:rajdivyamgautam@gmail.com', icon: FaEnvelope },
    { name: 'Codolio', url: 'https://codolio.com/profile/RajDivyam', icon: FaCode },
  ],

  education: [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'KIET Group of Institutions, Delhi-NCR, Ghaziabad',
      year: '2024 – 2026',
      // grade: '7.2 CGPA (Pursuing)',
      description: 'Advanced studies in computer science, software engineering, and application development.',
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'IGNOU, RC Patna',
      year: '2021 – 2024',
      // grade: '64.50%',
      description: 'Foundations of programming, database management, and system design.',
    },
    {
      degree: 'Intermediate (XII)',
      institution: 'JD Public School, CBSE',
      year: '2017 – 2019',
      // grade: '64.00%',
      description: 'Science stream with a focus on core subjects.',
    },
    {
      degree: 'High School (X)',
      institution: 'JD Public School, CBSE',
      year: '2015 – 2017',
      // grade: '83.60%',
      description: 'General matriculation curriculum under CBSE board.',
    },
  ],

  strengths: [
    'Problem Solving',
    'Team Collaboration',
    'Quick Learner',
    'Attention to Detail',
    'Communication',
    'Adaptability',
  ],

  coreValues: [
    { title: 'Innovation', description: 'Pushing boundaries with creative solutions' },
    { title: 'Quality', description: 'Writing clean, maintainable, tested code' },
    { title: 'Growth', description: 'Continuous learning and self-improvement' },
    { title: 'Impact', description: 'Building products that matter' },
  ],

  stats: {
    projects: 10,
    platforms: 3,
    internships: 1,
    technologies: 15,
    certificates: 5,
  },
};

export default personalInfo;
