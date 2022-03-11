/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React from 'react';

// label: label of input e.g. "Password"
// type: type of input e.g. "password"
// id: id of input e.g. "password-input"

// this input does not have a required attribute,
// for required input, please use RequiredTextfield in './atoms/RequiredTextfield'

/*
 * ========================================================
 * ========================================================
 *
 *                OptionalTextfield Component
 *
 * ========================================================
 * ========================================================
 */
export default function OptionalTextfield({ label, type, id }) {
  return (

    <div className="mx-3">
      <div className="relative z-0 mb-6 w-full group">
        <input
          className="
        block
        py-2.5 px-0 w-full
        text-sm text-gray-900
        bg-transparent
        border-0 border-b-2 border-gray-300
        appearance-none
        dark:text-white dark:border-gray-600 dark:focus:border-blue-500
        focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          type={type}
          placeholder=" "
          id={id}
          name={id}
        />
        <label
          className="
          absolute
          text-sm text-gray-500
          dark:text-gray-400
          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6
          "
          htmlFor={id}
        >
          {label}

        </label>
      </div>
    </div>

  );
}
