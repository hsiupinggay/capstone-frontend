/* eslint-disable react/prop-types */
import React from 'react';

// Blue button with type "submit"

function SubmitButton({ label, onClick }) {
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

export default SubmitButton;
