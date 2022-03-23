/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/*
 * ========================================================
 * ========================================================
 *
 *                       Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useState } from 'react';
// import axios from 'axios';
import {
  Typography, Box, TextField,
} from '@mui/material';
import { TimePicker, LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import moment from 'moment';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import appointmentPopupStyles from './AppointmentDetailPopupCss';

/*
 * ========================================================
 * ========================================================
 *
 *       Component for rendering add appointment form
 *
 * ========================================================
 * ========================================================
 */
// export default function AppointmentDetailPopup({ apptObj, arraySetterFunction }) {
export default function AppointmentDetailPopup() {
  const [editAppt, setEditAppt] = useState(false);
  const [date, setDate] = useState();
  const [value, setValue] = useState();

  // ################################ Placeholder appointment object ################################
  const apptObj = {
    patientName: 'Humpty Dumpty',
    patientId: '62259fadb4a77ae0343f7306',
    appointmentId: '6233f9b6c41fb01960e60203',
    date: '10-Apr-2022',
    time: '11:00',
    hospital: 'Tan Tock Seng Hospital',
    department: 'Cadiology',
    chaperone: 'Bryan',
    chaperoneId: '62259eddb4a77ae0343f7305',
    notes: {
      userImage: 'https://neighbourhood-app.s3.ap-southeast-1.amazonaws.com/daniel-radcliffe-harry-potter.jpeg',
      userName: 'Shannon Suresh',
      date: '11-Apr-2022',
      note: 'Doc says all good but need to watch cholesterol.',
    },
  };

  // On form submit, send data to backend to store in DB
  const handleSubmit = (formattedDate, unformattedTime) => {
    const data = {
      patientId: apptObj.patientId,
      appointmentId: apptObj.appointmentId,
      date: formattedDate || null,
      time: `${moment(`${unformattedTime.c.hour}:${unformattedTime.minute}`, 'HH:m').format('HH:mm')}` || null,
    };
    console.log(data);
    //   axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-appointment`, data).then((response) => {
    //     if (response.status === 200) {
    //       setSuccessMessage(
    //         <Typography sx={apptPopupStyles.outcomeMessage}>
    //           <strong>You have Added a New Appointment! </strong>
    //           <div>
    //             <strong>Patient:</strong>
    //             {' '}
    //             {`${patientName}`}
    //           </div>
    //           <div>
    //             <strong>Hospital:</strong>
    //             {' '}
    //             {`${hospital}`}
    //           </div>
    //           <div>
    //             <strong>Department:</strong>
    //             {' '}
    //             {`${department}`}
    //           </div>
    //           <div>
    //             <strong>Date:</strong>
    //             {' '}
    //             {`${response.data.data[response.data.data.length - 1].date}`}
    //           </div>
    //           <div>
    //             <strong>Time:</strong>
    //             {' '}
    //             {`${response.data.data[response.data.data.length - 1].time}`}
    //           </div>
    //           <div>
    //             <strong>Chaperone:</strong>
    //             {' '}
    //             {`${chaperone || 'Nil'}`}
    //           </div>

  //         </Typography>,
  //       );
  //     }
  //   });
  };

  const toggleEditting = () => {
    if (editAppt) {
      setEditAppt(false);
    } else {
      setEditAppt(true);
    }
  };

  return (
    <div>
      <Button onClick={toggleEditting}>Edit</Button>
      <Typography>
        <Box>
          {apptObj.patientName}
          {' '}
          has an appointment
          {' '}
          on
        </Box>
        { !editAppt
          ? <Box>{apptObj.date}</Box>
          : (
            <Box>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Reschedule Date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(`${moment(`${newValue.c.year}-${newValue.c.month}-${newValue.c.day}`).format('YYYY-MM-DD')}`);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          )}
        <Box>
          at
        </Box>
        { !editAppt
          ? <Box>{apptObj.time}</Box>
          : (
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Reschedule Time"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          )}
        <Box>
          at the
          {' '}
          {apptObj.department}
          {' '}
          department in
        </Box>
        <Box>
          {apptObj.hospital}
          {' '}
          <br />
          Chaperone:
          {' '}
          {apptObj.chaperone}
        </Box>
        { !editAppt
          ? <Box />
          : (
            <Button onClick={() => { handleSubmit(date, value); }}>
              Submit
            </Button>
          )}
        <Box />
      </Typography>
    </div>
  );
}
