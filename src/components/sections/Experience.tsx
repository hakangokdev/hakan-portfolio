import { motion } from 'framer-motion';
import { FiCode, FiCalendar, FiGithub, FiExternalLink, FiBookOpen } from 'react-icons/fi';

interface ProjectItem {
  title: string;
  technologies: string;
  period: string;
  description: string[];
  githubLink?: string;
  demoLink?: string;
  articleLink?: string;
}

const projects: ProjectItem[] = [
  {
    title: 'Pedestrian Traffic Light Detection System',
    technologies: 'Python, YOLOv8x, Flask, OpenCV, CUDA, PyTorch',
    period: 'April 2025',
    description: [
      "Developed an AI-powered system for detecting pedestrians and traffic lights in urban environments using YOLOv8x",
      "Built a Flask web application with intuitive UI for image, video, and real-time detection capabilities",
      "Implemented CUDA acceleration for enhanced performance and optimized the model for various lighting conditions",
      "Created a modular architecture with separate modules for image, video, and real-time detection"
    ],
    githubLink: "https://github.com/hakangokdev/Pedestrian-Traffic-Light-Detection",
    articleLink: "https://medium.com/@gokhakan/pedestrian-traffic-light-detection-building-an-ai-powered-system-for-intelligent-traffic-analysis-8dd07b4ab7ea"
  },
  {
    title: 'Library Management System',
    technologies: 'Python, Django, PostgreSQL',
    period: 'March 2025',
    description: [
      "Built an efficient digital solution for modern libraries with Django and PostgreSQL",
      "Implemented user authentication, book management, and borrowing system",
      "Designed a responsive UI for easy library navigation and management"
    ],
    githubLink: "https://github.com/hakangokdev/Library-Management-System",
    articleLink: "https://medium.com/@gokhakan/library-management-system-building-an-efficient-digital-solution-for-modern-libraries-e6627478950d"
  },
  {
    title: 'Face Fusion Insights',
    technologies: 'Python, OpenCV, Deep Learning',
    period: 'February 2025',
    description: [
      "Developed a face fusion and analysis tool using deep learning and OpenCV",
      "Implemented advanced face detection and blending algorithms",
      "Provided insights and visualizations for face fusion results"
    ],
    githubLink: "https://github.com/hakangokdev/Face-Fusion-Insights"
  },
  {
    title: 'Exif Metadata Editor',
    technologies: 'Python, PyQt, ExifTool',
    period: 'January 2025',
    description: [
      "Created a desktop application for editing image EXIF metadata",
      "Integrated ExifTool for robust metadata manipulation",
      "Designed a user-friendly interface with PyQt"
    ],
    githubLink: "https://github.com/hakangokdev/Exif-Metadata-Editor"
  },
  {
    title: 'KUP Mimarlık Website',
    technologies: 'React, TypeScript, Vercel',
    period: 'December 2024',
    description: [
      "Developed a modern portfolio website for KUP Mimarlık",
      "Implemented responsive design and interactive UI components",
      "Deployed the website using Vercel for high availability"
    ],
    githubLink: "https://github.com/hakangokdev/kup-mimarlik"
  },
  {
    title: 'VDC System',
    technologies: 'Python, Flask, MongoDB',
    period: 'November 2024',
    description: [
      "Built a Virtual Data Center management system with Flask and MongoDB",
      "Implemented user roles, resource allocation, and monitoring features",
      "Designed RESTful APIs for integration with external tools"
    ],
    githubLink: "https://github.com/hakangokdev/vdc-system"
  },
  {
    title: 'YOLOv11 Human Crowd Detector',
    technologies: 'Python, YOLOv11, Computer Vision',
    period: 'October 2024',
    description: [
      "Developed a human crowd detection system using YOLOv11",
      "Optimized detection for real-time video streams",
      "Provided analytics and visualization for crowd density"
    ],
    githubLink: "https://github.com/hakangokdev/yolov11-human-crowd-detector"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-gradient">Projects</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Showcasing my technical skills through hands-on projects in computer vision, machine learning, and web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass dark:glass-dark rounded-lg shadow-lg border border-white/10 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col space-y-2 mb-4">
                  <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-2">
                    <FiCode className="text-accent-teal flex-shrink-0" />
                    <span>{project.title}</span>
                  </h3>
                  
                  <div className="flex flex-wrap justify-between items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <span className="text-primary-500 font-medium">Tech:</span>
                      <span className="text-gray-700 dark:text-gray-300">{project.technologies}</span>
                    </p>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <FiCalendar className="text-primary-500" />
                      <span>{project.period}</span>
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                  <ul className="space-y-2">
                    {project.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        viewport={{ once: true }}
                        className="text-gray-700 dark:text-gray-300 flex items-start gap-2 text-sm"
                      >
                        <span className="text-accent-teal mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Project links */}
                <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-accent-teal dark:hover:text-accent-teal transition-colors flex items-center gap-1 text-sm"
                    >
                      <FiGithub /> GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-accent-teal dark:hover:text-accent-teal transition-colors flex items-center gap-1 text-sm"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {project.articleLink && (
                    <a 
                      href={project.articleLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-accent-teal dark:hover:text-accent-teal transition-colors flex items-center gap-1 text-sm"
                    >
                      <FiBookOpen /> Article
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
