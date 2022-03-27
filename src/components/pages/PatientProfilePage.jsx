/* eslint-disable max-len */
/* eslint-disable no-console */
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
import axios from 'axios';
import {
  Button, Modal, Box, Typography, Paper, IconButton, Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useMedicalContext } from '../others/store';
import AddRelationship from '../organisms/AddRelationship';
import patientProfilePageStyles from './PatientProfilePageCss';

/*
 * ========================================================
 * ========================================================
 *
 *             PatientProfilePage Component
 *
 * ========================================================
 * ========================================================
 */
export default function PatientProfilePage() {
  const [name, setName] = useState();
  const [displayAge, setDisplayAge] = useState();
  const [displayRelationship, setDisplayRelationship] = useState();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [patient, setPatientShow] = useState(false);
  const [contacts, setContactsShow] = useState(false);
  const [profile, setProfileShow] = useState(false);

  const { store } = useMedicalContext();
  const { userId, patientId } = store;
  const navigate = useNavigate();

  // When component renders, retrieve patient's data
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    data.append('patientId', patientId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/patient-data?${data.toString()}`)
      .then((response) => {
        const { fullName, relationship, age } = response.data;
        setName(fullName);
        setDisplayRelationship(relationship);
        setDisplayAge(age);
      });
  }, []);

  // When user clicks on button, render popup to add relationship
  const openPopUp = () => {
    setOpen(true);
  };

  const closeAddPatientPopup = () => {
    setOpen(false);
  };

  return (
    <div>

      {
        name === undefined
          ? (
            <div />
          )
          : (
            <div>
              <Box sx={patientProfilePageStyles.mainContainer}>
                <Box sx={patientProfilePageStyles.headerIconContainer}>
                  <Tooltip title="Go Back" arrow>
                    <IconButton sx={patientProfilePageStyles.iconBtn}>
                      <ArrowCircleLeftIcon onClick={() => navigate('/contacts')} sx={patientProfilePageStyles.backIcon} />
                    </IconButton>
                  </Tooltip>
                  <Box sx={patientProfilePageStyles.headerContainer}>
                    <Typography variant="h1">
                      {name}
                      ,
                      {' '}
                      {displayAge}
                    </Typography>
                    <Typography variant="h2">
                      {
                  displayRelationship === null
                    ? (
                      <div>
                        <Typography variant="h2">Relationship:</Typography>
                        {' '}
                        <Button variant="contained" onClick={openPopUp}>Add Relationship</Button>

                      </div>
                    )
                    : (
                      <Typography variant="h2">
                        Relationship:
                        {' '}
                        { displayRelationship }
                      </Typography>
                    )
                  }
                    </Typography>
                  </Box>
                </Box>

                <Box sx={patientProfilePageStyles.allCategoryContainer}>
                  <Box sx={patientProfilePageStyles.categoryContainer}>
                    <button type="button" onClick={() => navigate('/appointments')}>
                      <Paper
                        sx={patientProfilePageStyles.primaryCategories}
                        onMouseOver={() => setShow(true)}
                        onMouseOut={() => setShow(false)}
                      >
                        <Typography
                          variant="h3"
                          sx={patientProfilePageStyles.categoryNames}
                          onMouseOver={() => setShow(true)}
                          onMouseOut={() => setShow(false)}
                        >
                          Appointments
                          { show === true
                            ? (
                              <Typography
                                variant="body1"
                                sx={patientProfilePageStyles.categoryDescription}
                                onMouseOver={() => setShow(true)}
                                onMouseOut={() => setShow(false)}
                              >
                                Create
                                <br />
                                {' '}
                                Check
                                {' '}
                                <br />
                                {' '}
                                Edit
                              </Typography>
                            )
                            : <div />}
                        </Typography>
                      </Paper>
                    </button>
                    <button type="button" onClick={() => navigate('/med-list', { state: patientId })}>
                      <Paper
                        sx={patientProfilePageStyles.secondaryCategories}
                        onMouseOver={() => setPatientShow(true)}
                        onMouseOut={() => setPatientShow(false)}
                      >
                        <Typography
                          variant="h3"
                          sx={patientProfilePageStyles.categoryNames}
                          onMouseOver={() => setPatientShow(true)}
                          onMouseOut={() => setPatientShow(false)}
                        >
                          Medication
                          { patient === true
                            ? (
                              <Typography
                                sx={patientProfilePageStyles.categoryDescription}
                                onMouseOver={() => setPatientShow(true)}
                                onMouseOut={() => setPatientShow(false)}
                              >
                                View
                                {' '}
                                <br />
                                {' '}
                                Add
                                <br />
                                Set reminders
                              </Typography>
                            )
                            : <div />}

                        </Typography>
                      </Paper>
                    </button>
                  </Box>
                  <Box sx={patientProfilePageStyles.categoryContainer}>
                    <button type="button" onClick={() => navigate('/location-details')}>
                      <Paper
                        sx={patientProfilePageStyles.secondaryCategories}
                        onMouseOver={() => setContactsShow(true)}
                        onMouseOut={() => setContactsShow(false)}
                      >
                        <Typography
                          variant="h3"
                          sx={patientProfilePageStyles.categoryNames}
                          onMouseOver={() => setContactsShow(true)}
                          onMouseOut={() => setContactsShow(false)}
                        >
                          Visit Details
                          { contacts === true
                            ? (
                              <Typography
                                variant="body1"
                                sx={patientProfilePageStyles.categoryDescription}
                                onMouseOver={() => setContactsShow(true)}
                                onMouseOut={() => setContactsShow(false)}
                              >
                                View
                                {' '}
                                <br />
                                {' '}
                                Add
                              </Typography>
                            )
                            : <div />}
                        </Typography>
                      </Paper>
                    </button>
                    <button type="button" onClick={() => navigate('/patient-memos')}>
                      <Paper
                        sx={patientProfilePageStyles.primaryCategories}
                        onMouseOver={() => setProfileShow(true)}
                        onMouseOut={() => setProfileShow(false)}
                      >
                        <Typography
                          variant="h3"
                          sx={patientProfilePageStyles.categoryNames}
                          onMouseOver={() => setProfileShow(true)}
                        >
                          Memos
                          { profile === true
                            ? (
                              <Typography
                                sx={patientProfilePageStyles.categoryDescription}
                                onMouseOver={() => setProfileShow(true)}
                              >
                                View appointment memos
                              </Typography>
                            )
                            : <div />}
                        </Typography>
                      </Paper>
                    </button>
                  </Box>
                </Box>
              </Box>
            </div>
          )
      }
      <Modal
        open={open}
        onClose={closeAddPatientPopup}
      >
        <Box sx={patientProfilePageStyles.modalStyle}>
          <AddRelationship userId={userId} patientId={patientId} patientName={name} setDisplayRelationship={setDisplayRelationship} />
        </Box>
      </Modal>
    </div>
  );
}
