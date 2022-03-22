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
import { Button, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMedicalContext } from '../others/store';
import AddRelationship from '../organisms/AddRelationship';
import BackIcon from '../molecules/BackIcon';

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

  // // When user clicks on button, redirect to patients profile
  // const openPatientProfile = () => {
  //   // dispatch(setPatientAction(patientId));
  //   navigate('/patient');
  // };

  // When user clicks on button, render popup to add relationship
  const openPopUp = () => {
    setOpen(true);
  };
  const closeAddPatientPopup = () => {
    setOpen(false);
  };

  return (
    <div>
      <BackIcon variant="contained" onClick={() => navigate('/patients')} />
      <br />
      <br />

      {
        name === undefined
          ? (
            <div />
          )
          : (
            <div>
              <div>
                {' '}
                <strong>{name}</strong>
                ,
                {' '}
                <strong>{displayAge}</strong>
              </div>

              <div>
                {
                  displayRelationship === null
                    ? (
                      <div>
                        <strong>Relationship:</strong>
                        {' '}
                        <Button onClick={openPopUp}>Add Relationship</Button>

                      </div>
                    )
                    : (
                      <strong>
                        Relationship:
                        {' '}
                        { displayRelationship }
                      </strong>
                    )
                  }
              </div>
              <br />
              <br />
              <br />
              <div>
                {' '}
                <Button variant="contained" onClick={() => navigate('/appointments')}>Appointments</Button>
              </div>
              <div>
                {' '}
                <Button variant="contained" onClick={() => navigate('/med-list', { state: patientId })}>Medication</Button>
              </div>
              <div>
                {' '}
                <Button variant="contained" onClick={() => navigate('/location-details')}>Visit Locations and Details</Button>
              </div>
              <div>
                {' '}
                <Button variant="contained" onClick={() => navigate('/patient-memos')}>Memos</Button>
              </div>
            </div>
          )
      }
      <Modal
        open={open}
        onClose={closeAddPatientPopup}
      >
        <Box sx={style}>
          <AddRelationship userId={userId} patientId={patientId} patientName={name} setDisplayRelationship={setDisplayRelationship} />
        </Box>
      </Modal>
    </div>
  );
}
