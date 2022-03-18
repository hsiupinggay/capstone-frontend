import React from 'react';
import { Box, Paper, List, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';

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

function AppointmentList({ displayData }) {
  // const displayObj = {
  //   Who, // Patient Identity
  //   With, // Chaperone
  //   When, // Date
  //   Where, // Hospital
  // };

  const userDataArray = displayData.patientDetailsObj;
  console.log(userDataArray);

  let userDisplayArray = [];

  userDataArray.forEach(patient => {
    const { identity, appointments } = patient
    const displayName = `${identity.name.first} ${identity.name.last}`;
    console.log(displayName);
    const displayArray = [];
    appointments.forEach(appointment => {
      // const displayDate = appointment.date;
      // console.log('slicing out months: ', appointment.date.slice(3, 6));
      // const eventDate = appointment.date.replace(appointment.date.slice(3, 6), monthNames.findIndex(month => month === appointment.date.slice(3, 6)));
      // console.log(eventDate);
      const appointmentDate = appointment.date.split('-');
      const appointmentDay = Number(appointmentDate[0]);
      const appointmentMonth = Number(monthNames.findIndex(month => month === appointmentDate[1]));
      const appointmentYear = Number(appointmentDate[2]);
      if (!appointment.chaperone) appointment.chaperone = 'none assigned';
      const displayObject = {
        patientName: displayName,
        chaperone: appointment.chaperone.name || 'none assigned',
        date: `${appointment.date} | ${appointment.time}`,
        hospital: `${appointment.hospital.name}, ${appointment.hospital.department}`,
        event_date: new Date(`${appointmentYear}-${appointmentMonth}-${appointmentDay}`),
      }
      displayArray.push(displayObject);
    });
    console.log(displayArray);
    userDisplayArray = [...userDisplayArray, ...displayArray];
    userDisplayArray.sort((a, b) => a.event_date - b.event_date)
  });

  const displayAppointmentList = userDisplayArray.map(appointment => (
    <div key={appointment.patientName + appointment.date}>
      <Card variant="outlined">
        <CardContent>
          {appointment.patientName}<br/>
          {appointment.chaperone}<br/>
          {appointment.date}<br/>
          {appointment.hospital}
        </CardContent>
      </Card>
    </div>
  ));

  console.log(userDisplayArray);
  return (
    <div className="h-5/6 overflow-hidden">
      <h1>Appointment List</h1>
      <div className="h-full overflow-auto">
        <Box>
          <List>
            {displayAppointmentList}
          </List>
        </Box>
      </div>
    </div>
  );
}

export default AppointmentList;