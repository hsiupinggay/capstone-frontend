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
  // const {apptStore, apptDispatch} = useApptContext();

  const [toggleView, setToggleView] = useState(false);
  const [displayDataArray, setDisplayDataArray] = useState();
  const [openApptModal, setOpenApptModal] = useState(false);
  const [apptModalType, setApptModalType] = useState('');
  const [filterData, setFilterData] = useState(null);
  const [filterParams, setFilterParams] = useState(
    {
      hospital: [],
      department: [],
      patients: [],
      chaperone: [],
      date: [],
    }
  );

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    // ################################## HARDCODED FOR NOW  ##################################
    // data.append('userId', userId);
    data.append('userId', '62259eddb4a77ae0343f7305');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        const data = result.data.patientDetailsObj
        // Save the array of patients data under the USER as a state
        setDisplayDataArray(data);

        // Comb through data for filters
        const hospitalArr = [];
        const departmentArr = [];
        const patientArr = [];
        const chaperoneArr = [];
        const dateArr = [];
        for (let i = 0; i < data.length; i += 1) {
          // Update patient filters
          const patient = `${data[i].identity.name.first} ${data[i].identity.name.last}`;
          patientArr.push(patient);

          // Update hospital and department filters
          for (let j = 0; j < data[i].visitDetails.clinics.length; j += 1) {
            hospitalArr.push(data[i].visitDetails.clinics[j].hospital);
            for(let k = 0; k < data[i].visitDetails.clinics[j].departments.length; k += 1) {
              departmentArr.push(data[i].visitDetails.clinics[j].departments[k]);
            }
          }

          // Update chaperone filters
          for (let j = 0; j < data[i].visitDetails.chaperones.length; j += 1) {
            chaperoneArr.push(data[i].visitDetails.chaperones[j].name);
          }

          // Update dates filters
          for (let j = 0; j < data[i].appointments.length; j += 1) {
            dateArr.push(data[i].appointments[j].date);
          }
        }
        // Outside of for-loop hell, make each array unique and set filter data
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

  // useEffect(() => {console.log('filter params updated: ', filterParams)}, [filterParams]);
  // useEffect(() => {console.log('filter data updated: ', filterData)}, [filterData]);

  return (
    <>
      <div className="h-5/6">
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
      </div>
      <ApptModal
        openApptModal={openApptModal}
        setOpenApptModal={setOpenApptModal}
        apptModalType={apptModalType}
        setFilterData={setFilterData}
        filterParams={filterParams}
        filterData={filterData}
      />
    </>
  );
}
