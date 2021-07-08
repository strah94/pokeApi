import React, { useContext, useState, useEffect, Fragment } from "react";
import PokemonContext from "../../context/pokemon/pokemonContext";
import Pokemon from "../pokemons/Pokemon";
import { setModalLocation, getAsyncData } from "../../helpers/functions";

const TypeModal = () => {
  const pokemonContext = useContext(PokemonContext);
  const { currentType, clearCurrentType, coordinates, clearModalCoordinates } =
    pokemonContext;

  const [typePokemons, setTypePokemons] = useState([]);

  useEffect(() => {
    coordinates && setModalLocation(coordinates.x, coordinates.y);
  }, []);

  useEffect(async () => {
    const data =
      currentType &&
      (await getAsyncData(`https://pokeapi.co/api/v2/type/${currentType}`));

    setTypePokemons(data);
  }, [currentType]);

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
        {typePokemons.pokemon && coordinates && (
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
