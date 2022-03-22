/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { useNavigate } from 'react-router-dom';
import {
  TextField, Stack, Button, CardContent,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { login, useMedicalContext } from '../others/store';
import { validateEmail } from '../others/helper';

/*
 * ========================================================
 * ========================================================
 *
 *                    Login Component
 *
 * ========================================================
 * ========================================================
 */
export default function Login() {
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
    console.log('<== login data ==>', data);
    try {
      // Calls login function from store
      const res = await login(dispatch, data);

      if (res.loginSuccess) {
        navigate('/');
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
      {!error && (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        padding={3}
      >
        <PersonIcon />
        <TextField fullWidth label="E-mail" variant="outlined" onChange={handleEmail} />
        <TextField fullWidth label="Password" type="password" variant="outlined" onChange={handlePassword} />
      </Stack>
      )}

      {error && (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        padding={3}
      >
        <PersonIcon />
        <TextField fullWidth error label="E-mail" variant="outlined" onChange={handleEmail} />
        <TextField fullWidth error label="Password" type="password" variant="outlined" onChange={handlePassword} helperText={errorMessage} />
      </Stack>
      )}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        px={3}
        pt={1}
      >
        <Button fullWidth variant="contained" onClick={handleSubmit}>Log In</Button>
      </Stack>
    </CardContent>

  // <form>
  //   <div className="
  // flex
  // flex-col
  // justify-center
  // p-3
  // "
  //   >
  //     <Stack
  //       spacing={2}
  //     >
  //       <TextField type="email" onChange={handleEmail} label="Email" />
  //       <TextField type="password" onChange={handlePassword} label="Password" />
  //       {error && <HelperText text={errorMessage} />}
  //       <div className="flex justify-center">
  //         <SubmitButton label="Submit" onClick={handleSubmit} />
  //       </div>
  //     </Stack>
  //   </div>
  // </form>
  );
}
