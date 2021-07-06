import {
  GET_POKEMONS,
  SET_CURRENT_POKEMON,
  CLEAR_CURRENT_POKEMON,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload, loading: false };
    case SET_CURRENT_POKEMON:
      return { ...state, currentPokemon: action.payload };
    case CLEAR_CURRENT_POKEMON:
      return { ...state, currentPokemon: {} };
    default:
      return state;
  }
};
