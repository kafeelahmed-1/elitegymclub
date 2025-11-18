import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Calendar, Star, Mail, Phone } from 'lucide-react';
import { trainers } from '@/components/Trainers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const TrainerDetail = () => {
  const { id } = useParams();
  const trainer = trainers.find((t) => t.id === id);

  if (!trainer) {
    return (
      <div className="min-h-screen bg-gym-darker flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-gym-light mb-4">
            Trainer Not Found
          </h1>
          <Link to="/">
            <Button className="bg-accent hover:bg-accent/90">
              <ArrowLeft className="mr-2" size={20} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gym-darker">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gym-darker via-gym-darker/80 to-gym-darker/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="inline-flex items-center text-accent hover:text-accent/80 mb-6 transition-colors ">
              <ArrowLeft className="mr-4" size={20} />
              Back to Trainers
            </Link>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-semibold ml-5">
                {trainer.role}
              </span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-gym-light mb-4">
              {trainer.name}
            </h1>
            <p className="text-xl text-gym-gray max-w-2xl">
              {trainer.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-gradient-to-b from-gym-darker to-gym-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gym-dark/50 backdrop-blur-sm border border-gym-gray/20 rounded-2xl p-8"
              >
                <h2 className="text-3xl font-heading font-bold text-gym-light mb-6">
                  About <span className="text-accent">{trainer.name.split(' ')[0]}</span>
                </h2>
                <p className="text-gym-gray text-lg leading-relaxed">
                  {trainer.fullBio}
                </p>
              </motion.div>

              {/* Specialties */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gym-dark/50 backdrop-blur-sm border border-gym-gray/20 rounded-2xl p-8"
              >
                <h2 className="text-3xl font-heading font-bold text-gym-light mb-6">
                  <Star className="inline mr-2 text-accent" size={28} />
                  Specialties
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {trainer.specialties?.map((specialty, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 bg-accent/5 border border-accent/20 rounded-xl p-4 hover:bg-accent/10 transition-colors"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-gym-light font-medium">{specialty}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gym-dark/50 backdrop-blur-sm border border-gym-gray/20 rounded-2xl p-8"
              >
                <h2 className="text-3xl font-heading font-bold text-gym-light mb-6">
                  <Award className="inline mr-2 text-accent" size={28} />
                  Certifications & Credentials
                </h2>
                <div className="space-y-3">
                  {trainer.certifications?.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-gym-gray"
                    >
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <span className="text-accent font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-lg">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gym-dark/50 backdrop-blur-sm border border-gym-gray/20 rounded-2xl p-6 sticky top-24"
              >
                <h3 className="text-xl font-heading font-bold text-gym-light mb-6">
                  Quick Info
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gym-gray">
                    <Calendar size={20} className="text-accent" />
                    <div>
                      <div className="text-xs text-gym-gray/70">Experience</div>
                      <div className="text-gym-light font-semibold">{trainer.experience}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gym-gray">
                    <Award size={20} className="text-accent" />
                    <div>
                      <div className="text-xs text-gym-gray/70">Certifications</div>
                      <div className="text-gym-light font-semibold">{trainer.certifications?.length}+ Credentials</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-gym-dark font-bold">
                    <Mail className="mr-2" size={18} />
                    Book a Session
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-gym-light text-gym-dark hover:bg-gym-light hover:text-gym-dark">
                    <Phone className="mr-2" size={18} />
                    Contact
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrainerDetail;
