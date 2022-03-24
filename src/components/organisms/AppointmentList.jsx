/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Box, Paper, List, Card, CardActions, Typography,
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
  displayDataArray, filterData, setOpenApptModal, setApptModalType, setApptPopupDetails,
}) {
  const [listDisplay, setListDisplay] = useState([]);
  const [order, setOrder] = useState('latest first');
  const [originialDataArray, setOriginalDataArray] = useState();

  let userDisplayArray = [];
  displayDataArray.forEach((patient) => {
    const { identity, appointments, _id } = patient;
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
        apptObj: {
          patientName: displayName,
          patientId: _id,
          appointmentId: appointment._id,
          date: appointment.date,
          time: appointment.time,
          hospital: appointment.hospital.name,
          department: appointment.hospital.department,
          chaperone: appointment.chaperone !== undefined ? appointment.chaperone.name : '',
          chaperoneId: appointment.chaperone !== undefined ? appointment.chaperone.chaperoneId : '',
          notes: appointment.notes !== undefined ? {
            userImage: appointment.notes.userImage || '',
            userName: `${appointment.notes.userName.first} ${appointment.notes.userName.last}`,
            date: appointment.notes.date,
            note: appointment.notes.note,
          } : '',
        },
      };
      displayArray.push(displayObject);
    });
    userDisplayArray = [...userDisplayArray, ...displayArray];
  });

  // Sort userDisplayArray based on dates
  userDisplayArray.forEach((appointment) => (appointment.convertedDate = moment(appointment.date, 'DD-MMM-YYYY').format('YYYY-MM-DD')));
  userDisplayArray.sort((a, b) => new Date(a.convertedDate) - new Date(b.convertedDate));

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
      setOrder('latest first');
      setListDisplay(listDisplay);
    }
  };

  const resetFilters = () => {
    setListDisplay(originialDataArray);
  };
  // Handle onClick on events to display full details
  const openModal = (apptObject) => {
    console.log('isnide func');
    setOpenApptModal(true);
    setApptModalType('view-full-appointment');
    setApptPopupDetails(apptObject);
  };
  const displayAppointmentList = listDisplay.map((appointment) => (
    <Card key={appointment.id} rounded elevation={6} sx={{ p: 2, mb: 2, width: '60vw' }}>
      <CardContent>
        <Typography variant="h3" sx={{ my: 2, textAlign: 'center', }}>
          {appointment.patientName}<br/>
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', }} component='div'>
          <Box fontWeight='fontWeightBold' display='inline'>Chaperone:</Box> {appointment.chaperone}<br/>
          <Box fontWeight='fontWeightBold' display='inline'>Appointment Date:</Box> {appointment.date}<br/>
          <Box fontWeight='fontWeightBold' display='inline'>Location:</Box><br/>
          {appointment.hospital},<br/>
          {appointment.department}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ justifyContent: 'end' }} onClick={(e) => {setOpenApptModal(true); setApptModalType('edit')}}>Edit</Button>
      </CardActions>
    </Card>
  ));

  return (
    <div className="h-full overflow-auto">
      <Typography variant="h2" sx={{ mb: 2 }}>Appointment List</Typography>
        <Box style={{ maxHeight: 600, overflow: 'auto' }}>
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
  );
}

export default AppointmentList;
