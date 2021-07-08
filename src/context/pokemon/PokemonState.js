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
  SET_CURRENT_TYPE,
  CLEAR_CURRENT_TYPE,
  SET_TYPES,
  FILTER_POKEMONS,
  REMOVE_FILTER,
  SET_MODAL_COORDINATES,
  CLEAR_MODAL_COORDINATES,
  SET_LOADING,
} from "../types";

import { getFromLocalStorage, getPokemonData } from "../../helpers/functions";

const PokemonState = (props) => {
  const initialState = {
    pokemons: getFromLocalStorage("pokemons")
      ? getFromLocalStorage("pokemons")
      : [],
    currentUrl: getFromLocalStorage("currentUrl")
      ? getFromLocalStorage("currentUrl")
      : "https://pokeapi.co/api/v2/pokemon",
    currentPokemon: getFromLocalStorage("currentPokemon")
      ? getFromLocalStorage("currentPokemon")
      : {},
    pokemonCount: 0,
    currentType: getFromLocalStorage("currentType")
      ? getFromLocalStorage("currentType")
      : "",
    filtered: getFromLocalStorage("filtered")
      ? getFromLocalStorage("filtered")
      : [],
    coordinates: getFromLocalStorage("coordinates")
      ? getFromLocalStorage("coordinates")
      : {},
    types: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  //Get Pokemons
  const getPokemons = async () => {
    setLoading();

    try {
      const res = await axios.get(state.currentUrl);

      dispatch({
        type: GET_POKEMONS,
        payload: res.data,
      });
    } catch (err) {
      console.log("getPokemons error");
      console.log(err);
    }
  };

  //setCurrentPokemon
  const setCurrentPokemon = async (name, url) => {
    setLoading();

    try {
      const res = await axios.get(url);

      dispatch({
        type: SET_CURRENT_POKEMON,
        payload: res.data,
      });
    } catch (err) {
      console.log("setCurrentPokemon error");
      console.log(err);
    }
  };

  //setCurrentURL
  const setCurrentURL = async (type) => {
    setLoading();

    try {
      const res = await axios.get(state.currentUrl);
      const data = await res.data;

      const URL = type === "previous" ? data.previous : data.next;

      URL &&
        dispatch({
          type: SET_CURRENT_URL,
          payload: URL,
        });
    } catch (err) {
      console.log("setCurrentUrl error");
      console.log(err);
    }
  };

  //searchPokemons
  const searchPokemons = async (text) => {
    setLoading();

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`);

      dispatch({
        type: SEARCH_POKEMONS,
        payload: {
          name: text,
          url: res.config.url,
        },
      });
    } catch (err) {
      alert("Nema pokemona sa tim imenom");
      console.log("searchPokemons error");
      console.log(err);
    }
  };

  //showAll
  const showAll = async () => {
    clearPokemons();
    setLoading();

    let id = 1;
    while (id < state.pokemonCount) {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        dispatch({
          type: SHOW_ALL,
          payload: {
            name: res.data.name,
            url: res.config.url,
          },
        });
      } catch (err) {
        console.log("showAll error");
        console.log(err);
      }

      id++;
    }
  };

  //Set all types
  const setTypes = async () => {
    setLoading();

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/type`);
      console.log(res.data.results);

      dispatch({
        type: SET_TYPES,
        payload: res.data.results,
      });
    } catch (err) {
      console.log("setTypes error");
      console.log(err);
    }
  };

  //Filter pokemons
  const filterPokemons = async (type) => {
    state.pokemons.forEach(async (pokemon) => {
      const pokemonData = await getPokemonData(pokemon.url);

      pokemonData.types.forEach((element) => {
        element.type.name === type &&
          dispatch({
            type: FILTER_POKEMONS,
            payload: pokemon,
          });
      });
    });
  };

  //Set current type
  const setCurrentType = (type) => {
    dispatch({
      type: SET_CURRENT_TYPE,
      payload: type,
    });
  };

  //Set modal coordinates
  const setModalCoordinates = (x, y) => {
    dispatch({
      type: SET_MODAL_COORDINATES,
      payload: { x, y },
    });
  };

  //Clear all pokemons
  const clearPokemons = () => {
    dispatch({
      type: CLEAR_POKEMONS,
    });
  };

  //clearCurrentPokemon
  const clearCurrentPokemon = () => {
    dispatch({
      type: CLEAR_CURRENT_POKEMON,
    });
  };

  //Remove filter
  const removeFilter = () => {
    dispatch({
      type: REMOVE_FILTER,
    });
  };

  //Clear current type
  const clearCurrentType = () => {
    dispatch({
      type: CLEAR_CURRENT_TYPE,
    });
  };

  //clear modal coordinates
  const clearModalCoordinates = (x, y) => {
    dispatch({
      type: CLEAR_MODAL_COORDINATES,
    });
  };

  //Set Loading

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <PokemonContext.Provider
      value={{
        pokemons: state.pokemons,
        currentUrl: state.currentUrl,
        currentPokemon: state.currentPokemon,
        pokemonCount: state.pokemonCount,
        currentType: state.currentType,
        types: state.types,
        filtered: state.filtered,
        coordinates: state.coordinates,
        getPokemons,
        setCurrentPokemon,
        clearCurrentPokemon,
        setCurrentURL,
        searchPokemons,
        showAll,
        setTypes,
        setCurrentType,
        clearCurrentType,
        filterPokemons,
        removeFilter,
        setModalCoordinates,
        clearModalCoordinates,
        setLoading,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;
