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
        userId: action.payload.userDetails.userId,
        firstName: action.payload.userDetails.name.first,
        lastName: action.payload.userDetails.name.last,
        email: action.payload.userDetails.email,
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

export function loginAction(userDetails) {
  return {
    type: LOGIN,
    payload: userDetails,
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

export function login(dispatch, data) {
  return axios.post(`${REACT_APP_BACKEND_URL}/login`, data).then((result) => {
    if (result.data !== null) {
      localStorage.setItem('token', result.data.token);
      dispatch((loginAction(result.data)));
    }
  });
}

export function logout(dispatch) {
  localStorage.removeItem('token');
  dispatch((logoutAction()));
}
