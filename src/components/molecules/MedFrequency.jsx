/* eslint-disable max-len */
/* eslint-disable react/prop-types */
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
import {
  CardContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography, Switch, Stack,
} from '@mui/material';

/*
 * ========================================================
 * ========================================================
 *
 *                   MedFrequency Component
 *
 * ========================================================
 * ========================================================
 */
export default function MedFrequency({
  dosage,
  dosageCounter,
  times,
  duration, handleDosage,
  handleDosageCounter,
  handleTimes,
  handleDuration,
  asRequiredChecked,
  handleSwitch,
  handleNote,
  note,
}) {
  // Changes text color to white grey when asRequiredChecked is true,  to show that function is disabled
  const handleColor = asRequiredChecked ? '#bcbcbc' : '#000000';
  return (
    <div>
      <CardContent sx={{ height: '360px' }}>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h3">Take</Typography>
          <FormControlLabel
            control={(
              <Switch
                checked={asRequiredChecked}
                onChange={handleSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
                color="secondary"
              />
)}
            label="As required"
          />
        </Stack>
        <Stack
          spacing={2}
        >
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >

            <FormControl>
              <TextField
                variant="outlined"
                label="Dosage"
                type="number"
                min="1"
                max="20"
                onChange={handleDosage}
                value={dosage}
                disabled={asRequiredChecked}
                sx={{ width: '130px' }}
              />
            </FormControl>
            <FormControl sx={{ width: '120px' }}>
              <InputLabel id="Dosage Counter">Counter</InputLabel>
              <Select
                value={dosageCounter}
                onChange={handleDosageCounter}
                label="Counter"
                name="Dosage Counter"
              >
                <MenuItem value="pills">
                  Pill(s)
                </MenuItem>
                <MenuItem value="packets">
                  Packet(s)
                </MenuItem>
                <MenuItem value="ml">
                  ml
                </MenuItem>
                <MenuItem value="g">
                  g
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControl>
              <TextField
                variant="outlined"
                label="Times"
                type="number"
                min="1"
                max="6"
                value={times}
                onChange={handleTimes}
                disabled={asRequiredChecked}
                sx={{ width: '130px' }}
              />
            </FormControl>
            <Typography variant="body1" color={handleColor}>{times === '1' ? 'Time' : 'Times'}</Typography>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1" color={handleColor}>Every</Typography>
            <FormControl>
              <TextField
                variant="outlined"
                label="Duration"
                type="number"
                min="1"
                max="14"
                onChange={handleDuration}
                disabled={asRequiredChecked}
                value={duration}
                sx={{ width: '130px' }}
              />
            </FormControl>

            <Typography variant="body1" color={handleColor}>{duration === '1' ? 'Day' : 'Days'}</Typography>
          </Stack>
          <FormControl>
            <TextField
              variant="outlined"
              label="Note"
              value={note}
              onChange={handleNote}
            />
          </FormControl>
        </Stack>
      </CardContent>
    </div>
  );
}
