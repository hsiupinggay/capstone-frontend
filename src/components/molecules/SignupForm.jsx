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
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(false);
  const [stepOneError, setStepOneError] = useState(false);
  const [stepOneErrorMessage, setStepOneErrorMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

    if (email === '' || firstName === '' || lastName === '') {
      setStepOneError(true);
      setStepOneErrorMessage('Please fill in all fields.');
      return;
    }

    // Ensure email is valid
    if (!validateEmail(email)) {
      setStepOneError(true);
      setStepOneErrorMessage('Please input a valid email.');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStepOneError(false);
    setStepOneErrorMessage('');
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

      if (res.signupSuccess) {
        window.location.reload();
        setSuccess(true);
        setSuccessMessage('Sign up success! Please login.');
      } else if (!res.signupSuccess) {
        setError(true);
        setErrorMessage(res.error);
      }
    } catch (err) {
      setError(true);
      setErrorMessage('Oops, something went wrong.');
    }
  };

  return (
    <CardContent>
      {activeStep === 0
       && (
         <Stack
           spacing={2}
           direction="column"
           justifyContent="center"
           alignItems="center"
         >
           {stepOneError ? <HelperText text={stepOneErrorMessage} />
             : <PersonIcon />}
           <form>
             <Stack
               spacing={2}
               direction="column"
               justifyContent="center"
               alignItems="center"
             >
               <TextField label="First Name" variant="outlined" onChange={handleFirstName} autoComplete="given-name" value={firstName} />
               <TextField label="Last Name" variant="outlined" onChange={handleLastName} autoComplete="family-name" value={lastName} />
               <TextField label="E-mail" type="email" variant="outlined" onChange={handleEmail} autoComplete="email" value={email} />
             </Stack>
           </form>
         </Stack>
       )}

      {activeStep === 1
        && (
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          height="240px"
        >
          {error
            ? <HelperText text={errorMessage} />
            : <LockRoundedIcon />}
          {success
            ? <HelperText text={successMessage} />
            : <div />}
          <form>
            <Stack
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <input type="hidden" autoComplete="username" value="email" />
              <TextField label="Password" type="password" variant="outlined" onChange={handlePassword} autoComplete="new-password" value={password} />
              <TextField label="Re-enter Password" type="password" variant="outlined" onChange={handlePasswordConfirmation} autoComplete="new-password" value={passwordConfrimation} />
            </Stack>
          </form>
        </Stack>
        )}

      <MobileStepper
        variant="dots"
        steps={2}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1 }}
        nextButton={activeStep === 1 ? (
          <Button size="small" onClick={handleSubmit}>
            Submit
            <KeyboardArrowRight />
          </Button>
        ) : (
          <Button size="small" onClick={handleNext} disabled={activeStep === 1}>
            Next
            <KeyboardArrowRight />
          </Button>

        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
      )}
      />
    </CardContent>
  );
}
