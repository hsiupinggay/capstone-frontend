/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useMedicalContext } from '../others/store';
import viewProfileStyles from './ViewProfileCss';

/*
 * ========================================================
 * ========================================================
 *
 *                   ViewProfile Component
 *
 * ========================================================
 * ========================================================
 */
export default function ViewProfile() {
  const { store } = useMedicalContext();

  const {
    firstName, lastName, email,
  } = store;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/profile/edit');
  };
  return (
    <Box sx={viewProfileStyles.profileContainer}>
      <Typography sx={viewProfileStyles.userDetails}>
        <strong>Name:</strong>
        {' '}
        {`${firstName} ${lastName}`}
        <br />
        {' '}
        <strong>Email:</strong>
        {' '}
        {email}

      </Typography>
      <IconButton color="primary" onClick={handleEdit}>
        <EditIcon sx={viewProfileStyles.editIcon} />
      </IconButton>
    </Box>

  );
}
