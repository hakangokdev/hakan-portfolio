import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiX, FiChevronLeft, FiChevronRight, FiCalendar, FiMapPin } from 'react-icons/fi';

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage: string;
  galleryImages?: string[];
  link?: string;
}

const events: EventData[] = [
  {
    id: '1',
    title: '1st Place: Kapsül Web Hackathon 2025',
    description: '🚀 Secured 1st place with team "404 (Dört Sıfır Dört)" (Teammates: Rafet Kaya, Samet Kuku) in the Kapsül Web Hackathon 2025. This 9-hour event, hosted by KTÜN Software Development Community and Kapsül Teknoloji Platform, focused on developing original and functional web projects. 🏆 An invaluable experience in rapid development, collaborative problem-solving, and effective time management.',
    date: 'May 2025', // Please verify, LinkedIn post for a similar achievement is Feb 2024
    location: 'Konya, Turkey',
    coverImage: '/events-photos/kapsul-hackathon.jpg',
    galleryImages: [
      '/events-photos/kapsul-hackathon.jpg', // Main image repeated for gallery start
      '/events-photos/kapsul-hackathon-2.jpg',    // Example additional image
      '/events-photos/kapsul-hackathon-3.jpg',   // Example additional image
    ],
    link: 'https://www.linkedin.com/posts/gokhakan_hackathon-ba%C5%9Far%C4%B1s%C4%B1-yaz%C4%B1l%C4%B1m-geli%C5%9Ftirme-activity-7327059867200811008-NODt?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE6SViYBNbIy1pbORdZxO8Xdedps2g3jRac'
  },
  {
    id: '2',
    title: 'Konya 1st AI Summit – Participant',
    description: 'Joined the inaugural Konya Artificial Intelligence Summit, organized by the Artificial Intelligence & Image Processing Community in collaboration with the Kapsül Technology Platform. The event featured thought-provoking sessions on artificial intelligence, entrepreneurship, and emerging tech trends, enriching my understanding of the AI landscape.',
    date: 'May 2025', // Confirm this date if necessary
    location: 'Konya, Turkey',
    coverImage: '/events-photos/konya-ai-summit.jpg',
    link: ''
  },
  {
    id: '3',
    title: 'GDG Konya DevFest 2023 & 2024 – Attendee',
    description: 'Attended GDG Konya DevFest in both 2023 and 2024, gaining exposure to the latest in Google technologies, web and mobile development, cloud solutions, and AI innovations. The events featured a dynamic mix of keynote speakers, hands-on sessions, and networking opportunities with the local developer community.',
    date: 'November 2023 & December 2024', // Update if more accurate dates are known
    location: 'Konya, Turkey',
    coverImage: '/events-photos/gdg-konya-devfest.jpg',
  }
];

const EventCard: React.FC<{ event: EventData; onClick: () => void }> = ({ event, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group cursor-pointer h-full"
    onClick={onClick}
  >
    <div className="glass dark:glass-dark rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col h-full">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-accent-blue/80 dark:bg-accent-purple/80 text-white px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm text-sm font-medium">
            View Details
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-accent-blue dark:group-hover:text-accent-purple transition-colors line-clamp-2">
          {event.title}
        </h3>
        <div className="flex flex-col space-y-2 text-sm mt-auto">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FiCalendar className="min-w-4 h-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <FiMapPin className="min-w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const EventModal: React.FC<{
  event: EventData;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}> = ({ event, onClose, onPrevious, onNext }) => {
  const modalImages = useMemo(() => {
    return Array.from(new Set([event.coverImage, ...(event.galleryImages || [])].filter(Boolean)));
  }, [event.coverImage, event.galleryImages]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginateImage = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImageIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) return modalImages.length - 1;
      if (newIndex >= modalImages.length) return 0;
      return newIndex;
    });
  };

  const jumpToImage = (index: number) => {
    if (index > currentImageIndex) setDirection(1);
    else if (index < currentImageIndex) setDirection(-1);
    else setDirection(0);
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    setCurrentImageIndex(0);
    setDirection(0);
  }, [event.id]);

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full glass dark:glass-dark rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors z-40"
        >
          <FiX className="w-6 h-6 text-white" />
        </button>

        <div className="aspect-video relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentImageIndex}
              src={modalImages[currentImageIndex]}
              alt={`${event.title} - Image ${currentImageIndex + 1}`}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-[5]" />

          {modalImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); paginateImage(-1); }}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-20"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); paginateImage(1); }}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-20"
                aria-label="Next image"
              >
                <FiChevronRight className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {modalImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); jumpToImage(index); }}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 md:mb-4">
              {event.title}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-200 text-sm md:text-base">
              <div className="flex items-center mb-1 sm:mb-0">
                <FiCalendar className="mr-2" />
                {event.date}
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-2" />
                {event.location}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-300px-10rem)] sm:max-h-[calc(100vh-250px-8rem)] md:max-h-[40vh]">
          <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none mb-6">
            {event.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-accent-blue to-accent-purple hover:shadow-glow transition-all duration-300 text-sm md:text-base"
            >
              View on LinkedIn <FiExternalLink className="ml-2" />
            </a>
          )}
        </div>
      </motion.div>

      <button
        onClick={(e) => { e.stopPropagation(); onPrevious(); }}
        className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-4 md:left-6 lg:left-8 p-2 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors z-30"
        aria-label="Previous event"
      >
        <FiChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-4 md:right-6 lg:right-8 p-2 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors z-30"
        aria-label="Next event"
      >
        <FiChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </button>
    </motion.div>
  );
};

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const handlePrevious = () => {
    if (!selectedEvent) return;
    const currentIndex = events.findIndex(e => e.id === selectedEvent.id);
    const prevIndex = currentIndex === 0 ? events.length - 1 : currentIndex - 1;
    setSelectedEvent(events[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedEvent) return;
    const currentIndex = events.findIndex(e => e.id === selectedEvent.id);
    const nextIndex = currentIndex === events.length - 1 ? 0 : currentIndex + 1;
    setSelectedEvent(events[nextIndex]);
  };

  return (
    <section id="events" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            <span className="text-gradient">Events & Achievements</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Speaking engagements, hackathon achievements, and tech events where I contribute to and learn from the community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;