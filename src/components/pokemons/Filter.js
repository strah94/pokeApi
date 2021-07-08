import React, { useEffect, useContext, useState } from "react";
import PokemonContext from "../../context/pokemon/pokemonContext";

const Filter = () => {
  const pokemonContext = useContext(PokemonContext);
  const { setTypes, types, filterPokemons, filtered, removeFilter } =
    pokemonContext;

  useEffect(() => {
    setTypes();
  }, []);

  const handleOnChange = (e) => {
    removeFilter();
    filterPokemons(e.target.value);
  };

  const handleOnClick = (e) => {
    removeFilter();
  };

  return (
    <div>
      <select disabled={filtered.length !== 0} onChange={handleOnChange}>
        {types.map((type, index) => {
          return (
            <option value={type.name} key={index}>
              {type.name}
            </option>
          );
        })}
      </select>
      {filtered.length !== 0 && (
        <button className="cancel-btn" onClick={handleOnClick}>
          REMOVE FILTER
        </button>
      )}
    </div>
  );
};

export default Filter;