import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Dumbbell, Eye, EyeOff, Zap, Users, Award } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 1500);
    }
  };

  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Access your workouts instantly' },
    { icon: Users, title: 'Community', desc: 'Connect with 10K+ members' },
    { icon: Award, title: 'Track Progress', desc: 'Monitor your fitness goals' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gym-darker via-black to-gym-darker flex items-center justify-center px-4">
      {/* Background elements */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="fixed -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="fixed -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center md:text-left mb-8">
              <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="text-accent"
                >
                  <Dumbbell size={32} />
                </motion.div>
                <span className="text-2xl font-heading font-bold text-gym-light group-hover:text-accent transition-colors">
                  ELITE<span className="text-accent">FIT</span>
                </span>
              </Link>
              <h1 className="text-4xl font-heading font-black text-gym-light mb-2">Welcome Back</h1>
              <p className="text-gym-gray">Sign in to your EliteFit account and continue your fitness journey</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="text-gym-light text-sm font-semibold mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={18} />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 bg-gym-dark/50 border-gym-dark/20 focus:border-accent text-gym-light placeholder:text-gym-gray/50"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gym-light text-sm font-semibold">Password</label>
                  <Link to="#" className="text-accent text-xs hover:text-accent/80 font-semibold">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={18} />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-12 pr-12 bg-gym-dark/50 border-gym-dark/20 focus:border-accent text-gym-light placeholder:text-gym-gray/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-accent/50 hover:text-accent"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </motion.div>

              {/* Remember Me */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                <input type="checkbox" id="remember" className="w-4 h-4 accent-accent rounded" />
                <label htmlFor="remember" className="text-gym-gray text-sm ml-2">
                  Remember me for 30 days
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-accent to-accent/90 hover:shadow-glow text-gym-dark font-bold py-3 text-base"
                >
                  {loading ? 'Signing In...' : 'Sign In Now'}
                </Button>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative my-6"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gym-dark/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-gym-darker via-black to-gym-darker text-gym-gray text-xs">Or continue with</span>
                </div>
              </motion.div>

              {/* Social Login */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="grid grid-cols-2 gap-3"
              >
                <button type="button" className="py-2.5 px-4 border border-gym-dark/30 hover:border-accent rounded-lg text-gym-light text-sm font-semibold transition-all hover:bg-gym-dark/20">
                  Google
                </button>
                <button type="button" className="py-2.5 px-4 border border-gym-dark/30 hover:border-accent rounded-lg text-gym-light text-sm font-semibold transition-all hover:bg-gym-dark/20">
                  Facebook
                </button>
              </motion.div>
            </form>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
            >
              <p className="text-gym-gray text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-accent hover:text-accent/80 font-semibold">
                  Sign Up Now
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-heading font-black text-gym-light mb-2">
                  Why Join <span className="text-gradient">EliteFit?</span>
                </h2>
                <p className="text-gym-gray">Everything you need for your fitness success</p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 hover:border-accent/50 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                          <Icon className="text-accent" size={24} />
                        </div>
                        <div>
                          <h3 className="text-gym-light font-bold mb-1">{feature.title}</h3>
                          <p className="text-gym-gray text-sm">{feature.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gym-dark/30"
              >
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-accent">10K+</div>
                  <div className="text-xs text-gym-gray mt-1">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-accent">50+</div>
                  <div className="text-xs text-gym-gray mt-1">Expert Trainers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-accent">24/7</div>
                  <div className="text-xs text-gym-gray mt-1">Facility Access</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
