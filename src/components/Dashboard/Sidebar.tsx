import { motion } from 'framer-motion';
import { LogOut, Home, Activity, Heart, Apple, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { memo, useCallback } from 'react';

const MENU_ITEMS = [
  { id: 'home', label: 'Dashboard', icon: Home },
  { id: 'activities', label: 'Daily Activities', icon: Activity },
  { id: 'health', label: 'Health Monitor', icon: Heart },
  { id: 'diet', label: 'Daily Diet', icon: Apple },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  activeTab: 'home' | 'activities' | 'health' | 'diet' | 'settings';
  setActiveTab: (tab: 'home' | 'activities' | 'health' | 'diet' | 'settings') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userData: any;
  setUserData?: (user: any) => void;
}

const Sidebar = memo(({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, userData }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('elitefit-user');
    navigate('/auth');
  }, [navigate]);

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-72 bg-gradient-to-b from-gym-darker via-black to-gym-dark border-r border-gym-dark/30 fixed lg:relative z-40 h-full overflow-y-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 border-b border-gym-dark/30"
        >
          <div className="flex items-center gap-3 group cursor-pointer">
            <motion.div
              whileHover={{ rotate: 180 }}
              className="p-2 bg-gradient-to-r from-accent to-accent/70 rounded-lg"
            >
              <Dumbbell size={24} className="text-gym-dark" />
            </motion.div>
            <div>
              <h1 className="text-xl font-heading font-bold text-gym-light group-hover:text-accent transition">
                ELITE<span className="text-accent">FIT</span>
              </h1>
              <p className="text-xs text-gym-gray">Dashboard</p>
            </div>
          </div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-6 bg-gym-dark/30 border-b border-gym-dark/30 mx-4 mt-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-accent/70 flex items-center justify-center">
              <User size={24} className="text-gym-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gym-light truncate">{userData?.fullName || 'User'}</p>
              <p className="text-xs text-gym-gray truncate">{userData?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gym-dark/50 rounded-lg p-2">
              <p className="text-xs text-gym-gray">Streak</p>
              <p className="text-sm font-bold text-accent">12 days</p>
            </div>
            <div className="bg-gym-dark/50 rounded-lg p-2">
              <p className="text-xs text-gym-gray">Workouts</p>
              <p className="text-sm font-bold text-accent">28</p>
            </div>
            <div className="bg-gym-dark/50 rounded-lg p-2">
              <p className="text-xs text-gym-gray">Level</p>
              <p className="text-sm font-bold text-accent">Pro</p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <nav className="p-6 space-y-3">
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => {
                  setActiveTab(item.id as any);
                  // auto-close on small screens
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-accent to-accent/70 text-gym-dark shadow-lg shadow-accent/30'
                    : 'text-gym-gray hover:text-gym-light hover:bg-gym-dark/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMenu"
                    className="absolute inset-0 bg-gradient-to-r from-accent to-accent/70 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className="relative z-10" />
                <span className="relative z-10 font-semibold text-sm">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-6 border-t border-gym-dark/30"
        >
          <h3 className="text-xs font-bold text-gym-gray uppercase mb-4">This Week</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gym-gray">Workouts</span>
                <span className="text-xs font-bold text-accent">5/7</span>
              </div>
              <div className="w-full h-2 bg-gym-dark/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '71%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-accent to-accent/70"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gym-gray">Calories</span>
                <span className="text-xs font-bold text-green-400">1850/2000</span>
              </div>
              <div className="w-full h-2 bg-gym-dark/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '92.5%' }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="h-full bg-gradient-to-r from-green-400 to-green-500"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gym-gray">Water Intake</span>
                <span className="text-xs font-bold text-blue-400">2.5L/3L</span>
              </div>
              <div className="w-full h-2 bg-gym-dark/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '83%' }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6 border-t border-gym-dark/30"
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/30 text-white font-bold py-3 rounded-xl transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </motion.div>
      </motion.aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
        />
      )}
    </>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
