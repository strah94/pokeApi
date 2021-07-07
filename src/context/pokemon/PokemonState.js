import React, { useReducer } from "react";
import PokemonContext from "./pokemonContext";
import pokemonReducer from "./pokemonReducer";
import axios from "axios";
import {
  GET_POKEMONS,
  SET_CURRENT_POKEMON,
  CLEAR_CURRENT_POKEMON,
  SET_CURRENT_URL,
  SEARCH_POKEMONS,
  SHOW_ALL,
  CLEAR_POKEMONS,
} from "../types";

const PokemonState = (props) => {
  const initialState = {
    pokemons: [],
    pokemonCount: 0,
    currentUrl: "https://pokeapi.co/api/v2/pokemon",
    currentPokemon: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  //Get Pokemons
  const getPokemons = async () => {
    try {
      const res = await axios.get(state.currentUrl);
      console.log("rezultat pokemona");
      console.log(res);
      dispatch({
        type: GET_POKEMONS,
        payload: res.data,
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
    } catch (err) {
      console.log(err);
    }
  };

  //setCurrentURL
  const setCurrentURL = async (type) => {
    const res = await axios.get(state.currentUrl);
    const data = await res.data;

    const URL = type === "previous" ? data.previous : data.next;

    try {
      URL &&
        dispatch({
          type: SET_CURRENT_URL,
          payload: URL,
        });
    } catch (err) {
      console.log(err);
    }
  };

  //searchPokemons
  const searchPokemons = async (text) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`);

    try {
      dispatch({
        type: SEARCH_POKEMONS,
        payload: {
          name: text,
          url: res.config.url,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  //showAll
  const showAll = async () => {
    clearPokemons();

    let id = 1;
    while (id < state.pokemonCount) {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      console.log(res.data);

      try {
        dispatch({
          type: SHOW_ALL,
          payload: {
            name: res.data.name,
            url: res.config.url,
          },
        });
      } catch (err) {
        console.log(err);
      }

      id++;
    }
  };

  const clearPokemons = () => {
    dispatch({
      type: CLEAR_POKEMONS,
    });
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: state.pokemons,
        currentUrl: state.currentUrl,
        currentPokemon: state.currentPokemon,
        pokemonCount: state.pokemonCount,
        getPokemons,
        setCurrentPokemon,
        clearCurrentPokemon,
        setCurrentURL,
        searchPokemons,
        showAll,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;