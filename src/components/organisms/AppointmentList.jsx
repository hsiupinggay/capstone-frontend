import React, { useState, useEffect } from 'react';
import { Box, Paper, List, Card, CardActions, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

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

function AppointmentList({ displayDataArray, filterData, setOpenApptModal, setApptModalType }) {
  const [listDisplay, setListDisplay] = useState([]);
  let userDisplayArray = [];

  displayDataArray.forEach(patient => {
    const { identity, appointments } = patient
    const displayName = `${identity.name.first} ${identity.name.last}`;
    const displayArray = [];
    appointments.forEach(appointment => {
      const appointmentDate = appointment.date.split('-');
      const appointmentDay = Number(appointmentDate[0]);
      const appointmentMonth = Number(monthNames.findIndex(month => month === appointmentDate[1]));
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
      }
      displayArray.push(displayObject);
    });
    userDisplayArray = [...userDisplayArray, ...displayArray];
  });

  // Sort userDisplayArray based on dates
  userDisplayArray.sort((a, b) => a.event_date - b.event_date);

  useEffect(() => {
    const filteredDisplayArray = [];
    
    if (filterData !== null) {  
      // Hospital Filter
      if (filterData.hospitalFilter !== null) {
        for (let i = 0; i < filterData.hospitalFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            if (userDisplayArray[j].hospital === filterData.hospitalFilter[i]) filteredDisplayArray.push(userDisplayArray[j])
          }
        }
      }
      // Department Filter
      if (filterData.departmentFilter !== null) {
        for (let i = 0; i < filterData.departmentFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            console.log(userDisplayArray[j].department);
            console.log(filterData.departmentFilter[i]);
            console.log(userDisplayArray[j].department === filterData.departmentFilter[i])
            if (userDisplayArray[j].department === filterData.departmentFilter[i]) filteredDisplayArray.push(userDisplayArray[j])
          }
        }
      }
      // Patient Filter
      if (filterData.patientFilter !== null) {
        for (let i = 0; i < filterData.patientFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            if (userDisplayArray[j].patientName === filterData.patientFilter[i]) filteredDisplayArray.push(userDisplayArray[j])
          }
        }
      }
      // Chaperone Filter
      if (filterData.chaperoneFilter !== null) {
        for (let i = 0; i < filterData.chaperoneFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            if (userDisplayArray[j].chaperone === filterData.chaperoneFilter[i]) filteredDisplayArray.push(userDisplayArray[j])
          }
        }
      }
      // Date Filter
      if (filterData.dateFilter !== null) {
        for (let i = 0; i < filterData.dateFilter.length; i += 1) {
          for (let j = 0; j < userDisplayArray.length; j += 1) {
            if (userDisplayArray[j].date === filterData.dateFilter[i]) filteredDisplayArray.push(userDisplayArray[j])
          }
        }
      }
      setListDisplay(filteredDisplayArray);
    }
    // Validation, if there are no filters, filtereredDisplayArray is empty
    if (filteredDisplayArray.length === 0) setListDisplay(userDisplayArray);
  }, [filterData]);

  const displayAppointmentList = listDisplay.map(appointment => (
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
    <div className="h-5/6 overflow-hidden">
      <Typography variant="h2" sx={{ mb: 2 }}>Appointment List</Typography>
        <Box style={{ maxHeight: 600, overflow: 'auto' }}>
          <List>
            {displayAppointmentList}
          </List>
        </Box>
    </div>
  );
}

export default AppointmentList;