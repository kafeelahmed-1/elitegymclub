import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Dumbbell, Users, Clock, Trophy, Target, Heart } from 'lucide-react';
import { useState, memo, useCallback } from 'react';

const FeatureCard = memo(({ feature, index }: { feature: { icon: JSX.Element; title: string; description: string }; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      viewport={{ once: true }}
      style={{
        rotateX: isHovered ? rotateX : '0deg',
        rotateY: isHovered ? rotateY : '0deg',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <motion.div
        className="relative bg-gym-dark/50 backdrop-blur-sm border border-gym-gray/20 rounded-2xl p-8 h-full overflow-hidden"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.28 }}
        role="article"
        aria-label={feature.title}
      >
        <div className="relative z-10">
          <div
            className="w-16 h-16 bg-gradient-to-br from-accent to-accent/50 rounded-xl flex items-center justify-center text-gym-dark mb-6 shadow-glow"
            aria-hidden="true"
          >
            {feature.icon}
          </div>
          <h3 className="text-2xl font-heading font-bold text-gym-light mb-4 group-hover:text-accent transition-colors">
            {feature.title}
          </h3>
          <p className="text-gym-gray leading-relaxed">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

const FEATURES = [
  {
    icon: <Dumbbell size={32} aria-hidden={true} />,
    title: 'Premium Equipment',
    description: 'State-of-the-art machines and free weights from leading brands. Everything you need for your perfect workout.',
  },
  {
    icon: <Users size={32} aria-hidden={true} />,
    title: 'Expert Trainers',
    description: 'Certified professionals dedicated to helping you achieve your fitness goals with personalized programs.',
  },
  {
    icon: <Clock size={32} aria-hidden={true} />,
    title: '24/7 Access',
    description: 'Train on your schedule. Our facilities are open around the clock for maximum convenience.',
  },
  {
    icon: <Trophy size={32} aria-hidden={true} />,
    title: 'Group Classes',
    description: 'From yoga to HIIT, join energizing group sessions led by passionate instructors.',
  },
  {
    icon: <Target size={32} aria-hidden={true} />,
    title: 'Goal Tracking',
    description: 'Advanced app integration to monitor your progress and celebrate every milestone achieved.',
  },
  {
    icon: <Heart size={32} aria-hidden={true} />,
    title: 'Wellness Programs',
    description: 'Holistic approach to fitness with nutrition coaching and recovery services.',
  },
];

const Features = memo(() => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gym-darker to-gym-dark relative overflow-hidden" aria-labelledby="features-heading">
      {/* decorative soft shapes */}
      <div className="absolute -right-40 -top-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-accent/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 id="features-heading" className="text-4xl sm:text-5xl font-heading font-bold text-gym-light mb-4">
            Why Choose <span className="text-gradient">EliteFit</span>
          </h2>
          <p className="text-lg text-gym-gray max-w-3xl mx-auto mb-6">
            Everything you need to transform your fitness journey under one roof — premium equipment, expert coaching, flexible access, and holistic wellness.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;