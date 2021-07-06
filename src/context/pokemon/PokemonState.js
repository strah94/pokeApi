import React, { useReducer } from "react";
import PokemonContext from "./pokemonContext";
import pokemonReducer from "./pokemonReducer";
import axios from "axios";
import { GET_POKEMONS } from "../types";

const PokemonState = (props) => {
  const initialState = {
    pokemons: [],
    currentUrl: "https://pokeapi.co/api/v2/pokemon",
    loading: false,
  };

  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  //Get Pokemons
  const getPokemons = async () => {
    try {
      const res = await axios.get(state.currentUrl);
      console.log(res.data.results);
      dispatch({
        type: GET_POKEMONS,
        payload: res.data.results,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: state.pokemons,
        currentUrl: state.currentUrl,
        getPokemons,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;
