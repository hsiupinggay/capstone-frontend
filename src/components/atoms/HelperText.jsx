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
import React from 'react';

// Helper text to appear under inputs
// e.g. if there is an error message

/*
 * ========================================================
 * ========================================================
 *
 *                 HelperText Component
 *
 * ========================================================
 * ========================================================
 */
export default function HelperText({ text }) {
  return (
    <div
      className="
    text-xs
    font-medium
    text-red-600
    text-center
    my-2"
    >
      <p>{text}</p>
    </div>
  );
}
