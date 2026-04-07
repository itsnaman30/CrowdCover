import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Auth from './components/Auth';
import Programs from './components/Programs';
import Sessions from './components/Sessions';
import Dashboard from './components/Dashboard';
import Nutrition from './components/Nutrition';
import WorkoutPlanner from './components/WorkoutPlanner';
import Community from './components/Community';
import Achievements from './components/Achievements';
import ClassSchedule from './components/ClassSchedule';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [authError, setAuthError] = useState('');
  const [programs, setPrograms] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [progressEntries, setProgressEntries] = useState([]);
  const [nutritionEntries, setNutritionEntries] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const authHeaders = useMemo(() => (token ? { Authorization: `Bearer ${token}` } : {}), [token]);

  const fetchPrograms = async () => {
    try {
      const res = await fetch(`${API_BASE}/programs`);
      if (res.ok) setPrograms(await res.json());
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_BASE}/sessions`);
      if (res.ok) setSessions(await res.json());
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const fetchBookings = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/bookings`, { headers: { 'Content-Type': 'application/json', ...authHeaders } });
      if (res.ok) setBookings(await res.json());
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const fetchProgress = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/progress`, { headers: { 'Content-Type': 'application/json', ...authHeaders } });
      if (res.ok) setProgressEntries(await res.json());
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchPrograms(),
        fetchSessions()
      ]);
      if (token) {
        await Promise.all([
          fetchBookings(),
          fetchProgress()
        ]);
      }
      setIsLoading(false);
    };
    loadData();
  }, [token]);

  const handleLogin = async (email, password, isRegister, name) => {
    setAuthError('');
    try {
      const endpoint = isRegister ? 'register' : 'login';
      const body = isRegister ? { name, email, password } : { email, password };
      const res = await fetch(`${API_BASE}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Authentication failed');
        return false;
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      await fetchBookings();
      await fetchProgress();
      return true;
    } catch (error) {
      setAuthError('Network error. Please try again.');
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    setBookings([]);
    setProgressEntries([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const bookSession = async (sessionId) => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/bookings/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ sessionId })
      });

      if (res.ok) {
        await fetchBookings();
        return true;
      } else {
        const err = await res.json();
        alert(err.error || 'Booking failed');
        return false;
      }
    } catch (error) {
      alert('Network error. Please try again.');
      return false;
    }
  };

  const addProgram = async (title, description, duration, difficulty) => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/programs/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ title, description, duration: Number(duration), difficulty })
      });
      if (res.ok) {
        await fetchPrograms();
        return true;
      } else {
        alert((await res.json()).error);
        return false;
      }
    } catch (error) {
      alert('Network error. Please try again.');
      return false;
    }
  };

  const addSession = async (title, description, trainer, duration, intensity, price) => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/sessions/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ title, description, trainer, duration: Number(duration), intensity, price: Number(price) })
      });
      if (res.ok) {
        await fetchSessions();
        return true;
      } else {
        alert((await res.json()).error);
        return false;
      }
    } catch (error) {
      alert('Network error. Please try again.');
      return false;
    }
  };

  const addProgress = async ({ weight, bodyFat, notes }) => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/progress/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ weight: Number(weight), bodyFat: Number(bodyFat), notes })
      });
      if (res.ok) {
        await fetchProgress();
        return true;
      } else {
        alert((await res.json()).error);
        return false;
      }
    } catch (error) {
      alert('Network error. Please try again.');
      return false;
    }
  };

  const payForSession = async (sessionId) => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/payments/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ sessionId })
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return true;
      } else {
        alert(data.error || 'Payment failed');
        return false;
      }
    } catch (error) {
      alert('Network error. Please try again.');
      return false;
    }
  };

  const addNutrition = async (nutritionData) => {
    if (!token) return false;
    try {
      // Simulate API call
      const newEntry = {
        _id: Date.now().toString(),
        ...nutritionData,
        date: new Date().toISOString()
      };
      setNutritionEntries(prev => [newEntry, ...prev]);
      return true;
    } catch (error) {
      alert('Failed to add nutrition entry');
      return false;
    }
  };

  const addWorkout = async (workoutData) => {
    if (!token) return false;
    try {
      // Simulate API call
      const newWorkout = {
        _id: Date.now().toString(),
        ...workoutData,
        createdAt: new Date().toISOString()
      };
      setWorkouts(prev => [newWorkout, ...prev]);
      return true;
    } catch (error) {
      alert('Failed to add workout');
      return false;
    }
  };

  const updateWorkout = async (workoutId, workoutData) => {
    if (!token) return false;
    try {
      setWorkouts(prev => prev.map(w => w._id === workoutId ? { ...w, ...workoutData } : w));
      return true;
    } catch (error) {
      alert('Failed to update workout');
      return false;
    }
  };

  const deleteWorkout = async (workoutId) => {
    if (!token) return false;
    try {
      setWorkouts(prev => prev.filter(w => w._id !== workoutId));
      return true;
    } catch (error) {
      alert('Failed to delete workout');
      return false;
    }
  };

  const addPost = async (postData) => {
    if (!token) return false;
    try {
      const newPost = {
        _id: Date.now().toString(),
        ...postData,
        timestamp: 'Just now'
      };
      setPosts(prev => [newPost, ...prev]);
      return true;
    } catch (error) {
      alert('Failed to create post');
      return false;
    }
  };

  const joinChallenge = async (challengeId) => {
    if (!token) return false;
    try {
      alert('Successfully joined challenge!');
      return true;
    } catch (error) {
      alert('Failed to join challenge');
      return false;
    }
  };

  const bookClass = async (classId) => {
    if (!token) return false;
    try {
      alert('Successfully booked class!');
      return true;
    } catch (error) {
      alert('Failed to book class');
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Iron House Gym...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home programs={programs} sessions={sessions} onBookSession={bookSession} onPayForSession={payForSession} />} />
          <Route path="/programs" element={<Programs programs={programs} user={user} onAddProgram={addProgram} onBookSession={bookSession} onPayForSession={payForSession} />} />
          <Route path="/sessions" element={<Sessions sessions={sessions} user={user} onAddSession={addSession} onBookSession={bookSession} onPayForSession={payForSession} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} bookings={bookings} progressEntries={progressEntries} onAddProgress={addProgress} /> : <Navigate to="/login" replace />} />
          <Route path="/nutrition" element={user ? <Nutrition user={user} nutritionEntries={nutritionEntries} onAddNutrition={addNutrition} /> : <Navigate to="/login" replace />} />
          <Route path="/workout-planner" element={user ? <WorkoutPlanner user={user} workouts={workouts} onAddWorkout={addWorkout} onUpdateWorkout={updateWorkout} onDeleteWorkout={deleteWorkout} /> : <Navigate to="/login" replace />} />
          <Route path="/community" element={<Community user={user} posts={posts} challenges={challenges} onAddPost={addPost} onJoinChallenge={joinChallenge} />} />
          <Route path="/achievements" element={user ? <Achievements user={user} userAchievements={achievements} /> : <Navigate to="/login" replace />} />
          <Route path="/class-schedule" element={<ClassSchedule user={user} classes={classes} onBookClass={bookClass} />} />
          <Route path="/login" element={<Auth onSubmit={handleLogin} error={authError} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;