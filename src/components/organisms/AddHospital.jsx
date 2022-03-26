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
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import hospitalList from '../others/hopsitalList';
import { useMedicalContext } from '../others/store';
import BackIcon from '../molecules/BackIcon';
import hospitalPopupStyles from './AddHospitalCss';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add hospital form
 *
 * ========================================================
 * ========================================================
 */
export default function AddHospital({ setModal, setAddition }) {
  const { store } = useMedicalContext();
  const { userId } = store;
  const filter = createFilterOptions();

  const [hospital, setHospital] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [patientArr, setPatientArr] = useState();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAddition(newValue);
  };

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
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
            {`You have added ${hospital} to ${patientName}'s profile.`}
          </div>,
        );
      }
    });
  };

  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });

  return (
    <div>
      { patientArr === undefined
        ? <div />
        : (
          <div>
            <div>
              <BackIcon variant="contained" onClick={() => setModal('add-appt')} />
              <Box sx={hospitalPopupStyles.inputContainer}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label=" +Patient" value="patient" {...a11yProps(0)} />
                  <Tab label=" +Hospital" value="hospital" {...a11yProps(1)} disabled />
                  <Tab label=" +Department" value="department" {...a11yProps(2)} />
                  <Tab label=" +Chaperone" value="chaperone" {...a11yProps(3)} />
                </Tabs>
              </Box>
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <Box sx={hospitalPopupStyles.inputContainer}>

                <Autocomplete
                  options={patientArr}
                  getOptionLabel={(option) => `${option.identity.name.first} ${option.identity.name.last}`}
                  renderInput={(params) => <TextField {...params} label="Select Patient" required />}
                  onChange={(event, newValue) => { updatePatient(`${newValue._id},${`${newValue.identity.name.first} ${newValue.identity.name.last}`}`); }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  sx={hospitalPopupStyles.inputField}
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
                  sx={hospitalPopupStyles.inputField}
                />
              </Box>
              <Box sx={hospitalPopupStyles.submitBtn}>
                <Button variant="contained" type="submit">Submit</Button>
              </Box>
            </form>
            <div>
              {successMessage === ''
                ? <div />
                : (
                  <Typography sx={hospitalPopupStyles.outcomeMessage}>
                    {successMessage}
                  </Typography>
                )}
            </div>
          </div>
        )}
    </div>
  );
}
