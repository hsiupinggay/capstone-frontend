import React, { useState } from 'react';
import RequiredTextfield from '../atoms/RequiredTextfield';
import { signup, useMedicalContext } from '../others/store';
import { validateEmail } from '../others/helper';
import HelperText from '../atoms/HelperText';
import Button from '../atoms/Button';
import SubmitButton from '../atoms/SubmitButton';

function Signup() {
  const { dispatch } = useMedicalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfrimation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // This is a 2-step form
  const [step, setStep] = useState(1);
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

  // Handle button clicks
  const handleNext = async (e) => {
    e.preventDefault();
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
    setStep(2);
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
    <form>
      <div className="
    flex
    flex-col
    justify-center
    p-3
    "
      >
        {step === 1
       && (
       <div>
         <RequiredTextfield label="First Name" type="text" id="first-name" onChange={handleFirstName} />
         <RequiredTextfield label="Last Name" type="text" id="last-name" onChange={handleLastName} />
         <RequiredTextfield label="Email" type="email" id="floating-email" onChange={handleEmail} />
         {error
         && <HelperText text={errorMessage} />}
         <div className="flex justify-center">
           <Button label="Next" onClick={handleNext} />
         </div>
       </div>
       )}

        {step === 2
        && (
        <div>
          <RequiredTextfield label="Password" type="password" id="password-input" onChange={handlePassword} />
          <RequiredTextfield label="Re-enter Password" type="password" id="password-confirmation" onChange={handlePasswordConfirmation} />
          {error
          && <HelperText text={errorMessage} />}
          <div className="flex justify-center">
            <SubmitButton label="Submit" onClick={handleSubmit} />
          </div>
        </div>
        )}

      </div>
    </form>
  );
}

export default Signup;
