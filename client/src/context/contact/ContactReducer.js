import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  CONTACT_ERROR,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload.map(contact => {
          contact.id = contact._id;
          return contact;
        }),
        loading: false
      };

    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false
      };
    case ADD_CONTACT:
      action.payload.id = action.payload._id;
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        currentContact: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        currentContact: null
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            contact.name.match(regex) ||
            contact.email.match(regex) ||
            contact.phone.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
