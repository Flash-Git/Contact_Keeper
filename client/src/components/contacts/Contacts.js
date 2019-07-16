import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { loading, contacts, filtered, getContacts } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts && !loading ? (
        <TransitionGroup>
          {filtered
            ? filtered.map(contact => (
                <CSSTransition key={contact.id} timeout={200} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition key={contact.id} timeout={200} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
