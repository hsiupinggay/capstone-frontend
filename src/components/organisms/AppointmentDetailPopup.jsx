/* eslint-disable consistent-return */
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography, Box, TextField,
  Tooltip, IconButton,
} from '@mui/material';
import { TimePicker, LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import moment from 'moment';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DateTime } from 'luxon';
import { useMedicalContext } from '../others/store';
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
export default function AppointmentDetailPopup({ apptPopupDetails, setDisplayDataArray }) {
  const [editAppt, setEditAppt] = useState(false);
  const [date, setDate] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [displayDate, setDisplayDate] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [value, setValue] = useState();
  const [memo, setMemo] = useState('');
  const [memoDate, setMemoDate] = useState('');
  const [memoUserName, setMemoUserName] = useState('');
  const { store } = useMedicalContext();
  const { userId, firstName, lastName } = store;
  useEffect(() => {
    console.log(apptPopupDetails.date);
    console.log(apptPopupDetails.time);
    setMemo(apptPopupDetails.notes.note);
    setMemoDate(apptPopupDetails.notes.date);
    setMemoUserName(apptPopupDetails.notes.userName);
    setDate(new Date(apptPopupDetails.date));
    setValue(DateTime.fromFormat(apptPopupDetails.time, 'h:mm a').toISO());
  }, []);
  // useEffect(() => {
  // });

  // On form submit, send data to backend to store in DB
  const handleSubmit = (formattedDate, unformattedTime) => {
    if (!formattedDate && !unformattedTime) {
      return setSuccessMessage('No changes detected. Please try again.');
    }
    const data = {
      userId,
      patientId: apptPopupDetails.patientId,
      appointmentId: apptPopupDetails.appointmentId,
      date: formattedDate !== undefined ? formattedDate : null,
      time: unformattedTime !== undefined ? `${moment(unformattedTime, 'HH:mm').format('h:mm a')}` : null,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/edit-appointment`, data).then((response) => {
      if (response.status === 200) {
        setDisplayDataArray(response.data.patientDetailsObj);
        setSuccessMessage(
          <Typography>
            Your new appointment details:
            {
              formattedDate !== undefined
                ? (
                  <Box>
                    <strong>Date:</strong>
                    {' '}
                    {`${displayDate}`}
                  </Box>
                )
                : <Box />
            }
            {
              unformattedTime !== undefined
                ? (
                  <Box>
                    <strong>Time:</strong>
                    {' '}
                    {`${moment(unformattedTime, 'HH:mm').format('h:mm a')}`}
                  </Box>
                )
                : <Box />
            }
          </Typography>,
        );
      }
    });
  };

  const toggleEditting = () => {
    if (editAppt) {
      setEditAppt(false);
    } else {
      setEditAppt(true);
    }
  };

  const updateDate = (newValue) => {
    setDate(`${moment(`${newValue.c.year}-${newValue.c.month}-${newValue.c.day}`).format('YYYY-MM-DD')}`);
    setDisplayDate(`${moment(`${newValue.c.year}-${newValue.c.month}-${newValue.c.day}`).format('DD-MMM-YY')}`);
  };

  const toggleNoteEditing = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleMemoSubmit = () => {
    const data = {
      userId,
      firstName,
      lastName,
      patientId: apptPopupDetails.patientId,
      appointmentId: apptPopupDetails.appointmentId,
      note: memo,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-memo`, data).then((response) => {
      setDisplayDataArray(response.data.patientDetailsObj);
      setIsEditing(false);
      console.log(response.data.note);
      setMemo(response.data.note);
      setMemoDate(response.data.formattedDate);
      setMemoUserName(response.data.uploader);
    });
  };
  return (
    <Box>
      <Button variant="contained" onClick={toggleEditting}>Edit</Button>
      <Typography>
        <Box>
          {apptPopupDetails.patientName}
          {' '}
          has an appointment
          {' '}
          on
        </Box>
        { !editAppt
          ? <Box><strong>{apptPopupDetails.date}</strong></Box>
          : (
            <Box>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Reschedule Date"
                  value={date}
                  onChange={(newValue) => { updateDate(newValue); }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          )}
        <Box>
          at
        </Box>
        { !editAppt
          ? <Box><strong>{apptPopupDetails.time}</strong></Box>
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
          <strong>{apptPopupDetails.department}</strong>
          {' '}
          department in
        </Box>
        <Box>
          <strong>{apptPopupDetails.hospital}</strong>
          {' '}
          <br />
          <strong>Chaperone:</strong>
          {' '}
          {
            apptPopupDetails.chaperone === undefined || apptPopupDetails.chaperone === ''
              ? <Box>Nil</Box>
              : <Box>{apptPopupDetails.chaperone}</Box>
          }
        </Box>
        { !editAppt
          ? <Box />
          : (
            <Button variant="contained" onClick={() => { handleSubmit(date, value); }}>
              Submit
            </Button>
          )}
        <Box />
        <Box>
          <br />
          <br />
          <br />
          <strong>Memos:</strong>
          <Tooltip arrow title="Add/Edit Memo">
            <IconButton>
              <AddCircleIcon variant="contained" onClick={toggleNoteEditing} />
            </IconButton>
          </Tooltip>
          {isEditing === false
            ? (
              <Box>
                {memo === '' || memo === undefined
                  ? <div>Nil</div>
                  : (
                    <Box>
                      {memo}
                      <br />
                      Uploaded By:
                      {' '}
                      {memoUserName}
                      <br />
                      on
                      {' '}
                      {memoDate}
                    </Box>
                  )}
              </Box>
            )
            : (
              <Box>
                <br />
                <TextField
                  label="Add Memo"
                  inputProps={{
                    defaultValue: `${memo || ''}`,
                  }}
                  onChange={(e) => { setMemo(e.target.value); }}
                />
                <Button variant="contained" onClick={handleMemoSubmit}>Submit</Button>
              </Box>
            )}

        </Box>
      </Typography>
      <Box>
        {
        successMessage === ''
          ? <Box />
          : (
            <Typography>
              {successMessage}
            </Typography>
          )
        }
      </Box>
    </Box>
  );
}
