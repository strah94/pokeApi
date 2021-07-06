import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import PokemonState from "./context/pokemon/PokemonState";

import "./App.css";

const App = () => {
  return (
    <PokemonState>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Fragment>
      </Router>
    </PokemonState>
  );
};

export default App;
