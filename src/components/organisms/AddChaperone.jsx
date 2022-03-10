/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-console */
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
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add chaperone form
 *
 * ========================================================
 * ========================================================
 */
export default function AddChaperone() {
  const [family, setFamily] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [chaperoneName, setChaperoneName] = useState('');
  const [chaperoneId, setChaperoneId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [patientArr, setPatientArr] = useState();
  const navigate = useNavigate();

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    // ################################## HARDCODED FOR NOW  ##################################
    // data.append('userId', userId);
    // data.append('userName', userName);
    data.append('userId', '62259eddb4a77ae0343f7305');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        setPatientArr(result.data.patientDetailsObj);
      });
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/all-family?${data.toString()}`)
      .then((result) => {
        const familyArr = result.data.data;
        const tempArr = [];
        for (let i = 0; i < familyArr.length; i += 1) {
          tempArr.push({ value: `${familyArr[i].name},${familyArr[i].familyMemberId}`, label: familyArr[i].name });
        }
        // Show user their own name to add as a chaperone
        // ################################## HARDCODED FOR NOW  ##################################
        tempArr.push({ value: 'Shannon,62259eddb4a77ae0343f7305', label: 'Shannon' });
        setFamily(tempArr);
      });
  }, []);

  const updatePatient = (string) => {
    const patientSplitStr = string.split(',');
    setPatientId(patientSplitStr[0]);
    setPatientName(patientSplitStr[1]);
  };

  const updateChaperone = (value) => {
    const chaperoneSplitStr = value.split(',');
    setChaperoneId(chaperoneSplitStr[1]);
    setChaperoneName(chaperoneSplitStr[0]);
  };

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      chaperoneName,
      chaperoneId: chaperoneId || '',
      patientId,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-chaperone`, data).then((response) => {
      if (response.status === 200) {
        setSuccessMessage(
          <div>
            <p>
              {`You have added ${chaperoneName} as ${patientName}'s chaperone.`}
            </p>
          </div>,
        );
      }
    });
  };
  return (
    <div>
      { patientArr === undefined
        ? <div />
        : (
          <div>
            <button type="button" onClick={() => navigate('/add-appt')}>Back</button>
            <form onSubmit={handleSubmit}>

              <div>
                <label htmlFor="patient"> </label>
                <select name="patient" id="patient" onChange={(event) => updatePatient(event.target.value)} required>
                  <option value="" disabled selected>Select Patient</option>
                  {
                    patientArr.map((patient, index) => (
                      <option value={`${patient._id},${`${patient.identity.name.first} ${patient.identity.name.last}`}`} key={index}>
                        {`${patient.identity.name.first} ${patient.identity.name.last}`}
                      </option>
                    ))
                  }
                </select>
              </div>

              <CreatableSelect isClearable options={family} onChange={(option) => updateChaperone(option.value)} />

              <button type="submit"> Submit</button>
            </form>
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
        )}
    </div>
  );
}
