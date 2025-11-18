import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PaymentFailure = () => {
  return (
    <div className="min-h-screen bg-gym-darker flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-gym-dark/50 backdrop-blur-sm border border-destructive/20 rounded-3xl p-12 text-center shadow-hard"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <XCircle className="text-destructive" size={64} />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gym-light mb-4">
          Payment Failed
        </h1>
        
        <p className="text-xl text-gym-gray mb-8 max-w-lg mx-auto">
          We couldn't process your payment. Don't worry, no charges have been made to your account.
        </p>

        <div className="bg-gym-darker/50 border border-gym-gray/20 rounded-2xl p-6 mb-8">
          <h2 className="text-gym-light font-heading font-bold text-lg mb-4">
            Common Issues
          </h2>
          <ul className="space-y-3 text-left text-gym-gray">
            <li className="flex items-start gap-3">
              <span className="text-accent">•</span>
              <span>Insufficient funds or incorrect card details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent">•</span>
              <span>Card expired or blocked for online transactions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent">•</span>
              <span>Billing address doesn't match card information</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-gym-dark font-bold group"
            >
              <RefreshCw className="mr-2 group-hover:rotate-180 transition-transform" />
              Try Again
            </Button>
          </Link>
          <Link to="/">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gym-light text-gym-light hover:bg-gym-light hover:text-gym-dark font-semibold group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-2 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gym-gray mt-8">
          Need help? Contact our support team at{' '}
          <a href="mailto:support@elitefit.com" className="text-accent hover:underline">
            support@elitefit.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentFailure;