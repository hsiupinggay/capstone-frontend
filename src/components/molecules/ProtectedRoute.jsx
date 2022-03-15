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
import React, { useState } from 'react';
import { useNavigate, Navigate, Outlet } from 'react-router-dom';
import { authenticate } from '../others/store';

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
  // const { dispatch } = useMedicalContext();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const waitForPromise = async () => {
    const res = await authenticate();
    console.log('<== verified route ==>', res);
    // dispatch(authAction(res));
    if (res.error) {
      console.log('<== illegal route ==>', res);
      setError(true);
      return navigate('/auth');
    }
    return true;
  };

  waitForPromise();

  return error ? <Navigate to="/auth" replace /> : <Outlet />;
}
