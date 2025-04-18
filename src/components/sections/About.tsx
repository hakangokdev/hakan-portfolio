import { motion } from 'framer-motion';
import { FiDatabase, FiLayers, FiCode } from 'react-icons/fi';

const About = () => {
  const highlights = [
    {
      icon: <FiCode className="w-6 h-6" />,
      title: 'Full-Stack Development',
      description: 'Creating dynamic applications using modern JavaScript frameworks, C#, and Python with a strong focus on usability and maintainability.'
    },
    {
      icon: <FiLayers className="w-6 h-6" />,
      title: 'Smart System Design',
      description: 'Designing innovative systems like AI-based traffic light recognition for the visually impaired and smart IoT-based waste management solutions.'
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: 'Database and Data Handling',
      description: 'Skilled in designing efficient database models, managing complex datasets, and using tools like SQL, Excel, and Pandas for effective data analysis.'
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
                Computer Programming Student & Developer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
  I'm Hakan Gök, a passionate Full-Stack Developer with a strong foundation in the .NET ecosystem and hands-on experience in both frontend and backend technologies. My work reflects a deep commitment to writing clean, efficient code that serves real users — not just machines.
</p>
<p className="text-gray-600 dark:text-gray-300 mb-6">
  I specialize in image processing and computer vision, particularly with OpenCV and Python. I've developed advanced systems for object detection, facial recognition, and visual analysis, often integrating AI and machine learning models to power smart, real-time solutions.
</p>
<p className="text-gray-600 dark:text-gray-300 mb-6">
  On the frontend, I build user-friendly interfaces using React, while on the backend I deliver robust full-stack solutions using .NET Core and modern databases. I'm also experienced with tools like Docker, SPSS (for basic data analysis), and cross-platform mobile development with Java and Kotlin.
</p>
<p className="text-gray-600 dark:text-gray-300">
  I thrive on continuous learning and staying updated with the latest technologies. Whether developing a real-time traffic light recognition system for visually impaired individuals, or a Library Management System in Java/Kotlin, I always aim to create meaningful and innovative software.
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
