import { Dumbbell, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    services: [
      { name: 'Personal Training', href: '#' },
      { name: 'Group Classes', href: '#' },
      { name: 'Nutrition', href: '#' },
      { name: 'Online Coaching', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gym-darker to-black border-t border-accent/20 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />
      
      {/* Main gradient overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-full mx-auto">
          {/* Top Section with Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-16 pb-16 border-b border-gym-dark/50"
          >
            <div className="text-center md:text-left flex flex-col items-center md:items-start gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Zap className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-gym-light font-bold mb-1">Peak Performance</h3>
                <p className="text-gym-gray text-sm">Achieve your fitness goals with our expert guidance</p>
              </div>
            </div>
            <div className="text-center flex flex-col items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Heart className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-gym-light font-bold mb-1">Community First</h3>
                <p className="text-gym-gray text-sm">Join thousands of fitness enthusiasts worldwide</p>
              </div>
            </div>
            <div className="text-center md:text-right flex flex-col items-center md:items-end gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Dumbbell className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-gym-light font-bold mb-1">24/7 Access</h3>
                <p className="text-gym-gray text-sm">Your fitness journey never stops</p>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative"
            >
              <Link to="/" className="flex items-center space-x-2 mb-6 group">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="text-accent"
                >
                  <Dumbbell size={40} />
                </motion.div>
                <span className="text-3xl font-heading font-bold text-gym-light group-hover:text-accent transition-colors">
                  ELITE<span className="text-accent">FIT</span>
                </span>
              </Link>

              <p className="text-gym-gray mb-8 max-w-sm leading-relaxed">
                Transform your body and mind with world-class facilities, expert trainers, and a supportive community dedicated to your success.
              </p>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gym-gray hover:text-accent transition-colors cursor-pointer"
                >
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <span>info@elitefit.com</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gym-gray hover:text-accent transition-colors cursor-pointer"
                >
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Phone size={18} className="text-accent" />
                  </div>
                  <span>+92 3121588390</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gym-gray hover:text-accent transition-colors cursor-pointer"
                >
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <MapPin size={18} className="text-accent" />
                  </div>
                  <span>F10 Markaz, Islamabad</span>
                </motion.div>
              </div>

              {/* Social Icons - Under Address */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.25, rotate: 10 }}
                      className="w-11 h-11 bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent hover:to-accent/80 text-gym-gray hover:text-gym-dark rounded-full flex items-center justify-center transition-all duration-300 border border-accent/30 hover:border-accent shadow-md hover:shadow-glow"
                      aria-label={social.name}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>  
            

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-gym-light font-heading font-bold text-lg mb-6 capitalize flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent rounded-full" />
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="text-gym-gray hover:text-accent transition-all relative group flex items-center gap-2"
                        >
                          <span className="w-0 h-0.5 bg-accent group-hover:w-2 transition-all duration-300" />
                          {link.name}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-gym-gray hover:text-accent transition-all relative group flex items-center gap-2"
                        >
                          <span className="w-0 h-0.5 bg-accent group-hover:w-2 transition-all duration-300" />
                          {link.name}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
             

      

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-center items-center gap-6 pt-8 border-t border-gym-dark/50"
          >
            <p className="text-gym-gray text-sm justify-center items-center ">
              © 2024 EliteFit. All rights reserved. 
            </p>
           
          </motion.div>
        </div>
      </div> 
    </footer>
  );
};

export default Footer;