import React, { useEffect, useContext, Fragment } from "react";
import PokemonContext from "../../context/pokemon/pokemonContext";
import Pokemon from "./Pokemon";

const Pokemons = () => {
  const pokemonContext = useContext(PokemonContext);
  const { getPokemons, pokemons, currentUrl, filtered } = pokemonContext;

  useEffect(() => {
    getPokemons();
  }, [currentUrl]);

  return (
    <Fragment>
      {filtered.length === 0
        ? pokemons.map((pokemon, index) => {
            return (
              <Pokemon name={pokemon.name} url={pokemon.url} key={index} />
            );
          })
        : filtered.map((pokemon, index) => {
            return (
              <Pokemon name={pokemon.name} url={pokemon.url} key={index} />
            );
          })}
    </Fragment>
  );
};

export default Pokemons;
