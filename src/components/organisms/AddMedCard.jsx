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
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  // Hardcoded patient id for Patrick Star
  const patientId = '6225a54b80a1f0c98884563f';

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
  const handleReminderTime = (e) => {
    setReminderTime(e);
  };

  const qtyPerDay = (Number(dosage) * Number(times)) / Number(duration);
  const prescriptionDuration = Number(prescriptionQty) / Number(qtyPerDay);

  console.log('<== prescription duration ==>', prescriptionDuration);

  const daysBeforeReminder = prescriptionDuration - reminderDays;
  console.log('<== daysBeforeReminder ==>', daysBeforeReminder);
  console.log('<== reminderDays ==>', reminderDays);

  const reminderDate = getDate(prescriptionDate, daysBeforeReminder);

  console.log('<== reminderDate ==>', reminderDate);
  console.log('<== prescriptionDate ==>', prescriptionDate);
  console.log('<== daysBeforeReminder ==>', daysBeforeReminder);

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
      console.log('<== res.data add med ==>', res.data);
      // need to navigate somewhere after form submit
      navigate('/med-list');
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
            asRequiredChecked={asRequiredChecked}
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
            asRequiredChecked={asRequiredChecked}
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
        </div>

        )}
        <MedStepper setActiveStep={setActiveStep} activeStep={activeStep} handleSubmit={handleSubmit} />
      </Card>

    </div>
  );
}
