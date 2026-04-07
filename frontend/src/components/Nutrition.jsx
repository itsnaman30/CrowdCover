import { motion } from 'framer-motion';
import { Utensils, Flame, Target, Plus, Search, TrendingUp, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Nutrition({ user, nutritionEntries, onAddNutrition }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    mealName: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: 'breakfast',
    notes: ''
  });

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { value: 'lunch', label: 'Lunch', icon: '☀️' },
    { value: 'dinner', label: 'Dinner', icon: '🌙' },
    { value: 'snack', label: 'Snack', icon: '🍿' }
  ];

  const filteredEntries = nutritionEntries.filter(entry => 
    entry.mealName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNutrition(formData);
    setFormData({
      mealName: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      mealType: 'breakfast',
      notes: ''
    });
    setShowAddForm(false);
  };

  const todayEntries = filteredEntries.filter(entry => 
    new Date(entry.date).toDateString() === new Date().toDateString()
  );

  const todayStats = todayEntries.reduce((acc, entry) => ({
    calories: acc.calories + (entry.calories || 0),
    protein: acc.protein + (entry.protein || 0),
    carbs: acc.carbs + (entry.carbs || 0),
    fat: acc.fat + (entry.fat || 0)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const NutritionCard = ({ entry, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">{entry.mealName}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              entry.mealType === 'breakfast' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
              entry.mealType === 'lunch' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              entry.mealType === 'dinner' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
              'bg-green-500/20 text-green-400 border border-green-500/30'
            }`}>
              {mealTypes.find(type => type.value === entry.mealType)?.icon} {entry.mealType}
            </span>
            <span className="text-sm text-gray-400">
              {new Date(entry.date).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-orange-400">{entry.calories}</div>
          <div className="text-xs text-gray-400">calories</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <div className="text-sm font-medium text-blue-400">{entry.protein}g</div>
          <div className="text-xs text-gray-400">Protein</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-yellow-400">{entry.carbs}g</div>
          <div className="text-xs text-gray-400">Carbs</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-green-400">{entry.fat}g</div>
          <div className="text-xs text-gray-400">Fat</div>
        </div>
      </div>

      {entry.notes && (
        <p className="text-sm text-gray-300">{entry.notes}</p>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Nutrition Tracking</h1>
          <p className="text-gray-400 mt-1">Monitor your daily nutrition and macros</p>
        </div>
        {user && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Log Meal</span>
          </button>
        )}
      </motion.div>

      {/* Today's Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl border border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <Flame className="h-6 w-6 text-orange-400" />
            <span className="text-2xl font-bold text-white">{todayStats.calories}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Today's Calories</h3>
          <p className="text-gray-500 text-sm mt-1">Goal: 2000-2500</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-6 w-6 text-blue-400" />
            <span className="text-2xl font-bold text-white">{todayStats.protein}g</span>
          </div>
          <h3 className="text-gray-300 font-medium">Protein</h3>
          <p className="text-gray-500 text-sm mt-1">Goal: 150-200g</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Utensils className="h-6 w-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{todayStats.carbs}g</span>
          </div>
          <h3 className="text-gray-300 font-medium">Carbohydrates</h3>
          <p className="text-gray-500 text-sm mt-1">Goal: 250-300g</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-6 w-6 text-green-400" />
            <span className="text-2xl font-bold text-white">{todayStats.fat}g</span>
          </div>
          <h3 className="text-gray-300 font-medium">Fats</h3>
          <p className="text-gray-500 text-sm mt-1">Goal: 65-75g</p>
        </div>
      </motion.div>

      {/* Add Nutrition Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Log Your Meal</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Meal Name</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.mealName}
                  onChange={(e) => setFormData({...formData, mealName: e.target.value})}
                  placeholder="e.g., Grilled Chicken Salad"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Meal Type</label>
                <select
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.mealType}
                  onChange={(e) => setFormData({...formData, mealType: e.target.value})}
                >
                  {mealTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Calories</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.calories}
                  onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  type="number"
                  placeholder="350"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Protein (g)</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.protein}
                  onChange={(e) => setFormData({...formData, protein: e.target.value})}
                  type="number"
                  placeholder="30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Carbs (g)</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.carbs}
                  onChange={(e) => setFormData({...formData, carbs: e.target.value})}
                  type="number"
                  placeholder="25"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fat (g)</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.fat}
                  onChange={(e) => setFormData({...formData, fat: e.target.value})}
                  type="number"
                  placeholder="15"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Notes (optional)</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="How did you feel? Any observations..."
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
              >
                Log Meal
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search meals..."
          />
        </div>
      </motion.div>

      {/* Nutrition Entries */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <Utensils className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No nutrition entries yet</p>
            <p className="text-gray-500 text-sm mt-1">Start logging your meals to track your nutrition</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredEntries.slice(0, 10).map((entry, index) => (
              <NutritionCard key={entry._id} entry={entry} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
