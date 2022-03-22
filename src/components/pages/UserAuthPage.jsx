/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import AuthCard from '../organisms/AuthCard';
import authStyle from './UserAuthPageCss';

/*
 * ========================================================
 * ========================================================
 *
 *                UserAuthPage Component
 *
 * ========================================================
 * ========================================================
 */
export default function UserAuthPage() {
  return (
    <Box sx={authStyle.mainContainer}>
      <Typography sx={authStyle.appName}>
        APP NAME
      </Typography>
      <Box sx={authStyle.loginContainer}>
        <AuthCard />
      </Box>
    </Box>
  );
}
