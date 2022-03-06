import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import { MedicalProvier } from './components/others/store'
// Components import
import Main from "./components/creatures/Main";
import UserAuth from './components/creatures/UserAuth';

const BACKEND_URL = `http://localhost:3004`;

export default function App() {
  // state to check jwt from backend
  const [auth, setAuth] = useState(false);

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
    <MedicalProvier> 
      <Router>
        { auth  ? <Main /> : <UserAuth /> }
        <Routes>
          <Route />
        </Routes>
      </Router>
    </MedicalProvier>
  );
}

