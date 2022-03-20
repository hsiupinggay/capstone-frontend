/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/*
 * ========================================================
 * ========================================================
 *
 *                       Imports
 *
 * ========================================================
 * ========================================================
 */
import React from 'react';

import AddHospital from './AddHospital';
import AddPatient from './AddPatient';
import AddChaperone from './AddChaperone';
import AddDepartment from './AddDepartment';
/*
 * ========================================================
 * ========================================================
 *
 *        Component for rendering add patient form
 *
 * ========================================================
 * ========================================================
 */
export default function AddDetailsTabs({ addition, setAddition }) {
  return (
    <div>
      {
          addition === 'hospital'
            ? <AddHospital setAddition={setAddition} />
            : addition === 'patient'
              ? <AddPatient setAddition={setAddition} />
              : addition === 'department'
                ? <AddDepartment setAddition={setAddition} />
                : <AddChaperone setAddition={setAddition} />
        }
    </div>
  );
}
