import { motion } from 'framer-motion';
import { Calendar, Clock, Users, DollarSign, Plus, Search, Filter, Star } from 'lucide-react';
import { useState } from 'react';

export default function Sessions({ sessions, user, onAddSession, onBookSession, onPayForSession }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [intensityFilter, setIntensityFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    trainer: '',
    duration: '',
    intensity: 'Medium',
    price: ''
  });

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.trainer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntensity = intensityFilter === 'all' || session.intensity === intensityFilter;
    return matchesSearch && matchesIntensity;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSession(formData.title, formData.description, formData.trainer, formData.duration, formData.intensity, formData.price);
    setFormData({ title: '', description: '', trainer: '', duration: '', intensity: 'Medium', price: '' });
    setShowAddForm(false);
  };

  const SessionCard = ({ session, index }) => (
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
              {session.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                session.intensity === 'Low' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : session.intensity === 'Medium'
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {session.intensity} Intensity
              </span>
              {session.price && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Paid
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {session.price ? `$${session.price}` : 'Free'}
            </div>
            <div className="text-sm text-gray-400">
              {session.duration} min
            </div>
          </div>
        </div>

        <p className="text-gray-300 line-clamp-3">{session.description}</p>

        {session.trainer && (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Users className="h-4 w-4" />
            <span>Trainer: {session.trainer}</span>
          </div>
        )}

        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{session.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Available</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onBookSession(session._id)}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
          >
            Book Session
          </button>
          {session.price && (
            <button
              onClick={() => onPayForSession(session._id)}
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
            >
              Pay Now
            </button>
          )}
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
          <h1 className="text-3xl font-bold text-white">Training Sessions</h1>
          <p className="text-gray-400 mt-1">Book one-on-one and group training sessions</p>
        </div>
        {user && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Add Session</span>
          </button>
        )}
      </motion.div>

      {/* Add Session Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Create New Session</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Session Title</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., HIIT Cardio Blast"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Trainer Name</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.trainer}
                  onChange={(e) => setFormData({...formData, trainer: e.target.value})}
                  placeholder="e.g., John Smith"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the session, what to expect, and benefits..."
                rows={3}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Duration (minutes)</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  type="number"
                  placeholder="e.g., 60"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Intensity</label>
                <select
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.intensity}
                  onChange={(e) => setFormData({...formData, intensity: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  type="number"
                  placeholder="e.g., 50 (leave empty for free)"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
              >
                Create Session
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
            placeholder="Search sessions, trainers..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={intensityFilter}
            onChange={(e) => setIntensityFilter(e.target.value)}
          >
            <option value="all">All Intensities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </motion.div>

      {/* Sessions Grid */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              {searchTerm || intensityFilter !== 'all' 
                ? 'No sessions found matching your criteria.' 
                : 'No sessions available yet.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredSessions.map((session, index) => (
              <SessionCard key={session._id} session={session} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 sm:grid-cols-4"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-white">{sessions.length}</div>
          <div className="text-sm text-gray-400">Total Sessions</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {sessions.filter(s => !s.price).length}
          </div>
          <div className="text-sm text-gray-400">Free Sessions</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {sessions.filter(s => s.price).length}
          </div>
          <div className="text-sm text-gray-400">Premium Sessions</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {sessions.filter(s => s.trainer).length}
          </div>
          <div className="text-sm text-gray-400">With Trainers</div>
        </div>
      </motion.div>
    </div>
  );
}
