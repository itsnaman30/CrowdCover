import { motion } from 'framer-motion';
import { User, Mail, Lock, Dumbbell, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Auth({ onSubmit, error }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(email, password, mode === 'register', name);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-red-500/20 rounded-xl backdrop-blur-sm">
                <Dumbbell className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {mode === 'login' ? 'Welcome Back' : 'Join Iron House'}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {mode === 'login' 
                  ? 'Sign in to access your fitness journey' 
                  : 'Start your transformation today'
                }
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required={mode === 'register'}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="text-center">
            <button
              onClick={switchMode}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              {mode === 'login' ? (
                <>
                  New to Iron House?{' '}
                  <span className="text-red-400 font-medium hover:text-red-300">Create an account</span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span className="text-red-400 font-medium hover:text-red-300">Sign in</span>
                </>
              )}
            </button>
          </div>

          {/* Features */}
          <div className="pt-6 border-t border-gray-700">
            <div className="grid gap-3 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-green-400 rounded-full" />
                <span>Secure authentication</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                <span>Personalized experience</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-purple-400 rounded-full" />
                <span>Progress tracking</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
