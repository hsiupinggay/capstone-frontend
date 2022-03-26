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
  Box, AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem,
} from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to logout
  // Clears local storage and all user info
  // Navigates to login page
  const handleLogout = () => {
    logout(dispatch);
    navigate('/auth');
    handleClose();
  };

  return (
    <div>
      <AppBar sx={navStyles.appBar}>
        <Toolbar sx={navStyles.toolBar}>
          <Typography variant="h2" sx={navStyles.appName}>
            KEEP
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
              onClick={handleLogout}
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
            icon={<HomeIcon />}
            sx={navStyles.bottomNavBtn}
          />
          <BottomNavigationAction
            value="/appointments"
            icon={<CalendarMonthIcon />}
            sx={navStyles.bottomNavBtn}

          />
          <BottomNavigationAction
            value="/contacts"
            icon={<PeopleAltIcon />}
            sx={navStyles.bottomNavBtn}

          />

          <BottomNavigationAction
            onClick={handleClick}
            icon={(
              <Box sx={navStyles.navProfilePic}>
                {!photo && <Avatar sx={{ width: 40, height: 40 }}>{getNameInitials(firstName, lastName)}</Avatar>}
                {photo && <Avatar sx={{ width: 40, height: 40 }} alt="profile" src={photo} />}
              </Box>
)}
            sx={navStyles.bottomNavBtn}

          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => {
              navigate('/profile');
              handleClose();
            }}
            >
              Profile

            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </BottomNavigation>
      </Box>
      <Outlet />
    </div>
  );
}
