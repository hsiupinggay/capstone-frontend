/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HelperText from '../atoms/HelperText';
import RequiredTextfield from '../atoms/RequiredTextfield';
import { login, useMedicalContext } from '../others/store';
import validateEmail from '../others/helper';
import SubmitButton from '../atoms/SubmitButton';

function Login() {
  const { dispatch } = useMedicalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Handles input changes
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled in
    if (email === '' || password === '') {
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

    const data = {
      email,
      password,
    };
    try {
      // Calls login function from store
      const res = await login(dispatch, data);

      if (res.loginSuccess) {
        navigate('/nav/home');
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
        <RequiredTextfield label="Email" type="email" id="floating-email" onChange={handleEmail} />
        <RequiredTextfield label="Password" type="password" id="password-input" onChange={handlePassword} />
        {error && <HelperText text={errorMessage} />}
        <div className="flex justify-center">
          <SubmitButton label="Submit" onClick={handleSubmit} />
        </div>

      </div>
    </form>
  );
}

export default Login;
