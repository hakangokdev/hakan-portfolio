import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiCalendar, FiStar, FiCode } from "react-icons/fi";
import { GitHubRepo, loadGitHubRepos } from "../../utils/githubLoader";

const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        const githubRepos = await loadGitHubRepos();
        
        if (githubRepos.length === 0) {
          console.warn("No GitHub repositories found - check the API response");
          setError("Couldn't load GitHub repositories at this time");
        } else {
          setRepos(githubRepos);
          setError(null);
        }
      } catch (err) {
        console.error("Error loading GitHub repositories:", err);
        setError("Failed to load GitHub repositories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Yükleme durumlarını yönetmek için
  const hasRepos = repos.length > 0;
  const showError = error && !hasRepos;
  const showEmptyState = !isLoading && !error && !hasRepos;

  return (
    <section id="projects">
      <div className="container">
        <div className="section-title">
          <h2>Projects</h2>
          <p className="section-subtitle">
            My personal and open source projects on GitHub
          </p>
        </div>
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse space-y-4">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ) : showError ? (
            <div className="text-center py-8">
              <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Please check back later</p>
            </div>
          ) : showEmptyState ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No projects found at this time</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.url}
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
                        <FiGithub className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {repo.name}
                        </h3>
                        <p className="text-sm text-blue-800 dark:text-blue-400 mt-1 line-clamp-2">
                          {repo.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {repo.language && (
                            <span className="inline-flex items-center text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                              <FiCode className="mr-1 w-3 h-3" />
                              {repo.language}
                            </span>
                          )}
                          {repo.stars > 0 && (
                            <span className="inline-flex items-center text-xs px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">
                              <FiStar className="mr-1 w-3 h-3" />
                              {repo.stars}
                            </span>
                          )}
                          <span className="text-sm">
                            <span className="mr-1">{repo.emoji}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-sm text-blue-800 dark:text-blue-400">
                        <FiCalendar className="w-4 h-4" />
                        {repo.updatedAt}
                      </span>
                      <FiExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects; 