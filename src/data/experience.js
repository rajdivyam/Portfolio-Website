/**
 * experience — timeline data for work experience
 */
const experience = [
  {
    id: 1,
    type: 'internship',
    role: 'Web Developer Intern',
    company: 'Codec Technologies',
    location: 'Remote',
    duration: 'Jun 2025 – Aug 2025',
    certificateUrl: '/images/cert-codec.png',
    description: 'Assisted in designing, developing, and maintaining responsive websites using HTML, CSS, JavaScript, and Bootstrap to improve user experience and interface. Worked with databases (MySQL/MongoDB) for storing, retrieving, and managing application data. Gained hands-on experience in front-end and back-end development, enhancing problem-solving and teamwork skills.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'MongoDB', 'MySQL'],
  },
];

export const experienceTypes = [
  { key: 'all', label: 'All' },
  { key: 'internship', label: 'Internships' },
  { key: 'freelance', label: 'Freelancing' },
  { key: 'training', label: 'Training' },
  { key: 'opensource', label: 'Open Source' },
];

export default experience;
