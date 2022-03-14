/* eslint-disable no-console */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useEffect } from 'react';
import axios from 'axios';

/*
 * ========================================================
 * ========================================================
 *
 *               ContactsPage Component
 *
 * ========================================================
 * ========================================================
 */
export default function ContactsPage() {
  // When component renders, retrieve all contacts and patients data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    // ################################## HARDCODED FOR NOW  ##################################
    // data.append('userId', userId);
    data.append('userId', '62259eddb4a77ae0343f7305');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/load-page?${data.toString()}`)
      .then((result) => {
        console.log(result.data);
      });
  }, []);

  return (
    <div>
      Contacts Page
    </div>
  );
}
