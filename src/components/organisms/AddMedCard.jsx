/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useState } from 'react';
import { Card } from '@mui/material';
import axios from 'axios';
import { getDate } from '../others/helper';

import MedFrequency from '../molecules/MedFrequency';
import Prescription from '../molecules/Prescription';
import MedName from '../molecules/MedName';
import MedStepper from '../atoms/MedStepper';
import MedReminder from '../molecules/MedReminder';

/*
 * ========================================================
 * ========================================================
 *
 *              Card for adding medicine
 *
 * ========================================================
 * ========================================================
 */
export default function AddMedCard() {
  const [name, setName] = useState('');

  //  related to MedFrequency
  const [dosage, setDosage] = useState('');
  const [dosageCounter, setDosageCounter] = useState('pills');
  const [duration, setDuration] = useState('');
  const [times, setTimes] = useState('');
  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState('');

  // related to Prescription
  const [prescriptionDate, setPrescriptionDate] = useState(new Date());
  const [prescriptionQty, setPrescriptionQty] = useState('');
  const [reminderChecked, setReminderChecked] = useState(true);

  // related to MedReminder
  const [reminderDays, setReminderDays] = useState(0);

  // related to stepper
  const [activeStep, setActiveStep] = useState(0);

  // Hardcoded patient id for Humpty Dumpty
  const patientId = '62259fadb4a77ae0343f7306';

  const handleName = (e) => {
    setName(e.target.value);
  };
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
  const handleNote = (e) => {
    setNote(e.target.value);
  };
  const handlePrescriptionDate = (e) => {
    setPrescriptionDate(e.target.value);
  };
  const handlePrescriptionQty = (e) => {
    setPrescriptionQty(e.target.value);
  };
  const handleReminder = (e) => {
    setReminderChecked(e.target.checked);
  };
  const handleReminderDays = (e) => {
    setReminderDays(e.target.value);
  };

  const prescriptionDuration = (Number(dosage) * Number(times) * Number(prescriptionQty)) / Number(duration);

  const daysBeforeReminder = prescriptionDuration - reminderDays;

  const reminderDate = getDate(prescriptionDate, daysBeforeReminder);

  const handleSubmit = async () => {
    const data = {
      patientId,
      name,
      dosage,
      dosageCounter,
      times,
      duration,
      note,
      prescriptionDate,
      prescriptionQty,
      reminderChecked,
      reminderDays,
      reminderDate,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-medicine`, data);
      console.log('<== res.data add med ==>', res.data);
      // need to navigate somewhere after form submit
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card>
        {activeStep === 0 && (
          <MedName handleName={handleName} title="Add Medicine" />
        )}
        {activeStep === 1 && (

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
            handleNote={handleNote}
            note={note}

          />
        )}
        {activeStep === 2 && (
        <div>
          <Prescription
            dosageCounter={dosageCounter}
            handlePrescriptionDate={handlePrescriptionDate}
            handlePrescriptionQty={handlePrescriptionQty}
            reminderChecked={reminderChecked}
            handleReminder={handleReminder}
          />
          <MedReminder
            handleReminderDays={handleReminderDays}
            dosage={dosage}
            times={times}
            prescriptionQty={prescriptionQty}
            duration={duration}
            reminderDays={reminderDays}
            prescriptionDate={prescriptionDate}
          />
        </div>

        )}
        <MedStepper setActiveStep={setActiveStep} activeStep={activeStep} handleSubmit={handleSubmit} />
      </Card>

    </div>
  );
}
