/* eslint-disable react/jsx-props-no-spreading */
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
import {
  CardContent, Stack, TextField, Typography, Switch, FormControlLabel, Tooltip,
} from '@mui/material';
import React from 'react';
import { TimePicker } from '@mui/lab';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterLuxon';

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
  handleReminderDays, reminderDays, reminderDate, handleReminderTime, reminderTime, reminderChecked, asRequiredChecked, handleReminder,
}) {
  return (
    <CardContent>
      <Stack
        spacing={2}
      >
        {asRequiredChecked ? (
          <Tooltip title="Reminder not available for use as required medication">
            <FormControlLabel
              control={(
                <Switch
                  checked={false}
                  disabled
                  inputProps={{ 'aria-label': 'controlled' }}
                  color="secondary"
                />
          )}
              label="Remind me to refill"
            />
          </Tooltip>
        ) : (
          <FormControlLabel
            control={(
              <Switch
                checked={reminderChecked}
                onChange={handleReminder}
                inputProps={{ 'aria-label': 'controlled' }}
                color="secondary"
              />

          )}
            label="Remind me to refill"
          />

        )}

        <TextField value={reminderDays} variant="outlined" label="Days before finish" onChange={handleReminderDays} disabled={!reminderChecked} />
        {reminderChecked && (
          <div>
            <Typography variant="body1">
              Reminder will be sent on
            </Typography>

            <Typography varient="body1">
              {/* reminderDate.getMonth() returns a number from 0-11 hence +1 to get actual month */}
              {`${reminderDate.getMonth() + 1}/${reminderDate.getDate()}/${reminderDate.getFullYear()}`}
            </Typography>

          </div>
        )}

        <LocalizationProvider dateAdapter={DateAdapter}>
          <TimePicker
            label="Time"
            value={reminderTime}
            onChange={handleReminderTime}
            disabled={!reminderChecked}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
    </CardContent>
  );
}

export default MedReminder;
