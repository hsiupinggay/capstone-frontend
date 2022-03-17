/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */

// import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { authenticate, useMedicalContext } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *              ProtectedRoute Component
 *
 * ========================================================
 * ========================================================
 */
export default function ProtectedRoute() {
  const { dispatch } = useMedicalContext();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect runs on load and everytime the URL changes
  // location.pathname provides the current url
  // the path gets authenticated everytime there is a url change
  // also dispatches user details from token to the medicalReducer in store

  useEffect(() => {
    // authenticate contains a promise, hence it is executed within an async function
    // and called at the bottom
    const isAuth = async () => {
      // authenticate(dispatch) returns a boolean
      // true if token sent is authenticated
      // false if no token or token sent is not authenticated
      const res = await authenticate(dispatch);
      if (!res) navigate('/auth');
    };
    isAuth();
  }, [location.pathname]);

  return <Outlet />;
}
