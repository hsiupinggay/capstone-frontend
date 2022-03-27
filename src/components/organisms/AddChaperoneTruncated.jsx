/* eslint-disable max-len */
/* eslint-disable react/prop-types */
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField, Typography, Button, CardContent, Stack,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useMedicalContext } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add chaperone form
 *
 * ========================================================
 * ========================================================
 */
export default function AddChaperoneTruncated({ name, setChaperonesArr }) {
  const { store } = useMedicalContext();
  const {
    userId, firstName, lastName, patientId,
  } = store;

  const [contacts, setContacts] = useState('');
  const [chaperoneName, setChaperoneName] = useState('');
  const [chaperoneId, setChaperoneId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const filter = createFilterOptions();

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/all-contacts?${data.toString()}`)
      .then((result) => {
        const contactArr = result.data.data;
        const tempArr = [];
        for (let i = 0; i < contactArr.length; i += 1) {
          tempArr.push({ value: `${contactArr[i].firstName} ${contactArr[i].lastName},${contactArr[i].contactId}`, label: `${contactArr[i].firstName} ${contactArr[i].lastName}` });
        }
        // Show user their own name to add as a chaperone
        tempArr.push({ value: `${firstName} ${lastName},${userId}`, label: `${firstName} ${lastName}` });
        setContacts(tempArr);
      });
  }, []);

  const updateChaperone = (optionValue) => {
    const chaperoneSplitStr = optionValue.split(',');
    setChaperoneId(chaperoneSplitStr[1]);
    setChaperoneName(chaperoneSplitStr[0]);
  };

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      chaperoneName,
      chaperoneId: chaperoneId || '',
      patientId,
      getAllPatientDetails: true,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-chaperone`, data).then((response) => {
      if (response.status === 200) {
        const { chaperones } = response.data;
        setChaperonesArr(chaperones);
        setSuccessMessage(

          <div>
            <p>
              {`You have added ${chaperoneName} as ${name}'s chaperone.`}
            </p>
          </div>,
        );
      }
    });
  };

  return (
    <div>
      { contacts === undefined
        ? <div />
        : (
          <CardContent>
            <Stack
              spacing={4}
            >
              <Typography variant="h2" textAlign="center">
                {`Add a Chaperone for ${name}`}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack
                  spacing={4}
                  justifyContent="center"
                >
                  <Autocomplete
                    options={contacts}
                    onChange={(event, newValue) => { updateChaperone(newValue.value); }}
                    renderInput={(params) => <TextField {...params} label="Add Chaperone" required />}
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
              <div>
                {successMessage === ''
                  ? (
                    <Typography variant="body2" color="secondary" textAlign="center">
                      If you would like to add another app user as chaperone, be sure to add them as your contact first.
                    </Typography>
                  )
                  : (
                    <Typography variant="body2" color="secondary" textAlign="center">
                      {successMessage}
                    </Typography>
                  )}
              </div>
            </Stack>
          </CardContent>
        )}
    </div>
  );
}
