/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';

/*
 * ========================================================
 * ========================================================
 *
 *              Initial State for useReducer
 *
 * ========================================================
 * ========================================================
 */
const initialState = {
  view: false,
  isModalOpen: false,
  modalType: '',
  filters: '',
  userDataArray: [],
};

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
const ACTIONS = {
  GET_DATA: 'get data',
  CHANGE_VIEW: 'change view',
};

export function getDataAction(payload) {
  return {
    type: ACTIONS.GET_DATA,
    payload,
  };
}

export function changeViewAction() {
  return {
    type: ACTIONS.CHANGE_VIEW,
  };
}

/*
 * ========================================================
 * ========================================================
 *
 *                  Reducer Function
 *
 * ========================================================
 * ========================================================
 */
export function apptReducer(state, action) {
  switch (action.type) {
    case ACTIONS.GET_DATA:

      return {
        ...state,
        userDataArray: action.payload,
      };
    case ACTIONS.CHANGE_VIEW:
      return {
        ...state,
        view: !state.view,
      };

    default:
      return state;
  }
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
export const ApptContext = React.createContext(null);

// Create the provider to use below
const { Provider } = ApptContext;

export function ApptProvider({ children }) {
  // Create the dispatch function in one place and put in into context
  // where it will be accessible to all of the children
  const [apptStore, apptDispatch] = useReducer(apptReducer, initialState);

  return (
    <Provider value={{ apptStore, apptDispatch }}>
      {children}
    </Provider>
  );
}

export function useApptContext() {
  const context = React.useContext(ApptContext);
  if (context === undefined) {
    throw new Error(
      'useApptContext must be used within a ApptProvider',
    );
  }
  return context;
}

/*
 * ========================================================
 * ========================================================
 *
 *               Helper Functions
 *
 * ========================================================
 * ========================================================
 */
export function storeUserData(dispatch, data) {
  dispatch(getDataAction(data));
}

export function changeView(dispatch) {
  dispatch(changeViewAction);
}
