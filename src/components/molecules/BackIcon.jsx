/* eslint-disable react/prop-types */
import React from 'react';
import {
  IconButton, Tooltip,
} from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function BackIcon({ onClick }) {
  return (
    <div>
      <Tooltip title="Back" arrow>
        <IconButton onClick={onClick} color="primary" arrow>
          <ArrowCircleLeftIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default BackIcon;
