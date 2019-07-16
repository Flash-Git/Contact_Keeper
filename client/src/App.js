import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen, faPhone } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";

import "./App.css";

library.add(faGithub, faEnvelopeOpen, faPhone);

const App = () => (
  <AuthState>
    <ContactState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  </AuthState>
);

export default App;
