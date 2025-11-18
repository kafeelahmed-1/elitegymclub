import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Dumbbell, Eye, EyeOff, User, Phone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Helmet } from 'react-helmet-async';

const Auth = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    if (!loginData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (loginData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    if (!signupData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!signupData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!signupData.phone.match(/^\d{10}$/)) newErrors.phone = 'Valid 10-digit phone number is required';
    if (signupData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (signupData.password !== signupData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) {
      setLoading(true);
      setTimeout(() => {
        // Save to localStorage
        localStorage.setItem(
          'elitefit-user',
          JSON.stringify({
            email: loginData.email,
            fullName: loginData.email.split('@')[0],
            loginTime: new Date().toISOString(),
          })
        );
        setLoading(false);
        navigate('/dashboard');
      }, 1500);
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignup()) {
      setLoading(true);
      setTimeout(() => {
        // Save to localStorage
        localStorage.setItem(
          'elitefit-user',
          JSON.stringify({
            email: signupData.email,
            fullName: signupData.fullName,
            phone: signupData.phone,
            signupTime: new Date().toISOString(),
          })
        );
        setLoading(false);
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gym-darker via-black to-gym-darker flex items-center justify-center px-4">
      <Helmet>
        <title>Sign In / Sign Up — EliteFit</title>
        <meta name="description" content="Access EliteFit member area — sign in or create an account to track workouts, diet and progress." />
        <link rel="canonical" href="https://www.elitefit.example/auth" />
      </Helmet>
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

      <div className="w-full max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
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
          </div>

          {/* Toggle Tabs */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 mb-8 bg-gym-dark/40 p-1 rounded-lg border border-gym-dark/30"
          >
            <button
              onClick={() => {
                setAuthMode('login');
                setErrors({});
              }}
              className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all relative ${
                authMode === 'login' ? 'text-gym-dark' : 'text-gym-gray hover:text-gym-light'
              }`}
            >
              {authMode === 'login' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 rounded-md"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">Sign In</span>
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setErrors({});
              }}
              className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all relative ${
                authMode === 'signup' ? 'text-gym-dark' : 'text-gym-gray hover:text-gym-light'
              }`}
            >
              {authMode === 'signup' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 rounded-md"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">Create Account</span>
            </button>
          </motion.div>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={authMode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {authMode === 'login' ? (
                <div>
                  <h1 className="text-4xl font-heading font-black text-gym-light mb-2">Welcome Back</h1>
                  <p className="text-gym-gray">Sign in to your EliteFit account and continue your fitness journey</p>
                </div>
              ) : (
                <div>
                  <h1 className="text-4xl font-heading font-black text-gym-light mb-2">Join the Elite</h1>
                  <p className="text-gym-gray">Create your account and start your fitness transformation today</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {authMode === 'login' ? (
              // Login Form
              <motion.form
                key="login"
                onSubmit={handleLoginSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
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
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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

                {/* Sign Up Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <p className="text-gym-gray text-sm">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setErrors({});
                      }}
                      className="text-accent hover:text-accent/80 font-semibold"
                    >
                      Sign Up Now
                    </button>
                  </p>
                </motion.div>
              </motion.form>
            ) : (
              // Signup Form
              <motion.form
                key="signup"
                onSubmit={handleSignupSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="text-gym-light text-sm font-semibold mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={18} />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      className="pl-12 bg-gym-dark/50 border-gym-dark/20 focus:border-accent text-gym-light placeholder:text-gym-gray/50"
                    />
                  </div>
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="text-gym-light text-sm font-semibold mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={18} />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="pl-12 bg-gym-dark/50 border-gym-dark/20 focus:border-accent text-gym-light placeholder:text-gym-gray/50"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="text-gym-light text-sm font-semibold mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={18} />
                    <Input
                      type="tel"
                      placeholder="1234567890"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      className="pl-12 bg-gym-dark/50 border-gym-dark/20 focus:border-accent text-gym-light placeholder:text-gym-gray/50"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="text-gym-light text-sm font-semibold mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={18} />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
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

                {/* Confirm Password */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="text-gym-light text-sm font-semibold mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50" size={18} />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="pl-12 pr-12 bg-gym-dark/50 border-gym-dark/20 focus:border-accent text-gym-light placeholder:text-gym-gray/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-accent/50 hover:text-accent"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-accent to-accent/90 hover:shadow-glow text-gym-dark font-bold py-3 text-base"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative my-6"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gym-dark/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gradient-to-br from-gym-darker via-black to-gym-darker text-gym-gray text-xs">Or continue with</span>
                  </div>
                </motion.div>

                {/* Social Signup */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="grid grid-cols-2 gap-3"
                >
                  <button type="button" className="py-2.5 px-4 border border-gym-dark/30 hover:border-accent rounded-lg text-gym-light text-sm font-semibold transition-all hover:bg-gym-dark/20">
                    Google
                  </button>
                  <button type="button" className="py-2.5 px-4 border border-gym-dark/30 hover:border-accent rounded-lg text-gym-light text-sm font-semibold transition-all hover:bg-gym-dark/20">
                    Facebook
                  </button>
                </motion.div>

                {/* Sign In Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <p className="text-gym-gray text-sm">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setErrors({});
                      }}
                      className="text-accent hover:text-accent/80 font-semibold"
                    >
                      Sign In
                    </button>
                  </p>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
