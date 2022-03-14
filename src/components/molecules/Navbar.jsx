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
import React, { useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/solid';
import { useMedicalContext } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *                      Navbar Component
 *     Renders after user logs in and is authenticated
 *
 * ========================================================
 * ========================================================
 */
export default function Navbar() {
  const [toggle, setToggle] = useState('hidden');
  const navMenu = useRef();
  const { store } = useMedicalContext();
  const { lastName } = store;

  // Toggle menu button that appears for menu icon
  const handleClick = () => {
    if (toggle === 'hidden') {
      setToggle('flex absolute');
    } else if (toggle === 'flex absolute') {
      setToggle('hidden');
    }
  };

  // Add/edit routes that should appear in nav bar in pathArray
  // PathArray gets mapped into navLink component
  const pathArray = [{
    path: '/nav/home',
    name: 'Home',
  }, {
    path: '/nav/appointments',
    name: 'Appointments',
  },
  {
    path: '/nav/contacts',
    name: 'Contacts',
  },
  {
    path: '/nav/profile',
    name: 'Profile',
  },
  {
    path: '/nav/add-appt',
    name: 'Add Appt',
  },
  // {
  //   path: '/nav/add-patient',
  //   name: 'Add Patient',
  // },
  // {
  //   path: '/nav/add-hospital',
  //   name: 'Add Hospital',
  // },
  // {
  //   path: '/nav/add-department',
  //   name: 'Add Dept',
  // },
  // {
  //   path: '/nav/add-chaperone',
  //   name: 'Add Chaperone',
  // },
  {
    path: '/logout',
    name: 'Logout',
  }];

  return (
    <div className="main-container w-screen h-screen
          flex flex-col items-center "
    >
      <div className="nav-div w-full my-3">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-sm font-semibold">{lastName}</h1>
          <MenuIcon className="h-5 w-5 text-gray-900 md:hidden" onClick={handleClick} />
          <nav
            ref={navMenu}
            className={`${toggle} flex-col z-40 md:flex md:flex-row md:justify-evenly items-center`}
          >

            {pathArray.map((e) => (
              <NavLink
                key={e.name}
                className={({ isActive }) => `${isActive && 'font-bold'} 
        px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
                to={e.path}
              >
                {e.name}

              </NavLink>
            ))}

          </nav>
        </div>

      </div>
      <Outlet />
    </div>
  );
}
