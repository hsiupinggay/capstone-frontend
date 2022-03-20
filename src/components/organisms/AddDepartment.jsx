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
import departmentList from '../others/departmentList';
import BackIcon from '../molecules/BackIcon';
import departmentPopupStyles from './AddDepartmentCss';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add hospital form
 *
 * ========================================================
 * ========================================================
 */
export default function AddDepartment({ setModal, setAddition }) {
  const { store } = useMedicalContext();
  const { userId } = store;

  const [hospital, setHospital] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [patientArr, setPatientArr] = useState();
  const [hospArr, setHospArr] = useState();
  const [department, setDepartment] = useState('');
  const filter = createFilterOptions();

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
    for (let i = 0; i < patientArr.length; i += 1) {
      if (patientArr[i]._id === patientSplitStr[0]) {
        setHospArr(patientArr[i].visitDetails.clinics);
      }
    }
  };

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      hospital,
      patientId,
      department,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-department`, data).then((response) => {
      if (response.status === 200) {
        setSuccessMessage(
          <div>
            {`You have added the ${department} department to ${hospital} under ${patientName}'s profile.`}
          </div>,
        );
      }
    });
  };
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAddition(newValue);
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
            <BackIcon variant="contained" onClick={() => setModal('add appointment')} />
            <Box sx={departmentPopupStyles.inputContainer}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label=" +Patient" value="patient" {...a11yProps(0)} borderColor="#000000" />
                <Tab label=" +Hospital" value="hospital" {...a11yProps(1)} />
                <Tab label=" +Department" value="department" {...a11yProps(2)} disabled />
                <Tab label=" +Chaperone" value="chaperone" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <Box sx={departmentPopupStyles.inputContainer}>
                <Autocomplete
                  options={patientArr}
                  getOptionLabel={(option) => `${option.identity.name.first} ${option.identity.name.last}`}
                  renderInput={(params) => <TextField {...params} label="Select Patient" required sx={departmentPopupStyles.inputField} />}
                  onChange={(event, newValue) => { updatePatient(`${newValue._id},${`${newValue.identity.name.first} ${newValue.identity.name.last}`}`); }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  sx={{ width: 250 }}
                />

                { hospArr === undefined
                  ? (
                    <div>
                      <Autocomplete
                        options={[]}
                        renderInput={(params) => <TextField {...params} label="Select Hospital" sx={departmentPopupStyles.inputField} required />}
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
                          renderInput={(params) => <TextField {...params} label="Select Hospital" sx={departmentPopupStyles.inputField} required />}
                          onChange={(event, newValue) => { setHospital(newValue.hospital); }}
                          selectOnFocus
                          clearOnBlur
                          handleHomeEndKeys
                          sx={{ width: 250 }}
                        />
                      </div>

                    </div>
                  )}

                <Autocomplete
                  options={departmentList}
                  onChange={(event, newValue) => { setDepartment(newValue.value); }}
                  renderInput={(params) => <TextField {...params} label="Add Department" sx={departmentPopupStyles.inputField} required />}
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

              <Box sx={departmentPopupStyles.submitBtn}>
                <Button variant="contained" type="submit">Submit</Button>
              </Box>
            </form>
            <div>
              {successMessage === ''
                ? <div />
                : (
                  <Typography sx={departmentPopupStyles.outcomeMessage}>
                    {successMessage}
                  </Typography>
                )}
            </div>
          </div>
        )}
    </div>
  );
}
