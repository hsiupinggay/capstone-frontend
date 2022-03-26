/* eslint-disable operator-linebreak */
/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Typography, Box } from '@mui/material';

export default function ApptFilterDisplay({ filterData }) {
  if (
    filterData.hospitalFilter.length === 0
    && filterData.departmentFilter.length === 0
    && filterData.patientFilter.length === 0
    && filterData.chaperoneFilter.length === 0
    && filterData.dateFilter.length === 0
  ) {
    return (
      <Typography variant="h1" sx={{ m: 2 }}>No Filters Selected</Typography>
    );
  }

  const hospitalDisplay = (
    <>
      {
        filterData.hospitalFilter.length > 0
        && (
          <div>
            Hospital:
            <Stack direction="row" spacing={1}>
              {filterData.hospitalFilter.map((filter) => <Chip label={filter} />)}
            </Stack>
          </div>
        )
      }
    </>
  );

  const departmentDisplay = (
    <>
      {
        filterData.departmentFilter.length > 0 &&
        <div>
          Department:
          <Stack direction="row" spacing={1}>
            {filterData.departmentFilter.map(filter => <Chip label={filter} />)}
          </Stack>
        </div>
      }
    </>
  );

  const patientDisplay = (
    <>
      {
        filterData.patientFilter.length > 0 &&
        <div>
          Patient:
          <Stack direction="row" spacing={1}>
            {filterData.patientFilter.map(filter => <Chip label={filter} />)}
          </Stack>
        </div>
      }
    </>
  );

  const chaperoneDisplay = (
    <>
      {
        filterData.chaperoneFilter.length > 0 &&
        <div>
          Chaperone:
          <Stack direction="row" spacing={1}>
            {filterData.chaperoneFilter.map(filter => <Chip label={filter} />)}
          </Stack>
        </div>
      }
    </>
  );

  const dateDisplay = (
    <>
      {
        filterData.dateFilter.length > 0 &&
        <div>
          Date:
          <Stack direction="row" spacing={1}>
            {filterData.dateFilter.map(filter => <Chip label={filter} />)}
          </Stack>
        </div>
      }
    </>
  );

  return (
    <Box>
      <Typography variant="h3">Filters: </Typography>
      <Typography variant="body1">
        {hospitalDisplay}
        {departmentDisplay}
        {patientDisplay}
        {chaperoneDisplay}
        {dateDisplay}
      </Typography>
    </Box>
  );
}
