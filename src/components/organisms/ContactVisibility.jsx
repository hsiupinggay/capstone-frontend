/* eslint-disable no-console */
/* eslint-disable react/prop-types */
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
import axios from 'axios';
import { Button } from '@mui/material';
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
export default function ContactVisibility({ contactId, contactName }) {
  const [visiblePatientList, setVisiblePatientList] = useState();
  const [otherPatientList, setOtherPatientList] = useState();
  const [successMessage, setSuccessMessage] = useState('');

  const { store } = useMedicalContext();
  const { userId } = store;

  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    data.append('contactId', contactId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/get-visible-patients-list?${data.toString()}`)
      .then((response) => {
        console.log(response.data);
        const { visiblePatients, otherPatients } = response.data;
        setVisiblePatientList(visiblePatients);
        setOtherPatientList(otherPatients);
      });
  }, []);

  // Remove contact's access of patients data
  const removeAccess = (patientId, name) => {
    const data = {
      contactId,
      userId,
      patientId,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/contacts/remove-access`, data)
      .then((response) => {
        console.log(response.data);
        const { visiblePatients, otherPatients } = response.data;
        setVisiblePatientList(visiblePatients);
        setOtherPatientList(otherPatients);
        setSuccessMessage(`You have revoked ${contactName}'s access to ${name}'s data`);
      });
  };

  // Give contact access to patients data
  const giveAccess = (patientId, name, admin) => {
    console.log('admin', admin);
    const data = {
      contactId,
      userId,
      patientId,
      name,
      admin,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/contacts/give-access`, data)
      .then((response) => {
        console.log(response.data);
        const { visiblePatients, otherPatients } = response.data;
        setVisiblePatientList(visiblePatients);
        setOtherPatientList(otherPatients);
        setSuccessMessage(`You have granted ${contactName} access to ${name}'s data`);
      });
  };

  return (
    <div>
      {
        visiblePatientList === undefined
          ? <div />
          : (
            <div>
              <strong>Visible Patients</strong>
              { visiblePatientList.map((patient) => (
                <div>
                  {patient.name}
                  <Button variant="contained" onClick={() => removeAccess(patient.patientId, patient.name)}>Remove Access</Button>
                </div>
              ))}
            </div>
          )

      }
      <br />
      <br />
      <br />
      {
        otherPatientList === undefined
          ? <div />
          : (
            <div>
              <strong>Other Patients</strong>
              {otherPatientList.map((patient) => (
                <div>
                  {patient.name}
                  <Button variant="contained" onClick={() => giveAccess(patient.patientId, patient.name, patient.admin)}>Give Access</Button>
                </div>
              ))}
            </div>
          )
      }
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
  );
}
