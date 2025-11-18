import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { useGymStore } from '@/store/useGymStore';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Membership', href: '#membership' },
];

const Navbar = memo(() => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isMenuOpen, toggleMenu, closeMenu } = useGymStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('elitefit-user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('elitefit-user');
    setIsLoggedIn(false);
    closeMenu();
    navigate('/');
  }, [closeMenu, navigate]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gym-darker/80 backdrop-blur-xl shadow-lg border border-accent/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 rounded-b-2xl">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="text-accent"
            >
              <Dumbbell size={32} />
            </motion.div>
            <span className="text-2xl font-heading font-bold text-gym-light">
              ELITE<span className="text-accent">FIT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gym-light hover:text-accent transition-colors duration-300 font-medium"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4"
            >
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-glow text-white font-bold px-6 py-3 text-base group transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:shadow-glow text-white font-bold px-6 py-3 rounded-lg text-base transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-accent to-accent/90 hover:shadow-glow text-gym-dark font-bold px-8 py-3 text-base group transition-all duration-300 hover:scale-105"
                  >
                    Join Now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gym-light p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gym-darker/98 backdrop-blur-lg border-t border-gym-dark"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="block text-gym-light hover:text-accent transition-colors duration-300 text-lg font-medium py-2"
                  whileHover={{ x: 10 }}
                >
                  {link.name}
                </motion.a>
              ))}
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={closeMenu} className="block w-full">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-glow text-white font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:shadow-glow text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={closeMenu} className="block w-full">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-accent to-accent/90 hover:shadow-glow text-gym-dark font-bold transition-all duration-300 hover:scale-105"
                  >
                    Join Now →
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;