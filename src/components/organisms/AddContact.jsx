/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
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
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import {
  Typography, Button, CardContent, Stack,
} from '@mui/material';
import { useMedicalContext } from '../others/store';
import addContactPopupStyles from './AddContactCss';

/*
 * ========================================================
 * ========================================================
 *
 *       Component for rendering add contact form
 *
 * ========================================================
 * ========================================================
 */
export default function AddContact({ setOutgoingPendingList }) {
  const { store } = useMedicalContext();
  const {
    userId, firstName, lastName, photo,
  } = store;

  const [successMessage, setSuccessMessage] = useState('');
  const [otherUsersList, setOtherUsersList] = useState();
  const [contactId, setContactId] = useState();
  const [contactFirstName, setContactFirstName] = useState();
  const [contactLastName, setContactLastName] = useState();
  const [contactPhoto, setContactPhoto] = useState();

  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/get-contacts?${data.toString()}`)
      .then((response) => {
        setOtherUsersList(response.data.otherUsers);
      });
  }, []);

  const updateContactValues = (newValue) => {
    setContactId(newValue._id);
    setContactFirstName(newValue.identity.name.first);
    setContactLastName(newValue.identity.name.last);
    setContactPhoto(newValue.identity.photo || null);
  };

  // Send data to backend to create contact request in DB and update users pending requests
  const sendRequest = () => {
    let data;
    if (contactPhoto !== null) {
      data = {
        contactId,
        contactFirstName,
        contactLastName,
        contactPhoto,
        userId,
        firstName,
        lastName,
        photo,
      };
    } else {
      data = {
        contactId,
        contactFirstName,
        contactLastName,
        userId,
        firstName,
        lastName,
        photo,
      };
    }

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/contacts/add-contact`, data)
      .then((response) => {
        const { otherUsers, outgoingRequestsPending } = response.data;
        setOtherUsersList(otherUsers);
        setOutgoingPendingList(outgoingRequestsPending);
        setSuccessMessage(`Your request to ${contactFirstName} ${contactLastName} has been submitted!`);
      });
  };

  return (
    <div>
      {
        otherUsersList === undefined
          ? (
            <div />
          )
          : (
            <CardContent>
              <Stack
                spacing={3}
              >
                <Typography variant="h2" sx={addContactPopupStyles.contactTitle}>
                  Add Contact
                </Typography>
                <Autocomplete
                  options={otherUsersList}
                  getOptionLabel={(option) => `${option.identity.name.first} ${option.identity.name.last}`}
                  renderInput={(params) => <TextField {...params} label="Add Contact" sx={addContactPopupStyles.inputField} required />}
                  onChange={(event, newValue) => { updateContactValues(newValue); }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                />

                <Button variant="contained" type="submit" onClick={sendRequest}>Submit</Button>

                <div>
                  {successMessage === ''
                    ? <div />
                    : (
                      <Typography variant="body1" sx={{ textAlign: 'center' }}>
                        {successMessage}
                      </Typography>
                    )}
                </div>
              </Stack>
            </CardContent>
          )
      }
    </div>
  );
}
