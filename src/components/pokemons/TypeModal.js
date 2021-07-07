import React, { useContext, useState, useEffect, Fragment } from "react";
import axios from "axios";
import PokemonContext from "../../context/pokemon/pokemonContext";
import Pokemon from "../pokemons/Pokemon";

const TypeModal = () => {
  const pokemonContext = useContext(PokemonContext);
  const { currentType, clearCurrentType } = pokemonContext;

  const [typePokemons, setTypePokemons] = useState([]);

  useEffect(async () => {
    if (currentType) {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/type/${currentType}`
      );
      const data = await res.data;

      setTypePokemons(data);
    }
  }, [currentType]);

  const handleOnClick = () => {
    clearCurrentType();
    setTypePokemons([]);
  };

  return (
    <Fragment>
      {currentType && typePokemons.pokemon && (
        <div className="type-modal">
          <h1>{currentType}</h1>
          <button onClick={handleOnClick}>CLOSE</button>
          <div>
            {typePokemons.pokemon.map((element, index) => {
              return (
                <Pokemon
                  name={element.pokemon.name}
                  url={element.pokemon.url}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TypeModal;
