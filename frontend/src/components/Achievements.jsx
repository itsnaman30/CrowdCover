import { motion } from 'framer-motion';
import { Trophy, Award, Star, Target, Zap, Shield, Crown, Medal, Flame } from 'lucide-react';
import { useState } from 'react';

export default function Achievements({ user, userAchievements }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: '1',
      title: 'Early Bird',
      description: 'Complete 5 workouts before 8am',
      icon: '🌅',
      category: 'consistency',
      rarity: 'common',
      points: 50,
      unlocked: true,
      unlockedAt: '2024-01-15',
      progress: 100
    },
    {
      id: '2',
      title: 'Iron Will',
      description: 'Maintain a 30-day workout streak',
      icon: '🔥',
      category: 'consistency',
      rarity: 'rare',
      points: 200,
      unlocked: true,
      unlockedAt: '2024-02-20',
      progress: 100
    },
    {
      id: '3',
      title: 'Weight Warrior',
      description: 'Lose 10kg in 3 months',
      icon: '⚖️',
      category: 'progress',
      rarity: 'epic',
      points: 500,
      unlocked: false,
      progress: 65
    },
    {
      id: '4',
      title: 'Social Butterfly',
      description: 'Join 5 community challenges',
      icon: '🦋',
      category: 'social',
      rarity: 'uncommon',
      points: 100,
      unlocked: true,
      unlockedAt: '2024-01-28',
      progress: 100
    },
    {
      id: '5',
      title: 'Nutrition Guru',
      description: 'Log meals for 30 consecutive days',
      icon: '🥗',
      category: 'nutrition',
      rarity: 'rare',
      points: 300,
      unlocked: false,
      progress: 40
    },
    {
      id: '6',
      title: 'Champion',
      description: 'Win 3 fitness challenges',
      icon: '🏆',
      category: 'competition',
      rarity: 'legendary',
      points: 1000,
      unlocked: false,
      progress: 33
    },
    {
      id: '7',
      title: 'Helper Hero',
      description: 'Help 10 community members',
      icon: '🦸‍♂️',
      category: 'social',
      rarity: 'uncommon',
      points: 150,
      unlocked: true,
      unlockedAt: '2024-03-10',
      progress: 100
    },
    {
      id: '8',
      title: 'Strength Master',
      description: 'Lift total of 10,000kg',
      icon: '💪',
      category: 'strength',
      rarity: 'epic',
      points: 400,
      unlocked: false,
      progress: 78
    }
  ];

  const categories = [
    { value: 'all', label: 'All Achievements', icon: Trophy },
    { value: 'consistency', label: 'Consistency', icon: Flame },
    { value: 'progress', label: 'Progress', icon: Target },
    { value: 'social', label: 'Social', icon: Star },
    { value: 'nutrition', label: 'Nutrition', icon: Medal },
    { value: 'strength', label: 'Strength', icon: Zap },
    { value: 'competition', label: 'Competition', icon: Crown }
  ];

  const rarityColors = {
    common: 'border-gray-500 bg-gray-500/20',
    uncommon: 'border-green-500 bg-green-500/20',
    rare: 'border-blue-500 bg-blue-500/20',
    epic: 'border-purple-500 bg-purple-500/20',
    legendary: 'border-yellow-500 bg-yellow-500/20'
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const stats = {
    total: achievements.length,
    unlocked: achievements.filter(a => a.unlocked).length,
    totalPoints: achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0),
    currentStreak: 15,
    level: Math.floor(achievements.filter(a => a.unlocked).length / 2) + 1
  };

  const AchievementCard = ({ achievement, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`relative bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 p-6 ${
        achievement.unlocked 
          ? 'border-opacity-100' 
          : 'border-opacity-30 grayscale'
      } ${rarityColors[achievement.rarity]}`}
    >
      {achievement.unlocked && (
        <div className="absolute top-2 right-2">
          <div className="p-2 bg-green-500/20 rounded-full border border-green-500">
            <Trophy className="h-4 w-4 text-green-400" />
          </div>
        </div>
      )}

      <div className="flex items-start space-x-4">
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
          <p className="text-sm text-gray-300 mt-1">{achievement.description}</p>
          
          <div className="flex items-center space-x-4 mt-3">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              achievement.rarity === 'common' ? 'bg-gray-500/20 text-gray-400' :
              achievement.rarity === 'uncommon' ? 'bg-green-500/20 text-green-400' :
              achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
              achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
            </span>
            <span className="flex items-center space-x-1 text-yellow-400">
              <Star className="h-3 w-3" />
              <span className="text-sm font-medium">{achievement.points}</span>
            </span>
          </div>
        </div>
      </div>

      {!achievement.unlocked && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-white">{achievement.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
        </div>
      )}

      {achievement.unlocked && achievement.unlockedAt && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center space-x-2 text-sm text-green-400">
            <Award className="h-4 w-4" />
            <span>Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-white">Achievements</h1>
        <p className="text-gray-400">Unlock badges and rewards for your fitness journey</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.unlocked}/{stats.total}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Achievements</h3>
          <p className="text-gray-500 text-sm mt-1">Unlocked</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-6 w-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.totalPoints}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Total Points</h3>
          <p className="text-gray-500 text-sm mt-1">Earned</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Flame className="h-6 w-6 text-orange-400" />
            <span className="text-2xl font-bold text-white">{stats.currentStreak}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Current Streak</h3>
          <p className="text-gray-500 text-sm mt-1">Days</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Shield className="h-6 w-6 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.level}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Your Level</h3>
          <p className="text-gray-500 text-sm mt-1">Achievement level</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Zap className="h-6 w-6 text-blue-400" />
            <span className="text-2xl font-bold text-white">
              {Math.round((stats.unlocked / stats.total) * 100)}%
            </span>
          </div>
          <h3 className="text-gray-300 font-medium">Completion</h3>
          <p className="text-gray-500 text-sm mt-1">Overall progress</p>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category.value
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <category.icon className="h-4 w-4" />
            <span>{category.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Achievements Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredAchievements.map((achievement, index) => (
          <AchievementCard key={achievement.id} achievement={achievement} index={index} />
        ))}
      </div>

      {/* Motivational Message */}
      {filteredAchievements.filter(a => !a.unlocked).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 p-6 text-center"
        >
          <h3 className="text-lg font-bold text-white mb-2">Keep Going! 💪</h3>
          <p className="text-gray-300">
            You have {filteredAchievements.filter(a => !a.unlocked).length} achievements left to unlock in this category.
            Every workout gets you closer to your goals!
          </p>
        </motion.div>
      )}
    </div>
  );
}
