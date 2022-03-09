/* eslint-disable react/prop-types */
import React from 'react';

// Helper text to appear under inputs
// e.g. if there is an error message

function HelperText({ text }) {
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

export default HelperText;
