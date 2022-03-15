/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-len */
/* eslint-disable no-console */
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
import React, { useEffect } from 'react';
import axios from 'axios';
import { useMedicalContext } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *       Component for choosing which of the users
 *             patients a contact can see
 *
 * ========================================================
 * ========================================================
 */
export default function ContactVisibility({ contactId }) {
  const { store } = useMedicalContext();
  const { userId } = store;

  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    data.append('contactId', contactId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/get-visible-patients-list?${data.toString()}`)
      .then((response) => {
        const { visiblePatients } = response.data;
        console.log(visiblePatients);
      });
  }, []);

  return (
    <div>
      {contactId}
    </div>
  );
}
