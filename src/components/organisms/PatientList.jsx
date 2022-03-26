/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
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
  Button, Modal, Box, Typography, TextField, IconButton, Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import { useMedicalContext, setPatientAction } from '../others/store';
import AddPatient from './AddPatient';
import styles from './PatientListCss';

/*
 * ========================================================
 * ========================================================
 *
 *                PatientListPage Component
 *
 * ========================================================
 * ========================================================
 */
export default function PatientList() {
  const [patient, setPatient] = useState(null);
  const [patientList, setPatientList] = useState();
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { store, dispatch } = useMedicalContext();
  const { userId } = store;

  const navigate = useNavigate();

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-names?${data.toString()}`)
      .then((result) => {
        const patientsArr = result.data.allPatientsObj.patients;
        setPatientList(patientsArr);
      });
  }, [refresh]);

  // When user clicks on button, redirect to patients profile
  const openPatientProfile = (patientId) => {
    // Save patient id to useContext so that patient profile page knows
    // which patient's data to retrieve from DB
    dispatch(setPatientAction(patientId));
    navigate('/patient');
  };

  // When user clicks on button, render popup to add new patient
  const addPatient = () => {
    setOpen(true);
  };
  const closeAddPatientPopup = () => {
    setOpen(false);
  };

  return (
    <div>
      {
        patientList === undefined
          ? (
            <div />
          )
          : (
            <div>
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h1">Patients</Typography>
                  <Tooltip arrow title="Add New Patient">
                    <IconButton>
                      <AddCircleIcon onClick={addPatient} sx={styles.bigIcon} />

                    </IconButton>
                  </Tooltip>
                </Stack>
                <Stack
                  spacing={2}
                >
                  <Autocomplete
                    options={patientList}
                    getOptionLabel={(option) => `${option.name}`}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Patient"
                        required
                      />
                    )}
                    onChange={(event, newValue) => { setPatient(newValue); }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                  />
                  {patient !== null
                    ? (
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => openPatientProfile(patient.patientId)}
                        >
                          View
                        </Button>
                      </div>
                    )
                    : <div />}
                </Stack>
              </Box>
            </div>
          )
      }
      <Modal
        open={open}
        onClose={closeAddPatientPopup}
      >
        <Box sx={styles.modal}>
          <AddPatient accessedFromPatientPage setRefresh={setRefresh} refresh={refresh} />
        </Box>
      </Modal>
    </div>
  );
}
