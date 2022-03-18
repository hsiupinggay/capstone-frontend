/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for adding relationship to patient
 *
 * ========================================================
 * ========================================================
 */
export default function AddRelationship({
  userId, patientId, patientName, setDisplayRelationship,
}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [relationship, setRelationship] = useState('');

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      relationship,
      userId,
      patientId,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-relationship`, data).then((response) => {
      if (response.status === 200) {
        document.getElementById('relationship').value = '';
        setDisplayRelationship(relationship);
        setSuccessMessage(
          <div>
            <p>
              {`You have added ${patientName} as your ${relationship}.`}
            </p>
          </div>,
        );
      }
    });
  };

  return (
    <div>
      <div>
        Add your Relationship to
        {' '}
        {patientName}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField label="Relationship" id="relationship" onChange={(e) => setRelationship(e.target.value)} required />
        <br />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
      <div>
        {successMessage === ''
          ? <div />
          : (
            <div>
              {successMessage}
            </div>
          )}
      </div>
    </div>

  );
}
