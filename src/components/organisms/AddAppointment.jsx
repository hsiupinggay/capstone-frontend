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
  Autocomplete, TextField, Typography, Box, Stack,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import moment from 'moment';
import Button from '@mui/material/Button';
import { useMedicalContext } from '../others/store';
import apptPopupStyles from './AddAppointmentCss';

/*
 * ========================================================
 * ========================================================
 *
 *       Component for rendering add appointment form
 *
 * ========================================================
 * ========================================================
 */
export default function AddAppointment({ setModal, setAddition, setDisplayDataArray }) {
  const { store } = useMedicalContext();
  const { userId } = store;

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

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        // Add additional option to trigger redirect to add patient popup
        result.data.patientDetailsObj.push({ identity: { name: { first: '--ADD NEW PATIENT--', last: '' } } });
        setPatientArr(result.data.patientDetailsObj);
      });
  }, []);

  const selectDept = (string) => {
    if (string === '--ADD NEW DEPARTMENT--') {
      // Redirect to add department component
      setModal('add-category');
      setAddition('department');
      // navigate('/add-department');
    } else {
      setDepartment(string);
    }
  };

  // When user has selected a patient, find related hospitals and chaperones
  const updateHosChapDropdowns = (string) => {
    const patientSplitStr = string.split(',');
    if (patientSplitStr[0] === 'undefined') {
      // Redirect to add patient component
      setModal('add-category');
      setAddition('patient');
      // navigate('/add-patient');
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
      // navigate('/add-hospital');
      console.log('weeee');
      setModal('add-category');
      // setOpenApptModal(true);
      setAddition('hospital');
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
    const chaperoneSplitStr = value.split(',');
    if (chaperoneSplitStr[1] === 'undefined') {
      // Redirect to add chaperone component
      // navigate('/add-chaperone');
      setModal('add-category');
      setAddition('chaperone');
    } else {
      setChaperone(chaperoneSplitStr[0]);
      setChaperoneId(chaperoneSplitStr[1]);
    }
  };

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      userId,
      patientId,
      department,
      hospital,
      chaperone,
      chaperoneId,
      dateTime,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-appointment`, data).then((response) => {
      if (response.status === 200) {
        console.log(response.data.patientDetailsObj);
        setDisplayDataArray(response.data.patientDetailsObj);
        setSuccessMessage(
          <Typography sx={apptPopupStyles.outcomeMessage}>
            <strong>You have Added a New Appointment! </strong>
            <div>
              <strong>Patient:</strong>
              {' '}
              {`${patientName}`}
            </div>
            <div>
              <strong>Hospital:</strong>
              {' '}
              {`${hospital}`}
            </div>
            <div>
              <strong>Department:</strong>
              {' '}
              {`${department}`}
            </div>
            <div>
              <strong>Date:</strong>
              {' '}
              {`${response.data.data[response.data.data.length - 1].date}`}
            </div>
            <div>
              <strong>Time:</strong>
              {' '}
              {`${response.data.data[response.data.data.length - 1].time}`}
            </div>
            <div>
              <strong>Chaperone:</strong>
              {' '}
              {`${chaperone || 'Nil'}`}
            </div>

          </Typography>,
        );
      }
    });
  };

  return (
    <Box>
      { patientArr === undefined
        ? <div />
        : (
          <form onSubmit={handleSubmit}>
            <Box sx={apptPopupStyles.dateTimeContainer}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DateTimePicker
                  label="Appointment Details"
                  value={dateTime}
                  onChange={(newValue) => {
                    setDateTime(`${moment(`${newValue.c.year}-${newValue.c.month}-${newValue.c.day}`).format('YYYY-MM-DD')}T${moment(`${newValue.c.hour}:${newValue.minute}`, 'HH:m').format('HH:mm')}`);
                  }}
                  renderInput={(params) => <TextField {...params} required sx={apptPopupStyles.inputField} />}
                />
              </LocalizationProvider>
            </Box>

            <Autocomplete
              options={patientArr}
              getOptionLabel={(option) => `${option.identity.name.first} ${option.identity.name.last}`}
              renderInput={(params) => <TextField {...params} label="Select Patient" required />}
              onChange={(event, newValue) => { updateHosChapDropdowns(`${newValue._id},${`${newValue.identity.name.first} ${newValue.identity.name.last}`}`); }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              sx={apptPopupStyles.inputField}
            />
            { hospArr === undefined
              ? (
                <div>
                  <Stack spacing={2}>

                    <Autocomplete
                      options={[{ label: '--ADD NEW HOSPITAL--' }]}
                      renderInput={(params) => <TextField {...params} label="Select Hospital" required />}
                      onChange={(event, newValue) => { updateDept(newValue.label); }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      sx={apptPopupStyles.inputField}
                    />
                    <Autocomplete
                      options={[{ label: '--ADD NEW DEPARTMENT--' }]}
                      renderInput={(params) => <TextField {...params} label="Select Department" required />}
                      onChange={(event, newValue) => { selectDept(newValue.label); }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      sx={apptPopupStyles.inputField}
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
                      sx={apptPopupStyles.inputField}
                    />
                  </Stack>

                </div>
              )
              : (
                <div>
                  <Stack spacing={0.4}>
                    <div>

                      <Autocomplete
                        options={hospArr}
                        getOptionLabel={(option) => option.hospital}
                        renderInput={(params) => <TextField {...params} label="Select Hospital" required />}
                        onChange={(event, newValue) => { updateDept(newValue.hospital); }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        sx={apptPopupStyles.inputField}
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
                            sx={apptPopupStyles.inputField}
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
                            sx={apptPopupStyles.inputField}
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
                        sx={apptPopupStyles.inputField}
                      />
                    </div>
                  </Stack>
                </div>
              )}
            <Box sx={apptPopupStyles.submitBtn}>
              <Button variant="contained" type="submit">Submit</Button>
            </Box>
          </form>
        )}
      <div>
        {
        successMessage === ''
          ? <div />
          : (
            <Typography>
              {successMessage}
            </Typography>
          )
        }
      </div>
    </Box>
  );
}
