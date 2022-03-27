/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useState, useEffect } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMedicalContext, editProfile } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *                   EditProfile Component
 *
 * ========================================================
 * ========================================================
 */
export default function EditProfile() {
  const { store, dispatch } = useMedicalContext();
  const { userId } = store;
  const navigate = useNavigate();

  const [currentFirstName, setCurrentFirstName] = useState('');
  const [currentLastName, setCurrentLastName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');

  useEffect(() => {
    const {
      firstName, lastName, email,
    } = store;
    setCurrentFirstName(firstName);
    setCurrentLastName(lastName);
    setCurrentEmail(email);
  }, []);

  const handleFirstName = (e) => {
    setCurrentFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setCurrentLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setCurrentEmail(e.target.value);
  };

  const handleClick = async () => {
    const data = {
      userId,
      currentEmail,
      currentLastName,
      currentFirstName,
    };
    try {
      const res = await editProfile(dispatch, data);
      if (res.success) navigate('/profile/view');
    } catch (error) {
      return false;
    }
  };

  return (
    <Stack
      spacing={2}
    >
      <TextField label="First Name" variant="outlined" value={currentFirstName} onChange={handleFirstName} />
      <TextField label="Last Name" variant="outlined" value={currentLastName} onChange={handleLastName} />
      <TextField label="Email" variant="outlined" value={currentEmail} onChange={handleEmail} />
      <Button variant="contained" onClick={handleClick}>Submit</Button>
    </Stack>

  );
}
