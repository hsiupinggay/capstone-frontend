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
import { useMedicalContext } from '../others/store';
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
{
  path: '/logout',
  name: 'Logout',
},
];

// /*
//  * ========================================================
//  * ========================================================
//  *
//  *                      CSS for page
//  *
//  * ========================================================
//  * ========================================================
//  */
// const useStyles = makeStyles((theme) => ({
//   toolBar: {
//     [theme.breakpoints.down('sm')]: {
//       display: 'none',
//     },
//   },

//   appName: {
//     fontVariant: 'h2',
//     component: 'div',
//     marginLeft: 36,
//     marginRight: 6,
//     [theme.breakpoints.down('xl')]: {
//       fontSize: 25,
//       fontWeight: 500,
//     },
//     [theme.breakpoints.down('lg')]: {
//       fontSize: 19,
//     },
//     [theme.breakpoints.down('md')]: {
//       fontSize: 14,
//       marginRight: 0,
//       marginLeft: 5,
//     },
//     [theme.breakpoints.down('sm')]: {
//       display: 'none',
//     },
//   },

//   navContainer: {
//     backgroundColor: '#22577A',
//     display: 'flex',
//     justifyContent: 'center',
//     flexGrow: 1,
//     [theme.breakpoints.down('sm')]: {
//       display: 'none',
//     },
//   },

//   navBtn: {
//     my: 2,
//     display: 'block',
//     backgroundColor: '#22577A',
//     color: '#ffffff',
//     '&:hover': {
//       backgroundColor: '#ffffff',
//       color: '#22577A',
//     },
//     [theme.breakpoints.down('xl')]: {
//       fontSize: 15,
//     },
//     [theme.breakpoints.down('lg')]: {
//       fontSize: 12,
//     },
//     [theme.breakpoints.down('md')]: {
//       fontSize: 10,
//     },
//   },

//   profileContainer: {
//     [theme.breakpoints.up('sm')]: {
//       display: 'flex',
//       alignItems: 'center',
//     },

//     [theme.breakpoints.down('sm')]: {
//       display: 'none',
//     },
//   },

//   profileNameContainer: {
//     marginRight: 20,
//     [theme.breakpoints.down('md')]: {
//       display: 'none',
//     },
//   },

//   // HERE
//   profileName: {
//     [theme.breakpoints.down('xl')]: {
//       fontSize: 17,
//     },
//     [theme.breakpoints.down('lg')]: {
//       fontSize: 13,
//     },
//     [theme.breakpoints.down('md')]: {
//       fontSize: 8,
//     },
//   },

//   profilePic: {
//     marginRight: 30,
//     [theme.breakpoints.down('lg')]: {
//       marginRight: 20,
//     },
//     [theme.breakpoints.down('md')]: {
//       marginRight: 16,
//     },
//     [theme.breakpoints.down('sm')]: {
//       marginRight: 12,
//     },
//   },

//   bottomNavContainer: {
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//     [theme.breakpoints.down('sm')]: {
//       width: '100%',
//       bottom: 0,
//       left: 0,
//       position: 'fixed',
//     },
//   },

//   bottomNavBar: {
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },

//     [theme.breakpoints.down('sm')]: {
//       backgroundColor: theme.palette.primary.main,
//       '& .Mui-selected': {
//         '& .MuiBottomNavigationAction-label': {
//           lineHeight: '20px',
//         },
//         '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
//           color: '#ffffff',
//         },
//       },
//     },
//   },

//   bottomNavBtn: {
//     [theme.breakpoints.down('sm')]: {
//       '&:hover': {
//         backgroundColor: '#22577A',
//         color: '#ffffff',
//       },
//     },
//   },
// }));

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
  const { store } = useMedicalContext();
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
