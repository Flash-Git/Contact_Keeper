import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import {
  REGISTER_SUCCESS,
  USER_LOADED,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  /*
   * Actions
   */

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.token,
        loading: state.token,
        user: state.token,
        error: state.token
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
