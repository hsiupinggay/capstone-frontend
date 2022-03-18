/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentsNavigator from '../organisms/AppointmentsNavigator';
import AppointmentCalendar from '../organisms/AppointmentCalendar';
import AppointmentList from '../organisms/AppointmentList';

/*
* ========================================================
* ========================================================
*
*                AppointmentsPage Component
*
* ========================================================
* ========================================================
*/
export default function AppointmentsPage() {
  const [toggleView, setToggleView] = useState(false);
  const [displayData, setDisplayData] = useState();
  const [filterData, setFilterData] = useState()

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    // ################################## HARDCODED FOR NOW  ##################################
    // data.append('userId', userId);
    data.append('userId', '62259eddb4a77ae0343f7305');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        // result.data === patients.array
        // patient { appointments.array, identity.object, visitDetails.object, _id.String }
        // appointment = { chaperone, date, hospital, notes, time }
        console.log(result.data); // returns patientDetailsObject - maybe need better name?
        setDisplayData(result.data);
      });
  }, []);

  return (
    <div className="h-5/6">
      <AppointmentsNavigator toggleView={toggleView} setToggleView={setToggleView} setFilterData={setFilterData} />
      { toggleView 
        ? <AppointmentList displayData={displayData} filterData={filterData} />
        : <AppointmentCalendar displayData={displayData} />
      }
    </div>
  );
}
