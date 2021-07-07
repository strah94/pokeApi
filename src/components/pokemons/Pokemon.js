import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PokemonContext from "../../context/pokemon/pokemonContext";
import { Link } from "react-router-dom";

const Pokemon = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState([]);

  const pokemonContext = useContext(PokemonContext);
  const { currentPokemon, setCurrentPokemon, setCurrentType } = pokemonContext;

  useEffect(async () => {
    const res = await axios.get(`${url}`);
    const data = await res.data;

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
          <Link
            name="link"
            to="/pokemonCurrent"
            className="name-btn"
            onClick={handleOnClick}
          >
            {name}
          </Link>

          {pokemonData.types.map((element) => {
            return (
              <button
                name="type"
                value={element.type.name}
                onClick={handleOnClick}
              >
                {element.type.name}
              </button>
            );
          })}
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
};

export default Pokemon;
