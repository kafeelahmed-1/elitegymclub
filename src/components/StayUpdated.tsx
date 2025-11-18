import { motion } from 'framer-motion';
import { Mail, ArrowRight, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

const StayUpdated = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section 
      id="stay-updated"
      className="relative py-16 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(255, 0, 102, 0.15)), url('https://images.unsplash.com/photo-1577096120029-c67413cf970b?auto=format&fit=crop&q=80&w=1400')`,
      }}
    >
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-20 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="p-4 bg-accent/20 rounded-full border border-accent/30">
              <Bell size={40} className="text-accent" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-gym-light leading-tight"
          >
            Stay <span className="text-gradient">Updated</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-white max-w-2xl mx-auto"
          >
            Get the latest fitness tips, workout routines, nutrition advice, and exclusive offers delivered straight to your inbox. Be the first to know about our new classes and events!
          </motion.p>

          {/* Email Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mt-6"
          >
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gym-dark/80 backdrop-blur-lg border border-accent/30 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
              <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent/50" size={20} />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-accent hover:bg-accent/90 text-gym-dark font-bold px-8 py-6 text-lg group shadow-glow whitespace-nowrap"
            >
              {isSubmitted ? 'Subscribed! ✓' : 'Subscribe'}
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </Button>
          </motion.form>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-4 p-4 bg-accent/20 border border-accent/50 rounded-lg text-white font-semibold"
            >
              🎉 Thanks for subscribing! Check your email for a special welcome offer.
            </motion.div>
          )}

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-white"
          >
            <div className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>No spam, unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>Join 10K+ active members</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>Exclusive deals & content</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StayUpdated;
