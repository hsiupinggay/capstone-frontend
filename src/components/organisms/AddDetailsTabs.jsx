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
export default function AddDetailsTabs({ addition, setAddition, setModal }) {
  return (
    <div>
      { console.log('run?')}
      { console.log(addition)}
      {
          addition === 'hospital'
            ? <AddHospital setAddition={setAddition} setModal={setModal} />
            : addition === 'patient'
              ? <AddPatient setAddition={setAddition} setModal={setModal} />
              : addition === 'department'
                ? <AddDepartment setAddition={setAddition} setModal={setModal} />
                : <AddChaperone setAddition={setAddition} setModal={setModal} />
        }
    </div>
  );
}
