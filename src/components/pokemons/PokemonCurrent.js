import React, { useContext, useEffect } from "react";
import PokemonContext from "../../context/pokemon/pokemonContext";

const PokemonCurrent = () => {
  const pokemonContext = useContext(PokemonContext);
  const { clearCurrentPokemon, currentPokemon } = pokemonContext;
  return (
    <div>
      {currentPokemon ? <h1>{currentPokemon.name}</h1> : <p>LOADING....</p>}
    </div>
  );
};

export default PokemonCurrent;
