import React, { Fragment, useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";

const Home = () => (
  <div className="grid-2">
    <div>{/* Contact Form */}</div>
    <div>
      <Contacts />
    </div>
  </div>
);

export default Home;
