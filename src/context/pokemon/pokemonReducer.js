import { GET_POKEMONS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload, loading: false };
    default:
      return state;
  }
};
