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
  Button, Modal, Box, Typography, TextField, IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import { useMedicalContext, setPatientAction } from '../others/store';
import AddPatient from '../organisms/AddPatient';
import patientListStyles from './PatientListPageCss';

/*
 * ========================================================
 * ========================================================
 *
 *                PatientListPage Component
 *
 * ========================================================
 * ========================================================
 */
export default function PatientListPage() {
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
              <Box sx={patientListStyles.mainContainer}>
                <Box sx={patientListStyles.titleContainer}>

                  <Typography sx={patientListStyles.title}>Patients</Typography>
                  <Tooltip arrow title="Add New Patient">
                    <IconButton>
                      <AddCircleIcon onClick={addPatient} sx={patientListStyles.addIcon} />

                    </IconButton>
                  </Tooltip>
                </Box>
                <Autocomplete
                  options={patientList}
                  getOptionLabel={(option) => `${option.name}`}
                  renderInput={(params) => <TextField {...params} label="Select Patient" sx={patientListStyles.inputField} required />}
                  onChange={(event, newValue) => { setPatient(newValue); }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                />
                {patient !== null
                  ? (
                    <div>
                      <Typography sx={patientListStyles.description}>
                        Click submit to view
                        {' '}
                        {patient.name}
                        's profile
                      </Typography>
                      <Box sx={patientListStyles.buttonContainer}>
                        <Button variant="contained" onClick={() => openPatientProfile(patient.patientId)} sx={patientListStyles.button}>Submit</Button>
                      </Box>
                    </div>
                  )
                  : <div />}
              </Box>
            </div>
          )
      }
      <Modal
        open={open}
        onClose={closeAddPatientPopup}
      >
        <Box sx={patientListStyles.modal}>
          <AddPatient accessedFromPatientPage setRefresh={setRefresh} refresh={refresh} />
        </Box>
      </Modal>
    </div>
  );
}
