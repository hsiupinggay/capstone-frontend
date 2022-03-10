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
import AddPatient from './components/organisms/AddPatient';
import AddHospital from './components/organisms/AddHospital';
import AddDepartment from './components/organisms/AddDepartment';
import UserAuthPage from './components/pages/UserAuthPage';
import AddChaperone from './components/organisms/AddChaperone';

export default function App() {
  return (
    <MedicalProvider>
      <Router>
        <div className="main-container w-screen h-screen
          flex flex-col items-center"
<<<<<<< HEAD
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
=======
          >
            <div className="nav-div w-full border-solid border-black border-2">
              <nav className="flex justify-evenly items-center">
                <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/appointments">Appointments</NavLink>
                <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/people">People</NavLink>
                <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/profile">Profile</NavLink>
                <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/logout">Logout</NavLink>
              </nav>
            </div>
            <div className="display">
              <Routes>
                <Route path="/" element={<UserAuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/people" element={<PeoplePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/logout" element={<LogoutPage setAuth={setAuth} />} />
                <Route path="/add-appt" element={<AddAppointment />} />
                <Route path="/add-patient" element={<AddPatient />} />
                <Route path="/add-hospital" element={<AddHospital />} />
                <Route path="/add-department" element={<AddDepartment />} />
                <Route path="/add-chaperone" element={<AddChaperone />} />
              </Routes>
            </div>
>>>>>>> 4ed469913036321d059220164648f4bf03c60987
          </div>
        </div>
      </Router>
    </MedicalProvider>
  );
}
