/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/*
 * ========================================================
 * ========================================================
 *
 *                       Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/*
 * ========================================================
 * ========================================================
 *
 *             Initial State for useReducer
 *
 * ========================================================
 * ========================================================
 */
export const initialState = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  photo: '',
};

/*
 * ========================================================
 * ========================================================
 *
 *                  Reducer Function
 *
 * ========================================================
 * ========================================================
 */
export function medicalReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.id,
        firstName: action.payload.name.first,
        lastName: action.payload.name.last,
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        ...state,
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        photo: '',
      };
    case SIGNUP:
      return {
        ...state,
      };

    default:
      return state;
  }
}

/*
 * ========================================================
 * ========================================================
 *
 *         Action Generating Functions for useReducer
 *
 * ========================================================
 * ========================================================
 */
// Action Types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SIGNUP = 'SIGNUP';

export function loginAction(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function signupAction(payload) {
  return {
    type: SIGNUP,
    payload,
  };
}

export function logoutAction() {
  return {
    type: LOGOUT,
  };
}

/*
 * ========================================================
 * ========================================================
 *
 *               Provider Code for useContext
 *
 * ========================================================
 * ========================================================
 */
export const MedicalContext = React.createContext(null);

// Create the provider to use below
const { Provider } = MedicalContext;

export function MedicalProvider({ children }) {
  // Create the dispatch function in one place and put in into context
  // where it will be accessible to all of the children
  const [store, dispatch] = useReducer(medicalReducer, initialState);

  return (
    <Provider value={{ store, dispatch }}>
      {children}
    </Provider>
  );
}

export function useMedicalContext() {
  const context = React.useContext(MedicalContext);
  if (context === undefined) {
    throw new Error(
      'useMedicalContext must be used within a MedicalProvider',
    );
  }
  return context;
}

/*
 * ========================================================
 * ========================================================
 *
 *                      Requests
 *
 * ========================================================
 * ========================================================
 */

// Ensure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

// Login function
// Successful login is sent as data
// Error login are caught and error messages are passed to components
export async function login(dispatch, data) {
  try {
    const res = await axios.post(`${REACT_APP_BACKEND_URL}/user/login`, data);

    localStorage.setItem('token', res.data.token);
    dispatch(loginAction(res.data.payload));

    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

// Signup function
// Successful signup is sent as data
// Error signup are caught and error messages are passed to components
export async function signup(dispatch, data) {
  try {
    const res = await axios.post(`${REACT_APP_BACKEND_URL}/user/signup`, data);

    dispatch(signupAction());
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

// Authenticate JWT
// This fucntion does not use dispatch
// Might consider moving out of store into helper.js
export async function authenticate() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Something went wrong, please sign in again.');
    navigate('/');
  }
  const config = { headers: { authorization: `Bearer ${token}` } };
  try {
    const res = await axios.get(`${REACT_APP_BACKEND_URL}/user/authenticate`, config);
    if (res.data.verified) {
      return res.data.verified;
    }
  } catch (err) {
    console.log(err);
    navigate('/');
  }
}

// Not done
export function logout(dispatch) {
  localStorage.removeItem('token');
  dispatch((logoutAction()));
}
