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
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
        <Typography sx={homePageStyles.apptReminder}>
          === Upcoming Appointment: ===
        </Typography>
      </Box>
      <Box sx={homePageStyles.allCategoryContainer}>
        <Box sx={homePageStyles.categoryContainer}>
          <button type="button" onClick={() => navigate('/appointments')}>
            <Paper
              sx={homePageStyles.categories}
              onMouseOver={() => setShow(true)}
              onMouseOut={() => setShow(false)}
            >
              <Typography
                sx={homePageStyles.categoryNames}
                onMouseOver={() => setShow(true)}
                onMouseOut={() => setShow(false)}
              >
                Appointments
                { show === true
                  ? (
                    <Typography
                      sx={homePageStyles.categoryDescription}
                      onMouseOver={() => setShow(true)}
                      onMouseOut={() => setShow(false)}
                    >
                      Create, check & edit appointments
                    </Typography>
                  )
                  : <div />}
              </Typography>
            </Paper>
          </button>
          <button type="button" onClick={() => navigate('/patients')}>
            <Paper
              sx={homePageStyles.categories}
              onMouseOver={() => setPatientShow(true)}
              onMouseOut={() => setPatientShow(false)}
            >
              <Typography
                sx={homePageStyles.categoryNames}
                onMouseOver={() => setPatientShow(true)}
                onMouseOut={() => setPatientShow(false)}
              >
                Patients
                { patient === true
                  ? (
                    <>
                      <Typography
                        sx={homePageStyles.categoryDescription}
                        onMouseOver={() => setPatientShow(true)}
                        onMouseOut={() => setPatientShow(false)}
                      >
                        Medication, appointments,
                      </Typography>
                      <Typography
                        sx={homePageStyles.categoryDescription}
                        onMouseOver={() => setPatientShow(true)}
                        onMouseOut={() => setPatientShow(false)}
                      >
                        memos & reminders
                      </Typography>

                    </>
                  )
                  : <div />}

              </Typography>
            </Paper>
          </button>
        </Box>
        <Box sx={homePageStyles.categoryContainer}>
          <button type="button" onClick={() => navigate('/contacts')}>
            <Paper
              sx={homePageStyles.categories}
              onMouseOver={() => setContactsShow(true)}
              onMouseOut={() => setContactsShow(false)}
            >
              <Typography
                sx={homePageStyles.categoryNames}
                onMouseOver={() => setContactsShow(true)}
                onMouseOut={() => setContactsShow(false)}
              >
                Contacts
                { contacts === true
                  ? (
                    <Typography
                      sx={homePageStyles.categoryDescription}
                      onMouseOver={() => setContactsShow(true)}
                      onMouseOut={() => setContactsShow(false)}
                    >
                      Add contacts & alter patient access
                    </Typography>
                  )
                  : <div />}
              </Typography>
            </Paper>
          </button>
          <button type="button" onClick={() => navigate('/profile')}>
            <Paper
              sx={homePageStyles.categories}
              onMouseOver={() => setProfileShow(true)}
              onMouseOut={() => setProfileShow(false)}
            >
              <Typography
                sx={homePageStyles.categoryNames}
                onMouseOver={() => setProfileShow(true)}
              >
                Profile
                { profile === true
                  ? (
                    <Typography
                      sx={homePageStyles.categoryDescription}
                      onMouseOver={() => setProfileShow(true)}
                    >
                      Update personal details
                    </Typography>
                  )
                  : <div />}
              </Typography>
            </Paper>
          </button>
        </Box>
      </Box>
    </Box>
  );
}
