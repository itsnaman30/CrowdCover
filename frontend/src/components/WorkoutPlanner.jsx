import { motion } from 'framer-motion';
import { Dumbbell, Plus, Search, Calendar, Clock, Target, Play, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function WorkoutPlanner({ user, workouts, onAddWorkout, onUpdateWorkout, onDeleteWorkout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: 'Intermediate',
    exercises: [],
    goal: 'Muscle Gain'
  });

  const difficultyLevels = [
    { value: 'Beginner', color: 'green' },
    { value: 'Intermediate', color: 'yellow' },
    { value: 'Advanced', color: 'red' }
  ];

  const goals = [
    'Muscle Gain', 'Fat Loss', 'Endurance', 'Strength', 'Flexibility', 'General Fitness'
  ];

  const exerciseTypes = [
    'Squats', 'Deadlifts', 'Bench Press', 'Pull-ups', 'Push-ups', 'Lunges',
    'Plank', 'Burpees', 'Jump Rope', 'Running', 'Cycling', 'Swimming'
  ];

  const filteredWorkouts = workouts.filter(workout => 
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingWorkout) {
      onUpdateWorkout(editingWorkout._id, formData);
      setEditingWorkout(null);
    } else {
      onAddWorkout(formData);
    }
    setFormData({
      name: '',
      description: '',
      duration: '',
      difficulty: 'Intermediate',
      exercises: [],
      goal: 'Muscle Gain'
    });
    setShowAddForm(false);
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setFormData({
      name: workout.name,
      description: workout.description,
      duration: workout.duration,
      difficulty: workout.difficulty,
      exercises: workout.exercises || [],
      goal: workout.goal
    });
    setShowAddForm(true);
  };

  const toggleExercise = (exercise) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.includes(exercise)
        ? prev.exercises.filter(ex => ex !== exercise)
        : [...prev.exercises, exercise]
    }));
  };

  const WorkoutCard = ({ workout, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">{workout.name}</h3>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              workout.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              workout.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
              'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {workout.difficulty}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {workout.goal}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(workout)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDeleteWorkout(workout._id)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{workout.description}</p>

      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{workout.duration} min</span>
        </div>
        <div className="flex items-center space-x-1">
          <Target className="h-4 w-4" />
          <span>{workout.exercises?.length || 0} exercises</span>
        </div>
      </div>

      {workout.exercises && workout.exercises.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Exercises:</h4>
          <div className="flex flex-wrap gap-2">
            {workout.exercises.map((exercise, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">
                {exercise}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2">
          <Play className="h-4 w-4" />
          <span>Start Workout</span>
        </button>
        <button className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200">
          View Details
        </button>
      </div>
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
          <h1 className="text-3xl font-bold text-white">Workout Planner</h1>
          <p className="text-gray-400 mt-1">Create and manage your custom workout routines</p>
        </div>
        {user && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Create Workout</span>
          </button>
        )}
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Dumbbell className="h-6 w-6 text-green-400" />
            <span className="text-2xl font-bold text-white">{workouts.length}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Total Workouts</h3>
          <p className="text-gray-500 text-sm mt-1">Custom routines</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-6 w-6 text-blue-400" />
            <span className="text-2xl font-bold text-white">
              {workouts.filter(w => w.difficulty === 'Beginner').length}
            </span>
          </div>
          <h3 className="text-gray-300 font-medium">Beginner</h3>
          <p className="text-gray-500 text-sm mt-1">Easy routines</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-6 w-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              {Math.round(workouts.reduce((acc, w) => acc + (parseInt(w.duration) || 0), 0) / workouts.length || 0)}
            </span>
          </div>
          <h3 className="text-gray-300 font-medium">Avg Duration</h3>
          <p className="text-gray-500 text-sm mt-1">Minutes per workout</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-6 w-6 text-purple-400" />
            <span className="text-2xl font-bold text-white">0</span>
          </div>
          <h3 className="text-gray-300 font-medium">Completed</h3>
          <p className="text-gray-500 text-sm mt-1">This week</p>
        </div>
      </motion.div>

      {/* Add/Edit Workout Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">
            {editingWorkout ? 'Edit Workout' : 'Create New Workout'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Workout Name</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Upper Body Strength"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Duration (minutes)</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  type="number"
                  placeholder="45"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the workout, focus areas, and what to expect..."
                rows={3}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                <select
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                >
                  {difficultyLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.value}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Goal</label>
                <select
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                >
                  {goals.map(goal => (
                    <option key={goal} value={goal}>{goal}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Exercises</label>
              <div className="grid gap-2 sm:grid-cols-3">
                {exerciseTypes.map(exercise => (
                  <label key={exercise} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.exercises.includes(exercise)}
                      onChange={() => toggleExercise(exercise)}
                      className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-300">{exercise}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
              >
                {editingWorkout ? 'Update Workout' : 'Create Workout'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingWorkout(null);
                }}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search workouts..."
        />
      </motion.div>

      {/* Workouts Grid */}
      <div className="space-y-4">
        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-12">
            <Dumbbell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              {searchTerm ? 'No workouts found matching your search.' : 'No workouts created yet.'}
            </p>
            <p className="text-gray-500 text-sm mt-1">Create your first custom workout routine</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredWorkouts.map((workout, index) => (
              <WorkoutCard key={workout._id} workout={workout} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
