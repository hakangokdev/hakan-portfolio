import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';

interface EducationItem {
  school: string;
  location: string;
  degree: string;
  period: string;
  type: 'education' | 'certification';
  logo?: string;
}

const educationItems: EducationItem[] = [
  {
    school: 'Anadolu University',
    location: 'Eskisehir, Turkey',
    degree: "Bachelor's Degree in Management Information Systems",
    period: 'September 2023 - Present',
    type: 'education'
  },
  {
    school: 'Duzce University',
    location: 'Duzce, Turkey',
    degree: 'Associate Degree in Computer Programming',
    period: 'September 2021 - June 2023',
    type: 'education'
  }
];

const certifications: EducationItem[] = [
  {
    school: 'Google',
    degree: 'Google Cloud SecOps',
    period: '2023',
    type: 'certification',
    location: 'Google Cloud'
  },
  {
    school: 'Palo Alto Networks',
    degree: 'Fundamentals of Cloud Security',
    period: '2023',
    type: 'certification',
    location: 'Cloud Security'
  },
  {
    school: 'Palo Alto Networks',
    degree: 'Network Security Fundamentals',
    period: '2023',
    type: 'certification',
    location: 'Network Security'
  }
];

const Education = () => {
  return (
    <section id="education">
      <div className="container">
        <div className="section-title">
          <h2>Education & Certifications</h2>
          <p className="section-subtitle">
            Academic background and professional certifications in cloud and security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="card-title flex items-center gap-2 mb-6">
              <FiBook className="text-blue-700 dark:text-blue-400" />
              Education
            </h3>

            {educationItems.map((item, index) => (
              <motion.div
                key={item.school}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                      {item.degree}
                    </h4>
                    <p className="card-subtitle flex items-center gap-2">
                      {item.school}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-blue-800 dark:text-blue-400">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {item.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="card-title flex items-center gap-2 mb-6">
              <FiAward className="text-blue-700 dark:text-blue-400" />
              Professional Certifications
            </h3>

            {certifications.map((cert, index) => (
              <motion.div
                key={cert.degree}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                      {cert.degree}
                    </h4>
                    <p className="card-subtitle flex items-center gap-2">
                      {cert.school}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-blue-800 dark:text-blue-400">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {cert.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {cert.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education; 