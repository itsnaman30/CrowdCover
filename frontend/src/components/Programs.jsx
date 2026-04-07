import { motion } from 'framer-motion';
import { Dumbbell, Clock, Target, Plus, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Programs({ programs, user, onAddProgram, onBookSession, onPayForSession }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    difficulty: 'Intermediate'
  });

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || program.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProgram(formData.title, formData.description, formData.duration, formData.difficulty);
    setFormData({ title: '', description: '', duration: '', difficulty: 'Intermediate' });
    setShowAddForm(false);
  };

  const ProgramCard = ({ program, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 overflow-hidden"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
              {program.title}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              program.difficulty === 'Beginner' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : program.difficulty === 'Intermediate'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {program.difficulty}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{program.duration}</div>
            <div className="text-sm text-gray-400">minutes</div>
          </div>
        </div>

        <p className="text-gray-300 line-clamp-3">{program.description}</p>

        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{program.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="h-4 w-4" />
            <span>{program.difficulty}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onBookSession(program._id)}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
          >
            Start Program
          </button>
        </div>
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
          <h1 className="text-3xl font-bold text-white">Training Programs</h1>
          <p className="text-gray-400 mt-1">Structured workout plans for all fitness levels</p>
        </div>
        {user && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Add Program</span>
          </button>
        )}
      </motion.div>

      {/* Add Program Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Create New Program</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Program Title</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., 12-Week Transformation"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Duration (minutes)</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  type="number"
                  placeholder="e.g., 45"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the program, goals, and what users can expect..."
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty Level</label>
              <select
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
              >
                Create Program
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search programs..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </motion.div>

      {/* Programs Grid */}
      <div className="space-y-4">
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <Dumbbell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              {searchTerm || difficultyFilter !== 'all' 
                ? 'No programs found matching your criteria.' 
                : 'No programs available yet.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredPrograms.map((program, index) => (
              <ProgramCard key={program._id} program={program} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-white">{programs.length}</div>
          <div className="text-sm text-gray-400">Total Programs</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {programs.filter(p => p.difficulty === 'Beginner').length}
          </div>
          <div className="text-sm text-gray-400">Beginner Friendly</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-red-400">
            {programs.filter(p => p.difficulty === 'Advanced').length}
          </div>
          <div className="text-sm text-gray-400">Advanced</div>
        </div>
      </motion.div>
    </div>
  );
}
