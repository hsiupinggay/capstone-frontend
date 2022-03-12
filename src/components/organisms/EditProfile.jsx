/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMedicalContext, editProfile } from '../others/store';

function EditProfile() {
  const { store, dispatch } = useMedicalContext();
  const [currentFirstName, setCurrentFirstName] = useState('');
  const [currentLastName, setCurrentLastName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');

  const navigate = useNavigate();
  const { userId } = store;

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
      console.log('<== res edit profile ==>', res);
      if (res.success) navigate('/profile/view');
      else if (!res.success) console.log(res);
    } catch (error) {
      console.log(error);
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

export default EditProfile;
