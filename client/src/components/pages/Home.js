import React, { Fragment, useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";

const Home = () => (
  <div className="grid-2">
    <div>
      <ContactForm />
    </div>
    <div>
      <Contacts />
    </div>
  </div>
);

export default Home;
