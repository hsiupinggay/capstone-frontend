import React, { useEffect } from 'react';
import axios from 'axios';

import AppointmentCalendar from '../organisms/AppointmentCalendar';

function AppointmentsPage() {
  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    // ################################## HARDCODED FOR NOW  ##################################
    // data.append('userId', userId);
    data.append('userId', '62259eddb4a77ae0343f7305');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        console.log(result.data);
      });
  }, []);

  return (
    <AppointmentCalendar />
  );
}

export default AppointmentsPage;
