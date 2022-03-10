/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddAppointment() {
  const [patientArr, setPatientArr] = useState([]);
  const [hospArr, setHospArr] = useState([]);
  const [deptArr, setDeptArr] = useState([]);
  const [chaperoneArr, setChaperoneArr] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [hospital, setHospital] = useState('');
  const [chaperone, setChaperone] = useState('');
  const [chaperoneId, setChaperoneId] = useState('');
  const [department, setDepartment] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  // When user has selected a patient, find related hospitals and chaperones
  const updateHosChapDropdowns = (string) => {
    console.log('string', string);
    const patientSplitStr = string.split(',');
    setPatientId(patientSplitStr[0]);
    setPatientName(patientSplitStr[1]);
    for (let i = 0; i < patientArr.length; i += 1) {
      if (patientArr[i]._id === patientSplitStr[0]) {
        setChaperoneArr(patientArr[i].visitDetails.chaperones);
        setHospArr(patientArr[i].visitDetails.clinics);
      }
    }
  };

  // When user has selected a hospital, find related departments
  const updateDept = (hospitalInput) => {
    setHospital(hospitalInput);
    for (let i = 0; i < hospArr.length; i += 1) {
      if (hospArr[i].hospital === hospitalInput) {
        setDeptArr(hospArr[i].departments);
      }
    }
  };

  // When user selects a chaperone, save name and id in useState
  const updateChaperoneState = (value) => {
    const chaperoneSplitStr = value.split(',');
    setChaperone(chaperoneSplitStr[0]);
    setChaperoneId(chaperoneSplitStr[1]);
  };

  // On form submit, send data to backend to store in DB
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      patientId,
      department,
      hospital,
      chaperone,
      chaperoneId,
      dateTime,
    };
    console.log('data', data);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-appointment`, data).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        setSuccessMessage(
          <div>
            <p>
              {'You have added a new appointment: '}
            </p>
            <p>
              {`Patient: ${patientName}`}
            </p>
            <p>
              {`Hospital: ${hospital}`}
            </p>
            <p>
              {`Department: ${department}`}
            </p>
            <p>
              {`Date: ${response.data.data[response.data.data.length - 1].date}`}
            </p>
            <p>
              {`Time: ${response.data.data[response.data.data.length - 1].time}`}
            </p>
            <p>
              {`Chaperone: ${chaperone || 'Nil'}`}
            </p>
          </div>,
        );
      }
    });
  };

  return (
    <div>
      { patientArr.length === 0
        ? <div />
        : (
          <form onSubmit={handleSubmit}>

            <div>
              <label htmlFor="dateTime" name="dateTime" />
              <input type="datetime-local" id="dateTime" name="dateTime" onChange={(event) => setDateTime(event.target.value)} required />
            </div>

            <div>
              <label htmlFor="patient"> </label>
              <select name="patient" id="patient" onChange={(event) => updateHosChapDropdowns(event.target.value)} required>
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

            {
        hospArr.length === 0
          ? (
            <div>
              <label htmlFor="hospital"> </label>
              <select>
                <option disabled selected>Select Hospital</option>
              </select>
              <label htmlFor="department"> </label>
              <div>
                <select>
                  <option disabled selected>Select Department</option>
                </select>
              </div>
              <label htmlFor="chaperone"> </label>
              <div>
                <select>
                  <option disabled selected>Select Chaperone</option>
                </select>
              </div>
            </div>
          )
          : (
            <div>
              <div>
                <label htmlFor="hospital"> </label>
                <select name="hospital" id="hospital" onChange={(event) => updateDept(event.target.value)} required>
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

              {
            deptArr.length === 0
              ? (
                <div>
                  <label htmlFor="department"> </label>
                  <select>
                    <option disabled selected>Select Department</option>
                  </select>
                </div>
              )
              : (
                <div>
                  <label htmlFor="department"> </label>
                  <select name="department" id="department" onChange={(event) => setDepartment(event.target.value)} required>
                    <option value="" disabled selected>Select Department</option>
                    {
                  deptArr.map((departmentEl, index) => (
                    <option value={departmentEl} key={index}>
                      {departmentEl}
                    </option>
                  ))
                }
                  </select>
                </div>
              )
            }

              <div>
                <label htmlFor="chaperone"> </label>
                <select name="chaperone" id="chaperone" onChange={(event) => updateChaperoneState(event.target.value)}>
                  <option disabled selected>Select Chaperone</option>
                  {
                chaperoneArr.map((chaperoneEl, index) => (
                  <option value={`${chaperoneEl.name},${chaperoneEl.chaperoneId}`} key={index}>
                    {chaperoneEl.name}
                  </option>
                ))
              }
                </select>
              </div>
            </div>
          )
}

            <button type="submit"> Submit</button>
          </form>
        )}
      <div>
        {
        successMessage === ''
          ? <div />
          : (
            <div>
              {successMessage}
            </div>
          )
        }
      </div>
    </div>
  );
}
