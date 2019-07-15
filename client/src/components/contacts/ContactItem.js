import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact;
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
      </ul>
    </div>
  );
};

export default ContactItem;
