import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, X, Zap, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useGymStore } from '@/store/useGymStore';
import { useToast } from '@/hooks/use-toast';
import { useState, useCallback, memo, useMemo } from 'react';

const PLANS = [
  {
    name: 'Basic',
    price: 29,
    period: 'month',
    description: 'Perfect for getting started',
    features: [
      'Access to gym floor',
      'Basic equipment',
      'Locker room access',
      'Mobile app access',
      'Community events',
    ],
    popular: false,
    icon: Users,
    background: 'linear-gradient(135deg, rgba(255, 0, 102, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%)',
    bgImage: 'url("https://images.unsplash.com/photo-1577096120029-c67413cf970b?auto=format&fit=crop&q=80&w=800")',
  },
  {
    name: 'Pro',
    price: 59,
    period: 'month',
    description: 'Most popular choice',
    features: [
      'Everything in Basic',
      '24/7 facility access',
      'Group fitness classes',
      'Personal training session',
      'Nutrition consultation',
      'Guest passes (2/month)',
    ],
    popular: true,
    icon: Zap,
    background: 'linear-gradient(135deg, rgba(255, 0, 102, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)',
    bgImage: 'url("https://images.unsplash.com/photo-1549576528-96b456c0ffa7?auto=format&fit=crop&q=80&w=800")',
  },
  {
    name: 'Elite',
    price: 99,
    period: 'month',
    description: 'Ultimate fitness experience',
    features: [
      'Everything in Pro',
      'Unlimited personal training',
      'Premium locker',
      'Spa & sauna access',
      'Priority class booking',
      'Unlimited guest passes',
      'Custom meal plans',
    ],
    popular: false,
    icon: Shield,
    background: 'linear-gradient(135deg, rgba(255, 0, 102, 0.15) 0%, rgba(0, 0, 0, 0.5) 100%)',
    bgImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800")',
  },
];

const MembershipPlans = memo(() => {
  const [selectedPlanModal, setSelectedPlanModal] = useState<typeof PLANS[0] | null>(null);
  const { user, selectPlan } = useGymStore();
  const { toast } = useToast();

  const handleSelectPlan = useCallback((plan: typeof PLANS[0]) => {
    setSelectedPlanModal(plan);
  }, []);

  const handleConfirmPlan = useCallback((plan: typeof PLANS[0]) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to select a membership plan.',
        variant: 'destructive',
      });
      return;
    }

    selectPlan(plan.name);
    setSelectedPlanModal(null);

    // Redirect to payment page
    window.location.href = '/payment';
  }, [user, selectPlan, toast]);

  return (
    <section id="membership" className="py-24 bg-gym-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gym-light mb-4">
            Choose Your <span className="text-gradient">Membership</span>
          </h2>
          <p className="text-xl text-gym-gray max-w-2xl mx-auto">
            Flexible plans designed to fit your lifestyle and goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan, index) => {
            const PlanIcon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-accent text-gym-dark px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star size={14} fill="currentColor" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div
                  className={`bg-gym-darker/50 backdrop-blur-sm border rounded-3xl p-8 h-full transition-all duration-300 ${
                    plan.popular
                      ? 'border-accent shadow-glow'
                      : 'border-gym-gray/20 hover:border-accent/50'
                  }`}
                >
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <PlanIcon className="text-accent" size={32} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gym-light mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gym-gray text-sm mb-6">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-heading font-black text-gym-light">
                        ${plan.price}
                      </span>
                      <span className="text-gym-gray">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="text-accent flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gym-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    size="lg"
                    className={`w-full font-bold ${
                      plan.popular
                        ? 'bg-accent hover:bg-accent/90 text-gym-dark'
                        : 'bg-gym-light hover:bg-gym-light/90 text-gym-dark'
                    }`}
                  >
                    Select {plan.name}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <AnimatePresence>
        {selectedPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={() => setSelectedPlanModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: selectedPlanModal.bgImage,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: selectedPlanModal.background }}
              />

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPlanModal(null)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
                >
                  <X size={24} className="text-white" />
                </button>

                {/* Header */}
                <div className="mb-8 pt-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="p-4 bg-accent/20 rounded-lg border border-accent/50">
                      {(() => {
                        const IconComponent = selectedPlanModal.icon;
                        return <IconComponent className="text-accent" size={40} />;
                      })()}
                    </div>
                  </motion.div>
                  <h2 className="text-4xl font-heading font-black text-white text-center mb-2">
                    {selectedPlanModal.name} Plan
                  </h2>
                  <p className="text-white/80 text-center text-sm">{selectedPlanModal.description}</p>
                </div>

                {/* Price Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10"
                >
                  <p className="text-white/70 text-sm mb-2">Monthly Payment</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-heading font-black text-white">
                      ${selectedPlanModal.price}
                    </span>
                    <span className="text-white/70">/{selectedPlanModal.period}</span>
                  </div>
                </motion.div>

                {/* Features Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8 flex-1"
                >
                  <p className="text-white/70 text-sm font-semibold mb-3">What's Included:</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedPlanModal.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={() => handleConfirmPlan(selectedPlanModal)}
                    className="w-full bg-accent hover:bg-accent/90 text-gym-dark font-bold py-3 text-base"
                  >
                    Proceed to Payment
                  </Button>
                  <button
                    onClick={() => setSelectedPlanModal(null)}
                    className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
                  >
                    Cancel
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

MembershipPlans.displayName = 'MembershipPlans';
export default MembershipPlans;