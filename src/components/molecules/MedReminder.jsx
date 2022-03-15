import { CardContent } from '@mui/material';
import React from 'react';

function MedReminder({prescriptionDate}) {
  const reminderDate = prescriptionDate.getDate() - 
  return (
    <CardContent>
      <TextField variant="outlined" label="Days before finish"/>
      <Typography variant="body1">Reminder will be sent on {reminderDate}</Typography>
       
    </CardContent>
  );
}

export default MedReminder;