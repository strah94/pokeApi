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

import { setToLocalStorage } from "../../helpers/functions";

export default (state, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      setToLocalStorage("pokemons", action.payload.results);

      return {
        ...state,
        pokemons: action.payload.results,
        pokemonCount: action.payload.count,
        loading: false,
      };
    case CLEAR_POKEMONS:
      setToLocalStorage("pokemons", []);
      return { ...state, pokemons: [] };
    case SET_CURRENT_POKEMON:
      setToLocalStorage("currentPokemon", action.payload);
      return { ...state, currentPokemon: action.payload };
    case CLEAR_CURRENT_POKEMON:
      setToLocalStorage("currentPokemon", {});
      return { ...state, currentPokemon: {} };
    case SET_CURRENT_URL:
      setToLocalStorage("currentUrl", action.payload);
      return { ...state, currentUrl: action.payload };
    case SEARCH_POKEMONS:
      return { ...state, pokemons: [action.payload] };
    case SHOW_ALL:
      return { ...state, pokemons: [...state.pokemons, action.payload] };
    case SET_CURRENT_TYPE:
      setToLocalStorage("currentType", action.payload);
      return { ...state, currentType: action.payload };
    case CLEAR_CURRENT_TYPE:
      setToLocalStorage("currentType", "");
      return { ...state, currentType: "" };
    case SET_TYPES:
      return { ...state, types: action.payload };
    case FILTER_POKEMONS:
      setToLocalStorage("filtered", [...state.filtered, action.payload]);
      return { ...state, filtered: [...state.filtered, action.payload] };
    case REMOVE_FILTER:
      setToLocalStorage("filtered", []);
      return { ...state, filtered: [] };
    case SET_MODAL_COORDINATES:
      setToLocalStorage("coordinates", {
        x: action.payload.x,
        y: action.payload.y,
      });
      return {
        ...state,
        coordinates: { x: action.payload.x, y: action.payload.y },
      };
    case CLEAR_MODAL_COORDINATES:
      setToLocalStorage("coordinates", {});
      return {
        ...state,
        coordinates: {},
      };
    default:
      return state;
  }
};
