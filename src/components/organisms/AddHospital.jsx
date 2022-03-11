/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-console */
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
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import hospitalList from '../others/hopsitalList';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add hospital form
 *
 * ========================================================
 * ========================================================
 */
export default function AddHospital() {
  const [hospital, setHospital] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [patientArr, setPatientArr] = useState();
  const navigate = useNavigate();
  const filter = createFilterOptions();

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    // ################################## HARDCODED FOR NOW  ##################################
    // data.append('userId', userId);
    data.append('userId', '62259eddb4a77ae0343f7305');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        setPatientArr(result.data.patientDetailsObj);
      });
  }, []);

  const updatePatient = (string) => {
    const patientSplitStr = string.split(',');
    setPatientId(patientSplitStr[0]);
    setPatientName(patientSplitStr[1]);
  };

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      hospital,
      patientId,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-hospital`, data).then((response) => {
      if (response.status === 200) {
        setSuccessMessage(
          <div>
            <p>
              {`You have added ${hospital} to ${patientName}'s profile.`}
            </p>
          </div>,
        );
      }
    });
  };
  return (
    <div>
      { patientArr === undefined
        ? <div />
        : (
          <div>
            <Button variant="contained" onClick={() => navigate('/nav/add-appt')}>Back</Button>
            <Button variant="contained" onClick={() => navigate('/nav/add-patient')}>+ Patient</Button>
            <Button variant="contained" disabled>+ Hospital</Button>
            <Button variant="contained" onClick={() => navigate('/nav/add-department')}>+ Department</Button>
            <Button variant="contained" onClick={() => navigate('/nav/add-chaperone')}>+ Chaperone</Button>
            <br />
            <br />
            <form onSubmit={handleSubmit}>

              <Autocomplete
                options={patientArr}
                getOptionLabel={(option) => `${option.identity.name.first} ${option.identity.name.last}`}
                renderInput={(params) => <TextField {...params} label="Select Patient" required />}
                onChange={(event, newValue) => { updatePatient(`${newValue._id},${`${newValue.identity.name.first} ${newValue.identity.name.last}`}`); }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                sx={{ width: 250 }}
              />

              <Autocomplete
                options={hospitalList}
                onChange={(event, newValue) => { setHospital(newValue.value); }}
                renderInput={(params) => <TextField {...params} label="Add Hospital" required />}
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
              <br />
              <Button variant="contained" type="submit">Submit</Button>
            </form>
            <div>
              {successMessage === ''
                ? <div />
                : (
                  <div>
                    {successMessage}
                  </div>
                )}
            </div>
          </div>
        )}
    </div>
  );
}
