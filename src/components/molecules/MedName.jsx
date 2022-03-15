/* eslint-disable react/prop-types */
import React from 'react';
import { CardContent, FormControl, TextField } from '@mui/material';

function MedName({ handleName }) {
  return (
    <div>
      <CardContent>
        <FormControl>
          <TextField variant="outlined" label="Name" onChange={handleName} />
        </FormControl>
      </CardContent>
    </div>
  );
}

export default MedName;
