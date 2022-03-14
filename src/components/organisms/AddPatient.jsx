/* eslint-disable react/jsx-props-no-spreading */
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import moment from 'moment';
import { useMedicalContext } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add patient form
 *
 * ========================================================
 * ========================================================
 */
export default function AddPatient() {
  const { store } = useMedicalContext();
  const { userId } = store;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [DOB, setDOB] = useState(null);
  const navigate = useNavigate();

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      userId,
      DOB,
      relationship,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-patient`, data).then((response) => {
      if (response.status === 200) {
        setSuccessMessage(
          <div>
            <p>
              {`You have added ${firstName} ${lastName} as your ${relationship}`}
            </p>
          </div>,
        );
      }
    });
  };
  return (
    <div>
      <Button variant="contained" onClick={() => navigate('/add-appt')}>Back</Button>
      <Button variant="contained" disabled>+ Patient</Button>
      <Button variant="contained" onClick={() => navigate('/add-hospital')}>+ Hospital</Button>
      <Button variant="contained" onClick={() => navigate('/add-department')}>+ Department</Button>
      <Button variant="contained" onClick={() => navigate('/add-chaperone')}>+ Chaperone</Button>

      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <TextField label="First Name" onChange={(e) => setFirstName(e.target.value)} required />
        <TextField label="Last Name" onChange={(e) => setLastName(e.target.value)} required />
        <TextField label="Relationship" onChange={(e) => setRelationship(e.target.value)} required />

        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="Date Of Birth"
            value={DOB}
            onChange={(newValue) => {
              setDOB(moment(`${newValue.c.year}-${newValue.c.month}-${newValue.c.day}`).format('YYYY-MM-DD'));
            }}
            renderInput={(params) => <TextField {...params} required />}
          />
        </LocalizationProvider>
        <br />
        <br />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
      <div>
        {
        successMessage === ''
          ? <div />
          : (
            <div>
              {successMessage}
            </div>
          )
        }
      </div>
    </div>
  );
}
