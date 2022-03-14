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

/*
 * ========================================================
 * ========================================================
 *
 *       Component for rendering add contact form
 *
 * ========================================================
 * ========================================================
 */
export default function AddContact() {
  // const [patientArr, setPatientArr] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const lolFunc = () => {
    console.log('lololol');
    setSuccessMessage('Yay workiing!');
  };

  return (
    <div>
      <div>

        <Autocomplete
          options={['LSH', 'LKY', 'MBS', 'MLK']}
          renderInput={(params) => <TextField {...params} label="Add Contact" required />}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          sx={{ width: 250 }}
        />
        <button type="button" onClick={lolFunc}>Submit </button>
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
    </div>
  );
}
