/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
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
import Autocomplete from '@mui/material/Autocomplete';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import Button from '@mui/material/Button';

/*
 * ========================================================
 * ========================================================
 *
 *       Component for rendering add appointment form
 *
 * ========================================================
 * ========================================================
 */
export default function AddAppointment() {
  const [patientArr, setPatientArr] = useState();
  const [hospArr, setHospArr] = useState();
  const [deptArr, setDeptArr] = useState();
  const [chaperoneArr, setChaperoneArr] = useState();
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [hospital, setHospital] = useState('');
  const [chaperone, setChaperone] = useState('');
  const [chaperoneId, setChaperoneId] = useState('');
  const [department, setDepartment] = useState('');
  const [dateTime, setDateTime] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    // ################################## HARDCODED FOR NOW  ##################################
    // data.append('userId', userId);
    data.append('userId', '62259eddb4a77ae0343f7305');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        // Add additional option to trigger redirect to add patient popup
        result.data.patientDetailsObj.push({ identity: { name: { first: '--ADD NEW PATIENT--', last: '' } } });
        setPatientArr(result.data.patientDetailsObj);
        console.log(result.data.patientDetailsObj);
      });
  }, []);

  const selectDept = (string) => {
    if (string === '--ADD NEW DEPARTMENT--') {
      // Redirect to add department component
      navigate('/nav/add-department');
    } else {
      setDepartment(string);
    }
  };

  // When user has selected a patient, find related hospitals and chaperones
  const updateHosChapDropdowns = (string) => {
    console.log(string);
    const patientSplitStr = string.split(',');
    console.log(patientSplitStr);
    if (patientSplitStr[0] === 'undefined') {
      // Redirect to add patient component

      navigate('/nav/add-patient');
    } else {
      setPatientId(patientSplitStr[0]);
      setPatientName(patientSplitStr[1]);
      for (let i = 0; i < patientArr.length; i += 1) {
        if (patientArr[i]._id === patientSplitStr[0]) {
          patientArr[i].visitDetails.clinics.push({ hospital: '--ADD NEW HOSPITAL--' });
          patientArr[i].visitDetails.chaperones.push({ name: '--ADD NEW CHAPERONE--' });
          setChaperoneArr(patientArr[i].visitDetails.chaperones);
          setHospArr(patientArr[i].visitDetails.clinics);
        }
      }
    }
  };

  // When user has selected a hospital, find related departments
  const updateDept = (hospitalInput) => {
    if (hospitalInput === '--ADD NEW HOSPITAL--') {
      // Redirect to add hospital component
      navigate('/nav/add-hospital');
    } else {
      setHospital(hospitalInput);
      for (let i = 0; i < hospArr.length; i += 1) {
        if (hospArr[i].hospital === hospitalInput) {
          hospArr[i].departments.push('--ADD NEW DEPARTMENT--');
          setDeptArr(hospArr[i].departments);
        }
      }
    }
  };

  // When user selects a chaperone, save name and id in useState
  const updateChaperoneState = (value) => {
    console.log(value);
    const chaperoneSplitStr = value.split(',');
    if (chaperoneSplitStr[1] === 'undefined') {
      // Redirect to add chaperone component
      navigate('/nav/add-chaperone');
    } else {
      setChaperone(chaperoneSplitStr[0]);
      setChaperoneId(chaperoneSplitStr[1]);
    }
  };

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      patientId,
      department,
      hospital,
      chaperone,
      chaperoneId,
      dateTime,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-appointment`, data).then((response) => {
      if (response.status === 200) {
        setSuccessMessage(
          <div>
            <p>
              {'You have added a new appointment: '}
            </p>
            <p>
              {`Patient: ${patientName}`}
            </p>
            <p>
              {`Hospital: ${hospital}`}
            </p>
            <p>
              {`Department: ${department}`}
            </p>
            <p>
              {`Date: ${response.data.data[response.data.data.length - 1].date}`}
            </p>
            <p>
              {`Time: ${response.data.data[response.data.data.length - 1].time}`}
            </p>
            <p>
              {`Chaperone: ${chaperone || 'Nil'}`}
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
          <form onSubmit={handleSubmit}>

            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateTimePicker
                label="Appointment Details"
                value={dateTime}
                onChange={(newValue) => {
                  setDateTime(`${moment(`${newValue.c.year}-${newValue.c.month}-${newValue.c.day}`).format('YYYY-MM-DD')}T${moment(`${newValue.c.hour}:${newValue.minute}`, 'HH:m').format('HH:mm')}`);
                }}
                renderInput={(params) => <TextField {...params} required />}
                sx={{ width: 250 }}
              />
            </LocalizationProvider>

            <Autocomplete
              options={patientArr}
              getOptionLabel={(option) => `${option.identity.name.first} ${option.identity.name.last}`}
              renderInput={(params) => <TextField {...params} label="Select Patient" required />}
              onChange={(event, newValue) => { updateHosChapDropdowns(`${newValue._id},${`${newValue.identity.name.first} ${newValue.identity.name.last}`}`); }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              sx={{ width: 250 }}
            />
            { hospArr === undefined
              ? (
                <div>
                  <Autocomplete
                    options={[{ label: '--ADD NEW HOSPITAL--' }]}
                    renderInput={(params) => <TextField {...params} label="Select Hospital" required />}
                    onChange={(event, newValue) => { updateDept(newValue.label); }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    sx={{ width: 250 }}
                  />
                  <Autocomplete
                    options={[{ label: '--ADD NEW DEPARTMENT--' }]}
                    renderInput={(params) => <TextField {...params} label="Select Department" required />}
                    onChange={(event, newValue) => { selectDept(newValue.label); }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    sx={{ width: 250 }}
                  />
                  {' '}
                  <Autocomplete
                    options={[{ name: '--ADD NEW CHAPERONE--' }]}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Select Chaperone" required />}
                    onChange={(event, newValue) => { updateChaperoneState(`${newValue.name},${newValue.chaperoneId}`); }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    sx={{ width: 250 }}
                  />
                </div>
              )
              : (
                <div>
                  <div>
                    <Autocomplete
                      options={hospArr}
                      getOptionLabel={(option) => option.hospital}
                      renderInput={(params) => <TextField {...params} label="Select Hospital" required />}
                      onChange={(event, newValue) => { updateDept(newValue.hospital); }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      sx={{ width: 250 }}
                    />

                  </div>

                  { deptArr === undefined
                    ? (
                      <div>
                        <Autocomplete
                          options={[{ label: '--ADD NEW DEPARTMENT--' }]}
                          renderInput={(params) => <TextField {...params} label="Select Department" required />}
                          onChange={(event, newValue) => { selectDept(newValue.label); }}
                          selectOnFocus
                          clearOnBlur
                          handleHomeEndKeys
                          sx={{ width: 250 }}
                        />
                      </div>
                    )
                    : (
                      <div>
                        <Autocomplete
                          options={deptArr}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => <TextField {...params} label="Select Deparment" required />}
                          onChange={(event, newValue) => { selectDept(newValue); }}
                          selectOnFocus
                          clearOnBlur
                          handleHomeEndKeys
                          sx={{ width: 250 }}
                        />
                      </div>
                    )}

                  <div>
                    <Autocomplete
                      options={chaperoneArr}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} label="Select Chaperone" />}
                      onChange={(event, newValue) => { updateChaperoneState(`${newValue.name},${newValue.chaperoneId}`); }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      sx={{ width: 250 }}
                    />
                  </div>
                </div>
              )}

            <Button variant="contained" type="submit">Submit</Button>
          </form>
        )}
      <div>
        {
        successMessage === ''
          ? <div />
          : (
            <div>
              {successMessage}
            </div>
          )
        }
      </div>
    </div>
  );
}
