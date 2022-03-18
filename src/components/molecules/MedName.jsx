/* eslint-disable react/prop-types */
/*
 * ========================================================
 * ========================================================
 *
 *              Imports
 *
 * ========================================================
 * ========================================================
 */
import React from 'react';
import {
  CardContent, FormControl, Stack, TextField, Typography,
} from '@mui/material';

/*
 * ========================================================
 * ========================================================
 *
 *              MedName Component
 *
 * ========================================================
 * ========================================================
 */
function MedName({ name, handleName, title }) {
  return (
    <div>
      <CardContent>
        <FormControl>
          <Stack
            spacing={1}
          >
            <Typography variant="h3">{title}</Typography>
            <TextField variant="outlined" label="Name" onChange={handleName} value={name} />
          </Stack>
        </FormControl>
      </CardContent>
    </div>
  );
}

export default MedName;
