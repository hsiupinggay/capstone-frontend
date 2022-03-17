/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  CardContent, FormControl, FormControlLabel, Stack, Switch, TextField, Typography,
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import React from 'react';

function Prescription({
  dosageCounter,
  handlePrescriptionDate,
  handlePrescriptionQty,
  reminderChecked,
  handleReminder,
  prescriptionQty,
  prescriptionDate,
}) {
  return (
    <div>
      <CardContent>

        <Stack
          spacing={1}
          justifyContent="space-between"
        >
          <Typography variant="h3">Prescription</Typography>
          <FormControl>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="PrescriptionDate"
                inputFormat="MM/dd/yyyy"
                value={prescriptionDate}
                onChange={handlePrescriptionDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
          >
            <FormControl>
              <TextField
                variant="outlined"
                label="Prescription Qty"
                type="number"
                value={prescriptionQty}
                onChange={handlePrescriptionQty}
              />
            </FormControl>
            <Typography variant="body1">{dosageCounter}</Typography>
          </Stack>
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
        </Stack>
      </CardContent>
    </div>
  );
}

export default Prescription;
