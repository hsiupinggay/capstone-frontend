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
  Typography, Box, TextField, CardContent,
  Tooltip, IconButton,
} from '@mui/material';
import { TimePicker, LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import moment from 'moment-timezone';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DateTime } from 'luxon';
import EditIcon from '@mui/icons-material/Edit';
import { useMedicalContext } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *       Component for rendering add appointment form
 *
 * ========================================================
 * ========================================================
 */
export default function AppointmentDetailPopup({
  apptPopupDetails, setDisplayDataArray, setOpenApptModal, setAnchorEl,
}) {
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
  const {
    userId, firstName, lastName, photo,
  } = store;

  useEffect(() => {
    setAnchorEl(null);
    setMemo(apptPopupDetails.notes.note);
    setMemoDate(apptPopupDetails.notes.date);
    setMemoUserName(apptPopupDetails.notes.userName);
    setDate(new Date(apptPopupDetails.date));
    setValue(DateTime.fromFormat(apptPopupDetails.time, 'h:mm a').toISO());
  }, []);

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
      time: unformattedTime !== undefined ? moment.tz(unformattedTime, 'Asia/Singapore').format('h:mm a') : null,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/edit-appointment`, data).then((response) => {
      if (response.status === 200) {
        setDisplayDataArray(response.data.patientDetailsObj);
        setOpenApptModal(false);
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
      photo,
      note: memo,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-memo`, data).then((response) => {
      setDisplayDataArray(response.data.patientDetailsObj);
      setIsEditing(false);
      setMemo(response.data.note);
      setMemoDate(response.data.formattedDate);
      setMemoUserName(response.data.uploader);
    });
  };
  return (
    <CardContent>
      <Box>
        <Tooltip title="Edit Appointment" sx={{ marginLeft: 35 }}>
          <EditIcon variant="contained" color="primary" onClick={toggleEditting} />
        </Tooltip>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>
            <Box sx={{
              paddingBottom: 1.5,
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              {apptPopupDetails.patientName}
              {' '}
              has an appointment
              {' '}
              on
            </Box>
            { !editAppt
              ? <Box sx={{ paddingBottom: 1.5, display: 'flex', justifyContent: 'center' }}><strong>{apptPopupDetails.date}</strong></Box>
              : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
            <Box sx={{ paddingBottom: 1.5, display: 'flex', justifyContent: 'center' }}>
              at
            </Box>
            { !editAppt
              ? <Box sx={{ paddingBottom: 1.5, display: 'flex', justifyContent: 'center' }}><strong>{apptPopupDetails.time}</strong></Box>
              : (
                <Box sx={{ paddingBottom: 1.5, display: 'flex', justifyContent: 'center' }}>
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
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
              at the
              {' '}
              <strong>{apptPopupDetails.department}</strong>
              department in
              {' '}
              <strong>{apptPopupDetails.hospital}</strong>
              {' '}
              {
            apptPopupDetails.chaperone === undefined || apptPopupDetails.chaperone === ''
              ? (
                <Box>
                  <strong>Chaperone:</strong>
                  {' '}
                  Nil
                </Box>
              )
              : (
                <Box>
                  <strong>Chaperone:</strong>
                  {' '}
                  {apptPopupDetails.chaperone}
                </Box>
              )
          }
              <br />
            </Box>
            { !editAppt
              ? <Box />
              : (
                <Box sx={{
                  paddingBottom: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                >
                  <Button variant="contained" onClick={() => { handleSubmit(date, value); }}>
                    Submit
                  </Button>
                </Box>
              )}
            <Box />
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <strong>Memos:</strong>
                <Tooltip arrow title="Add/Edit Memo">
                  <IconButton>
                    <AddCircleIcon color="primary" variant="contained" onClick={toggleNoteEditing} />
                  </IconButton>
                </Tooltip>
              </Box>
              {isEditing === false
                ? (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  >
                    {memo === '' || memo === undefined
                      ? <div>Nil</div>
                      : (
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          width: 'inherit',
                        }}
                        >
                          <Typography sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: 'inherit',
                          }}
                          >
                            {memo}
                          </Typography>
                          <Typography fontSize="small">
                            Uploaded By:
                            <br />
                            {' '}
                            {memoUserName}
                            {' '}
                            on
                            {' '}
                            {memoDate}
                          </Typography>
                        </Box>
                      )}
                    <br />
                  </Box>
                )
                : (
                  <Box sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around',
                  }}
                  >
                    <br />
                    <TextField
                      label="Add Memo"
                      inputProps={{
                        defaultValue: `${memo || ''}`,
                      }}
                      onChange={(e) => { setMemo(e.target.value); }}
                    />
                    <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleMemoSubmit}>Submit</Button>
                  </Box>
                )}
            </Box>
          </Typography>
        </Box>

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

    </CardContent>

  );
}
