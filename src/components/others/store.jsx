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
// import { useNavigate } from 'react-router-dom';
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
  photo: null,
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
        photo: action.payload.photo,
      };
    case AUTH:
      return {
        ...state,
        userId: action.payload.id,
        firstName: action.payload.name.first,
        lastName: action.payload.name.last,
        email: action.payload.email,
      };
    case UPLOAD_PHOTO:
      return {
        ...state,
        photo: action.payload,
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
    case EDIT_USER:
      return {
        ...state,
        firstName: action.payload.name.first,
        lastName: action.payload.name.last,
        email: action.payload.email,
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
const AUTH = 'AUTH';
const UPLOAD_PHOTO = 'UPLOAD_PHOTO';
const EDIT_USER = 'EDIT_USER';

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

export function authAction(payload) {
  return {
    type: AUTH,
    payload,
  };
}

export function uploadPhotoAction(payload) {
  return {
    type: UPLOAD_PHOTO,
    payload,
  };
}

export function editUserAction(payload) {
  return {
    type: EDIT_USER,
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
export async function authenticate(dispatch) {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  const config = { headers: { authorization: `Bearer ${token}` } };
  try {
    const res = await axios.get(`${REACT_APP_BACKEND_URL}/user/authenticate`, config);
    console.log('<== authenticate res.data ==>', res.data);

    // Sets user details again, in case user closed window
    dispatch(authAction(res.data));
    console.log('<== dispatch auth action ==>', authAction(res.data));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Upload Photo
export async function uploadPhoto(dispatch, data) {
  try {
    const res = await axios.post(`${REACT_APP_BACKEND_URL}/user/photo`, data);
    dispatch(uploadPhotoAction(res.data.userPhoto));
    console.log('<== STORE: res.data ==>', res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

// Edit Profile
export async function editProfile(dispatch, data) {
  try {
    const res = await axios.post(`${REACT_APP_BACKEND_URL}/user/edit`, data);
    dispatch(editUserAction(res.data.payload));
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

// Not done
export function logout(dispatch) {
  localStorage.removeItem('token');
  dispatch((logoutAction()));
}
