/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import RequiredTextfield from '../atoms/RequiredTextfield';

function Login() {
  return (
    <form>
      <div className="
    flex
    flex-col
    justify-center
    "
      >
        <RequiredTextfield label="Email" type="email" id="floating-email" />
        <RequiredTextfield label="Password" type="password" id="password-input" />
      </div>
    </form>
  );
}

export default Login;
