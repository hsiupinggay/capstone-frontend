import React, { useState, useRef } from 'react';
import Login from '../molecules/LoginForm';
import Signup from '../molecules/SignupForm';

function UserAuthTab() {
  // States for aria label and conditional rendering of login/signup components
  const [loginSelected, setLoginSelected] = useState(true);
  const [signupSelected, setSignupSelected] = useState(false);

  // useRef for equivalent of getElementById
  // see refs in tab div
  const loginTab = useRef();
  const signupTab = useRef();

  // Event listener when tabs are clicked
  // className of tab is originally transparent and changes to blue when clicked
  const handleLogin = () => {
    setLoginSelected(true);
    setSignupSelected(false);

    loginTab.current.classList.add('border-blue-600');
    loginTab.current.classList.remove('border-transparent');

    signupTab.current.classList.remove('border-blue-600');
    signupTab.current.classList.add('border-transparent');
  };

  const handleSignup = () => {
    setLoginSelected(false);
    setSignupSelected(true);

    loginTab.current.classList.remove('border-blue-600');
    loginTab.current.classList.add('border-transparent');

    signupTab.current.classList.add('border-blue-600');
    signupTab.current.classList.remove('border-transparent');
  };

  return (
    <div
      className="drop-shadow-md
    rounded-2xl
    bg-white
    p-4 my-12"
    >
      <ul
        className="flex flex-row flex-wrap list-none "
        id="tabs-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <a
            ref={loginTab}
            href="#tabs-login"
            className="
      nav-link
      block
      font-medium
      text-s
      uppercase
      border-x-0 border-t-0 border-b-2 border-blue-600
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
            ref={signupTab}
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
