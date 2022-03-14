import React from 'react';
import { Box, Paper, List, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';

// var arr = [{id:1, date:'2020-12-01'}, {id:1, date:'2020-12-15'}, {id:1, date:'2020-12-12'}]

// function sortByDate(a, b) {
//     if (a.date < b.date) {
//         return 1;
//     }
//     if (a.date > b.date) {
//         return -1;
//     }
//     return 0;
// }

// const sorted = arr.sort(sortByDate);
// console.log(sorted);

// array.sort(function(a,b){
//   // Turn your strings into dates, and then subtract them
//   // to get a value that is either negative, positive, or zero.
//   return new Date(b.date) - new Date(a.date);
// });

// var arr = [{id:1, date:'2020-12-01'}, {id:1, date:'2020-12-15'}, {id:1, date:'2020-12-12'}]

// function sortByDate(a, b) {
//     if (a.date < b.date) {
//         return 1;
//     }
//     if (a.date > b.date) {
//         return -1;
//     }
//     return 0;
// }

// const sorted = arr.sort(sortByDate);
// console.log(sorted);



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
      if (!appointment.chaperone) appointment.chaperone = 'none assigned';
      const displayObject = {
        patientName: displayName,
        chaperone: appointment.chaperone.name || 'none assigned',
        date: `${appointment.date} | ${appointment.time}`,
        hospital: `${appointment.hospital.name}, ${appointment.hospital.department}`,
      }
      displayArray.push(displayObject);
    });
    console.log(displayArray);
    userDisplayArray = [...userDisplayArray, ...displayArray];
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