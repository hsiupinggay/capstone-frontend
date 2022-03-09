import React, { useEffect, useState } from 'react'
import axios from 'axios';


export default function AddAppointment() {
  const [patientArr, setPatientArr] = useState([]);
  const [hospArr, setHospArr] = useState([]);
  const [deptArr, setDeptArr] = useState([]);
  const [chaperoneArr, setChaperoneArr] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [hospital, setHospital] = useState("");
  const [chaperone, setChaperone] = useState("");
  const [chaperoneId, setChaperoneId] = useState("");
  const [department, setDepartment] = useState("");
  const [dateTime, setDateTime] = useState("");

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
  const updateHosChapDropdowns = (id) => {
    setPatientId(id);
    for (let i = 0; i < patientArr.length; i +=1){
      if (patientArr[i]._id === id) {
        setChaperoneArr(patientArr[i].visitDetails.chaperones);
        setHospArr(patientArr[i].visitDetails.clinics);
      }
    }
  };

  // When user has selected a hospital, find related departments
  const updateDept = (hospital) => {
    setHospital(hospital)
    for (let i = 0; i < hospArr.length; i +=1){
      if (hospArr[i].hospital === hospital) {
        setDeptArr(hospArr[i].departments);
      }
    }
  };

  // When user selects a chaperone, save name and id in useState
  const updateChaperoneState =(value) => {
    const chaperoneSplitStr = value.split(",");
    setChaperone(chaperoneSplitStr[0]); 
    setChaperoneId(chaperoneSplitStr[1]);
  }

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
    }
    console.log('data', data);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-appointment`, data).then((response) => {console.log(response.data)});
  };

  return (
    <div>
      { patientArr.length === 0  
      ? <div/>
      : (
      <form onSubmit={handleSubmit}>

        <label for="dateTime" name="dateTime"></label>
        <input type="datetime-local" id="dateTime" name="dateTime" onChange={(event) => setDateTime(event.target.value)}/>

        <label htmlFor="patient"> </label>
        <select name="patient" id="patient" onChange={(event) => updateHosChapDropdowns(event.target.value)} >
          <option disabled selected>Select Patient</option>
          { 
            patientArr.map((patient, index) => ( 
              <option value={patient._id} key={index}>
                {patient.identity.name.first + " " + patient.identity.name.last}
              </option>
            )) 
          }
        </select>

        { hospArr.length === 0  
        ? <div/> 
        : <div>
            <label htmlFor="hospital"> </label>
            <select name="hospital" id="hospital" onChange={(event) => updateDept(event.target.value)}>
            <option disabled selected>Select Hospital</option>
            { 
              hospArr.map((hospital, index) => ( 
                <option value={hospital.hospital} key={index}>
                  {hospital.hospital}
                </option>
              )) 
            }
            </select>

            <label htmlFor="chaperone"> </label>
            <select name="chaperone" id="chaperone" onChange={(event) => updateChaperoneState(event.target.value)}>
            <option disabled selected>Select Chaperone</option>
            { 
              chaperoneArr.map((chaperone, index) => ( 
                <option value={`${chaperone.name},${chaperone.chaperoneId}`} key={index}>
                  {chaperone.name}
                </option>
              )) 
            }
            </select>
          </div>
        }

        {
        deptArr.length === 0  
        ? <div/> 
        : <div>
            <label htmlFor="department"> </label>
            <select name="department" id="department" onChange={(event) => setDepartment(event.target.value)}>
            <option disabled selected>Select Department</option>
            { 
              deptArr.map((department, index) => ( 
                <option value={department} key={index}>
                  {department}
                </option>
              )) 
            }
            </select>
          </div>
        }
        <button type="submit"> Submit</button>
      </form> 
      )}
    </div>
  )
}
