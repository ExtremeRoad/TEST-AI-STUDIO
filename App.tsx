
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MapPage from './pages/MapPage';
import MyBookingsPage from './pages/MyBookingsPage';
import CreateEventPage from './pages/CreateEventPage'; // Added import
import { User, UserRole } from './types';
import { authService } from './services/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (e) {
          console.error("Authentication check failed:", e);
          authService.clearToken();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f8f8]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <span className="text-gray-400 font-bold text-xs uppercase tracking-widest animate-pulse">Загрузка ExtremeRoad...</span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-grow pt-[66px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/profile" /> : <LoginPage onLogin={setUser} />} 
            />
            <Route 
              path="/profile" 
              element={user ? <ProfilePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/my-bookings" 
              element={user ? <MyBookingsPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/create-event" 
              element={user?.role === UserRole.BUSINESS ? <CreateEventPage /> : <Navigate to="/" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
