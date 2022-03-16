/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import {
  Card, CardContent, FormControl, TextField, Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MedFrequency from '../molecules/MedFrequency';

function AddMedCard() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [frequencyData, setFrequencyData] = useState('');

  //  related to MedFrequency
  const [dosage, setDosage] = useState('');
  const [dosageCounter, setDosageCounter] = useState('pills');
  const [duration, setDuration] = useState('');
  const [times, setTimes] = useState('');
  const [checked, setChecked] = useState(false);

  console.log(setFrequencyData);
  const handleSwitch = (e) => {
    setChecked(e.target.checked);
  };
  const handleDosage = (e) => {
    setDosage(e.target.value);
  };
  const handleDosageCounter = (e) => {
    setDosageCounter(e.target.value);
  };
  const handleTimes = (e) => {
    setTimes(e.target.value);
  };

  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      name,
      frequencyData,
    };
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-med`, data);
      navigate('/home');
    } catch (err) {
      const { message } = error.data;
      setError(true);
      setErrorMessage(message);
      console.log(errorMessage);
    }
  };

  return (
    <div>
      <Card>
        <CardContent>
          <FormControl>
            <TextField variant="outlined" label="Name" onChange={handleName} />
          </FormControl>
        </CardContent>
        <MedFrequency
          dosage={dosage}
          handleDosage={handleDosage}
          dosageCounter={dosageCounter}
          handleDosageCounter={handleDosageCounter}
          times={times}
          handleTimes={handleTimes}
          duration={duration}
          handleDuration={handleDuration}
          checked={checked}
          handleSwitch={handleSwitch}

        />

        <Button variant="contained" onClick={handleSubmit}>Add</Button>
      </Card>

    </div>
  );
}

export default AddMedCard;
