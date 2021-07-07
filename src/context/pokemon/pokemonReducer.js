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
      return { ...state, currentType: action.payload };
    case CLEAR_CURRENT_TYPE:
      return { ...state, currentType: "" };
    default:
      return state;
  }
};
