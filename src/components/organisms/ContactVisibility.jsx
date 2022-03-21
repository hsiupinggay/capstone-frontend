/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
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
import { Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useMedicalContext } from '../others/store';
import visibilityPopupStyles from './ContactVisibilityCss';

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
    <Box sx={visibilityPopupStyles.inputContainer}>
      <Typography sx={visibilityPopupStyles.title}>
        <strong>
          Alter
          {' '}
          {contactName}
          's Patient Access
        </strong>
      </Typography>

      {successMessage === ''
        ? <div />
        : (
          <Typography sx={visibilityPopupStyles.outcomeMessage}>
            {successMessage}
          </Typography>
        )}
      {
        visiblePatientList === undefined
          ? <div />
          : (
            <div>
              <Typography sx={visibilityPopupStyles.subtitle}><strong>Visible Patients</strong></Typography>
              { visiblePatientList.map((patient) => (
                <Box sx={visibilityPopupStyles.nameContainer}>
                  <Typography sx={visibilityPopupStyles.names}>{patient.name}</Typography>
                  <VisibilityOffIcon
                    sx={visibilityPopupStyles.iconColor}
                    variant="contained"
                    onClick={() => removeAccess(patient.patientId, patient.name)}
                  />
                </Box>
              ))}
            </div>
          )

      }
      <br />
      {
        otherPatientList === undefined
          ? <div />
          : (
            <div>
              <Typography sx={visibilityPopupStyles.subtitle}><strong>Other Patients</strong></Typography>
              {otherPatientList.map((patient) => (
                <Box sx={visibilityPopupStyles.nameContainer}>
                  <Typography sx={visibilityPopupStyles.names}>{patient.name}</Typography>
                  <VisibilityIcon
                    sx={visibilityPopupStyles.lightIconColor}
                    variant="contained"
                    onClick={() => giveAccess(patient.patientId, patient.name, patient.admin)}
                  />
                </Box>
              ))}
            </div>
          )
      }
    </Box>
  );
}
