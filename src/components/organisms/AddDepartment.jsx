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
import departmentList from '../others/departmentList';

/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add hospital form
 *
 * ========================================================
 * ========================================================
 */
export default function AddDepartment() {
  const [hospital, setHospital] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [patientArr, setPatientArr] = useState();
  const [hospArr, setHospArr] = useState();
  const [department, setDepartment] = useState('');

  const navigate = useNavigate();

  // When component renders, retrieve all patient data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    // ################################## HARDCODED FOR NOW  ##################################
    // data.append('userId', userId);
    data.append('userId', '62259eddb4a77ae0343f7305');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/all-patients-list?${data.toString()}`)
      .then((result) => {
        setPatientArr(result.data.patientDetailsObj);
      });
  }, []);

  const updatePatient = (string) => {
    console.log('string', string);
    const patientSplitStr = string.split(',');
    setPatientId(patientSplitStr[0]);
    setPatientName(patientSplitStr[1]);
    for (let i = 0; i < patientArr.length; i += 1) {
      if (patientArr[i]._id === patientSplitStr[0]) {
        setHospArr(patientArr[i].visitDetails.clinics);
      }
    }
  };

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      hospital,
      patientId,
      department,
    };
    console.log('data', data);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-department`, data).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        setSuccessMessage(
          <div>
            <p>
              {`You have added the ${department} department to ${hospital} under ${patientName}'s profile.`}
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

              { hospArr === undefined
                ? (
                  <div>
                    <label htmlFor="hospital"> </label>
                    <select onChange={(event) => setHospital(event.target.value)}>
                      <option disabled selected>Select Hospital</option>
                    </select>
                  </div>
                )
                : (
                  <div>
                    <div>
                      <label htmlFor="hospital"> </label>
                      <select name="hospital" id="hospital" onChange={(event) => setHospital(event.target.value)} required>
                        <option value="" disabled selected>Select Hospital</option>
                        {
                        hospArr.map((hospitalEl, index) => (
                          <option value={hospitalEl.hospital} key={index}>
                            {hospitalEl.hospital}
                          </option>
                        ))
                      }
                      </select>
                    </div>

                  </div>
                )}

              <CreatableSelect isClearable options={departmentList} onChange={(option) => setDepartment(option.value)} required />

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
