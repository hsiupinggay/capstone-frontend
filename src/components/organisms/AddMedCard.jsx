/* eslint-disable react/prop-types */
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
import { Box } from '@mui/material';
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
export default function AddMedCard({ setOpen, patientId }) {
  const [name, setName] = useState('');

  //  related to MedFrequency
  const [dosage, setDosage] = useState('');
  const [dosageCounter, setDosageCounter] = useState('pills');
  const [duration, setDuration] = useState('');
  const [times, setTimes] = useState('');
  const [asRequiredChecked, setAsRequiredChecked] = useState(false);
  const [note, setNote] = useState('');

  // related to Prescription
  const [prescriptionDate, setPrescriptionDate] = useState(new Date());
  const [prescriptionQty, setPrescriptionQty] = useState('');
  const [reminderChecked, setReminderChecked] = useState(true);

  // related to MedReminder
  const [reminderDays, setReminderDays] = useState(0);
  const [reminderTime, setReminderTime] = useState();

  // related to stepper
  const [activeStep, setActiveStep] = useState(0);

  // related to error
  const [error0, setError0] = useState(false);
  const [errorMessage0, setErrorMessage0] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSwitch = (e) => {
    setAsRequiredChecked(e.target.checked);
    // if asRequiredChecked is true then app cannot help set reminders
    // because app won't be able to estimate when the medicine will be finished
    if (e.target.checked) {
      setReminderChecked(false);
      setDosage('');
      setTimes('');
      setDuration('');
    } else if (!e.target.checked) { setReminderChecked(true); }
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
    setPrescriptionDate(e);
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
  const handleReminderTime = (e) => {
    setReminderTime(e);
  };

  const qtyPerDay = (Number(dosage) * Number(times)) / Number(duration);
  const prescriptionDuration = Number(prescriptionQty) / Number(qtyPerDay);

  const daysBeforeReminder = prescriptionDuration - reminderDays;

  const reminderDate = getDate(prescriptionDate, daysBeforeReminder);

  const handleSubmit = async () => {
    const data = {
      patientId,
      name,
      asRequiredChecked,
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
      reminderTime,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/add-medicine`, data);

      setOpen(false);
    } catch (err) {
      return false;
    }
  };

  return (
    <div>
      {activeStep === 0 && (
      <div>
        <MedName
          handleName={handleName}
          error0={error0}
          errorMessage0={errorMessage0}
          title="Add Medicine"
        />
      </div>
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
        asRequiredChecked={asRequiredChecked}
        handleSwitch={handleSwitch}
        handleNote={handleNote}
        note={note}
      />
      )}
      {activeStep === 2 && (
        <Box sx={{ height: '360px' }}>
          <Prescription
            dosageCounter={dosageCounter}
            handlePrescriptionDate={handlePrescriptionDate}
            prescriptionDate={prescriptionDate}
            handlePrescriptionQty={handlePrescriptionQty}
          />
          <MedReminder
            asRequiredChecked={asRequiredChecked}
            handleReminderDays={handleReminderDays}
            reminderDays={reminderDays}
            reminderDate={reminderDate}
            reminderTime={reminderTime}
            handleReminderTime={handleReminderTime}
            reminderChecked={reminderChecked}
            handleReminder={handleReminder}
          />
        </Box>

      )}
      <MedStepper
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        handleSubmit={handleSubmit}
        name={name}
        setError0={setError0}
        setErrorMessage0={setErrorMessage0}

      />

    </div>
  );
}
