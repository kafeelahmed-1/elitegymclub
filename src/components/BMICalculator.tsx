import { motion } from 'framer-motion';
import { Weight, Ruler, AlertCircle, TrendingDown, Heart, Zap } from 'lucide-react';
import { useState, useCallback, useMemo, memo } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const BMICalculator = memo(() => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = useCallback(() => {
    if (!height || !weight) {
      alert('Please fill in all fields');
      return;
    }

    let bmiValue: number;

    if (unit === 'metric') {
      const heightInMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      bmiValue = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
    }

    setBmi(parseFloat(bmiValue.toFixed(1)));

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue < 25) {
      setCategory('Normal Weight');
    } else if (bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  }, [height, weight, unit]);

  const getCategoryColor = useCallback((cat: string) => {
    switch (cat) {
      case 'Underweight':
        return 'text-blue-400';
      case 'Normal Weight':
        return 'text-green-400';
      case 'Overweight':
        return 'text-yellow-400';
      case 'Obese':
        return 'text-red-400';
      default:
        return 'text-gym-gray';
    }
  }, []);

  const getCategoryBg = useCallback((cat: string) => {
    switch (cat) {
      case 'Underweight':
        return 'bg-blue-400/10 border-blue-400/30';
      case 'Normal Weight':
        return 'bg-green-400/10 border-green-400/30';
      case 'Overweight':
        return 'bg-yellow-400/10 border-yellow-400/30';
      case 'Obese':
        return 'bg-red-400/10 border-red-400/30';
      default:
        return 'bg-gym-dark/50 border-gym-dark/30';
    }
  }, []);

  const getBMIPercentage = useMemo(() => {
    if (!bmi) return 0;
    return Math.min((bmi / 50) * 100, 100);
  }, [bmi]);

  const getHealthScore = useMemo(() => {
    if (!bmi) return 0;
    if (category === 'Normal Weight') return 100;
    if (category === 'Underweight') return 60;
    if (category === 'Overweight') return 40;
    return 20;
  }, [bmi, category]);

  return (
    <section id="bmi-calculator" className="py-24 bg-gradient-to-b from-gym-dark to-gym-darker relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-accent/10 rounded-xl border border-accent/30">
              <Heart className="text-accent" size={32} />
            </div>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gym-light mb-4">
            Check Your <span className="text-gradient">BMI</span> Now
          </h2>
          <p className="text-xl text-gym-gray max-w-2xl mx-auto">
            Discover your Body Mass Index and unlock personalized fitness insights
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gym-darker/80 to-black/50 backdrop-blur-lg border border-accent/20 rounded-3xl p-8 shadow-2xl hover:shadow-glow/50 transition-all duration-300"
          >
            {/* Unit Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-8 flex gap-4"
            >
              <button
                onClick={() => {
                  setUnit('metric');
                  setBmi(null);
                  setCategory('');
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  unit === 'metric'
                    ? 'bg-gradient-to-r from-accent to-accent/90 text-gym-dark shadow-lg shadow-accent/50'
                    : 'bg-gym-dark/50 text-gym-gray hover:text-gym-light border border-gym-dark/30 hover:border-accent/50'
                }`}
              >
                Metric (cm, kg)
              </button>
              <button
                onClick={() => {
                  setUnit('imperial');
                  setBmi(null);
                  setCategory('');
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  unit === 'imperial'
                    ? 'bg-gradient-to-r from-accent to-accent/90 text-gym-dark shadow-lg shadow-accent/50'
                    : 'bg-gym-dark/50 text-gym-gray hover:text-gym-light border border-gym-dark/30 hover:border-accent/50'
                }`}
              >
                Imperial (in, lb)
              </button>
            </motion.div>

            {/* Height Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <label className="text-gym-light text-sm font-semibold mb-2 block flex items-center gap-2">
                <Ruler size={18} className="text-accent" />
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={unit === 'metric' ? '170' : '70'}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="pl-4 bg-gym-dark/50 border-gym-dark/20 focus:border-accent focus:shadow-lg focus:shadow-accent/20 text-gym-light placeholder:text-gym-gray/50 transition-all"
                />
              </div>
            </motion.div>

            {/* Weight Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <label className="text-gym-light text-sm font-semibold mb-2 block flex items-center gap-2">
                <Weight size={18} className="text-accent" />
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={unit === 'metric' ? '70' : '154'}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="pl-4 bg-gym-dark/50 border-gym-dark/20 focus:border-accent focus:shadow-lg focus:shadow-accent/20 text-gym-light placeholder:text-gym-gray/50 transition-all"
                />
              </div>
            </motion.div>

            {/* Calculate Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Button
                onClick={calculateBMI}
                className="w-full bg-gradient-to-r from-accent via-accent to-accent/90 hover:shadow-glow text-gym-dark font-bold py-4 text-base group transition-all duration-300"
              >
                <Zap size={18} className="inline mr-2 group-hover:animate-pulse" />
                Calculate BMI
              </Button>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4 text-center">
                <p className="text-blue-400 text-sm font-semibold">Under 18.5</p>
                <p className="text-gym-gray text-xs mt-1">Underweight</p>
              </div>
              <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 text-center">
                <p className="text-green-400 text-sm font-semibold">18.5-24.9</p>
                <p className="text-gym-gray text-xs mt-1">Healthy</p>
              </div>
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 text-center">
                <p className="text-yellow-400 text-sm font-semibold">25-29.9</p>
                <p className="text-gym-gray text-xs mt-1">Overweight</p>
              </div>
              <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 text-center">
                <p className="text-red-400 text-sm font-semibold">30+</p>
                <p className="text-gym-gray text-xs mt-1">Obese</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {bmi !== null ? (
              <>
                {/* BMI Result Card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`${getCategoryBg(
                    category
                  )} border rounded-3xl p-8 text-center backdrop-blur-sm shadow-2xl hover:shadow-glow/30 transition-all duration-300`}
                >
                  <p className="text-gym-gray text-sm font-semibold mb-2">Your BMI Score</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring' }}
                    className="text-6xl font-heading font-black text-gym-light mb-4"
                  >
                    {bmi}
                  </motion.div>
                  <p className={`text-xl font-bold ${getCategoryColor(category)} mb-4`}>
                    {category}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gym-dark/50 rounded-full h-2 mb-6 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getBMIPercentage}%` }}
                      transition={{ delay: 0.2, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${
                        category === 'Underweight'
                          ? 'from-blue-400 to-blue-500'
                          : category === 'Normal Weight'
                          ? 'from-green-400 to-green-500'
                          : category === 'Overweight'
                          ? 'from-yellow-400 to-yellow-500'
                          : 'from-red-400 to-red-500'
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Health Score */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gym-darker/50 backdrop-blur-sm border border-gym-gray/20 rounded-3xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gym-light font-bold flex items-center gap-2">
                      <Heart className="text-accent" size={20} />
                      Health Score
                    </h3>
                    <span className="text-accent font-bold text-lg">{getHealthScore}%</span>
                  </div>
                  <div className="w-full bg-gym-dark/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getHealthScore}%` }}
                      transition={{ delay: 0.3, duration: 1 }}
                      className="h-full bg-gradient-to-r from-accent via-green-400 to-accent"
                    />
                  </div>
                </motion.div>

                {/* Personalized Recommendation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-accent/10 border border-accent/30 rounded-3xl p-6 flex gap-4 shadow-lg hover:shadow-glow/20 transition-all"
                >
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingDown className="text-accent" size={24} />
                    </motion.div>
                  </div>
                  <div>
                    <p className="text-gym-light font-bold mb-2">Expert Recommendation</p>
                    <p className="text-gym-gray text-sm leading-relaxed">
                      {category === 'Normal Weight'
                        ? '🎯 Excellent! Keep up your fitness routine with 150 mins of cardio weekly and strength training 3x per week.'
                        : category === 'Underweight'
                        ? '💪 Focus on building lean muscle mass with progressive strength training and calorie-dense, nutritious foods.'
                        : category === 'Overweight'
                        ? '🏃 Combine 30 mins of cardio 5x weekly with strength training 3x per week and a balanced diet.'
                        : '⚠️ Consult with our professional trainers for a personalized fitness and nutrition plan tailored to your needs.'}
                    </p>
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gym-darker/80 to-black/50 backdrop-blur-lg border border-accent/20 rounded-3xl p-8 h-full flex flex-col justify-center items-center text-center shadow-2xl"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-4 bg-accent/10 rounded-lg mb-6"
                >
                  <AlertCircle className="text-accent" size={40} />
                </motion.div>
                <h3 className="text-gym-light font-bold text-xl mb-3">Ready to Get Started?</h3>
                <p className="text-gym-gray text-sm leading-relaxed">
                  Enter your height and weight to instantly calculate your BMI and receive personalized fitness recommendations.
                </p>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="mt-6"
                >
                  <p className="text-accent text-sm font-semibold">👈 Get Started on the Left</p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

BMICalculator.displayName = 'BMICalculator';
export default BMICalculator;
