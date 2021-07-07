import React, { useEffect, useContext, Fragment } from "react";
import PokemonContext from "../../context/pokemon/pokemonContext";
import Pokemon from "./Pokemon";

const Pokemons = () => {
  const pokemonContext = useContext(PokemonContext);
  const { getPokemons, pokemons, clearCurrentPokemon, currentUrl } =
    pokemonContext;

  useEffect(() => {
    getPokemons();
    clearCurrentPokemon();
  }, [currentUrl]);

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  return (
    <Fragment>
      {pokemons.map((pokemon, index) => {
        return <Pokemon name={pokemon.name} url={pokemon.url} key={index} />;
      })}
    </Fragment>
  );
};

export default Pokemons;
