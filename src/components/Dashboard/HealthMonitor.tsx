import { motion } from 'framer-motion';
import { Heart, Activity, Droplets, Moon, Wind, Zap } from 'lucide-react';
import { useState, useMemo, memo } from 'react';

const HealthMonitor = memo(() => {
  const [healthMetrics] = useState({
    heartRate: 72,
    heartRateTarget: [60, 100],
    steps: 8432,
    stepsTarget: 10000,
    waterIntake: 2.5,
    waterTarget: 3,
    sleep: 7.5,
    sleepTarget: 8,
    bloodPressure: { systolic: 120, diastolic: 80 },
    bodyTemperature: 98.6,
  });

  const metrics = useMemo(() => [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: `${healthMetrics.heartRate}`,
      unit: 'bpm',
      target: `${healthMetrics.heartRateTarget[0]}-${healthMetrics.heartRateTarget[1]}`,
      color: 'from-red-400 to-red-500',
      bgColor: 'bg-red-400/10 border-red-400/30',
      progress: (healthMetrics.heartRate / healthMetrics.heartRateTarget[1]) * 100,
      status: 'Normal',
    },
    {
      icon: Activity,
      label: 'Steps',
      value: `${(healthMetrics.steps / 1000).toFixed(1)}k`,
      unit: `of ${healthMetrics.stepsTarget / 1000}k`,
      target: 'Daily Goal',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-400/10 border-blue-400/30',
      progress: (healthMetrics.steps / healthMetrics.stepsTarget) * 100,
      status: '84% Complete',
    },
    {
      icon: Droplets,
      label: 'Water Intake',
      value: healthMetrics.waterIntake.toFixed(1),
      unit: 'L',
      target: `of ${healthMetrics.waterTarget}L`,
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-400/10 border-cyan-400/30',
      progress: (healthMetrics.waterIntake / healthMetrics.waterTarget) * 100,
      status: '83% Complete',
    },
    {
      icon: Moon,
      label: 'Sleep',
      value: healthMetrics.sleep.toFixed(1),
      unit: 'hrs',
      target: `of ${healthMetrics.sleepTarget}h`,
      color: 'from-indigo-400 to-purple-500',
      bgColor: 'bg-indigo-400/10 border-indigo-400/30',
      progress: (healthMetrics.sleep / healthMetrics.sleepTarget) * 100,
      status: '94% Complete',
    },
  ], [healthMetrics]);

  return (
    <div className="space-y-8">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${metric.bgColor} border rounded-2xl p-6 backdrop-blur-sm hover:shadow-lg transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${metric.color} rounded-lg`}>
                  <Icon size={24} className="text-gym-dark" />
                </div>
              </div>

              <p className="text-gym-gray text-sm mb-2">{metric.label}</p>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-bold text-gym-light">{metric.value}</p>
                  <p className="text-sm text-gym-gray">{metric.unit}</p>
                </div>
                <p className="text-xs text-gym-gray mt-1">{metric.target}</p>
              </div>

              <div className="space-y-2">
                <div className="w-full h-2 bg-gym-dark/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(metric.progress, 100)}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${metric.color}`}
                  />
                </div>
                <p className="text-xs text-accent font-bold">{metric.status}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Vital Signs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Blood Pressure */}
        <div className="bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">
              <Heart size={24} className="text-gym-dark" />
            </div>
            <h3 className="text-xl font-bold text-gym-light">Blood Pressure</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gym-dark/50 rounded-xl p-6 text-center border border-gym-dark/30"
            >
              <p className="text-gym-gray text-sm mb-2">Systolic</p>
              <p className="text-4xl font-bold text-gym-light">{healthMetrics.bloodPressure.systolic}</p>
              <p className="text-xs text-green-400 mt-2">Normal</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
              className="bg-gym-dark/50 rounded-xl p-6 text-center border border-gym-dark/30"
            >
              <p className="text-gym-gray text-sm mb-2">Diastolic</p>
              <p className="text-4xl font-bold text-gym-light">{healthMetrics.bloodPressure.diastolic}</p>
              <p className="text-xs text-green-400 mt-2">Normal</p>
            </motion.div>
          </div>

          <div className="mt-4 p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
            <p className="text-green-400 text-sm font-semibold">✓ Blood pressure is within normal range</p>
          </div>
        </div>

        {/* Body Temperature */}
        <div className="bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
              <Zap size={24} className="text-gym-dark" />
            </div>
            <h3 className="text-xl font-bold text-gym-light">Body Temperature</h3>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gym-dark/50 rounded-xl p-8 text-center border border-gym-dark/30"
          >
            <p className="text-gym-gray text-sm mb-4">Current</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-5xl font-bold text-gym-light">{healthMetrics.bodyTemperature}</p>
              <p className="text-2xl text-gym-gray">°F</p>
            </div>
            <p className="text-xs text-green-400 mt-4">Normal (98.6°F)</p>
          </motion.div>

          <div className="mt-4 p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
            <p className="text-green-400 text-sm font-semibold">✓ Body temperature is normal</p>
          </div>
        </div>
      </motion.div>

      {/* Health Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-8 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-gym-light mb-6 flex items-center gap-3">
          <Wind className="text-accent" size={24} />
          Weekly Health Trends
        </h3>

        <div className="grid grid-cols-7 gap-3 mb-6">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className="text-center"
            >
              <p className="text-gym-gray text-sm font-semibold mb-3">{day}</p>

              {/* Heart Rate */}
              <div className="mb-3">
                <div className="h-16 relative bg-gym-dark/50 rounded border border-gym-dark/30 flex items-end justify-center p-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{ delay: 0.8 + index * 0.05, duration: 0.8 }}
                    className="w-full bg-gradient-to-t from-red-400 to-red-500 rounded"
                  />
                </div>
                <p className="text-xs text-red-400 font-semibold mt-1">{Math.floor(Math.random() * 30) + 65} bpm</p>
              </div>

              {/* Steps */}
              <div>
                <div className="h-16 relative bg-gym-dark/50 rounded border border-gym-dark/30 flex items-end justify-center p-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{ delay: 0.85 + index * 0.05, duration: 0.8 }}
                    className="w-full bg-gradient-to-t from-blue-400 to-blue-500 rounded"
                  />
                </div>
                <p className="text-xs text-blue-400 font-semibold mt-1">{Math.floor(Math.random() * 8) + 5}k</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
            <p className="text-red-400 text-sm font-semibold mb-1">Avg Heart Rate</p>
            <p className="text-2xl font-bold text-gym-light">72 bpm</p>
          </div>
          <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4">
            <p className="text-blue-400 text-sm font-semibold mb-1">Avg Steps</p>
            <p className="text-2xl font-bold text-gym-light">8.4k</p>
          </div>
        </div>
      </motion.div>

      {/* Health Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 border border-green-400/30 rounded-3xl p-8 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-gym-light mb-4">Health Recommendations</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-gym-gray">Your heart rate is within optimal range. Keep up the cardio!</p>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-400">✓</span>
            <p className="text-gym-gray">You're almost hitting your daily step goal. Walk a bit more to reach 10k!</p>
          </div>
          <div className="flex gap-3">
            <span className="text-cyan-400">✓</span>
            <p className="text-gym-gray">Increase water intake by 0.5L to stay properly hydrated.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-purple-400">✓</span>
            <p className="text-gym-gray">Try to get 30 more minutes of sleep for optimal recovery.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

HealthMonitor.displayName = 'HealthMonitor';
export default HealthMonitor;
