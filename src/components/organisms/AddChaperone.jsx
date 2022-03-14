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
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
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
export default function AddChaperone() {
  const { store } = useMedicalContext();
  const { userId, firstName, lastName } = store;

  const [family, setFamily] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [chaperoneName, setChaperoneName] = useState('');
  const [chaperoneId, setChaperoneId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [patientArr, setPatientArr] = useState();
  const navigate = useNavigate();
  const filter = createFilterOptions();

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        setPatientArr(result.data.patientDetailsObj);
      });
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/all-family?${data.toString()}`)
      .then((result) => {
        const familyArr = result.data.data;
        const tempArr = [];
        for (let i = 0; i < familyArr.length; i += 1) {
          tempArr.push({ value: `${familyArr[i].name},${familyArr[i].familyMemberId}`, label: familyArr[i].name });
        }
        // Show user their own name to add as a chaperone
        tempArr.push({ value: `${firstName} ${lastName},${userId}`, label: `${firstName} ${lastName}` });
        setFamily(tempArr);
      });
  }, []);

  const updatePatient = (string) => {
    const patientSplitStr = string.split(',');
    setPatientId(patientSplitStr[0]);
    setPatientName(patientSplitStr[1]);
  };

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
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-chaperone`, data).then((response) => {
      if (response.status === 200) {
        setSuccessMessage(
          <div>
            <p>
              {`You have added ${chaperoneName} as ${patientName}'s chaperone.`}
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
            <Button variant="contained" onClick={() => navigate('/add-appt')}>Back</Button>
            <Button variant="contained" onClick={() => navigate('/add-patient')}>+ Patient</Button>
            <Button variant="contained" onClick={() => navigate('/add-hospital')}>+ Hospital</Button>
            <Button variant="contained" onClick={() => navigate('/add-department')}>+ Department</Button>
            <Button variant="contained" disabled>+ Chaperone</Button>
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
                options={family}
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
