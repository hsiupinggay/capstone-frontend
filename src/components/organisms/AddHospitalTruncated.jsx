/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/*
 * ========================================================
 * ========================================================
 *
 *                       Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useState } from 'react';
import axios from 'axios';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import {
  CardContent, TextField, Typography, Stack,
} from '@mui/material';
import hospitalList from '../others/hopsitalList';
import { useMedicalContext } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add hospital form
 *
 * ========================================================
 * ========================================================
 */
export default function AddHospitalTruncated({ name, setClinicsArr }) {
  const { store } = useMedicalContext();
  const { patientId } = store;
  const filter = createFilterOptions();

  const [hospital, setHospital] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      hospital,
      patientId,
      getAllPatientDetails: true,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-hospital`, data).then((response) => {
      if (response.status === 200) {
        const { clinics } = response.data;
        setClinicsArr(clinics);
        setSuccessMessage(
          <div>
            <p>
              {`Successfully added ${hospital} to ${name}'s profile.`}
            </p>
          </div>,
        );
      }
    });
  };
  return (
    <CardContent>
      <Stack
        spacing={4}
      >
        <Typography variant="h2">
          {`Add a Hospital for ${name}`}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack
            spacing={4}
            justifyContent="center"
          >
            <Autocomplete
              options={hospitalList}
              onChange={(event, newValue) => { setHospital(newValue.value); }}
              renderInput={(params) => <TextField {...params} label="Find Hospital" required />}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.label);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    label: `Add "${inputValue}"`,
                    value: inputValue,
                  });
                }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              sx={{ width: 250 }}
            />

            <Button variant="contained" type="submit">Submit</Button>
          </Stack>
        </form>

        {successMessage === ''
          ? <div />
          : (
            <Typography variant="body1" color="secondary">
              {successMessage}
            </Typography>
          )}

      </Stack>
    </CardContent>
  );
}
