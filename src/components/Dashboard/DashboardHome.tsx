import { motion } from 'framer-motion';
import { Activity, Flame, Target, TrendingUp, Clock, Award } from 'lucide-react';

interface DashboardHomeProps {
  userData: any;
}

const DashboardHome = ({ userData }: DashboardHomeProps) => {
  const stats = [
    {
      icon: Activity,
      label: 'Steps Today',
      value: '8,432',
      subtitle: 'of 10,000',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-400/10 border-blue-400/30',
    },
    {
      icon: Flame,
      label: 'Calories Burned',
      value: '485',
      subtitle: 'kcal',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-400/10 border-orange-400/30',
    },
    {
      icon: Target,
      label: 'Daily Goal',
      value: '78%',
      subtitle: 'Complete',
      color: 'from-green-400 to-green-500',
      bgColor: 'bg-green-400/10 border-green-400/30',
    },
    {
      icon: Clock,
      label: 'Workout Time',
      value: '45',
      subtitle: 'minutes',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-400/10 border-purple-400/30',
    },
  ];

  const recentActivities = [
    { name: 'Morning Run', time: '6:30 AM', duration: '30 min', calories: 320 },
    { name: 'Gym Session', time: '5:00 PM', duration: '60 min', calories: 520 },
    { name: 'Evening Walk', time: '7:30 PM', duration: '20 min', calories: 120 },
  ];

  const weeklyGoals = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: false },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gym-darker/50 to-black/50 border border-accent/20 rounded-3xl p-8 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gym-light mb-2">
              Welcome back, <span className="text-accent">{userData?.fullName || 'Champion'}</span>! 💪
            </h2>
            <p className="text-gym-gray">You're on a 12-day streak! Keep the momentum going.</p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl"
          >
            🔥
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${stat.bgColor} border rounded-2xl p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-accent/20 transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                  <Icon size={24} className="text-gym-dark" />
                </div>
              </div>
              <p className="text-gym-gray text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gym-light mb-1">{stat.value}</p>
              <p className="text-sm text-gym-gray">{stat.subtitle}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-accent" size={24} />
            <h3 className="text-xl font-bold text-gym-light">Recent Activities</h3>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gym-dark/50 rounded-xl hover:bg-gym-dark/70 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-accent/70 flex items-center justify-center">
                    <Activity size={20} className="text-gym-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-gym-light">{activity.name}</p>
                    <p className="text-sm text-gym-gray">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent">{activity.calories} kcal</p>
                  <p className="text-sm text-gym-gray">{activity.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Goals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-accent" size={24} />
            <h3 className="text-xl font-bold text-gym-light">This Week</h3>
          </div>

          <div className="space-y-3 mb-6">
            {weeklyGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  goal.completed
                    ? 'bg-green-400/20 border border-green-400/30'
                    : 'bg-gym-dark/50 border border-gym-dark/30'
                }`}
              >
                <span className="font-semibold text-gym-light">{goal.day}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.08 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    goal.completed ? 'bg-green-400' : 'bg-gym-dark/50'
                  }`}
                >
                  {goal.completed && <span className="text-gym-dark font-bold">✓</span>}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-accent to-accent/70 rounded-xl p-4 text-center">
            <p className="text-gym-dark font-bold text-sm">5 out of 7 goals completed</p>
            <p className="text-gym-dark text-xs mt-1">Keep it up! 🎯</p>
          </div>
        </motion.div>
      </div>

      {/* Achievement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-3xl p-8 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <Award className="text-purple-400" size={28} />
          <h3 className="text-xl font-bold text-gym-light">Achievements Unlocked</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '🔥', name: '7-Day Streak' },
            { emoji: '💪', name: 'Power User' },
            { emoji: '🎯', name: 'Goal Setter' },
            { emoji: '⭐', name: 'Top Performer' },
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-gym-dark/50 rounded-lg p-4 text-center border border-gym-dark/30 hover:border-accent/30 transition-all"
            >
              <p className="text-3xl mb-2">{achievement.emoji}</p>
              <p className="text-xs font-semibold text-gym-gray">{achievement.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
