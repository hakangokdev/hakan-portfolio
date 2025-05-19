import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiExternalLink, FiCalendar} from "react-icons/fi";
import { MediumArticle, loadMediumArticles } from "../../utils/mediumLoader";

interface Project {
  title: string;
  link: string;
  pubDate: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "Pedestrian Traffic Light Detection System",
    link: "https://github.com/hakangokdev/Pedestrian-Traffic-Light-Detection",
    pubDate: "2025-04-01",
    github: "https://github.com/hakangokdev/Pedestrian-Traffic-Light-Detection"
  },
  {
    title: "Library Management System",
    link: "https://github.com/hakangokdev/Library-Management-System",
    pubDate: "2025-03-01",
    github: "https://github.com/hakangokdev/Library-Management-System"
  }
];

const Publications = () => {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const mediumArticles = await loadMediumArticles();
        setArticles(mediumArticles);
      } catch (err) {
        console.error("Error loading Medium articles:", err);
        setError("Failed to load Medium articles");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id="publications">
      <div className="container">
        <div className="section-title">
          <h2>Publications</h2>
          <p className="section-subtitle">
            My own blog posts and open source projects
          </p>
        </div>
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse space-y-4">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 dark:text-red-400 py-8">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medium Blog Posts */}
              {articles.map((article, index) => (
                <motion.a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        <FiBookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {article.title}
                        </h3>
                        <p className="text-sm text-blue-800 dark:text-blue-400">
                          <span className="mr-2">{article.emoji}</span>
                          ✍️ Blog
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-sm text-blue-800 dark:text-blue-400">
                        <FiCalendar className="w-4 h-4" />
                        {article.pubDate}
                      </span>
                      <FiExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* GitHub Projects - YORUM SATIRINA ALINDI */}
              {/*
              {projects.map((project, index) => (
                <motion.a
                  key={project.github}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (articles.length + index) * 0.1 }}
                  viewport={{ once: true }}
                  className="card group hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        <FiGithub className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm text-blue-800 dark:text-blue-400">
                          🚀 Proje
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-sm text-blue-800 dark:text-blue-400">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(project.pubDate).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                      <FiExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </motion.a>
              ))}
              */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Publications;