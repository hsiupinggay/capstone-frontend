/* eslint-disable no-unused-vars */
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { MedicalProvider } from './components/others/store';
import ProtectedRoute from './components/molecules/ProtectedRoute';

// Pages import
import HomePage from './components/pages/HomePage';
import AppointmentsPage from './components/pages/AppointmentsPage';
import ContactsPage from './components/pages/ContactsPage';
import ProfilePage from './components/pages/ProfilePage';
import LogoutPage from './components/pages/LogoutPage';
import AddAppointment from './components/organisms/AddAppointment';
import AddPatient from './components/organisms/AddPatient';
import AddHospital from './components/organisms/AddHospital';
import AddDepartment from './components/organisms/AddDepartment';
import UserAuthPage from './components/pages/UserAuthPage';
import AddChaperone from './components/organisms/AddChaperone';
import EditProfile from './components/organisms/EditProfile';
import ViewProfile from './components/organisms/ViewProfile';
import NavBar from './components/molecules/Navbar';

export default function App() {
  return (
    <MedicalProvider>
      <Router>
        <div className="main-container w-screen h-screen
          flex flex-col items-center relative pt-20"
        >

          <div className="display">
            <Routes>
              <Route
                exact
                path="/auth"
                element={<UserAuthPage />}
              />
              <Route
                exact
                path="/"
                element={<NavBar />}
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
                  path="contacts"
                  element={<ProtectedRoute><ContactsPage /></ProtectedRoute>}
                />
                <Route
                  exact
                  path="profile"
                  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
                >
                  <Route
                    index
                    element={<ProtectedRoute><ViewProfile /></ProtectedRoute>}
                  />
                  <Route
                    exact
                    path="view"
                    element={<ProtectedRoute><ViewProfile /></ProtectedRoute>}
                  />
                  <Route
                    exact
                    path="edit"
                    element={<ProtectedRoute><EditProfile /></ProtectedRoute>}
                  />
                </Route>
                <Route
                  exact
                  path="add-appt"
                  element={<ProtectedRoute><AddAppointment /></ProtectedRoute>}
                />
                <Route path="add-patient" element={<ProtectedRoute><AddPatient /></ProtectedRoute>} />
                <Route path="add-hospital" element={<ProtectedRoute><AddHospital /></ProtectedRoute>} />
                <Route path="add-department" element={<ProtectedRoute><AddDepartment /></ProtectedRoute>} />
                <Route path="add-chaperone" element={<ProtectedRoute><AddChaperone /></ProtectedRoute>} />

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
