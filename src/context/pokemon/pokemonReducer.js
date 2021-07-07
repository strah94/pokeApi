import {
  GET_POKEMONS,
  SET_CURRENT_POKEMON,
  CLEAR_CURRENT_POKEMON,
  SET_CURRENT_URL,
  SEARCH_POKEMONS,
  SHOW_ALL,
  CLEAR_POKEMONS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload.results,
        pokemonCount: action.payload.count,
        loading: false,
      };
    case CLEAR_POKEMONS:
      return { ...state, pokemons: [] };
    case SET_CURRENT_POKEMON:
      return { ...state, currentPokemon: action.payload };
    case CLEAR_CURRENT_POKEMON:
      return { ...state, currentPokemon: {} };
    case SET_CURRENT_URL:
      return { ...state, currentUrl: action.payload };
    case SEARCH_POKEMONS:
      return { ...state, pokemons: [action.payload] };
    case SHOW_ALL:
      return { ...state, pokemons: [...state.pokemons, action.payload] };
    default:
      return state;
  }
};
