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
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import departmentList from '../others/departmentList';
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
export default function AddDepartmentTruncated({ hospital, name, setClinicsArr }) {
  const { store } = useMedicalContext();
  const { patientId } = store;

  const [successMessage, setSuccessMessage] = useState('');
  const [department, setDepartment] = useState('');
  const filter = createFilterOptions();

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      hospital,
      patientId,
      department,
      getAllPatientDetails: true,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-department`, data).then((response) => {
      if (response.status === 200) {
        const { clinics } = response.data;
        setClinicsArr(clinics);
        setSuccessMessage(
          <div>
            <p>
              {`You have added the ${department} department to ${hospital} under ${name}'s profile.`}
            </p>
          </div>,
        );
      }
    });
  };

  return (
    <div>
      <strong>
        {' '}
        You are adding a department to
        {' '}
        {hospital}
        {' '}
        under
        {' '}
        {name}
        's profile
      </strong>
      <br />
      <br />
      <form onSubmit={handleSubmit}>

        <Autocomplete
          options={departmentList}
          onChange={(event, newValue) => { setDepartment(newValue.value); }}
          renderInput={(params) => <TextField {...params} label="Add Department" required />}
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
  );
}
