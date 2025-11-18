import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Dashboard/Sidebar';
import DashboardHome from '@/components/Dashboard/DashboardHome';
import DailyActivities from '@/components/Dashboard/DailyActivities';
import HealthMonitor from '@/components/Dashboard/HealthMonitor';
import DailyDiet from '@/components/Dashboard/DailyDiet';
import Settings from '@/components/Dashboard/Settings';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

type ActiveTab = 'home' | 'activities' | 'health' | 'diet' | 'settings';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    try {
      return window.innerWidth >= 1024; // open on large screens by default
    } catch (e) {
      return true;
    }
  });
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('elitefit-user');
    if (!stored) {
      navigate('/auth');
      return;
    }
    setUserData(JSON.parse(stored));

    // responsive behavior: close sidebar on small screens
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);
    // ensure initial state respected
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  if (!userData) return null;

  return (
    <div className="flex h-screen bg-gym-dark overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userData={userData} setUserData={setUserData} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gym-darker to-black border-b border-gym-dark/30 px-8 py-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-gym-light">
                {activeTab === 'home' && 'Welcome to Your Dashboard'}
                {activeTab === 'activities' && 'Daily Activities'}
                {activeTab === 'health' && 'Health Monitor'}
                {activeTab === 'diet' && 'Daily Diet Plan'}
              </h1>
              <p className="text-gym-gray text-sm mt-1">Track your fitness journey with EliteFit</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gym-dark/50 rounded-lg transition"
            >
              <svg className="w-6 h-6 text-gym-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Helmet>
              <title>{userData?.fullName ? `${userData.fullName} — Dashboard` : 'Your Dashboard — EliteFit'}</title>
              <meta name="description" content="Your EliteFit dashboard — track activities, health metrics, and meals." />
              <link rel="canonical" href="https://www.elitefit.example/dashboard" />
            </Helmet>
            {activeTab === 'home' && <DashboardHome userData={userData} />}
            {activeTab === 'activities' && <DailyActivities />}
            {activeTab === 'health' && <HealthMonitor />}
            {activeTab === 'diet' && <DailyDiet />}
            {activeTab === 'settings' && <Settings userData={userData} setUserData={setUserData} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
