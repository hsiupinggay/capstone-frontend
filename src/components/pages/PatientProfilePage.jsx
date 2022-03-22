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
  Button, Modal, Box, Typography, Paper,
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
 *                PatientProfilePage Component
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
    console.log(data);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/patient-data?${data.toString()}`)
      .then((response) => {
        const { fullName, relationship, age } = response.data;
        console.log(fullName, relationship, age);
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
                  <ArrowCircleLeftIcon onClick={() => navigate('/patients')} sx={patientProfilePageStyles.backIcon} />
                  <Box sx={patientProfilePageStyles.headerContainer}>
                    <Typography sx={patientProfilePageStyles.titleFont}>
                      <strong>{name}</strong>
                      ,
                      {' '}
                      <strong>{displayAge}</strong>
                    </Typography>
                    <Typography sx={patientProfilePageStyles.relationship}>
                      {
                  displayRelationship === null
                    ? (
                      <div>
                        <Typography sx={patientProfilePageStyles.relationship}>Relationship:</Typography>
                        {' '}
                        <Button variant="contained" onClick={openPopUp}>Add Relationship</Button>

                      </div>
                    )
                    : (
                      <Typography sx={patientProfilePageStyles.relationship}>
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
                        sx={patientProfilePageStyles.categories}
                        onMouseOver={() => setShow(true)}
                        onMouseOut={() => setShow(false)}
                      >
                        <Typography
                          sx={patientProfilePageStyles.categoryNames}
                          onMouseOver={() => setShow(true)}
                          onMouseOut={() => setShow(false)}
                        >
                          Appointments
                          { show === true
                            ? (
                              <Typography
                                sx={patientProfilePageStyles.categoryDescription}
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
                    <button type="button" onClick={() => navigate('/med-list', { state: patientId })}>
                      <Paper
                        sx={patientProfilePageStyles.categories}
                        onMouseOver={() => setPatientShow(true)}
                        onMouseOut={() => setPatientShow(false)}
                      >
                        <Typography
                          sx={patientProfilePageStyles.categoryNames}
                          onMouseOver={() => setPatientShow(true)}
                          onMouseOut={() => setPatientShow(false)}
                        >
                          Medication
                          { patient === true
                            ? (
                              <>
                                <Typography
                                  sx={patientProfilePageStyles.categoryDescription}
                                  onMouseOver={() => setPatientShow(true)}
                                  onMouseOut={() => setPatientShow(false)}
                                >
                                  View and add medication
                                </Typography>
                                <Typography
                                  sx={patientProfilePageStyles.categoryDescription}
                                  onMouseOver={() => setPatientShow(true)}
                                  onMouseOut={() => setPatientShow(false)}
                                >
                                  Set reminders
                                </Typography>

                              </>
                            )
                            : <div />}

                        </Typography>
                      </Paper>
                    </button>
                  </Box>
                  <Box sx={patientProfilePageStyles.categoryContainer}>
                    <button type="button" onClick={() => navigate('/location-details')}>
                      <Paper
                        sx={patientProfilePageStyles.categories}
                        onMouseOver={() => setContactsShow(true)}
                        onMouseOut={() => setContactsShow(false)}
                      >
                        <Typography
                          sx={patientProfilePageStyles.categoryNames}
                          onMouseOver={() => setContactsShow(true)}
                          onMouseOut={() => setContactsShow(false)}
                        >
                          Visit Details
                          { contacts === true
                            ? (
                              <Typography
                                sx={patientProfilePageStyles.categoryDescription}
                                onMouseOver={() => setContactsShow(true)}
                                onMouseOut={() => setContactsShow(false)}
                              >
                                View & add patient visit details
                              </Typography>
                            )
                            : <div />}
                        </Typography>
                      </Paper>
                    </button>
                    <button type="button" onClick={() => navigate('/patient-memos')}>
                      <Paper
                        sx={patientProfilePageStyles.categories}
                        onMouseOver={() => setProfileShow(true)}
                        onMouseOut={() => setProfileShow(false)}
                      >
                        <Typography
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
