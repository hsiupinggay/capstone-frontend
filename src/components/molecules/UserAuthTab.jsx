import React, { useState } from 'react';
import Login from '../organisms/Login';
import Signup from '../organisms/Signup';

function UserAuthTab() {
  // States for aria label and conditional rendering of login/signup components

  const [loginSelected, setLoginSelected] = useState(true);
  const [signupSelected, setSignupSelected] = useState(true);

  // Get login and signup tab for DOM manipulation in handleLogin and handleSignup

  const loginTab = document.getElementById('tabs-login-tab');
  const signupTab = document.getElementById('tabs-signup-tab');

  // Event listener when tabs are clicked

  const handleLogin = () => {
    setLoginSelected(true);
    setSignupSelected(false);

    loginTab.classList.add('border-blue-600');
    loginTab.classList.remove('border-transparent');

    signupTab.classList.remove('border-blue-600');
    signupTab.classList.add('border-transparent');
  };

  const handleSignup = () => {
    setLoginSelected(false);
    setSignupSelected(true);

    loginTab.classList.remove('border-blue-600');
    loginTab.classList.add('border-transparent');

    signupTab.classList.add('border-blue-600');
    signupTab.classList.remove('border-transparent');
  };

  return (
    <div className="drop-shadow-md rounded-2xl bg-white">
      <ul
        className="flex flex-row flex-wrap list-none "
        id="tabs-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-login"
            className="
      nav-link
      block
      font-medium
      text-s
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-blue-600 hover:bg-gray-100
    "
            id="tabs-login-tab"
            role="tab"
            aria-controls="tabs-login"
            aria-selected={loginSelected}
            onClick={handleLogin}
          >
            log in

          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-signup"
            className="
      nav-link
      block
      font-medium
      text-s
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-blue-600 hover:bg-gray-100
    "
            id="tabs-signup-tab"
            role="tab"
            aria-controls="tabs-signup"
            aria-selected={signupSelected}
            onClick={handleSignup}
          >
            sign up

          </a>
        </li>

      </ul>
      <div className="tab-content" id="tabs-tabContent">
        {loginSelected && (
          <Login />
        )}

        {signupSelected && (<Signup />)}

      </div>
    </div>
  );
}

export default UserAuthTab;
