import { motion, useInView } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });
  const [counts, setCounts] = useState({ members: 0, trainers: 0 });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const memberTarget = 10000;
    const trainerTarget = 50;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts({
        members: Math.floor(memberTarget * progress),
        trainers: Math.floor(trainerTarget * progress),
      });
      
      if (currentStep >= steps) {
        setCounts({ members: memberTarget, trainers: trainerTarget });
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
      role="banner"
      aria-label="Hero section"
    >



      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-9">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center max-w-2xl"
          >
          

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-gym-light leading-tight">
              Unleash Your{' '}
              <span className="text-gradient">Inner Champion</span>
            </h1>

            <p className="text-xl text-white max-w-xl">
              Experience world-class training facilities, expert coaching, and a community that pushes you to achieve the impossible. Your transformation starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center content-center ">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-gym-dark font-bold px-8 py-6 text-lg group shadow-glow"
              >
                Start Free Trial
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              
            </div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-1 pt-12 w-full justify-center"
            >
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent">
                  {counts.members > 0 ? `${Math.floor(counts.members / 1000)}K+` : '0'}
                </div>
                <div className="text-sm text-gym-gray mt-1">Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent">
                  {counts.trainers}+
                </div>
                <div className="text-sm text-gym-gray mt-1">Trainers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent">
                  24/7
                </div>
                <div className="text-sm text-gym-gray mt-1">Access</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;