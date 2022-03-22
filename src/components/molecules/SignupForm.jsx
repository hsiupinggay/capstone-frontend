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
import {
  Button, CardContent, MobileStepper, Stack, TextField,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { signup, useMedicalContext } from '../others/store';
import { validateEmail } from '../others/helper';
import HelperText from '../atoms/HelperText';

/*
 * ========================================================
 * ========================================================
 *
 *                   Signup Component
 *
 * ========================================================
 * ========================================================
 */
export default function Signup() {
  const { dispatch } = useMedicalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfrimation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // This is a 2-step form
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  // Handle back click on stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // Handle button clicks
  const handleNext = async (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (email === '' || firstName === '' || lastName === '') {
      setError(true);
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Ensure email is valid
    if (!validateEmail(email)) {
      setError(true);
      setErrorMessage('Please input a valid email.');
      return;
    }
    setError(false);
    setErrorMessage('');
    setActiveStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords are the same
    if (password !== passwordConfrimation) {
      setError(true);
      setErrorMessage('Passwords do not match.');
      return;
    }

    const data = {
      email,
      password,
      firstName,
      lastName,
    };
    try {
      const res = await signup(dispatch, data);

      if (res.loginSuccess) {
        window.location.reload();
      } else if (!res.loginSuccess) {
        setError(true);
        setErrorMessage(res.error);
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage('Oops, something went wrong.');
    }
  };

  return (
    <CardContent>

      {activeStep === 1
       && (
         <Stack
           spacing={2}
           direction="column"
           justifyContent="center"
           alignItems="center"
         >
           <PersonIcon />
           <TextField label="First Name" variant="outlined" onChange={handleFirstName} value={firstName} />
           <TextField label="Last Name" variant="outlined" onChange={handleLastName} value={lastName} />
           <TextField label="E-mail" type="email" variant="outlined" onChange={handleEmail} value={email} />
         </Stack>
       )}

      {activeStep === 2
        && (
        <Stack
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <LockRoundedIcon />
          <TextField label="Password" type="password" variant="outlined" onChange={handlePassword} value={password} />
          <TextField label="Re-enter Password" type="password" variant="outlined" onChange={handlePasswordConfirmation} value={passwordConfrimation} />
          {error
          && <HelperText text={errorMessage} />}
        </Stack>
        )}

      <MobileStepper
        variant="dots"
        steps={2}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 230, flexGrow: 1 }}
        nextButton={activeStep === 2 ? (
          <Button size="small" onClick={handleSubmit}>
            Submit
            <KeyboardArrowRight />
          </Button>
        ) : (
          <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
            Next
            <KeyboardArrowRight />
          </Button>

        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 1}>
            <KeyboardArrowLeft />
            Back
          </Button>
      )}
      />
    </CardContent>
  );
}
