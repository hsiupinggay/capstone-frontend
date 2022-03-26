/* eslint-disable react/prop-types */
import React from 'react';
import { CardContent, Typography } from '@mui/material';

function ReminderRecap({ reminderDateTime, reminderChecked }) {
  return (
    <CardContent>
      {reminderChecked ? (
        <Typography variant="body1">
          { `You have a medication refill reminder set for ${reminderDateTime}
        `}
        </Typography>
      ) : (
        <Typography variant="body1">
          { `There are no reminders set for this medication.
        `}
        </Typography>
      )}

    </CardContent>
  );
}

export default ReminderRecap;
