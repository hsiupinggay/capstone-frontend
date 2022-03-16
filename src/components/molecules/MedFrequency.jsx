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
import React, { useState } from 'react';
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
  checked,
  handleSwitch,
}) {
  const data = {
    dosage,
    dosageCounter,
    times,
    duration,
  };

  return (
    <div>
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h3">Take</Typography>
          <FormControlLabel
            control={(
              <Switch
                checked={checked}
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
                disabled={checked}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="Dosage Counter">Dosage Counter</InputLabel>
              <Select
                value={dosageCounter}
                onChange={handleDosageCounter}
                label="Dosage Counter"
                name="Dosage Counter"
                disabled={checked}
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
                disabled={checked}
              />
            </FormControl>
            <Typography variant="body1">{times === '1' ? 'Time' : 'Times'}</Typography>

          </Stack>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >
            {' '}
            <Typography variant="body1">Every</Typography>
            <FormControl>

              <TextField
                variant="outlined"
                label="Duration"
                type="number"
                min="1"
                max="14"
                onChange={handleDuration}
                disabled={checked}
                value={duration}
              />
            </FormControl>
            <Typography variant="body1">{duration === '1' ? 'Day' : 'Days'}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </div>
  );
}
