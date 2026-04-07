import { motion } from 'framer-motion';
import { Users, Trophy, MessageCircle, Heart, Share2, Plus, Search, TrendingUp, Award, Target } from 'lucide-react';
import { useState } from 'react';

export default function Community({ user, posts, challenges, onAddPost, onJoinChallenge }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('feed');

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mockPosts = [
    {
      _id: '1',
      author: { name: 'Sarah Johnson', avatar: '👩‍🦰' },
      content: 'Just crushed my personal deadlift record! 225lbs 🏋️‍♀️ Hard work pays off!',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=70'
    },
    {
      _id: '2',
      author: { name: 'Mike Chen', avatar: '👨‍💼' },
      content: '30-day transformation complete! Down 15lbs and feeling stronger than ever 💪',
      likes: 45,
      comments: 12,
      timestamp: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1599058917708-d95c6cf5a16c?auto=format&fit=crop&w=400&q=70'
    },
    {
      _id: '3',
      author: { name: 'Emma Davis', avatar: '👩‍🎓' },
      content: 'Morning workout crew! Who else is up at 5am grinding? 🌅',
      likes: 18,
      comments: 6,
      timestamp: '1 day ago'
    }
  ];

  const mockChallenges = [
    {
      _id: '1',
      title: '30-Day Plank Challenge',
      description: 'Build core strength with progressive plank holds',
      participants: 234,
      difficulty: 'Beginner',
      duration: '30 days',
      reward: 'Core Master Badge',
      progress: 65
    },
    {
      _id: '2',
      title: '10K Steps Daily',
      description: 'Walk 10,000 steps every day for a month',
      participants: 567,
      difficulty: 'Beginner',
      duration: '30 days',
      reward: 'Step Champion Badge',
      progress: 40
    },
    {
      _id: '3',
      title: '100 Push-ups Challenge',
      description: 'Complete 100 push-ups in one session',
      participants: 189,
      difficulty: 'Intermediate',
      duration: '14 days',
      reward: 'Upper Body Strength Badge',
      progress: 80
    }
  ];

  const PostCard = ({ post, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      <div className="flex items-start space-x-3 mb-4">
        <div className="text-2xl">{post.author.avatar}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{post.author.name}</h3>
          <p className="text-sm text-gray-400">{post.timestamp}</p>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{post.content}</p>

      {post.image && (
        <div className="mb-4">
          <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-lg" />
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
            <Heart className="h-5 w-5" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const ChallengeCard = ({ challenge, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
          <p className="text-gray-300 text-sm mt-1">{challenge.description}</p>
        </div>
        <Trophy className="h-8 w-8 text-yellow-400" />
      </div>

      <div className="grid gap-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Participants</span>
          <span className="text-white font-medium">{challenge.participants}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Duration</span>
          <span className="text-white font-medium">{challenge.duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Difficulty</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            challenge.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
            challenge.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {challenge.difficulty}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Reward</span>
          <span className="text-purple-400 font-medium">{challenge.reward}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm text-white">{challenge.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${challenge.progress}%` }}
          />
        </div>
      </div>

      <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
        Join Challenge
      </button>
    </motion.div>
  );

  const handleAddPost = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      onAddPost({
        content: postContent,
        author: { name: user.name, avatar: '👤' },
        timestamp: 'Just now',
        likes: 0,
        comments: 0
      });
      setPostContent('');
      setShowPostForm(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Community</h1>
          <p className="text-gray-400 mt-1">Connect with fellow gym members and join challenges</p>
        </div>
        {user && (
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Create Post</span>
          </button>
        )}
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-6 w-6 text-purple-400" />
            <span className="text-2xl font-bold text-white">1,247</span>
          </div>
          <h3 className="text-gray-300 font-medium">Active Members</h3>
          <p className="text-gray-500 text-sm mt-1">This month</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">89</span>
          </div>
          <h3 className="text-gray-300 font-medium">Active Challenges</h3>
          <p className="text-gray-500 text-sm mt-1">Join now</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="h-6 w-6 text-blue-400" />
            <span className="text-2xl font-bold text-white">456</span>
          </div>
          <h3 className="text-gray-300 font-medium">Posts Today</h3>
          <p className="text-gray-500 text-sm mt-1">Community activity</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-6 w-6 text-green-400" />
            <span className="text-2xl font-bold text-white">23</span>
          </div>
          <h3 className="text-gray-300 font-medium">Your Badges</h3>
          <p className="text-gray-500 text-sm mt-1">Achievements earned</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-lg p-1"
      >
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'feed'
              ? 'bg-purple-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Community Feed
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'challenges'
              ? 'bg-purple-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Trophy className="h-4 w-4 inline mr-2" />
          Challenges
        </button>
      </motion.div>

      {/* Create Post Form */}
      {showPostForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Share Your Journey</h3>
          <form onSubmit={handleAddPost} className="space-y-4">
            <div>
              <textarea
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's your fitness achievement today?"
                rows={3}
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors duration-200"
              >
                Post
              </button>
              <button
                type="button"
                onClick={() => setShowPostForm(false)}
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
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={activeTab === 'feed' ? 'Search posts...' : 'Search challenges...'}
        />
      </motion.div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'feed' ? (
          <>
            {mockPosts.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No posts yet</p>
                <p className="text-gray-500 text-sm mt-1">Be the first to share your fitness journey!</p>
              </div>
            ) : (
              mockPosts.map((post, index) => (
                <PostCard key={post._id} post={post} index={index} />
              ))
            )}
          </>
        ) : (
          <>
            {mockChallenges.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No challenges available</p>
                <p className="text-gray-500 text-sm mt-1">Check back later for new challenges!</p>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {mockChallenges.map((challenge, index) => (
                  <ChallengeCard key={challenge._id} challenge={challenge} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
