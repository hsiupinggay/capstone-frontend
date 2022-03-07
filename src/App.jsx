import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import { MedicalProvider } from './components/others/store'

// Pages import
import AuthPage from './components/pages/AuthPage';
import HomePage from './components/pages/HomePage';
import AppointmentsPage from './components/pages/AppointmentsPage';
import FamilyPage from './components/pages/FamilyPage';
import ProfilePage from './components/pages/ProfilePage';
import LogoutPage from './components/pages/LogoutPage';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || `http://localhost:3004`;

export default function App() {
  // state to check jwt from backend
  const [auth, setAuth] = useState(true);

  // on load, check for token... if no token, 
  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (!token) return setAuth(false)/

  //   ( async() => {
  //     try {
  //       const headers = {
  //         headers: { Authorization: `Bearer ${token}` }
  //       };

  //       const response = await axios.get(`${BACKEND_URL}/authenticate`, headers);
  //       const { valid } = response.data;
  //       if (!valid) return setAuth(false);
  //       setAuth(true);
  //     } catch (err) {
  //       setAuth(false);
  //       console.error(err.response);
  //     }
  //   })();
  // });

  return (
    <MedicalProvider>
      <Router>
        { auth  ?
          <div className="main-container w-screen h-screen flex flex-col items-center">
            <div className="nav-div w-full border-solid border-black border-2">
              <nav className="flex justify-evenly items-center">
                <NavLink className={({ isActive }) => `${isActive && `font-bold`} hover:underline`} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => `${isActive && `font-bold`} hover:underline`} to="/appointments">Appointments</NavLink>
                <NavLink className={({ isActive }) => `${isActive && `font-bold`} hover:underline`} to="/family">Family || People(?)</NavLink>
                <NavLink className={({ isActive }) => `${isActive && `font-bold`} hover:underline`} to="/profile">Profile</NavLink>
                <NavLink className={({ isActive }) => `${isActive && `font-bold`} hover:underline`} to="/logout">Logout</NavLink>
              </nav>
            </div>
            <Routes>
              <Route path="/" element={<HomePage auth={auth} />} />
              <Route path="/appointments" element={<AppointmentsPage auth={auth} />} />
              <Route path="/family" element={<FamilyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/logout" element={<LogoutPage setAuth={setAuth} />} />
            </Routes>
          </div> 
          // Log In page displays if there's no auth token
        : <AuthPage /> }
      </Router>
    </MedicalProvider>
  );
}

