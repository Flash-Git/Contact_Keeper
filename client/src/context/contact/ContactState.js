import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill",
        email: "jill@gmail.com",
        phone: "111",
        type: "personal"
      },
      {
        id: 2,
        name: "Timmy",
        email: "timmy@gmail.com",
        phone: "112",
        type: "personal"
      },
      {
        id: 3,
        name: "Fatty",
        email: "fatty@gmail.com",
        phone: "113",
        type: "professional"
      }
    ],
    currentContact: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  /*
   * Actions
   */

  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrentContact = contact => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
