import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import PokemonCurrent from "./components/pokemons/PokemonCurrent";
import PokemonState from "./context/pokemon/PokemonState";

import "./App.css";

const App = () => {
  return (
    <PokemonState>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pokemonCurrent" component={PokemonCurrent} />
          </Switch>
        </Fragment>
      </Router>
    </PokemonState>
  );
};

export default App;
