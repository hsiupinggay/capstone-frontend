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
import ApptModal from '../molecules/ApptModal';
import ApptFilterDisplay from '../molecules/ApptFilterDisplay';
import AppointmentPageStyles from './AppointmentsPageCss';
import Box from '@mui/material/Box';

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
  const [displayDataArray, setDisplayDataArray] = useState();
  const [openApptModal, setOpenApptModal] = useState(false);
  const [apptModalType, setApptModalType] = useState('');
  const [filterData, setFilterData] = useState(
    {
      hospitalFilter: [],
      departmentFilter: [],
      patientFilter: [],
      chaperoneFilter: [],
      dateFilter: [],
    }
  );
  const [filterParams, setFilterParams] = useState(
    {
      hospital: [],
      department: [],
      patients: [],
      chaperone: [],
      date: [],
    }
  );

  // On-mount useEffect:
  // axios call for all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    // ################################## HARDCODED FOR NOW  ##################################
    // data.append('userId', userId);
    data.append('userId', '62259eddb4a77ae0343f7305');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        const axiosData = result.data.patientDetailsObj;
        // Save the array of patients data under the USER as a state
        setDisplayDataArray(axiosData);

        // Get filter params through axiosData.visitDetails
        // Filter params are the options for the filter button
        const hospitalArr = [];
        const departmentArr = [];
        const patientArr = [];
        const chaperoneArr = [];
        const dateArr = [];
        for (let i = 0; i < axiosData.length; i += 1) {
          // Available patient filters
          const patient = `${axiosData[i].identity.name.first} ${axiosData[i].identity.name.last}`;
          patientArr.push(patient);
          // Available hospital and department filters
          for (let j = 0; j < axiosData[i].visitDetails.clinics.length; j += 1) {
            hospitalArr.push(axiosData[i].visitDetails.clinics[j].hospital);
            for(let k = 0; k < axiosData[i].visitDetails.clinics[j].departments.length; k += 1) {
              departmentArr.push(axiosData[i].visitDetails.clinics[j].departments[k]);
            }
          }
          // Available chaperone filters
          for (let j = 0; j < axiosData[i].visitDetails.chaperones.length; j += 1) {
            chaperoneArr.push(axiosData[i].visitDetails.chaperones[j].name);
          }
          // Available dates filters
          for (let j = 0; j < axiosData[i].appointments.length; j += 1) {
            dateArr.push(axiosData[i].appointments[j].date);
          }
        }
        // Function used to get an array of unique values in the case of duplicates
        function makeUniqueArray(value, index, self) {
          return self.indexOf(value) === index;
        }
        setFilterParams({
          hospitals: hospitalArr.filter(makeUniqueArray),
          departments: departmentArr.filter(makeUniqueArray),
          patients: patientArr.filter(makeUniqueArray),
          chaperones: chaperoneArr.filter(makeUniqueArray),
          dates: dateArr.filter(makeUniqueArray),
        });
      });
  }, []);

  return (
    <Box sx={AppointmentPageStyles.mainContainer}>
      <AppointmentsNavigator 
        toggleView={toggleView}
        setToggleView={setToggleView}
        setOpenApptModal={setOpenApptModal}
        setApptModalType={setApptModalType}
      />
      { toggleView 
        ? <>
          <ApptFilterDisplay filterData={filterData} />
          <AppointmentList
            displayDataArray={displayDataArray}
            filterData={filterData}
            setOpenApptModal={setOpenApptModal}
            setApptModalType={setApptModalType}
          />
        </>
        : <AppointmentCalendar
            displayDataArray={displayDataArray}
            setOpenApptModal={setOpenApptModal}
            setApptModalType={setApptModalType}
          />
      }
      <ApptModal
        openApptModal={openApptModal}
        setOpenApptModal={setOpenApptModal}
        apptModalType={apptModalType}
        setFilterData={setFilterData}
        filterParams={filterParams}
        filterData={filterData}
      />
    </Box>
  );
}
