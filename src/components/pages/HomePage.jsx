/* eslint-disable max-len */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useState } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import homePageStyles from './HomePageCss';
import { useMedicalContext } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *                    HomePage Component
 *
 * ========================================================
 * ========================================================
 */
export default function HomePage() {
  const { store } = useMedicalContext();
  const { firstName, lastName } = store;
  const [show, setShow] = useState(false);
  const [patient, setPatientShow] = useState(false);
  const [contacts, setContactsShow] = useState(false);
  const [profile, setProfileShow] = useState(false);

  return (
    <Box sx={homePageStyles.mainContainer}>
      <Box sx={homePageStyles.headerContainer}>
        <Typography sx={homePageStyles.titleFont}>
          Welcome
          {' '}
          {firstName}
          {' '}
          {lastName}
          !
        </Typography>
        <Typography>
          === Upcoming Appointment: ===
        </Typography>
      </Box>
      <Box sx={homePageStyles.allCategoryContainer}>
        <Box sx={homePageStyles.categoryContainer}>
          <Paper
            sx={homePageStyles.apptCategory}
            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
          >
            <Typography sx={homePageStyles.categoryNames}>
              Appointment
              { show === true
                ? (
                  <Typography sx={homePageStyles.categoryDescription}>
                    Create, Check, Edit Appointments
                  </Typography>
                )
                : <div />}
            </Typography>

          </Paper>
          <Paper
            sx={homePageStyles.patientCategory}
            onMouseOver={() => setPatientShow(true)}
            onMouseOut={() => setPatientShow(false)}
          >
            <Typography sx={homePageStyles.categoryNames}>
              Patients
              { patient === true
                ? (
                  <Typography sx={homePageStyles.categoryDescription}>
                    Medication, Appointments, Memos & Reminders
                  </Typography>
                )
                : <div />}

            </Typography>
          </Paper>
        </Box>
        <Box sx={homePageStyles.categoryContainer}>
          <Paper
            sx={homePageStyles.contactsCategory}
            onMouseOver={() => setContactsShow(true)}
            onMouseOut={() => setContactsShow(false)}
          >
            <Typography sx={homePageStyles.categoryNames}>
              Contacts
              { contacts === true
                ? (
                  <Typography sx={homePageStyles.categoryDescription}>
                    Add Contacts, Alter Access
                  </Typography>
                )
                : <div />}

            </Typography>
          </Paper>
          <Paper
            sx={homePageStyles.profileCategory}
            onMouseOver={() => setProfileShow(true)}
            onMouseOut={() => setProfileShow(false)}
          >
            <Typography sx={homePageStyles.categoryNames}>
              {' '}
              Profile
              { profile === true
                ? (
                  <Typography sx={homePageStyles.categoryDescription}>
                    Update Personal Details
                  </Typography>
                )
                : <div />}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>

  );
}
