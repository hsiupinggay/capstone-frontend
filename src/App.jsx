/* eslint-disable no-unused-vars */
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { MedicalProvider } from './components/others/store';
import ProtectedRoute from './components/molecules/ProtectedRoute';
import Navbar from './components/molecules/Navbar';

// Pages import
import HomePage from './components/pages/HomePage';
import AppointmentsPage from './components/pages/AppointmentsPage';
import PeoplePage from './components/pages/PeoplePage';
import ProfilePage from './components/pages/ProfilePage';
import LogoutPage from './components/pages/LogoutPage';
import AddAppointment from './components/organisms/AddAppointment';
import UserAuthPage from './components/pages/UserAuthPage';

export default function App() {
  return (
    <MedicalProvider>
      <Router>
        <div className="main-container w-screen h-screen
          flex flex-col items-center"
        >

          <div className="display">
            <Routes>
              <Route
                exact
                path="/"
                element={<UserAuthPage />}
              />
              <Route
                exact
                path="/nav/"
                element={<Navbar />}
              >
                <Route
                  index
                  element={<ProtectedRoute><HomePage /></ProtectedRoute>}
                />
                <Route
                  exact
                  path="home"
                  element={<ProtectedRoute><HomePage /></ProtectedRoute>}
                />
                <Route
                  exact
                  path="appointments"
                  element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>}
                />
                <Route
                  exact
                  path="people"
                  element={<ProtectedRoute><PeoplePage /></ProtectedRoute>}
                />
                <Route
                  exact
                  path="profile"
                  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
                />
                <Route
                  exact
                  path="add-appt"
                  element={<ProtectedRoute><AddAppointment /></ProtectedRoute>}
                />

              </Route>
              <Route
                exact
                path="/logout"
                element={<LogoutPage />}
              />

            </Routes>
          </div>
        </div>
      </Router>
    </MedicalProvider>
  );
}
