/*
 * ========================================================
 * ========================================================
 *
 *                       Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useState } from 'react';
import {
  Box, Tab, Tabs, Card,
} from '@mui/material';
import Login from '../molecules/LoginForm';
import Signup from '../molecules/SignupForm';

/*
 * ========================================================
 * ========================================================
 *
 *                  Component for Auth Card
 *
 * ========================================================
 * ========================================================
 */
export default function AuthCard() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{
      width: '280px', height: '370px', mx: 'auto', mt: '50px', borderRadius: '20px',
    }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab value="1" label="Log In" />
          <Tab value="2" label="Sign Up" />
        </Tabs>
      </Box>

      {value === '1'
      && (
      <Login />
      )}

      {value === '2'
      && (
      <Signup />
      )}

    </Card>

  );
}
