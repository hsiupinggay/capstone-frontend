/* eslint-disable max-len */
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
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Button, Menu, MenuItem, Divider, Stack, Typography,
} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useMedicalContext, logout } from '../others/store';
// Navbar Component. Renders after user logs in and is authenticated

/*
 * ========================================================
 * ========================================================
 *
 *                 NavOptions Component
 *
 * ========================================================
 * ========================================================
 */
function NavOptions() {
  const navigate = useNavigate();
  const { dispatch } = useMedicalContext();
  // Add/edit routes that should appear in nav bar in pathArray
  // PathArray gets mapped into navLink component
  const pathArray = [{
    path: '/home',
    name: 'Home',
  }, {
    path: '/appointments',
    name: 'Appointments',
  },
  {
    path: '/patients',
    name: 'Patients',
  },
  {
    path: '/profile',
    name: 'Profile',
  },
  {
    path: '/add-appt',
    name: 'Add Appt',
  }];

  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
    navigate('/');
  };

  return (
    <>
      {pathArray.map((e) => (
        <MenuItem
          key={e.name}
          onClick={() => {
            navigate(e.path);
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body1">
              {e.name}
            </Typography>
          </Stack>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem
        key="logout"
        onClick={handleLogout}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <LogoutRoundedIcon />
          {' '}
          <Typography variant="body1">
            Log Out
          </Typography>
        </Stack>
      </MenuItem>
    </>
  );
}

/*
 * ========================================================
 * ========================================================
 *
 *                  NavMenu Component
 *
 * ========================================================
 * ========================================================
 */
export default function NavMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ md: 'hidden' }}
      >
        <MenuRoundedIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <NavOptions />
      </Menu>
      <Outlet />
    </div>
  );
}
