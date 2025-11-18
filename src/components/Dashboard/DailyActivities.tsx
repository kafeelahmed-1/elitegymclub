import { motion } from 'framer-motion';
import { Dumbbell, Heart, TrendingUp, Zap, Plus, CheckCircle2, Clock } from 'lucide-react';
import { useState, useCallback, useMemo, memo } from 'react';

const DEFAULT_ACTIVITIES = [
  {
    id: 1,
    name: 'Chest Press',
    sets: 4,
    reps: 12,
    weight: 50,
    completed: true,
    time: '08:30 AM',
    duration: '8 min',
    calories: 85,
  },
  {
    id: 2,
    name: 'Squats',
    sets: 3,
    reps: 15,
    weight: 80,
    completed: true,
    time: '08:45 AM',
    duration: '10 min',
    calories: 120,
  },
  {
    id: 3,
    name: 'Deadlifts',
    sets: 3,
    reps: 8,
    weight: 100,
    completed: false,
    time: '09:00 AM',
    duration: '12 min',
    calories: 150,
  },
  {
    id: 4,
    name: 'Pull-ups',
    sets: 4,
    reps: 10,
    weight: 0,
    completed: false,
    time: '09:20 AM',
    duration: '6 min',
    calories: 95,
  },
];

const DailyActivities = memo(() => {
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [addingNew, setAddingNew] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: '',
    sets: 3,
    reps: 10,
    weight: 0,
  });

  const totalCalories = useMemo(() => activities.reduce((acc, act) => acc + act.calories, 0), [activities]);
  const completedActivities = useMemo(() => activities.filter((a) => a.completed).length, [activities]);

  const handleAddActivity = useCallback(() => {
    if (newActivity.name.trim()) {
      setActivities(prev => [
        ...prev,
        {
          id: prev.length + 1,
          ...newActivity,
          completed: false,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
          duration: '0 min',
          calories: 0,
        },
      ]);
      setNewActivity({ name: '', sets: 3, reps: 10, weight: 0 });
      setAddingNew(false);
    }
  }, [newActivity]);

  const toggleActivity = useCallback((id: number) => {
    setActivities(prev => prev.map((act) => (act.id === id ? { ...act, completed: !act.completed } : act)));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-400/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <p className="text-blue-400 text-sm font-semibold mb-2">Total Exercises</p>
          <p className="text-3xl font-bold text-gym-light">{activities.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-400/20 to-green-500/10 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <p className="text-green-400 text-sm font-semibold mb-2">Completed</p>
          <p className="text-3xl font-bold text-gym-light">
            {completedActivities}/{activities.length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-400/20 to-red-500/10 border border-orange-400/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <p className="text-orange-400 text-sm font-semibold mb-2">Total Calories</p>
          <p className="text-3xl font-bold text-gym-light">{totalCalories}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-400/20 to-pink-500/10 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <p className="text-purple-400 text-sm font-semibold mb-2">Progress</p>
          <p className="text-3xl font-bold text-gym-light">{Math.round((completedActivities / activities.length) * 100)}%</p>
        </motion.div>
      </div>

      {/* Activities List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-8 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Dumbbell className="text-accent" size={28} />
            <h3 className="text-2xl font-bold text-gym-light">Today's Exercises</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAddingNew(!addingNew)}
            className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent/70 text-gym-dark px-4 py-2 rounded-lg font-bold transition-all"
          >
            <Plus size={20} />
            Add Exercise
          </motion.button>
        </div>

        {/* Add New Activity Form */}
        {addingNew && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gym-dark/50 rounded-xl p-4 mb-6 border border-accent/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Exercise name..."
                value={newActivity.name}
                onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent outline-none"
              />
              <input
                type="number"
                placeholder="Sets"
                value={newActivity.sets}
                onChange={(e) => setNewActivity({ ...newActivity, sets: parseInt(e.target.value) })}
                className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent outline-none"
              />
              <input
                type="number"
                placeholder="Reps"
                value={newActivity.reps}
                onChange={(e) => setNewActivity({ ...newActivity, reps: parseInt(e.target.value) })}
                className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent outline-none"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={newActivity.weight}
                onChange={(e) => setNewActivity({ ...newActivity, weight: parseInt(e.target.value) })}
                className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent outline-none"
              />
              <button
                onClick={handleAddActivity}
                className="bg-accent text-gym-dark font-bold px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all"
              >
                Add
              </button>
            </div>
          </motion.div>
        )}

        {/* Activities List */}
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-4 p-6 rounded-xl transition-all ${
                activity.completed
                  ? 'bg-green-400/10 border border-green-400/30'
                  : 'bg-gym-dark/50 border border-gym-dark/30 hover:border-accent/30'
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleActivity(activity.id)}
                className="flex-shrink-0"
              >
                {activity.completed ? (
                  <CheckCircle2 className="text-green-400" size={28} />
                ) : (
                  <div className="w-7 h-7 rounded-full border-2 border-gym-gray/50 hover:border-accent" />
                )}
              </motion.button>

              <div className="flex-1">
                <p className={`font-bold text-lg ${activity.completed ? 'text-gym-gray line-through' : 'text-gym-light'}`}>
                  {activity.name}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gym-gray">
                  <span className="flex items-center gap-1">
                    <Dumbbell size={14} />
                    {activity.sets} × {activity.reps} {activity.weight > 0 ? `@ ${activity.weight}kg` : ''}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {activity.time} - {activity.duration}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <div className="flex items-center gap-2 text-orange-400 font-bold">
                  <Zap size={18} />
                  {activity.calories} kcal
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-8 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-gym-light mb-6 flex items-center gap-3">
          <TrendingUp className="text-accent" size={24} />
          This Week's Performance
        </h3>

        <div className="grid grid-cols-7 gap-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="text-center"
            >
              <p className="text-gym-gray text-sm font-semibold mb-2">{day}</p>
              <div className="relative h-24 bg-gym-dark/50 rounded-lg border border-gym-dark/30 flex items-end justify-center p-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 100}%` }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 1 }}
                  className="w-full bg-gradient-to-t from-accent to-accent/70 rounded transition-all hover:shadow-lg hover:shadow-accent/50"
                />
              </div>
              <p className="text-accent text-xs font-bold mt-2">{Math.floor(Math.random() * 20) + 8}h</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
});

DailyActivities.displayName = 'DailyActivities';
export default DailyActivities;
