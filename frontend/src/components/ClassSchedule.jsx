import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, Filter, Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function ClassSchedule({ user, classes, onBookClass }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('week');

  const categories = [
    { value: 'all', label: 'All Classes' },
    { value: 'strength', label: 'Strength Training' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'yoga', label: 'Yoga & Flexibility' },
    { value: 'hiit', label: 'HIIT' },
    { value: 'dance', label: 'Dance Fitness' },
    { value: 'martial', label: 'Martial Arts' }
  ];

  const mockClasses = [
    {
      id: '1',
      name: 'Morning Yoga Flow',
      instructor: 'Sarah Johnson',
      category: 'yoga',
      duration: 60,
      time: '06:00',
      date: new Date().toISOString().split('T')[0],
      location: 'Studio A',
      maxParticipants: 20,
      currentParticipants: 12,
      difficulty: 'Beginner',
      description: 'Start your day with energizing yoga flows',
      price: 15,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=70'
    },
    {
      id: '2',
      name: 'HIIT Bootcamp',
      instructor: 'Mike Chen',
      category: 'hiit',
      duration: 45,
      time: '07:00',
      date: new Date().toISOString().split('T')[0],
      location: 'Main Gym',
      maxParticipants: 25,
      currentParticipants: 18,
      difficulty: 'Advanced',
      description: 'High-intensity interval training for maximum burn',
      price: 25,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=70'
    },
    {
      id: '3',
      name: 'Strength Training',
      instructor: 'John Davis',
      category: 'strength',
      duration: 60,
      time: '09:00',
      date: new Date().toISOString().split('T')[0],
      location: 'Weight Room',
      maxParticipants: 15,
      currentParticipants: 10,
      difficulty: 'Intermediate',
      description: 'Build muscle and increase strength',
      price: 20,
      image: 'https://images.unsplash.com/photo-1599058917708-d95c6cf5a16c?auto=format&fit=crop&w=400&q=70'
    },
    {
      id: '4',
      name: 'Zumba Dance',
      instructor: 'Maria Garcia',
      category: 'dance',
      duration: 55,
      time: '10:00',
      date: new Date().toISOString().split('T')[0],
      location: 'Studio B',
      maxParticipants: 30,
      currentParticipants: 22,
      difficulty: 'Beginner',
      description: 'Fun dance workout with Latin rhythms',
      price: 18,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=70'
    },
    {
      id: '5',
      name: 'Boxing Fitness',
      instructor: 'Tom Wilson',
      category: 'martial',
      duration: 50,
      time: '12:00',
      date: new Date().toISOString().split('T')[0],
      location: 'Combat Room',
      maxParticipants: 20,
      currentParticipants: 15,
      difficulty: 'Intermediate',
      description: 'Boxing techniques and conditioning',
      price: 22,
      image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=400&q=70'
    },
    {
      id: '6',
      name: 'Evening Pilates',
      instructor: 'Emma Thompson',
      category: 'yoga',
      duration: 45,
      time: '18:00',
      date: new Date().toISOString().split('T')[0],
      location: 'Studio A',
      maxParticipants: 18,
      currentParticipants: 8,
      difficulty: 'Beginner',
      description: 'Core strengthening and flexibility',
      price: 15,
      image: 'https://images.unsplash.com/photo-1599901860903-17e6ed7073a0?auto=format&fit=crop&w=400&q=70'
    }
  ];

  const filteredClasses = mockClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || cls.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getWeekDates = () => {
    const week = [];
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const changeWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setSelectedDate(newDate);
  };

  const ClassCard = ({ classItem, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
    >
      <div className="relative h-32">
        <img src={classItem.image} alt={classItem.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            classItem.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
            classItem.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {classItem.difficulty}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-white">{classItem.name}</h3>
          <p className="text-sm text-gray-400">with {classItem.instructor}</p>
        </div>

        <p className="text-sm text-gray-300 line-clamp-2">{classItem.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{classItem.time} • {classItem.duration} min</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>{classItem.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="h-4 w-4" />
            <span>{classItem.currentParticipants}/{classItem.maxParticipants} spots</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="text-lg font-bold text-green-400">${classItem.price}</div>
          <button
            onClick={() => onBookClass(classItem.id)}
            disabled={classItem.currentParticipants >= classItem.maxParticipants}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              classItem.currentParticipants >= classItem.maxParticipants
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {classItem.currentParticipants >= classItem.maxParticipants ? 'Full' : 'Book Now'}
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
          <h1 className="text-3xl font-bold text-white">Class Schedule</h1>
          <p className="text-gray-400 mt-1">Book group fitness classes and training sessions</p>
        </div>
      </motion.div>

      {/* Week Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => changeWeek(-1)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-bold text-white">
            Week of {getWeekDates()[0].toLocaleDateString()}
          </h3>
          <button
            onClick={() => changeWeek(1)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {getWeekDates().map((date, index) => (
            <div
              key={index}
              className={`text-center p-2 rounded-lg cursor-pointer transition-colors ${
                date.toDateString() === new Date().toDateString()
                  ? 'bg-green-500/20 border border-green-500'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
            >
              <div className="text-xs text-gray-400">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
              <div className="text-lg font-bold text-white">{date.getDate()}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search classes or instructors..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Classes Grid */}
      <div className="space-y-4">
        {filteredClasses.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No classes found matching your criteria</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredClasses.map((classItem, index) => (
              <ClassCard key={classItem.id} classItem={classItem} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Schedule Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-6 w-6 text-blue-400" />
            <span className="text-2xl font-bold text-white">{filteredClasses.length}</span>
          </div>
          <h3 className="text-gray-300 font-medium">Classes Today</h3>
          <p className="text-gray-500 text-sm mt-1">Available now</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-6 w-6 text-green-400" />
            <span className="text-2xl font-bold text-white">
              {filteredClasses.reduce((sum, cls) => sum + cls.currentParticipants, 0)}
            </span>
          </div>
          <h3 className="text-gray-300 font-medium">Total Bookings</h3>
          <p className="text-gray-500 text-sm mt-1">Today</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-6 w-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              {Math.round(filteredClasses.reduce((sum, cls) => sum + cls.duration, 0) / filteredClasses.length || 0)}min
            </span>
          </div>
          <h3 className="text-gray-300 font-medium">Avg Duration</h3>
          <p className="text-gray-500 text-sm mt-1">Per class</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-6 w-6 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              {filteredClasses.filter(cls => cls.currentParticipants < cls.maxParticipants).length}
            </span>
          </div>
          <h3 className="text-gray-300 font-medium">Available Spots</h3>
          <p className="text-gray-500 text-sm mt-1">Open classes</p>
        </div>
      </motion.div>
    </div>
  );
}
