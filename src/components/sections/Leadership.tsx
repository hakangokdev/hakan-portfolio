import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';

interface LeadershipItem {
  organization: string;
  location: string;
  role: string;
  period: string;
  description: string[];
  image?: string;  // We'll add the image URL later when you provide it
}

const leadershipItems: LeadershipItem[] = [
  {
    organization: 'Duzce Mekatek',
    location: 'Duzce',
    role: 'Autonomous Vehicle Team Lead',
    period: 'November 2021 - November 2022',
    description: [
      'Part of the Robotaxi Autonomous Vehicle software team for a year, serving as team captain for six months',
      'Led the simulation design using Blender, Unity, and LGSVL',
      'Implemented image processing using YOLOV4 technology for dataset training',
      'Developed lane tracking system using Python OpenCV library',
      'Gained expertise in ROS/ROS2 (Robot Operating Systems) publisher-subscriber communication',
      'Worked with embedded systems including ESP8266 microcontrollers',
      'Currently serving as the Sponsorship and Organization officer at MEKATEK'
    ],
    image: '/events-photos/duzce-mekatek.jpeg'
  }
];

const Leadership = () => {
  return (
    <section id="leadership" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            <span className="text-gradient">🏆 Leadership & Activities</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Leading innovative autonomous vehicle projects and fostering team collaboration
          </p>
        </motion.div>

        <div className="space-y-8">
          {leadershipItems.map((item, index) => (
            <motion.div
              key={item.organization}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass dark:glass-dark rounded-xl overflow-hidden group"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.organization} - ${item.role}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-accent-blue dark:text-accent-purple">
                        {item.organization}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                        {item.role}
                      </h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiMapPin className="w-4 h-4" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      {item.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-accent-blue dark:text-accent-purple mt-1.5">•</span>
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
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

export default Leadership; 