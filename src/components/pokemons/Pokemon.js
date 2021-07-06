import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PokemonContext from "../../context/pokemon/pokemonContext";
import { Link } from "react-router-dom";

const Pokemon = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState([]);

  const pokemonContext = useContext(PokemonContext);
  const { setCurrentPokemon, currentPokemon } = pokemonContext;

  useEffect(async () => {
    const res = await axios.get(`${url}`);
    const data = await res.data;

    setPokemonData(data);
  }, [name]);

  const handleOnClick = () => {
    console.log("handleOnClink");
    setCurrentPokemon(name, url);
  };

  return (
    <div>
      {pokemonData.sprites ? (
        <div className="pokemon-card">
          <img src={pokemonData.sprites.front_default}></img>
          <Link
            to="/pokemonCurrent"
            className="name-btn"
            onClick={handleOnClick}
          >
            {name}
          </Link>
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
};

export default Pokemon;
