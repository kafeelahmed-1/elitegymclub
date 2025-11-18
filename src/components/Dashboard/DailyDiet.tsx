import { motion } from 'framer-motion';
import { Apple, Coffee, Sun, Moon, Plus, Trash2, Utensils, Flame } from 'lucide-react';
import { useState, useCallback, useMemo, memo } from 'react';

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const DEFAULT_MEALS = {
  breakfast: [
    {
      id: 1,
      name: 'Oatmeal with Berries',
      calories: 350,
      protein: 12,
      carbs: 48,
      fat: 8,
    },
    {
      id: 2,
      name: 'Green Smoothie',
      calories: 280,
      protein: 15,
      carbs: 35,
      fat: 5,
    },
  ],
  lunch: [
    {
      id: 3,
      name: 'Chicken Breast with Rice',
      calories: 550,
      protein: 45,
      carbs: 55,
      fat: 12,
    },
    {
      id: 4,
      name: 'Broccoli Salad',
      calories: 150,
      protein: 8,
      carbs: 18,
      fat: 3,
    },
    ],
    dinner: [
      {
        id: 5,
        name: 'Grilled Salmon',
        calories: 420,
        protein: 38,
        carbs: 0,
        fat: 28,
      },
      {
        id: 6,
        name: 'Sweet Potato',
        calories: 180,
        protein: 4,
        carbs: 41,
        fat: 1,
      },
    ],
};

