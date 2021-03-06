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
  const { store } = useMedicalContext();
  const { userId } = store;

  const [visiblePatientList, setVisiblePatientList] = useState();
  const [otherPatientList, setOtherPatientList] = useState();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    data.append('contactId', contactId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/get-visible-patients-list?${data.toString()}`)
      .then((response) => {
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
        const { visiblePatients, otherPatients } = response.data;
        setVisiblePatientList(visiblePatients);
        setOtherPatientList(otherPatients);
        setSuccessMessage(`You have revoked ${contactName}'s access to ${name}'s data`);
      });
  };

  // Give contact access to patients data
  const giveAccess = (patientId, name, admin) => {
    const data = {
      contactId,
      userId,
      patientId,
      name,
      admin,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/contacts/give-access`, data)
      .then((response) => {
        const { visiblePatients, otherPatients } = response.data;
        setVisiblePatientList(visiblePatients);
        setOtherPatientList(otherPatients);
        setSuccessMessage(`You have granted ${contactName} access to ${name}'s data`);
      });
  };

  return (
    <Box>
      <Typography variant="h2" sx={visibilityPopupStyles.centerText}>
        Alter
        {' '}
        {contactName}
        's Patient Access
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
              <Typography vairant="body1"><strong>Visible Patients</strong></Typography>
              <Box sx={{ height: '70px', overflow: 'auto' }}>
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
              </Box>
            </div>
          )

      }
      <br />
      {
        otherPatientList === undefined
          ? <div />
          : (
            <div>
              <Typography variant="body1"><strong>Other Patients</strong></Typography>
              <Box sx={{ height: '70px', overflow: 'auto' }}>
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
              </Box>
            </div>
          )
      }
    </Box>
  );
}
