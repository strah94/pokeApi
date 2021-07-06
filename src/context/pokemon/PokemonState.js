import React, { useReducer } from "react";
import PokemonContext from "./pokemonContext";
import pokemonReducer from "./pokemonReducer";
import axios from "axios";
import {
  GET_POKEMONS,
  SET_CURRENT_POKEMON,
  CLEAR_CURRENT_POKEMON,
} from "../types";

const PokemonState = (props) => {
  const initialState = {
    pokemons: [],
    currentUrl: "https://pokeapi.co/api/v2/pokemon",
    currentPokemon: {},
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

  //setCurrentPokemon
  const setCurrentPokemon = async (name, url) => {
    console.log("setCurrentPokemon");
    const res = await axios.get(url);
    console.log(res.data);

    try {
      dispatch({
        type: SET_CURRENT_POKEMON,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //clearCurrentPokemon
  const clearCurrentPokemon = () => {
    try {
      dispatch({
        type: CLEAR_CURRENT_POKEMON,
      });
    } catch (err) {}
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: state.pokemons,
        currentUrl: state.currentUrl,
        currentPokemon: state.currentPokemon,
        getPokemons,
        setCurrentPokemon,
        clearCurrentPokemon,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;
