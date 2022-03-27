/* eslint-disable max-len */
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
import {
  TextField, Button, Typography, IconButton,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import moment from 'moment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useMedicalContext } from '../others/store';
import BackIcon from '../molecules/BackIcon';
import patientPopupStyles from './AddPatientCss';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add patient form
 *
 * ========================================================
 * ========================================================
 */
export default function AddPatient({
  accessedFromPatientPage, setRefresh, refresh, setModal, setAddition,
}) {
  const { store } = useMedicalContext();
  const { userId } = store;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [DOB, setDOB] = useState(null);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAddition(newValue);
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
          `You have added ${firstName} ${lastName} as your ${relationship}.`,
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
              <IconButton>
                <BackIcon variant="contained" onClick={() => setModal('add-appt')} />
              </IconButton>
              <Box sx={patientPopupStyles.tabsContainer}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label=" +Patient"
                    value="patient"
                    sx={{ fontSize: 12, padding: 1 }}
                    {...a11yProps(0)}
                    disabled
                  />
                  <Tab label=" +Hospital" value="hospital" sx={{ fontSize: 12, padding: 1 }} {...a11yProps(1)} />
                  <Tab label=" +Department" value="department" sx={{ fontSize: 12, padding: 1 }} {...a11yProps(2)} />
                  <Tab label=" +Chaperone" value="chaperone" sx={{ fontSize: 12, padding: 1 }} {...a11yProps(3)} />
                </Tabs>
              </Box>
            </div>
          )
      }
      <br />
      <form onSubmit={handleSubmit}>
        <Box sx={patientPopupStyles.inputContainer}>
          <TextField label="First Name" sx={patientPopupStyles.inputField} onChange={(e) => setFirstName(e.target.value)} required />
          <TextField label="Last Name" sx={patientPopupStyles.inputField} onChange={(e) => setLastName(e.target.value)} required />
          <TextField label="Relationship" onChange={(e) => setRelationship(e.target.value)} required sx={patientPopupStyles.inputField} />

          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              label="Date Of Birth"
              value={DOB}
              onChange={(newValue) => {
                setDOB(moment(`${newValue.c.year}-${newValue.c.month}-${newValue.c.day}`).format('YYYY-MM-DD'));
              }}
              renderInput={(params) => <TextField {...params} required sx={patientPopupStyles.inputField} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={patientPopupStyles.submitBtn}>
          <Button variant="contained" type="submit">Submit</Button>
        </Box>
      </form>
      <div>
        {
        successMessage === ''
          ? <div />
          : (
            <Typography variant="h7" sx={patientPopupStyles.outcomeMessage}>
              {successMessage}
            </Typography>
          )
        }
      </div>
    </div>
  );
}
