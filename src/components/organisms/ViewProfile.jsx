import React from 'react';
import { IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useMedicalContext } from '../others/store';

function ViewProfile() {
  const { store } = useMedicalContext();

  const {
    firstName, lastName, email,
  } = store;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/profile/edit');
  };
  return (

    <div>
      <Typography>{`${firstName} ${lastName}`}</Typography>
      <Typography>{email}</Typography>
      <IconButton color="primary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
    </div>

  );
}

export default ViewProfile;
