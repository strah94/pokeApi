import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PokemonContext from "../../context/pokemon/pokemonContext";
import { Link } from "react-router-dom";

import { getPokemonData } from "../../helpers/functions";
import { colors } from "../../constants/constants";

const Pokemon = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState([]);

  const pokemonContext = useContext(PokemonContext);
  const { currentPokemon, setCurrentPokemon, setCurrentType } = pokemonContext;

  useEffect(async () => {
    const data = await getPokemonData(url);
    setPokemonData(data);
  }, [name]);

  const handleOnClick = (e) => {
    e.target.name === "link"
      ? setCurrentPokemon(name, url)
      : setCurrentType(e.target.value);
  };

  return (
    <div>
      {pokemonData.sprites ? (
        <div className="pokemon-card">
          <img src={pokemonData.sprites.front_default}></img>
          <p>{`#${pokemonData.id.toString().padStart(3, "0")}`}</p>
          <Link
            name="link"
            to="/pokemonCurrent"
            className="name-btn"
            onClick={handleOnClick}
          >
            {name}
          </Link>
          <div className="pokemon-type">
            {pokemonData.types.map((element) => {
              return (
                <button
                  name="type"
                  value={element.type.name}
                  onClick={handleOnClick}
                  key={element.type.name}
                  style={{
                    backgroundColor: `${colors[`${element.type.name}`]}`,
                  }}
                >
                  {element.type.name}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
};

export default Pokemon;