const DailyDiet = memo(() => {
  const [meals, setMeals] = useState(DEFAULT_MEALS);
  const [addingMeal, setAddingMeal] = useState<'breakfast' | 'lunch' | 'dinner' | null>(null);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const dailyTargets = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  };

  const getTotalNutrients = useCallback(() => {
    const allMeals = [...meals.breakfast, ...meals.lunch, ...meals.dinner];
    return {
      calories: allMeals.reduce((acc, meal) => acc + meal.calories, 0),
      protein: allMeals.reduce((acc, meal) => acc + meal.protein, 0),
      carbs: allMeals.reduce((acc, meal) => acc + meal.carbs, 0),
      fat: allMeals.reduce((acc, meal) => acc + meal.fat, 0),
    };
  }, [meals]);

  const getMealTotal = useCallback((mealType: 'breakfast' | 'lunch' | 'dinner') => {
    return {
      calories: meals[mealType].reduce((acc, meal) => acc + meal.calories, 0),
      protein: meals[mealType].reduce((acc, meal) => acc + meal.protein, 0),
      carbs: meals[mealType].reduce((acc, meal) => acc + meal.carbs, 0),
      fat: meals[mealType].reduce((acc, meal) => acc + meal.fat, 0),
    };
  }, [meals]);

  const handleAddMeal = useCallback((mealType: 'breakfast' | 'lunch' | 'dinner') => {
    if (newMeal.name.trim()) {
      setMeals(prev => ({
        ...prev,
        [mealType]: [
          ...prev[mealType],
          {
            id: Math.max(...prev[mealType].map((m) => m.id), 0) + 1,
            ...newMeal,
          },
        ],
      }));
      setNewMeal({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
      setAddingMeal(null);
    }
  }, [newMeal]);

  const handleRemoveMeal = useCallback((mealType: 'breakfast' | 'lunch' | 'dinner', id: number) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter((meal) => meal.id !== id),
    }));
  }, []);

  const totals = getTotalNutrients();
  const mealTypes = [
    { key: 'breakfast' as const, label: 'Breakfast', icon: Coffee, color: 'from-yellow-400 to-orange-500' },
    { key: 'lunch' as const, label: 'Lunch', icon: Sun, color: 'from-green-400 to-emerald-500' },
    { key: 'dinner' as const, label: 'Dinner', icon: Moon, color: 'from-indigo-400 to-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Daily Totals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-400/20 to-red-500/10 border border-orange-400/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <p className="text-orange-400 text-sm font-semibold mb-2">Total Calories</p>
          <p className="text-3xl font-bold text-gym-light mb-2">{totals.calories}</p>
          <p className="text-xs text-gym-gray">of {dailyTargets.calories} kcal</p>
          <div className="w-full h-2 bg-gym-dark/50 rounded-full overflow-hidden mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totals.calories / dailyTargets.calories) * 100, 100)}%` }}
              transition={{ delay: 0.3, duration: 1 }}
              className="h-full bg-gradient-to-r from-orange-400 to-red-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-400/20 to-pink-500/10 border border-red-400/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <p className="text-red-400 text-sm font-semibold mb-2">Protein</p>
          <p className="text-3xl font-bold text-gym-light mb-2">{totals.protein}g</p>
          <p className="text-xs text-gym-gray">of {dailyTargets.protein}g</p>
          <div className="w-full h-2 bg-gym-dark/50 rounded-full overflow-hidden mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totals.protein / dailyTargets.protein) * 100, 100)}%` }}
              transition={{ delay: 0.4, duration: 1 }}
              className="h-full bg-gradient-to-r from-red-400 to-pink-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-400/20 to-cyan-500/10 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <p className="text-blue-400 text-sm font-semibold mb-2">Carbs</p>
          <p className="text-3xl font-bold text-gym-light mb-2">{totals.carbs}g</p>
          <p className="text-xs text-gym-gray">of {dailyTargets.carbs}g</p>
          <div className="w-full h-2 bg-gym-dark/50 rounded-full overflow-hidden mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totals.carbs / dailyTargets.carbs) * 100, 100)}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-400/20 to-emerald-500/10 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <p className="text-green-400 text-sm font-semibold mb-2">Fat</p>
          <p className="text-3xl font-bold text-gym-light mb-2">{totals.fat}g</p>
          <p className="text-xs text-gym-gray">of {dailyTargets.fat}g</p>
          <div className="w-full h-2 bg-gym-dark/50 rounded-full overflow-hidden mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totals.fat / dailyTargets.fat) * 100, 100)}%` }}
              transition={{ delay: 0.6, duration: 1 }}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
            />
          </div>
        </motion.div>
      </div>

      {/* Meals by Category */}
      {mealTypes.map((mealType, index) => {
        const Icon = mealType.icon;
        const mealData = meals[mealType.key];
        const mealTotal = getMealTotal(mealType.key);

        return (
          <motion.div
            key={mealType.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-gym-darker/50 border border-gym-dark/30 rounded-3xl p-8 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 bg-gradient-to-r ${mealType.color} rounded-lg`}>
                  <Icon size={24} className="text-gym-dark" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gym-light">{mealType.label}</h3>
                  <p className="text-sm text-gym-gray">{mealTotal.calories} calories</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAddingMeal(mealType.key)}
                className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent/70 text-gym-dark px-4 py-2 rounded-lg font-bold transition-all"
              >
                <Plus size={18} />
                Add Item
              </motion.button>
            </div>

            {/* Add New Item Form */}
            {addingMeal === mealType.key && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gym-dark/50 rounded-xl p-4 mb-6 border border-accent/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input
                    type="text"
                    placeholder="Food name..."
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                    className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Calories"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) })}
                    className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Protein (g)"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal({ ...newMeal, protein: parseInt(e.target.value) })}
                    className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Carbs (g)"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal({ ...newMeal, carbs: parseInt(e.target.value) })}
                    className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Fat (g)"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal({ ...newMeal, fat: parseInt(e.target.value) })}
                    className="px-4 py-2 bg-gym-dark/50 border border-gym-dark/20 rounded-lg text-gym-light placeholder:text-gym-gray/50 focus:border-accent outline-none"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddMeal(mealType.key)}
                    className="flex-1 bg-accent text-gym-dark font-bold px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all"
                  >
                    Add Meal
                  </button>
                  <button
                    onClick={() => setAddingMeal(null)}
                    className="bg-gym-dark/50 text-gym-gray px-4 py-2 rounded-lg hover:text-gym-light transition-all border border-gym-dark/30"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {/* Meals List */}
            <div className="space-y-3">
              {mealData.map((meal, mealIndex) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (0.4 + index * 0.1) + mealIndex * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gym-dark/50 rounded-xl border border-gym-dark/30 hover:border-accent/30 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-bold text-gym-light">{meal.name}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gym-gray">
                      <span className="flex items-center gap-1">
                        <Flame size={12} className="text-orange-400" />
                        {meal.calories} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Utensils size={12} className="text-red-400" />
                        {meal.protein}g
                      </span>
                      <span>
                        <span className="text-blue-400">{meal.carbs}g</span> carbs
                      </span>
                      <span>
                        <span className="text-green-400">{meal.fat}g</span> fat
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemoveMeal(mealType.key, meal.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}

              {mealData.length === 0 && (
                <p className="text-gym-gray text-center py-4">No items added yet</p>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Nutrition Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 rounded-3xl p-8 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-gym-light mb-4 flex items-center gap-3">
          <Apple className="text-cyan-400" size={24} />
          Nutrition Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <span className="text-cyan-400 font-bold">1.</span>
            <p className="text-gym-gray">Aim for 150g of protein daily for optimal muscle recovery and growth.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-cyan-400 font-bold">2.</span>
            <p className="text-gym-gray">Balance your carbs intake around your workout times for energy.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-cyan-400 font-bold">3.</span>
            <p className="text-gym-gray">Don't skip healthy fats - they support hormone production.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-cyan-400 font-bold">4.</span>
            <p className="text-gym-gray">Track your meals consistently to maintain a balanced diet.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

DailyDiet.displayName = 'DailyDiet';
export default DailyDiet;
