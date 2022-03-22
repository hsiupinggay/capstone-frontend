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
  Box, AppBar, Toolbar, Typography, Button, Avatar,
} from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SickIcon from '@mui/icons-material/Sick';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useMedicalContext, logout } from '../others/store';
import { getNameInitials } from '../others/helper';
import navStyles from './NavbarCss';

/*
 * ========================================================
 * ========================================================
 *                  Array of navbar paths
 * ========================================================
 * ========================================================
 */
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
  path: '/contacts',
  name: 'Contacts',
},
{
  path: '/profile',
  name: 'Profile',
},
];

/*
 * ========================================================
 * ========================================================
 *
 *                    Navbar Component
 *       Renders after user logs in and is authenticated
 *
 * ========================================================
 * ========================================================
 */
export default function NavBar() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const { store, dispatch } = useMedicalContext();
  const { photo, firstName, lastName } = store;
  return (
    <div>
      <AppBar sx={navStyles.appBar}>
        <Toolbar sx={navStyles.toolBar}>
          <Typography sx={navStyles.appName}>
            MedicalApp
          </Typography>
          <Box sx={navStyles.navContainer}>
            {pathArray.map((e) => (
              <Button
                key={e.name}
                onClick={() => { navigate(e.path); }}
                sx={navStyles.navBtn}
              >
                {e.name}
              </Button>
            ))}
            <Button
              onClick={() => {
                logout(dispatch);
                navigate('/auth');
              }}
              sx={navStyles.navBtn}
            >
              Logout

            </Button>
          </Box>

          <Box
            sx={navStyles.navProfileContainer}
          >
            <Box sx={navStyles.navNameContainer}>
              <Typography sx={navStyles.navProfileName}>
                {firstName}
                {' '}
                {lastName}
              </Typography>

            </Box>
            <Box sx={navStyles.navProfilePic}>
              {!photo && <Avatar sx={{ width: 45, height: 45 }}>{getNameInitials(firstName, lastName)}</Avatar>}
              {photo && <Avatar sx={{ width: 45, height: 45 }} alt="profile" src={photo} />}
            </Box>
          </Box>

        </Toolbar>
      </AppBar>
      <Box sx={navStyles.bottomNavContainer}>
        <BottomNavigation
          sx={navStyles.bottomNavBar}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(newValue);
          }}
        >
          <BottomNavigationAction
            value="/"
            label="Home"
            icon={<HomeIcon />}
            sx={navStyles.bottomNavBtn}
          />
          <BottomNavigationAction
            value="/appointments"
            label="Appointments"
            icon={<CalendarMonthIcon />}
            sx={navStyles.bottomNavBtn}

          />
          <BottomNavigationAction
            value="/patients"
            label="Patients"
            icon={<SickIcon />}
            sx={navStyles.bottomNavBtn}

          />
          <BottomNavigationAction
            value="/contacts"
            label="Contacts"
            icon={<PeopleAltIcon />}
            sx={navStyles.bottomNavBtn}

          />
          <BottomNavigationAction
            value="/profile"
            label="Profile"
            icon={<ContactPageIcon />}
            sx={navStyles.bottomNavBtn}

          />
          <BottomNavigationAction
            value="/logout"
            label="Logout"
            icon={<PowerSettingsNewIcon />}
            sx={navStyles.bottomNavBtn}

          />
        </BottomNavigation>
      </Box>
      <Outlet />
    </div>
  );
}
