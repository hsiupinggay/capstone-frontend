/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for filtering patient memos
 *
 * ========================================================
 * ========================================================
 */
export default function FilterPatientMemos({
  deptArr, dateArr, hospArr, chapArr, fullMemoList, setMemoList, name,
}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [chaperoneFilter, setChaperoneFilter] = useState('');
  const [hospitalFilter, setHospitalFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  // const [filters, setFilters] = useState({
  //   date: '',
  //   chaperone: '',
  //   hospital: '',
  //   department: '',
  // });

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const newMemoList = [];
    for (let i = 0; i < fullMemoList.length; i += 1) {
      let doesDateMatch = false;
      if (dateFilter !== '') {
        if (fullMemoList[i].date === dateFilter) {
          doesDateMatch = true;
        } else {
          doesDateMatch = false;
        }
      }

      let doesChapMatch = false;
      if (chaperoneFilter !== '') {
        if (fullMemoList[i].chaperone === undefined) {
          doesChapMatch = false;
        } else if (fullMemoList[i].chaperone.name === chaperoneFilter) {
          doesChapMatch = true;
        } else {
          doesChapMatch = false;
        }
      }

      let doesHospMatch = false;
      if (hospitalFilter !== '') {
        if (fullMemoList[i].hospital.name === hospitalFilter) {
          doesHospMatch = true;
        } else {
          doesHospMatch = false;
        }
      }

      let doesDeptMatch = false;
      if (departmentFilter !== '') {
        if (fullMemoList[i].hospital.department === departmentFilter) {
          doesDeptMatch = true;
        } else {
          doesDeptMatch = false;
        }
      }

      if ((doesChapMatch || chaperoneFilter === '') && (doesDateMatch || dateFilter === '') && (doesDeptMatch || departmentFilter === '') && (doesHospMatch || hospitalFilter === '')) {
        newMemoList.push(fullMemoList[i]);
      }
    }
    setMemoList(newMemoList);
    setSuccessMessage(
      `You have set the following filters:
    ${dateFilter || ''} 
    ${hospitalFilter || ''} 
    ${departmentFilter || ''} 
    ${chaperoneFilter || ''}
    `,
    );
  };

  const resetFilters = () => {
    setMemoList(fullMemoList);
    setSuccessMessage('You have reset the filters!');
  };

  return (
    <div>
      <strong>
        {' '}
        Choose the filters you would like for
        {' '}
        {name}
        's memos
      </strong>

      <Tooltip title="Reset Filters">
        <RestartAltIcon variant="contained" onClick={resetFilters} />
      </Tooltip>

      <form onSubmit={handleSubmit}>

        <Autocomplete
          options={dateArr}
          onChange={(event, newValue) => { setDateFilter(newValue); }}
          renderInput={(params) => <TextField {...params} label="Filter Date" />}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          sx={{ width: 250 }}
        />
        <br />

        <Autocomplete
          options={hospArr}
          onChange={(event, newValue) => { setHospitalFilter(newValue); }}
          renderInput={(params) => <TextField {...params} label="Filter Hospital" />}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          sx={{ width: 250 }}
        />
        <br />

        <Autocomplete
          options={deptArr}
          onChange={(event, newValue) => { setDepartmentFilter(newValue); }}
          renderInput={(params) => <TextField {...params} label="Filter Department" />}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          sx={{ width: 250 }}
        />
        <br />

        <Autocomplete
          options={chapArr}
          onChange={(event, newValue) => { setChaperoneFilter(newValue); }}
          renderInput={(params) => <TextField {...params} label="Filter Chaperone" />}
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
