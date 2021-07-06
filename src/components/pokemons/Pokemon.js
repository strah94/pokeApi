import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokemon = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`${url}`);
    const data = await res.data;

    setPokemonData(data);
  }, [name]);

  return (
    <div>
      {pokemonData.sprites ? (
        <div className="pokemon-card">
          <img src={pokemonData.sprites.front_default}></img>
          <button>{name}</button>
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
};

export default Pokemon;
