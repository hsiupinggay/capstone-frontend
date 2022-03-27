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
function MedName({
  name, handleName, title, error0, errorMessage0,
}) {
  return (
    <div>
      <CardContent sx={{ height: '360px' }}>
        <FormControl fullWidth>
          <Stack
            spacing={6}
          >
            <Typography variant="h3" textAlign="center">{title}</Typography>
            <TextField variant="outlined" label="Name" onChange={handleName} value={name} />
          </Stack>
        </FormControl>
        {error0 && (
        <Typography variant="body2" color="error">
          {errorMessage0}
        </Typography>
        )}
      </CardContent>
    </div>
  );
}

export default MedName;
