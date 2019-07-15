import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import ContactState from "./context/contact/ContactState";

import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen, faPhone } from "@fortawesome/free-solid-svg-icons";

library.add(faGithub, faEnvelopeOpen, faPhone);

const App = () => (
  <ContactState>
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/About" component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  </ContactState>
);

export default App;
