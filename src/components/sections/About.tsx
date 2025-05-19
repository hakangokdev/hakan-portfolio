import { motion } from 'framer-motion';
// Added FiSmartphone for mobile, FiGitMerge for DevOps tools if needed, but FiLayers is good for full-stack
import { FiLayers, FiCode, FiSmartphone } from 'react-icons/fi';

const About = () => {
  const highlights = [
    {
      icon: <FiCode className="w-6 h-6" />,
      title: 'Frontend Development with React',
      description: 'Building dynamic, responsive, and accessible user interfaces using React.js, JavaScript, and TypeScript with a focus on performance and user experience.'
    },
    {
      icon: <FiLayers className="w-6 h-6" />, // FiLayers can represent the "stack"
      title: 'Full-Stack Integration & DevOps',
      description: 'Connecting frontend applications to robust backend APIs (MongoDB, MySQL). Proficient with Docker, Git, and modern deployment workflows for reliable applications.'
    },
    {
      icon: <FiSmartphone className="w-6 h-6" />,
      title: 'Mobile Innovation & Image Processing',
      description: 'Developing Android applications using Java & Kotlin, featuring image processing with YOLO for impactful accessibility solutions, such as aiding visually impaired individuals.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">About Me</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                Full-Stack Developer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm Hakan Gök, a dedicated Full-Stack Developer with a strong focus on frontend technologies and seamless backend integration. I primarily work with React.js, JavaScript, and TypeScript to build dynamic, responsive, and accessible user interfaces. On the backend, I integrate APIs using MongoDB and MySQL, ensuring smooth data flow and performance across the stack.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                My expertise lies in developing full-stack applications where the frontend and backend are tightly connected, delivering real-world functionality and clean, maintainable code. I’m experienced in using Docker, Git, and modern deployment workflows to ship reliable applications.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                In addition to my full-stack work, I have a background in Python and C# with a solid understanding of object-oriented programming (OOP). I've also developed Android mobile applications using Java and Kotlin, notably an accessibility-focused app leveraging YOLO for image processing to assist visually impaired individuals.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                My passion lies in creating impactful solutions through modern web and mobile technologies, with a continuous drive to learn and innovate.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="glass dark:glass-dark p-6 rounded-lg shadow-lg border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-accent-teal mr-4">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;