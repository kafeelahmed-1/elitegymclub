import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { memo } from 'react';

export const trainers = [
  {
    id: 'marcus-johnson',
    name: 'Arsalan Akram',
    role: 'Strength Coach',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGd5bXxlbnwwfHwwfHx8MA%3D%3D',
    bio: 'Former Olympic athlete with 15+ years of coaching experience',
    fullBio: 'Marcus is a former Olympic weightlifter who represented the USA in two consecutive Olympic Games. With over 15 years of coaching experience, he has trained professional athletes, bodybuilders, and everyday fitness enthusiasts. His approach combines scientific training principles with real-world experience to deliver outstanding results.',
    specialties: ['Olympic Weightlifting', 'Powerlifting', 'Athletic Performance', 'Strength Training'],
    certifications: ['USAW Level 3', 'CSCS', 'USA Weightlifting Coach'],
    experience: '15+ years',
  },
  {
    id: 'sarah-mitchell',
    name: 'Sarah Khan',
    role: 'Yoga & Wellness',
    image: 'https://media.istockphoto.com/id/2128048740/photo/gym-sport-fitness-exercise-health-healthy-woman-treadmill-training-running-equipment-fit.webp?a=1&b=1&s=612x612&w=0&k=20&c=ypPkw-HsfgwaTW-Iy5bPGCrvuBN8CrdDJ_FMbZ8TifE=',
    bio: 'Certified yoga instructor specializing in mindfulness and recovery',
    fullBio: 'Sarah brings a holistic approach to fitness with her extensive background in yoga, meditation, and wellness coaching. She has trained in India and completed over 1000 hours of yoga teacher training. Her classes focus on the mind-body connection, helping members achieve balance, flexibility, and inner peace.',
    specialties: ['Vinyasa Yoga', 'Meditation', 'Recovery & Mobility', 'Stress Management'],
    certifications: ['E-RYT 500', 'Yoga Therapy Certification', 'Mindfulness Coach'],
    experience: '12+ years',
  },
  {
    id: 'david-chen',
    name: 'Asad Roy',
    role: 'HIIT Specialist',
    image: 'https://images.unsplash.com/photo-1584952449254-80c846de339d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'High-intensity training expert focused on explosive results',
    fullBio: 'David specializes in high-intensity interval training and metabolic conditioning. A former CrossFit Games athlete, he brings competitive energy and expert programming to every session. His training methods are designed to maximize fat loss, build lean muscle, and improve cardiovascular endurance in minimal time.',
    specialties: ['HIIT', 'CrossFit', 'Metabolic Conditioning', 'Functional Fitness'],
    certifications: ['CF-L3', 'NASM-CPT', 'Precision Nutrition L1'],
    experience: '10+ years',
  },
  {
    id: 'emily-rodriguez',
    name: 'Emily Rose',
    role: 'Nutrition Coach',
    image: 'https://media.istockphoto.com/id/2208288816/photo/female-kickboxer-shadowboxing-with-dumbbells.webp?a=1&b=1&s=612x612&w=0&k=20&c=VT5Whezz9RHRZMKrKdrg10ORneKdafagAQ82lRZ9XKE=',
    bio: 'Licensed dietitian helping members fuel their transformation',
    fullBio: 'Emily is a registered dietitian with a passion for sports nutrition and body composition. She has worked with professional athletes, bodybuilders, and individuals looking to transform their health through proper nutrition. Her evidence-based approach makes nutrition simple and sustainable for long-term success.',
    specialties: ['Sports Nutrition', 'Body Composition', 'Meal Planning', 'Supplement Guidance'],
    certifications: ['RD', 'CSSD', 'Precision Nutrition L2'],
    experience: '8+ years',
  },
];

const Trainers = memo(() => {

  return (
    <section id="trainers" className="py-24 bg-gradient-to-b from-gym-dark to-gym-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gym-light mb-4">
            Meet Our <span className="text-gradient">Elite Trainers</span>
          </h2>
          <p className="text-xl text-gym-gray max-w-2xl mx-auto">
            World-class professionals dedicated to your success
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to={`/trainer/${trainer.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl shadow-hard cursor-pointer">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  width={600}
                  height={320}
                  loading="lazy"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-darker via-gym-darker/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-heading font-bold text-gym-light mb-1">
                    {trainer.name}
                  </h3>
                  <p className="text-accent font-semibold mb-3">{trainer.role}</p>
                  <p className="text-gym-gray text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {trainer.bio}
                  </p>
                  
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href="#"
                      className="w-10 h-10 bg-accent/10 hover:bg-accent rounded-full flex items-center justify-center text-gym-light hover:text-gym-dark transition-colors"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-accent/10 hover:bg-accent rounded-full flex items-center justify-center text-gym-light hover:text-gym-dark transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Trainers.displayName = 'Trainers';
export default Trainers;