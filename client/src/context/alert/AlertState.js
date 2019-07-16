import React, { useReducer } from "react";
import uuid from "uuid";

import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  /*
   * Actions
   */

  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payloud: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payloud: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
