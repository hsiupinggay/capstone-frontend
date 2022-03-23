/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
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
import { useMedicalContext } from '../others/store';
import BackIcon from '../molecules/BackIcon';
import chaperonePopupStyles from './AddChaperoneCss';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add chaperone form
 *
 * ========================================================
 * ========================================================
 */
export default function AddChaperone({ setModal, setAddition }) {
  const { store } = useMedicalContext();
  const { userId, firstName, lastName } = store;

  const [contacts, setContacts] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [chaperoneName, setChaperoneName] = useState('');
  const [chaperoneId, setChaperoneId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [patientArr, setPatientArr] = useState();
  const [value, setValue] = useState(0);
  const filter = createFilterOptions();
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
            {`You have added ${chaperoneName} as ${patientName}'s chaperone.`}
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
            <BackIcon variant="contained" onClick={() => setModal('add-appt')} />
            <Box sx={chaperonePopupStyles.inputContainer}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label=" +Patient" value="patient" {...a11yProps(0)} />
                <Tab label=" +Hospital" value="hospital" {...a11yProps(1)} />
                <Tab label=" +Department" value="department" {...a11yProps(2)} />
                <Tab label=" +Chaperone" value="chaperone" {...a11yProps(3)} disabled />
              </Tabs>
            </Box>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <Box sx={chaperonePopupStyles.inputContainer}>

                <Autocomplete
                  options={patientArr}
                  getOptionLabel={(option) => `${option.identity.name.first} ${option.identity.name.last}`}
                  renderInput={(params) => <TextField {...params} label="Select Patient" sx={chaperonePopupStyles.inputField} required />}
                  onChange={(event, newValue) => { updatePatient(`${newValue._id},${`${newValue.identity.name.first} ${newValue.identity.name.last}`}`); }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  sx={{ width: 250 }}
                />

                <Autocomplete
                  options={contacts}
                  onChange={(event, newValue) => { updateChaperone(newValue.value); }}
                  renderInput={(params) => <TextField {...params} label="Add Chaperone" sx={chaperonePopupStyles.inputField} required />}
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
              </Box>
              <br />
              <Box sx={chaperonePopupStyles.submitBtn}>
                <Button variant="contained" type="submit">Submit</Button>
              </Box>
            </form>
            <div>
              {successMessage === ''
                ? <div />
                : (
                  <Typography sx={chaperonePopupStyles.outcomeMessage}>
                    {successMessage}
                  </Typography>
                )}
            </div>
          </div>
        )}
    </div>
  );
}
