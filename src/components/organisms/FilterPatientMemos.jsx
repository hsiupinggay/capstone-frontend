/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
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
import {
  TextField, Typography, CardContent, Box, Stack,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  submitBtn: {
    display: 'flex',
    justifyContent: 'center',
  },
};

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
  deptArr, dateArr, hospArr, chapArr, fullMemoList, setMemoList, name, setOpen,
}) {
  const [dateFilter, setDateFilter] = useState('');
  const [chaperoneFilter, setChaperoneFilter] = useState('');
  const [hospitalFilter, setHospitalFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

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
    setOpen(false);
  };

  return (
    <CardContent>
      <Box sx={style.container}>

        <Typography variant="h3">
          {' '}
          Filter
          {' '}
          {name}
          's memos
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack
            spacing={2}
            width="250px"
          >
            <Autocomplete
              options={dateArr}
              onChange={(event, newValue) => { setDateFilter(newValue); }}
              renderInput={(params) => <TextField {...params} label="Filter Date" />}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
            />

            <Autocomplete
              options={hospArr}
              onChange={(event, newValue) => { setHospitalFilter(newValue); }}
              renderInput={(params) => <TextField {...params} label="Filter Hospital" />}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
            />

            <Autocomplete
              options={deptArr}
              onChange={(event, newValue) => { setDepartmentFilter(newValue); }}
              renderInput={(params) => <TextField {...params} label="Filter Department" />}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
            />

            <Autocomplete
              options={chapArr}
              onChange={(event, newValue) => { setChaperoneFilter(newValue); }}
              renderInput={(params) => <TextField {...params} label="Filter Chaperone" />}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
            />
            <Button variant="contained" type="submit" sx={{ marginLeft: 11 }}>Submit</Button>
          </Stack>
        </form>
      </Box>
    </CardContent>
  );
}
