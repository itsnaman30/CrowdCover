import { motion } from 'framer-motion';
import { Dumbbell, Users, Target, TrendingUp, Star, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function Home({ programs, sessions, onBookSession, onPayForSession }) {
  const features = [
    {
      icon: Dumbbell,
      title: 'Personalized Training',
      description: 'Custom workout plans tailored to your fitness goals and experience level',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=70'
    },
    {
      icon: Users,
      title: 'Expert Coaches',
      description: 'Certified personal trainers dedicated to your success',
      image: 'https://images.unsplash.com/photo-1599058917708-d95c6cf5a16c?auto=format&fit=crop&w=800&q=70'
    },
    {
      icon: Target,
      title: 'Nutrition Guidance',
      description: 'Comprehensive meal plans and macro tracking for optimal results',
      image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=70'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Advanced analytics to monitor your fitness journey',
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=70'
    }
  ];

  const SessionCard = ({ item, type }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10"
    >
      <div className="absolute top-4 right-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          type === 'program' 
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
            : 'bg-green-500/20 text-green-400 border border-green-500/30'
        }`}>
          {type === 'program' ? 'Program' : 'Session'}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
      
      <div className="space-y-2 text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Duration: {item.duration} min</span>
        </div>
        {item.trainer && (
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Trainer: {item.trainer}</span>
          </div>
        )}
        {item.intensity && (
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Intensity: {item.intensity}</span>
          </div>
        )}
        {item.difficulty && (
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Level: {item.difficulty}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className={item.price ? 'text-green-400' : 'text-yellow-400'}>
            {item.price ? `$${item.price}` : 'Free'}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onBookSession(item._id)}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
        >
          Book Now
        </button>
        {item.price && (
          <button
            onClick={() => onPayForSession(item._id)}
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
          >
            Pay
          </button>
        )}
      </div>
    </motion.div>
  );

  const FeatureCard = ({ feature, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
    >
      <div className="aspect-w-16 aspect-h-9 h-48 overflow-hidden">
        <img
          src={feature.image}
          alt={feature.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-red-500/20 rounded-lg backdrop-blur-sm">
            <feature.icon className="h-6 w-6 text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-white">{feature.title}</h3>
        </div>
        <p className="text-gray-300 text-sm">{feature.description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Transform Your Body, Elevate Your Life
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Join the premier fitness destination with state-of-the-art equipment, expert trainers, and a community that motivates you to achieve your goals.
        </p>
      </motion.section>

      {/* Current Offerings */}
      <section className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Current Programs</h3>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
              {programs.length} Available
            </span>
          </div>
          <div className="grid gap-4">
            {programs.slice(0, 2).map((program) => (
              <SessionCard key={program._id} item={program} type="program" />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Live Sessions</h3>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
              {sessions.length} Available
            </span>
          </div>
          <div className="grid gap-4">
            {sessions.slice(0, 2).map((session) => (
              <SessionCard key={session._id} item={session} type="session" />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-white">Why Choose Iron House Gym?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Everything you need for a complete fitness transformation under one roof
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: 'Members', value: '10,000+', icon: Users },
          { label: 'Expert Trainers', value: '50+', icon: Dumbbell },
          { label: 'Classes Weekly', value: '200+', icon: Calendar },
          { label: 'Success Rate', value: '98%', icon: TrendingUp }
        ].map((stat, index) => (
          <div key={stat.label} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 text-center">
            <stat.icon className="h-8 w-8 text-red-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </motion.section>
    </div>
  );
}
