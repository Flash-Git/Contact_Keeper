import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import NotFound from "./components/pages/NotFound";

import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faGithub);

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <div className="container">
        <Switch>
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
