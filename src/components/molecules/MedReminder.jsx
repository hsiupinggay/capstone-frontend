/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/*
 * ========================================================
 * ========================================================
 *
 *                   Import
 *
 * ========================================================
 * ========================================================
 */
import { CardContent, TextField, Typography } from '@mui/material';
import React from 'react';
import { getDate } from '../others/helper';

/*
 * ========================================================
 * ========================================================
 *
 *              MedReminder Component
 *
 * ========================================================
 * ========================================================
 */
function MedReminder({
  handleReminderDays, dosage, times, prescriptionQty, duration, reminderDays, prescriptionDate,
}) {
  // calculates the reminder date, math is wrong
  const prescriptionDuration = (Number(dosage) * Number(times) * Number(prescriptionQty)) / Number(duration);

  const daysBeforeReminder = prescriptionDuration - reminderDays;

  const reminderDate = getDate(prescriptionDate, daysBeforeReminder);

  return (
    <CardContent>
      <TextField value={reminderDays} variant="outlined" label="Days before finish" onChange={handleReminderDays} />
      <Typography variant="body1">
        Reminder will be sent on
        {' '}
        {reminderDate.toLocaleString()}
      </Typography>

    </CardContent>
  );
}

export default MedReminder;