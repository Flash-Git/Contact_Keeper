import React, { useReducer } from "react";
import axios from "axios";

import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";

import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_ERRORS
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    currentContact: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  /*
   * Actions
   */

  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.data.msg });
    }
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  const addContact = async contact => {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.data.msg });
    }
  };

  const updateContact = async contact => {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact.id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.data.msg });
    }
  };

  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.data.msg });
    }

    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        clearContacts,
        addContact,
        updateContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        filterContacts,
        clearFilter,
        clearErrors
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
