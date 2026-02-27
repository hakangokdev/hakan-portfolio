import { motion } from "framer-motion";
import { FiExternalLink, FiGlobe, FiUsers, FiLayers, FiCheckCircle, FiHeart } from "react-icons/fi";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  url: string;
  image: string;
  tags: string[];
  features: string[];
  status: 'live' | 'in-development';
  role: string;
  techStack: string[];
  impact?: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    id: 'bgyardim',
    title: 'BGYardım',
    description: 'A comprehensive scholarship platform helping students access financial aid opportunities',
    longDescription: 'BGYardım is a live scholarship assistance platform that I developed as a volunteer project. It simplifies and digitizes the scholarship distribution process, making it easier for students to apply and for organizations to manage applications efficiently.',
    url: 'https://bgyardim.com/',
    image: '/events-photos/bgyardim.png',
    tags: ['Full Stack', 'Live Project', 'Social Impact'],
    features: [
      'Student application system with document upload',
      'Comprehensive admin panel & management dashboard',
      'Scholarship application tracking & status updates',
      'Secure authentication & user management',
      'Fully responsive design for all devices'
    ],
    status: 'live',
    role: 'Full Stack Developer (Volunteer)',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS'],
    impact: 'Helping students find scholarship opportunities'
  }
];

const FeaturedProjects = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  return (
    <section id="featured-projects" ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <div className="section-title">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-gradient">Featured Projects</span>
            </h2>
            <p className="section-subtitle text-center max-w-2xl mx-auto">
              Live and actively maintained projects making a real-world impact
            </p>
          </motion.div>
        </div>

        <div className="space-y-8 max-w-6xl mx-auto">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              
              <div className="relative card overflow-hidden border-2 border-transparent hover:border-blue-500/20 dark:hover:border-blue-400/20 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left side - Image */}
                  <div className="lg:w-1/2 flex-shrink-0">
                    <div className="relative group/image h-full min-h-[300px] lg:min-h-[400px]">
                      <div className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-lg">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-contain group-hover/image:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-4xl font-bold">${project.title}</div>`;
                            }
                          }}
                        />
                      </div>
                      
                      {/* Live Status Badge */}
                      {project.status === 'live' && (
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-500/50">
                          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                          LIVE
                        </div>
                      )}

                      {/* Impact Badge */}
                      {project.impact && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-3 py-2 rounded-full text-xs font-medium shadow-lg">
                          <FiHeart className="w-3.5 h-3.5 text-red-500" />
                          {project.impact}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="lg:w-1/2 flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                          {project.description}
                        </p>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {project.longDescription}
                      </p>

                      {/* Role */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-2 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg font-semibold">
                          <FiUsers className="w-3.5 h-3.5" />
                          {project.role}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-200/50 dark:border-blue-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                          <FiCheckCircle className="w-3.5 h-3.5 text-green-500" />
                          Key Features
                        </h4>
                        <ul className="space-y-1.5">
                          {project.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2"
                            >
                              <span className="text-green-500 text-sm leading-none mt-0.5">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                          <FiLayers className="w-3.5 h-3.5 text-blue-500" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Visit Button */}
                    <div className="mt-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 group/button"
                      >
                        <FiGlobe className="w-4 h-4" />
                        Visit Live Project
                        <FiExternalLink className="w-4 h-4 group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
