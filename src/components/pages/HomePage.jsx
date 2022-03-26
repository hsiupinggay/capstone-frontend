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
import React, { useEffect, useState } from 'react';
import {
  Typography, Paper, Box, Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const { firstName, userId } = store;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [upcomingApptObj, setUpcomingApptObj] = useState();
  const [patient, setPatientShow] = useState(false);
  const [contacts, setContactsShow] = useState(false);
  const [profile, setProfileShow] = useState(false);

  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/next-appointment?${data.toString()}`).then((response) => {
      console.log(response.data.upcomingAppt);
      const { upcomingAppt } = response.data;
      setUpcomingApptObj(upcomingAppt);
      console.log(upcomingApptObj);
    });
  }, []);
  return (
    <Box sx={homePageStyles.mainContainer}>
      <Stack
        spacing={2}
        justifyContent="center"
      >
        <Typography variant="h1" color="primary" sx={homePageStyles.titleFont}>
          Hello,
          <br />
          {firstName}
        </Typography>
        <Typography variant="h2" sx={homePageStyles.apptReminder}>
          Upcoming Appointment
        </Typography>

        { upcomingApptObj !== undefined
          ? (
            <Box>
              <Typography variant="body1" sx={homePageStyles.appointmentText}>
                {upcomingApptObj.fullName}
                <br />
                {upcomingApptObj.date}
                {' '}
                @
                {' '}
                {upcomingApptObj.time}
                <br />
                {upcomingApptObj.hospital.department}
                {' '}
                @
                {' '}
                {upcomingApptObj.hospital.name}
              </Typography>
            </Box>
          )
          : (
            <Box>
              <Typography variant="body1" sx={homePageStyles.appointmentText}>
                Nil
              </Typography>
            </Box>
          )}

      </Stack>
      <Box sx={homePageStyles.allCategoryContainer}>
        <Box sx={homePageStyles.categoryContainer}>
          <button type="button" onClick={() => navigate('/appointments')}>
            <Paper
              sx={homePageStyles.primaryCategories}
              onMouseOver={() => setShow(true)}
              onMouseOut={() => setShow(false)}
            >
              <Typography
                variant="h3"
                sx={homePageStyles.categoryNames}
                onMouseOver={() => setShow(true)}
                onMouseOut={() => setShow(false)}
              >
                Calendar
                { show === true
                  ? (
                    <Typography
                      sx={homePageStyles.categoryDescription}
                      onMouseOver={() => setShow(true)}
                      onMouseOut={() => setShow(false)}
                    >
                      Create
                      <br />
                      Check
                      <br />
                      Edit
                    </Typography>
                  )
                  : <div />}
              </Typography>
            </Paper>
          </button>
          <button type="button" onClick={() => navigate('/contacts')}>
            <Paper
              sx={homePageStyles.secondaryCategories}
              onMouseOver={() => setPatientShow(true)}
              onMouseOut={() => setPatientShow(false)}
            >
              <Typography
                variant="h3"
                sx={homePageStyles.categoryNames}
                onMouseOver={() => setPatientShow(true)}
                onMouseOut={() => setPatientShow(false)}
              >
                Patients
                { patient === true
                  ? (
                    <Typography
                      sx={homePageStyles.categoryDescription}
                      onMouseOver={() => setPatientShow(true)}
                      onMouseOut={() => setPatientShow(false)}
                    >
                      Medication
                      <br />
                      Reminders
                      <br />
                      Memos
                    </Typography>
                  )
                  : <div />}

              </Typography>
            </Paper>
          </button>
        </Box>
        <Box sx={homePageStyles.categoryContainer}>
          <button type="button" onClick={() => navigate('/contacts')}>
            <Paper
              sx={homePageStyles.secondaryCategories}
              onMouseOver={() => setContactsShow(true)}
              onMouseOut={() => setContactsShow(false)}
            >
              <Typography
                variant="h3"
                sx={homePageStyles.categoryNames}
                onMouseOver={() => setContactsShow(true)}
                onMouseOut={() => setContactsShow(false)}
              >
                Contacts
                { contacts === true
                  ? (
                    <Typography
                      variant="body1"
                      sx={homePageStyles.categoryDescription}
                      onMouseOver={() => setContactsShow(true)}
                      onMouseOut={() => setContactsShow(false)}
                    >
                      Add
                      <br />
                      Alter patient access
                      <br />
                      Chat
                    </Typography>
                  )
                  : <div />}
              </Typography>
            </Paper>
          </button>
          <button type="button" onClick={() => navigate('/profile')}>
            <Paper
              sx={homePageStyles.primaryCategories}
              onMouseOver={() => setProfileShow(true)}
              onMouseOut={() => setProfileShow(false)}
            >
              <Typography
                variant="h3"
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
                      View
                      <br />
                      Update
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
