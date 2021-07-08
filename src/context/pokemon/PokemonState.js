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
    try {
      const res = await axios.get(state.currentUrl);

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
    const res = await axios.get(url);

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

  //Clear all pokemons
  const clearPokemons = () => {
    dispatch({
      type: CLEAR_POKEMONS,
    });
  };

  //Set current type
  const setCurrentType = (type) => {
    console.log("Trenutni tip");
    console.log(type);
    dispatch({
      type: SET_CURRENT_TYPE,
      payload: type,
    });
  };

  //Set all types
  const setTypes = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/type`);
    console.log(res.data.results);

    try {
      dispatch({
        type: SET_TYPES,
        payload: res.data.results,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Filter pokemons
  const filterPokemons = async (type) => {
    state.pokemons.forEach(async (pokemon) => {
      const pokemonData = await getPokemonData(pokemon.url);

      pokemonData.types.forEach((element) => {
        try {
          element.type.name === type &&
            dispatch({
              type: FILTER_POKEMONS,
              payload: pokemon,
            });
        } catch (err) {
          console.log(err);
        }
      });
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

  //Set modal coordinates
  const setModalCoordinates = (x, y) => {
    dispatch({
      type: SET_MODAL_COORDINATES,
      payload: { x, y },
    });
  };

  //clear modal coordinates
  const clearModalCoordinates = (x, y) => {
    dispatch({
      type: CLEAR_MODAL_COORDINATES,
    });
  };

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
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;
