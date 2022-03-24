/* eslint-disable react/prop-types */
import React from 'react';
import { Paper, IconButton, InputBase } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

function MessageInput({
  id, handleInput, handleSend,
}) {
  return (
    <Paper sx={{
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '20px',
      px: '10px',
      py: '4px',
      position: 'absolute',
      width: '100%',
      bottom: {
        lg: 10,
        md: 10,
        sm: 10,
        xs: 70,
      },
      left: '50%',
      zIndex: 50,
      transform: 'translateX(-50%)',
      backgroundColor: '#fffffe',
      border: 'solid #5b94bb',
    }}
    >
      <InputBase
        id={id}
        sx={{ flex: 1 }}
        onChange={handleInput}
      />
      <IconButton onClick={handleSend}>
        <SendRoundedIcon sx={{ color: '#22577A' }} />
      </IconButton>
    </Paper>

  );
}

export default MessageInput;
