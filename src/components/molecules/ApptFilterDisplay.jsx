/* eslint-disable operator-linebreak */
/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ApptFilterDisplay({ filterData }) {
  if (filterData === null) return (<div />);
  const hospitalDisplay = (
    <>
      {
        filterData.hospitalFilter !== null
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
        filterData.departmentFilter !== null &&
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
        filterData.patientFilter !== null &&
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
        filterData.chaperoneFilter !== null &&
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
        filterData.dateFilter !== null &&
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
    <div>
      <h1>Filters</h1>
      {hospitalDisplay}
      {departmentDisplay}
      {patientDisplay}
      {chaperoneDisplay}
      {dateDisplay}
    </div>
  );
}
