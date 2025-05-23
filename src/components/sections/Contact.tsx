import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FiGithub className="w-6 h-6" />,
    href: 'https://github.com/hakangokdev',
    label: 'GitHub'
  },
  {
    icon: <FiLinkedin className="w-6 h-6" />,
    href: 'https://www.linkedin.com/in/gokhakan/',
    label: 'LinkedIn'
  },
  {
    icon: <FiMail className="w-6 h-6" />,
    href: 'mailto:gokhakan42@gmail.com',
    label: 'Email'
  }
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            <span className="text-gradient">📫 Get in Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Feel free to reach out through any of these platforms
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <a
              href="/resume/hakangökcv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 glass dark:glass-dark rounded-xl hover:scale-105 transition-transform"
            >
              <FiDownload className="w-5 h-5 text-accent-teal dark:text-accent-teal" />
              <span className="font-medium">Download Resume</span>
            </a>
          </motion.div>

          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass dark:glass-dark rounded-xl hover:scale-110 transition-transform"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-accent-teal dark:text-accent-teal">
                  {link.icon}
                </span>
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;