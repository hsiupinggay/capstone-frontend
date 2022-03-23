/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Box, List, Card,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function AppointmentList({
  displayDataArray, filterData, setOpenApptModal, setApptModalType,
}) {
  const [listDisplay, setListDisplay] = useState([]);
  const [order, setOrder] = useState('latest first');
  const [originialDataArray, setOriginalDataArray] = useState();

  let userDisplayArray = [];
  displayDataArray.forEach((patient) => {
    const { identity, appointments } = patient;
    const displayName = `${identity.name.first} ${identity.name.last}`;
    const displayArray = [];
    appointments.forEach((appointment) => {
      const appointmentDate = appointment.date.split('-');
      const appointmentDay = Number(appointmentDate[0]);
      const appointmentMonth = Number(monthNames.findIndex((month) => month === appointmentDate[1]));
      const appointmentYear = Number(appointmentDate[2]);
      if (!appointment.chaperone) appointment.chaperone = 'none assigned';
      const displayObject = {
        patientName: displayName,
        chaperone: appointment.chaperone.name || 'none assigned',
        date: `${appointment.date}`,
        time: `${appointment.time}`,
        hospital: `${appointment.hospital.name}`,
        department: `${appointment.hospital.department}`,
        event_date: new Date(`${appointmentYear}-${appointmentMonth}-${appointmentDay}`),
        id: appointment._id,
      };
      displayArray.push(displayObject);
    });
    userDisplayArray = [...userDisplayArray, ...displayArray];
  });

  console.log(userDisplayArray);
  // Sort userDisplayArray based on dates
  userDisplayArray.forEach((appointment) => (appointment.convertedDate = moment(appointment.date, 'DD-MMM-YYYY').format('YYYY-MM-DD')));
  userDisplayArray.sort((a, b) => new Date(a.convertedDate) - new Date(b.convertedDate));
  // userDisplayArray.sort((a, b) => a.event_date - b.event_date);
  console.log('after', userDisplayArray);

  useEffect(() => {
    const filteredDisplayArray = [];

    if (filterData !== null) {
      // Hospital Filter
      if (filterData.hospitalFilter !== null) {
        for (let i = 0; i < filterData.hospitalFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            if (userDisplayArray[j].hospital === filterData.hospitalFilter[i]) filteredDisplayArray.push(userDisplayArray[j]);
          }
        }
      }
      // Department Filter
      if (filterData.departmentFilter !== null) {
        for (let i = 0; i < filterData.departmentFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            console.log(userDisplayArray[j].department);
            console.log(filterData.departmentFilter[i]);
            console.log(userDisplayArray[j].department === filterData.departmentFilter[i]);
            if (userDisplayArray[j].department === filterData.departmentFilter[i]) filteredDisplayArray.push(userDisplayArray[j]);
          }
        }
      }
      // Patient Filter
      if (filterData.patientFilter !== null) {
        for (let i = 0; i < filterData.patientFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            if (userDisplayArray[j].patientName === filterData.patientFilter[i]) filteredDisplayArray.push(userDisplayArray[j]);
          }
        }
      }
      // Chaperone Filter
      if (filterData.chaperoneFilter !== null) {
        for (let i = 0; i < filterData.chaperoneFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            if (userDisplayArray[j].chaperone === filterData.chaperoneFilter[i]) filteredDisplayArray.push(userDisplayArray[j]);
          }
        }
      }
      // Date Filter
      if (filterData.dateFilter !== null) {
        for (let i = 0; i < filterData.dateFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            if (userDisplayArray[j].date === filterData.dateFilter[i]) filteredDisplayArray.push(userDisplayArray[j]);
          }
        }
      }
      setListDisplay(filteredDisplayArray);
    }
    // Validation, if there are no filters, filtereredDisplayArray is empty
    if (filteredDisplayArray.length === 0) {
      console.log('filterrrrr');
      setListDisplay(userDisplayArray);
      setOriginalDataArray(userDisplayArray);
    }
  }, [filterData, displayDataArray]);

  const sortDate = () => {
    listDisplay.forEach((appointment) => (appointment.convertedDate = moment(appointment.date, 'DD-MMM-YYYY').format('YYYY-MM-DD')));
    if (order === 'latest first') {
      listDisplay.sort((a, b) => new Date(b.convertedDate) - new Date(a.convertedDate));
      setOrder('oldest first');
      setListDisplay(listDisplay);
    } else {
      listDisplay.sort((a, b) => new Date(a.convertedDate) - new Date(b.convertedDate));
      console.log('hi');
      setOrder('latest first');
      setListDisplay(listDisplay);
    }
    console.log(listDisplay);
  };

  const resetFilters = () => {
    console.log(originialDataArray);
    setListDisplay(originialDataArray);
  };

  const displayAppointmentList = listDisplay.map((appointment) => (
    <div key={appointment.id}>
      <Card variant="outlined">
        <CardContent>
          {appointment.patientName}
          <br />
          {appointment.chaperone}
          <br />
          {appointment.date}
          <br />
          {appointment.hospital}
          <br />
          {appointment.department}
        </CardContent>

        <Button onClick={() => { setOpenApptModal(true); setApptModalType('edit'); }}>Edit</Button>
      </Card>
    </div>
  ));

  return (
    <div className="h-5/6 overflow-hidden">
      <h1>Appointment List</h1>
      <div className="h-full overflow-auto">
        <Box>
          <Tooltip arrow title="Sort By Appointment Date">
            <CalendarMonthIcon variant="contained" onClick={sortDate} />
          </Tooltip>
          <Tooltip arrow title="Reset Filters">
            <RestartAltIcon variant="contained" onClick={resetFilters} />
          </Tooltip>
          <List>
            {displayAppointmentList}
          </List>
        </Box>
      </div>
    </div>
  );
}

export default AppointmentList;
