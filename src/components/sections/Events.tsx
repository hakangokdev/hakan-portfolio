import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiX, FiChevronLeft, FiChevronRight, FiCalendar, FiMapPin } from 'react-icons/fi';
import { EventData, loadEvents } from '../../utils/eventLoader';

const EventCard: React.FC<{ event: EventData; onClick: () => void }> = ({ event, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="glass dark:glass-dark rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-display font-semibold mb-2">{event.title}</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <FiCalendar className="mr-1" />
              {event.date}
            </div>
            <div className="flex items-center">
              <FiMapPin className="mr-1" />
              {event.location}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-accent-blue dark:group-hover:text-accent-purple transition-colors">
          {event.title}
        </h3>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FiCalendar className="mr-2" />
            {event.date}
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <FiMapPin className="mr-2" />
            {event.location}
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
}> = ({ event, onClose, onPrevious, onNext }) => (
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
      className="relative max-w-4xl w-full glass dark:glass-dark rounded-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors z-10"
      >
        <FiX className="w-6 h-6 text-white" />
      </button>

      <div className="aspect-video relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h3 className="text-3xl font-display font-bold text-white mb-4">
            {event.title}
          </h3>
          <div className="flex items-center space-x-6 text-gray-200">
            <div className="flex items-center">
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

      <div className="p-8">
        <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
          {event.description.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-accent-blue to-accent-purple hover:shadow-glow transition-all duration-300"
          >
            View on LinkedIn <FiExternalLink className="ml-2" />
          </a>
        )}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center -translate-y-1/2 pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors pointer-events-auto"
        >
          <FiChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors pointer-events-auto"
        >
          <FiChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const Events = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const loadedEvents = await loadEvents();
        setEvents(loadedEvents);
      } catch (err) {
        setError('Failed to load events');
        console.error('Error loading events:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
            <span className="text-gradient">Events & Engagements</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Speaking engagements, workshops, and tech events where I share knowledge and experiences in cloud computing and DevOps
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 dark:text-red-400">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
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