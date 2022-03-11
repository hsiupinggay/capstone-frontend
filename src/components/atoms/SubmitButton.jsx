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

// Blue button with type "submit"

/*
 * ========================================================
 * ========================================================
 *
 *              SubmitButton Component
 *
 * ========================================================
 * ========================================================
 */
export default function SubmitButton({ label, onClick }) {
  return (
    <button
      className="
        bg-blue-500
      hover:bg-blue-700
      text-white text-sm font-medium uppercase tracking-wide
      py-2 px-3 my-2
      rounded-lg
      "
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>

  );
}
