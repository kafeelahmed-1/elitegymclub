import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Ayesha Khan',
    role: 'Professional Athlete',
    photo: 'https://images.unsplash.com/photo-1689007662824-434fb2f0ccee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3ltJTIwZ2lybHN8ZW58MHx8MHx8fDA%3D',
    quote: 'EliteFit changed my life — the trainers are top-notch and the equipment is world class. I feel stronger every day.',
  },
  {
    id: 2,
    name: 'Omar Malik',
    role: 'Entrepreneur',
    photo: 'https://images.unsplash.com/photo-1703837543381-5545225438a7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: 'The community here keeps me motivated. The environment is clean, modern, and the classes are fantastic.',
  },
  {
    id: 3,
    name: 'Sara Ahmed',
    role: 'Fitness Enthusiast',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=640',
    quote: 'I tried many gyms, but EliteFit feels like home. The personalised attention helped me reach my goals.',
  },
  {
    id: 4,
    name: 'Ali Raza',
    role: 'Coach',
    photo: 'https://images.unsplash.com/photo-1584952449254-80c846de339d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: 'Facility quality and trainer expertise are unmatched. Members see real results, consistently.',
  }
];

const ClientVoices = () => {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      id="client-voices"
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(2,6,23,0.7), rgba(2,6,23,0.7)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600')`,
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-semibold">What Our Clients Think</span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-heading font-black text-gym-light">Hear From Our <span className="text-gradient">Members</span></h2>
          <p className="mt-4 text-gym-gray max-w-2xl mx-auto">Real stories from real members — their success, experience and love for EliteFit.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              onClick={() => setSelected(t.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-gym-darker/60 via-transparent to-transparent border border-gym-dark/30 p-6 flex flex-col justify-between min-h-[260px]"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent/20">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-heading font-bold text-gym-light">{t.name}</h3>
                    <span className="text-gym-gray text-sm">• {t.role}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-accent">
                    <Star size={16} />
                    <Star size={16} />
                    <Star size={16} />
                    <Star size={16} />
                    <Star size={16} />
                  </div>
                </div>
              </div>

              <p className="mt-6 text-gym-gray line-clamp-3">“{t.quote}”</p>

              <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-3xl w-full bg-gym-darker rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gym-dark/60 hover:bg-gym-dark text-gym-light"
            >
              <User />
            </button>

            <div className="p-8 grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 rounded-lg overflow-hidden">
                <img src={testimonials.find(t => t.id === selected)?.photo} alt="client" className="w-full h-full object-cover max-h-72" />
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-heading font-bold text-gym-light mb-2">{testimonials.find(t => t.id === selected)?.name}</h3>
                <div className="text-accent font-semibold mb-4">{testimonials.find(t => t.id === selected)?.role}</div>
                <p className="text-gym-gray">{testimonials.find(t => t.id === selected)?.quote}</p>

                <div className="mt-6 flex gap-3">
                  <button className="px-4 py-2 bg-accent text-gym-dark rounded-lg">Contact</button>
                  <button className="px-4 py-2 border border-gym-dark rounded-lg text-gym-light">View Profile</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ClientVoices;
