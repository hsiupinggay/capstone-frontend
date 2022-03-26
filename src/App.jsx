/* eslint-disable no-unused-vars */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { MedicalProvider } from './components/others/store';
import { ApptProvider } from './components/others/ApptContext';
import ProtectedRoute from './components/molecules/ProtectedRoute';
import mainTheme from './theme';

// Component Imports
import HomePage from './components/pages/HomePage';
import AppointmentsPage from './components/pages/AppointmentsPage';
import ContactsPage from './components/pages/ContactsPage';
import ProfilePage from './components/pages/ProfilePage';
import AddAppointment from './components/organisms/AddAppointment';
import AddPatient from './components/organisms/AddPatient';
import AddHospital from './components/organisms/AddHospital';
import AddDepartment from './components/organisms/AddDepartment';
import UserAuthPage from './components/pages/UserAuthPage';
import AddChaperone from './components/organisms/AddChaperone';
import EditProfile from './components/organisms/EditProfile';
import ViewProfile from './components/organisms/ViewProfile';
import AddMedPage from './components/pages/AddMedPage';
import EditMedCard from './components/organisms/EditMedCard';
import NavBar from './components/molecules/Navbar';
import PatientProfilePage from './components/pages/PatientProfilePage';
import PatientVisitLocationPage from './components/pages/PatientVisitLocationPage';
import PatientMemoPage from './components/pages/PatientMemoPage';
import ChatRoomPage from './components/pages/ChatRoomPage';
import style from './AppCss';
import MedicationPage from './components/pages/MedicationPage';

/*
 * ========================================================
 * ========================================================
 *
 *                      App Component
 *
 * ========================================================
 * ========================================================
 */
export default function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <MedicalProvider>
        <Router>
          <div className="main-container w-screen h-screen
          flex flex-col items-center relative "
          >
            <Box sx={style}>
              <div className="display">
                <Routes>
                  <Route
                    exact
                    path="/auth"
                    element={<UserAuthPage />}
                  />
                  {/* ProtectedRoute wraps around all rounds that are authenticated */}
                  <Route element={<ProtectedRoute />}>
                    <Route
                      exact
                      path="/"
                      element={<NavBar />}
                    >
                      <Route
                        index
                        element={<HomePage />}
                      />
                      <Route
                        exact
                        path="home"
                        element={<HomePage />}
                      />
                      <Route
                        exact
                        path="appointments"
                        element={<AppointmentsPage />}
                      />
                      <Route
                        exact
                        path="contacts"
                        element={<ContactsPage />}
                      />
                      <Route
                        exact
                        path="profile"
                        element={<ProfilePage />}
                      >
                        <Route
                          index
                          element={<ViewProfile />}
                        />
                        <Route
                          exact
                          path="view"
                          element={<ViewProfile />}
                        />
                        <Route
                          exact
                          path="edit"
                          element={<EditProfile />}
                        />
                      </Route>
                      <Route
                        exact
                        path="add-appt"
                        element={<AddAppointment />}
                      />
                      <Route path="add-patient" element={<AddPatient />} />
                      <Route path="add-hospital" element={<AddHospital />} />
                      <Route path="add-department" element={<AddDepartment />} />
                      <Route path="add-chaperone" element={<AddChaperone />} />
                      <Route
                        exact
                        path="patient"
                        element={<PatientProfilePage />}
                      />
                      <Route path="location-details" element={<PatientVisitLocationPage />} />
                      <Route path="chat" element={<ChatRoomPage />} />
                      <Route path="patient-memos" element={<PatientMemoPage />} />
                      <Route path="add-med" element={<AddMedPage />} />
                      <Route path="med-list" element={<MedicationPage />} />
                      <Route path="edit-med" element={<EditMedCard />} />
                    </Route>
                  </Route>
                </Routes>
              </div>
            </Box>
          </div>
        </Router>
      </MedicalProvider>
    </ThemeProvider>
  );
}
