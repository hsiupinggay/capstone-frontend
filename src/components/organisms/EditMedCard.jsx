/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDate } from '../others/helper';

import MedFrequency from '../molecules/MedFrequency';
import Prescription from '../molecules/Prescription';
import MedName from '../molecules/MedName';
import MedStepper from '../atoms/MedStepper';
import ReminderRecap from '../molecules/ReminderRecap';

/*
 * ========================================================
 * ========================================================
 *
 *              Edit Medicine Card Component
 *
 * ========================================================
 * ========================================================
 */

function EditMedCard() {
  // related to MedName
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
  const [reminderChecked, setReminderChecked] = useState();

  // related to MedReminder
  const [reminderDays, setReminderDays] = useState(0);
  const [reminderDateTime, setReminderDateTime] = useState('');

  // related to stepper
  const [activeStep, setActiveStep] = useState(0);

  // initiate navigate
  const navigate = useNavigate();

  const location = useLocation();
  const medicineId = location.state.id;
  const { patientId } = location.state;
  console.log('<== location.state ==>', location.state);

  useEffect(() => {
    const callBack = async () => {
      const data = new URLSearchParams();
      data.append('patientId', patientId);
      data.append('medicineId', medicineId);
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/view-med?${data.toString()}`);
      console.log('<== get data ==>', res.data);
      const { selectedMedicine } = res.data;
      const { frequency, lastPrescribed, reminder } = selectedMedicine;
      setName(selectedMedicine.name);
      setAsRequiredChecked(frequency.asRequiredChecked);
      setDosage(frequency.dosage);
      setDosageCounter(frequency.dosageCounter);
      setTimes(frequency.times);
      setDuration(frequency.perDuration);
      setNote(frequency.note);
      setPrescriptionDate(lastPrescribed.prescriptionDate);
      setPrescriptionQty(lastPrescribed.prescriptionQty);
      setReminderChecked(reminder.reminderChecked);
      setReminderDays(reminder.reminderDays);
      setReminderDateTime(reminder.reminderDateTime);
    };

    callBack();
  }, []);
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSwitch = (e) => {
    setAsRequiredChecked(e.target.checked);
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
      medicineId,
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
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/edit-med`, data);
      console.log('<== res.data add med ==>', res.data);
      navigate('/med-list');
      // need to navigate somewhere after form submit
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card>
        {activeStep === 0 && (
          <MedName name={name} handleName={handleName} title="Edit Medicine" />
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
            prescriptionQty={prescriptionQty}
            handlePrescriptionDate={handlePrescriptionDate}
            handlePrescriptionQty={handlePrescriptionQty}
            reminderChecked={reminderChecked}
            handleReminder={handleReminder}
          />
          <ReminderRecap
            reminderChecked={reminderChecked}
            reminderDateTime={reminderDateTime}
          />
          {/* <MedReminder
            handleReminderDays={handleReminderDays}
            dosage={dosage}
            times={times}
            prescriptionQty={prescriptionQty}
            duration={duration}
            reminderDays={reminderDays}
            prescriptionDate={prescriptionDate}
          /> */}
        </div>

        )}
        <MedStepper setActiveStep={setActiveStep} activeStep={activeStep} handleSubmit={handleSubmit} />
      </Card>

    </div>
  );
}

export default EditMedCard;
