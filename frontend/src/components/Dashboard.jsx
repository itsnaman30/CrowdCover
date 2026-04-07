import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Target, Award, Clock, DollarSign, Plus, Activity } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({ user, bookings, progressEntries, onAddProgress }) {
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    bodyFat: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProgress(formData);
    setFormData({ weight: '', bodyFat: '', notes: '' });
    setShowProgressForm(false);
  };

  const recentBookings = bookings.slice(0, 3);
  const recentProgress = progressEntries.slice(0, 5).reverse();

  const stats = {
    totalBookings: bookings.length,
    completedSessions: bookings.filter(b => b.status === 'completed').length,
    upcomingSessions: bookings.filter(b => b.status === 'confirmed').length,
    progressEntries: progressEntries.length
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl border border-red-500/30 p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-300 mt-1">
              {user.role === 'admin' ? 'Administrator' : 'Member'} • Track your fitness journey
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">
              Level {Math.floor(progressEntries.length / 5) + 1}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.totalBookings}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Total Bookings</h3>
          <p className="text-gray-500 text-sm mt-1">All time sessions</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.completedSessions}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Completed</h3>
          <p className="text-gray-500 text-sm mt-1">Sessions finished</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.upcomingSessions}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Upcoming</h3>
          <p className="text-gray-500 text-sm mt-1">Scheduled sessions</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.progressEntries}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Progress Logs</h3>
          <p className="text-gray-500 text-sm mt-1">Entries recorded</p>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
              {bookings.length} Total
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No bookings yet</p>
              <p className="text-gray-500 text-sm mt-1">Book your first session to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">
                        {booking.session?.title || 'Session'}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : booking.status === 'confirmed'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {booking.status}
                        </span>
                        <span>Booked: {new Date(booking.bookedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Progress Tracker</h2>
            <button
              onClick={() => setShowProgressForm(!showProgressForm)}
              className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>Add Entry</span>
            </button>
          </div>

          {/* Add Progress Form */}
          {showProgressForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4"
            >
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Weight (kg)</label>
                    <input
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      type="number"
                      step="0.1"
                      placeholder="70.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Body Fat (%)</label>
                    <input
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={formData.bodyFat}
                      onChange={(e) => setFormData({...formData, bodyFat: e.target.value})}
                      type="number"
                      step="0.1"
                      placeholder="15.2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
                  <textarea
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="How are you feeling? Any achievements or challenges?"
                    rows={2}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
                  >
                    Save Progress
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProgressForm(false)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {progressEntries.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
              <Activity className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No progress entries yet</p>
              <p className="text-gray-500 text-sm mt-1">Start tracking your fitness journey</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProgress.map((entry, index) => (
                <motion.div
                  key={entry._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm text-gray-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-white font-medium">{entry.weight}kg</span>
                      <span className="text-gray-400">{entry.bodyFat}%</span>
                    </div>
                  </div>
                  {entry.notes && (
                    <p className="text-gray-300 text-sm mt-2">{entry.notes}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
      >
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <Calendar className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-white">Book Session</span>
          </button>
          <button className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <Target className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-white">View Programs</span>
          </button>
          <button className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-medium text-white">Analytics</span>
          </button>
          <button className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <DollarSign className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-medium text-white">Billing</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
