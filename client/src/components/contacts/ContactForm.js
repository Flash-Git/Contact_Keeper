import React, { useState, useContext, useEffect } from "react";

import ContactContext from "../../context/contact/ContactContext";
import AlertContext from "../../context/alert/AlertContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);

  const {
    currentContact,
    error,
    addContact,
    updateContact,
    clearCurrentContact,
    clearErrors
  } = contactContext;

  const { setAlert } = alertContext;

  const emptyContact = {
    name: "",
    email: "",
    phone: "",
    type: "personal"
  };

  const [contact, setContact] = useState(emptyContact);
  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (currentContact !== null) {
      setContact({ ...emptyContact, ...currentContact });
    } else {
      setContact(emptyContact);
    }
    //eslint-disable-next-line
  }, [currentContact]);

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error]);

  //Input
  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (currentContact === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = e => {
    setContact(emptyContact);
    clearCurrentContact();
  };

  //Render
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {currentContact ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h4>Contact Type</h4>
      <label>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />
        &nbsp;Personal&nbsp;&nbsp;&nbsp;
      </label>
      <label>
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />
        &nbsp;Professional
      </label>
      <div>
        <input
          type="submit"
          value={currentContact ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {currentContact && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
