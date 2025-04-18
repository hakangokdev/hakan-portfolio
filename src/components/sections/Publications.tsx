import React from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiExternalLink, FiCalendar, FiGithub } from "react-icons/fi";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  publication?: string;
  type?: "blog" | "project";
  github?: string;
}

const articles: Article[] = [
  {
    title: "Pedestrian Traffic Light Detection: Building an AI-Powered System for Intelligent Traffic Analysis",
    link: "https://medium.com/@gokhakan/pedestrian-traffic-light-detection-building-an-ai-powered-system-for-intelligent-traffic-analysis-8dd07b4ab7ea",
    pubDate: "2024-04-10",
    publication: "Medium",
    type: "blog"
  },
  {
    title: "Library Management System: Building an Efficient Digital Solution for Modern Libraries",
    link: "https://medium.com/@gokhakan/library-management-system-building-an-efficient-digital-solution-for-modern-libraries-e6627478950d",
    pubDate: "2024-03-15",
    publication: "Medium",
    type: "blog"
  },
  {
    title: "Face Fusion Insights: Deep Learning ile Yüz Birleştirme ve Analiz",
    link: "https://medium.com/@gokhakan/face-fusion-insights-deep-learning-ile-y%C3%BCz-birle%C5%9Ftirme-ve-analiz-123456789abc",
    pubDate: "2024-02-20",
    publication: "Medium",
    type: "blog"
  },
  {
    title: "Pedestrian Traffic Light Detection System",
    link: "https://github.com/hakangokdev/Pedestrian-Traffic-Light-Detection",
    pubDate: "2025-04-01",
    publication: "GitHub",
    type: "project",
    github: "https://github.com/hakangokdev/Pedestrian-Traffic-Light-Detection"
  },
  {
    title: "Library Management System",
    link: "https://github.com/hakangokdev/Library-Management-System",
    pubDate: "2025-03-01",
    publication: "GitHub",
    type: "project",
    github: "https://github.com/hakangokdev/Library-Management-System"
  }
];

const getPublicationName = (article: Article): string => {
  if (article.type === "project") return "🚀 Proje";
  return "✍️ Blog";
};

const Publications = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <motion.a
                key={article.link}
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
                      {article.type === "project" ? (
                        <FiGithub className="w-5 h-5" />
                      ) : (
                        <FiBookOpen className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-sm text-blue-800 dark:text-blue-400">
                        {getPublicationName(article)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1 text-sm text-blue-800 dark:text-blue-400">
                      <FiCalendar className="w-4 h-4" />
                      {new Date(article.pubDate).toLocaleDateString("tr-TR", {
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;