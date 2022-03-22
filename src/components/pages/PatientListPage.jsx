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
import { Button, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useMedicalContext, setPatientAction } from '../others/store';
import AddPatient from '../organisms/AddPatient';

/*
 * ========================================================
 * ========================================================
 *
 *                   Modal styling
 *
 * ========================================================
 * ========================================================
 */
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
            <div>
              <strong>Patients</strong>
              <Button onClick={addPatient}>View</Button>
            </div>
          )
          : (
            <div>
              <strong>Patients</strong>
              <Tooltip title="Add New Patient">
                <AddCircleIcon onClick={addPatient} />
              </Tooltip>
              <br />
              {patientList.map((patient) => (
                <div key={patient.name}>
                  {`${patient.name}`}
                  <Tooltip title="View Profile">
                    <ArrowCircleRightIcon onClick={() => openPatientProfile(patient.patientId)} />
                  </Tooltip>
                </div>
              ))}
            </div>
          )
      }
      <Modal
        open={open}
        onClose={closeAddPatientPopup}
      >
        <Box sx={style}>
          <AddPatient accessedFromPatientPage setRefresh={setRefresh} refresh={refresh} />
        </Box>
      </Modal>
    </div>
  );
}
