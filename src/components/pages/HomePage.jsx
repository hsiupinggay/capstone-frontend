/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */

import { Button } from '@mui/material';
import React from 'react';
import axios from 'axios';

/*
 * ========================================================
 * ========================================================
 *
 *                    HomePage Component
 *
 * ========================================================
 * ========================================================
 */
export default function HomePage() {
  const handleClick = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/test`);
    console.log('<== res.data test ==>', res.data);
  };
  return (
    <div>
      <h1>
        HomePage

      </h1>
      <Button onClick={handleClick}>CLICK</Button>

    </div>
  );
}
