/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-console */
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
import { useNavigate } from 'react-router-dom';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add patient form
 *
 * ========================================================
 * ========================================================
 */
export default function AddPatient() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [DOB, setDOB] = useState('');
  const navigate = useNavigate();

  // ################################## HARDCODED FOR NOW  ##################################
  // data.append('userId', userId);
  const userId = '62259eddb4a77ae0343f7305';

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      userId,
      DOB,
      relationship,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-patient`, data).then((response) => {
      if (response.status === 200) {
        setSuccessMessage(
          <div>
            <p>
              {`You have added ${firstName} ${lastName} as your ${relationship}`}
            </p>
          </div>,
        );
      }
    });
  };
  return (
    <div>
      <button type="button" onClick={() => navigate('/add-appt')}>Back</button>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
        <input type="text" placeholder="Relationship" onChange={(e) => setRelationship(e.target.value)} required />
        <div>
          <label htmlFor="date" name="date">DOB</label>
          <input type="date" id="date" name="date" onChange={(event) => setDOB(event.target.value)} required />
        </div>
        <button type="submit"> Submit</button>
      </form>
      <div>
        {
        successMessage === ''
          ? <div />
          : (
            <div>
              {successMessage}
            </div>
          )
        }
      </div>
    </div>
  );
}
