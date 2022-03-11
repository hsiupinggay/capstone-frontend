/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import axios from 'axios';
import React from 'react';
import SubmitButton from '../atoms/SubmitButton';
import { authenticate } from '../others/store';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

/*
 * ========================================================
 * ========================================================
 *
 *                      HomePage Component
 *
 * ========================================================
 * ========================================================
 */
export default function HomePage() {
  const config = authenticate();
  const handleClick = async (e) => {
    e.preventDefault();
    console.log('<== config ==>', config);
    try {
      const res = await axios.put(`${REACT_APP_BACKEND_URL}/user/profile`, { data: 'some data' }, config);
      console.log('<== homepage res ==>', res);
    } catch (err) { console.log(err); }
  };
  return (
    <div>
      <h1>
        HomePage
      </h1>
      <SubmitButton label="Edit" onClick={handleClick} />
    </div>
  );
}
