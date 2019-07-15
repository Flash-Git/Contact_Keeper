import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import ContactContext from "../../context/contact/ContactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const {
    currentContact,
    deleteContact,
    setCurrentContact,
    clearCurrentContact
  } = contactContext;

  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    if (currentContact && currentContact.id === contact.id)
      clearCurrentContact();
    deleteContact(id);
  };

  const onEdit = () => setCurrentContact(contact);

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        <span
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
          style={{ float: "right" }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <FontAwesomeIcon icon={["fas", "envelope-open"]} />
            &nbsp;{email}
          </li>
        )}
        {phone && (
          <li>
            <FontAwesomeIcon icon={["fas", "phone"]} />
            &nbsp;{phone}
          </li>
        )}
        <p>
          <button className="bt btn-dark btn-sm" onClick={onEdit}>
            Edit
          </button>
          <button className="bt btn-danger btn-sm" onClick={onDelete}>
            Delete
          </button>
        </p>
      </ul>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
