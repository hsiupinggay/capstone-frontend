/* eslint-disable react/prop-types */
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useMedicalContext } from '../others/store';
import BackIcon from '../molecules/BackIcon';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add patient form
 *
 * ========================================================
 * ========================================================
 */
export default function AddPatient({ accessedFromPatientPage, setRefresh, refresh }) {
  const { store } = useMedicalContext();
  const { userId } = store;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [DOB, setDOB] = useState(null);
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // navigate(newValue);
  };

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
        // Trigger patient list page to rerender
        if (refresh) {
          setRefresh(false);
        } else {
          setRefresh(true);
        }
      }
    });
  };

  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });

  return (
    <div>
      {
        accessedFromPatientPage === true
          ? <div />
          : (
            <div>
              <BackIcon variant="contained" onClick={() => navigate('/add-appt')} />
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label=" +Patient" value="/add-patient" {...a11yProps(0)} disabed />
                    <Tab label=" +Hospital" value="/add-hospital" {...a11yProps(1)} />
                    <Tab label=" +Department" value="/add-department" {...a11yProps(2)} />
                    <Tab label=" +Chaperone" value="/add-chaperone" {...a11yProps(3)} />
                  </Tabs>
                </Box>
              </Box>
            </div>
          )
      }
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
