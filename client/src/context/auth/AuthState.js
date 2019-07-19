import React, { useReducer } from "react";
import axios from "axios";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
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

  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (e) {
      if (e.response.data) {
        e.response.data.errors.map(e =>
          dispatch({ type: REGISTER_FAIL, payload: e.msg })
        );
      } else {
        console.log(e.response.data);
        dispatch({ type: REGISTER_FAIL, payload: e.msg });
      }
    }
  };

  const loadUser = async () => {
    localStorage.token && setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (e) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (e) {
      if (e.response.data) {
        e.response.data.errors.map(e =>
          dispatch({ type: LOGIN_FAIL, payload: e.msg })
        );
      } else {
        console.log(e.response.data);
        dispatch({ type: LOGIN_FAIL, payload: e.msg });
      }
    }
  };

  const logout = () => dispatch({ type: LOGOUT });

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
