import React, { useContext, useEffect } from "react";
import PokemonContext from "../../context/pokemon/pokemonContext";
import Pokemon from "./Pokemon";
import Details from "./Details";
import Slider from "./Slider";
import TypeModal from "./TypeModal";

const PokemonCurrent = () => {
  const pokemonContext = useContext(PokemonContext);
  const { clearCurrentPokemon, currentPokemon } = pokemonContext;

  useEffect(() => {
    console.log(currentPokemon);
  }, [currentPokemon]);
  return (
    <div className="pokemon-container-main">
      <div className="main-poke-info">
        <Pokemon
          name={currentPokemon.name}
          url={`https://pokeapi.co/api/v2/pokemon/${currentPokemon.name}`}
        />
        <div className="poke-measurments">
          <h1>height: {currentPokemon.height}</h1>
          <h1>weight: {currentPokemon.weight}</h1>
        </div>
      </div>
      <div className="main-poke-details">
        <Details title="stat" detailArray={currentPokemon.stats} />
        <Details title="ability" detailArray={currentPokemon.abilities} />
        <Details title="move" detailArray={currentPokemon.moves} />
      </div>
      <Slider images={currentPokemon.sprites} />
      <TypeModal />
    </div>
  );
};

export default PokemonCurrent;
