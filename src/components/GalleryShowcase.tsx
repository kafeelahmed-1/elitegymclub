import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useState } from 'react';

const GalleryShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const galleries = [
    {
      id: 1,
      title: 'State-of-the-Art Equipment',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3ltfGVufDB8fDB8fHww',
      category: 'Equipment',
      description: 'Premium fitness equipment for all levels'
    },
    {
      id: 2,
      title: 'Professional Training Floor',
      image: 'https://images.unsplash.com/photo-1761946356399-8335dbdce394?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhaW5pbmclMjBmbG9vcnxlbnwwfHwwfHx8MA%3D%3D',
      category: 'Training',
      description: 'Spacious training areas with expert guidance'
    },
    {
      id: 3,
      title: 'Modern Cardio Zone',
      image: 'https://plus.unsplash.com/premium_photo-1663040230077-80d4b18e16e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyZGlvfGVufDB8fDB8fHww',
      category: 'Cardio',
      description: 'Latest cardio machines and facilities'
    },
    {
      id: 4,
      title: 'Olympic Lifting Area',
      image: 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlmdGluZ3xlbnwwfHwwfHx8MA%3D%3D',
      category: 'Lifting',
      description: 'Professional Olympic lifting platform'
    },
    {
      id: 5,
      title: 'Group Fitness Studio',
      image: 'https://plus.unsplash.com/premium_photo-1664109999449-82f58d6f7cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGd5bSUyMGNsYXNzZXN8ZW58MHx8MHx8fDA%3D',
      category: 'Classes',
      description: 'Dynamic group fitness classes available'
    },
    {
      id: 6,
      title: 'Recovery & Wellness',
      image: 'https://images.unsplash.com/photo-1734668487893-d686f3c8d0cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGd5bSUyMGNsYXNzZXN8ZW58MHx8MHx8fDA%3D',
      category: 'Recovery',
      description: 'Complete recovery and wellness center'
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % galleries.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + galleries.length) % galleries.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(galleries[(activeIndex + i) % galleries.length]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <section id="gallery" className="relative py-24 overflow-hidden bg-gradient-to-b from-gym-darker via-black to-gym-darker">
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
         {/* <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-semibold flex items-center gap-2">
              <Zap size={16} />
              Gallery Showcase
            </span>
          </div>*/}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-gym-light mb-4">
            Experience Our <span className="text-gradient">Elite Facilities</span>
          </h2>
          <p className="text-lg text-gym-gray max-w-2xl mx-auto">
            Discover the world-class equipment, training areas, and amenities that make EliteFit the ultimate fitness destination
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {visibleCards.map((gallery, index) => (
              <motion.div
                key={gallery.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-96 cursor-pointer"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl border border-accent/20 group-hover:border-accent/50 transition-all duration-300" />

                {/* Image Container */}
                <div className="relative h-full overflow-hidden rounded-2xl">
                  <img
                    src={gallery.image}
                    alt={gallery.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="absolute top-4 right-4 px-3 py-1 bg-accent/90 text-gym-dark text-xs font-bold rounded-full"
                  >
                    {gallery.category}
                  </motion.div>

                  {/* Content on Hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-heading font-bold text-gym-light mb-2">
                        {gallery.title}
                      </h3>
                      <p className="text-gym-gray text-sm">
                        {gallery.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white to-transparent" />
                </div>

                {/* Floating Accent */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                  className="absolute -bottom-2 -right-2 w-20 h-20 bg-accent/10 rounded-full blur-xl"
                />
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-accent/10 hover:bg-accent border border-accent/30 hover:border-accent rounded-full text-accent hover:text-gym-dark transition-all duration-300 shadow-md hover:shadow-glow"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-3">
              {galleries.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-accent w-8'
                      : 'bg-gym-gray/30 hover:bg-gym-gray/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-accent/10 hover:bg-accent border border-accent/30 hover:border-accent rounded-full text-accent hover:text-gym-dark transition-all duration-300 shadow-md hover:shadow-glow"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-gym-gray text-sm"
          >
            Viewing <span className="text-accent font-bold">{activeIndex + 1}</span> -{' '}
            <span className="text-accent font-bold">{activeIndex + 3}</span> of{' '}
            <span className="text-accent font-bold">{galleries.length}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GalleryShowcase;
