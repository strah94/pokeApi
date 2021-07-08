import React, { useContext, useState, useEffect, Fragment } from "react";
import axios from "axios";
import PokemonContext from "../../context/pokemon/pokemonContext";
import Pokemon from "../pokemons/Pokemon";
import { setModalLocation } from "../../helpers/functions";

const TypeModal = () => {
  const pokemonContext = useContext(PokemonContext);
  const { currentType, clearCurrentType, coordinates, clearModalCoordinates } =
    pokemonContext;

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

  useEffect(() => {
    setModalLocation(coordinates.x, coordinates.y);
  }, [coordinates]);

  const handleOnClick = () => {
    clearCurrentType();
    clearModalCoordinates();
    setTypePokemons([]);
  };

  return (
    <Fragment>
      <div
        id="type-modal"
        className={currentType ? "type-modal active" : "type-modal"}
      >
        {typePokemons.pokemon && (
          <div className="flex-column flex-center">
            <h1>{currentType}</h1>
            <button className="cancel-btn" onClick={handleOnClick}>
              X
            </button>
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
      </div>
    </Fragment>
  );
};

export default TypeModal;
