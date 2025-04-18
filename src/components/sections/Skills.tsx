import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiLayers, FiServer, FiGitBranch, FiMonitor, FiPackage, FiTool, FiCloud } from 'react-icons/fi';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: <FiMonitor className="w-6 h-6" />,
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Material UI', 'Bootstrap']
  },
  {
    title: 'Backend & Desktop Development',
    icon: <FiServer className="w-6 h-6" />,
    skills: ['.NET', 'C#', 'Python', 'Flask', 'ASP.NET', 'RESTful APIs', 'PyQt']
  },
  {
    title: 'AI, Vision & Data Science',
    icon: <FiLayers className="w-6 h-6" />,
    skills: ['OpenCV', 'YOLO', 'TensorFlow', 'Scikit-learn', 'PyTorch', 'NumPy', 'Pandas', 'SPSS']
  },
  {
    title: 'Database Technologies',
    icon: <FiDatabase className="w-6 h-6" />,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite']
  },
  {
    title: 'DevOps & Deployment',
    icon: <FiCloud className="w-6 h-6" />,
    skills: ['Docker', 'GitHub Actions', 'CI/CD', 'Vercel', 'Netlify']
  },
  {
    title: 'Version Control',
    icon: <FiGitBranch className="w-6 h-6" />,
    skills: ['Git', 'GitHub', 'GitLab']
  },
  {
    title: 'Other Tools',
    icon: <FiTool className="w-6 h-6" />,
    skills: ['SPSS', 'Redux', 'Vite', 'Webpack']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gradient">Skills & Expertise</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Specialized in full-stack development, modern frameworks, and scalable architecture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass dark:glass-dark p-6 rounded-lg shadow-lg border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-accent-teal">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-white/50 dark:bg-gray-700/50 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700/30"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--accent-teal-rgb), 0.2)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;