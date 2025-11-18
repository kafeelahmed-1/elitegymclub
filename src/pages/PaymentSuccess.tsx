import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gym-darker flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-gym-dark/50 backdrop-blur-sm border border-accent/20 rounded-3xl p-12 text-center shadow-glow"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="text-accent" size={64} />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gym-light mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-xl text-gym-gray mb-8 max-w-lg mx-auto">
          Welcome to EliteFit! Your membership has been activated. Get ready to transform your fitness journey.
        </p>

        <div className="bg-gym-darker/50 border border-gym-gray/20 rounded-2xl p-6 mb-8">
          <h2 className="text-gym-light font-heading font-bold text-lg mb-4">
            What's Next?
          </h2>
          <ul className="space-y-3 text-left text-gym-gray">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">1.</span>
              <span>Check your email for membership details and welcome guide</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">2.</span>
              <span>Download our mobile app to track your progress</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">3.</span>
              <span>Schedule your first training session with our experts</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-gym-dark font-bold group"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <Link to="/">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gym-light text-gym-light hover:bg-gym-light hover:text-gym-dark font-semibold"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;