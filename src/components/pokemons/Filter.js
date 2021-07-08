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
    <div className="filter-container">
      <div style={{ display: "flex" }}>
        <select
          disabled={filtered.length !== 0}
          onChange={handleOnChange}
          className="filter-select"
        >
          <option value="" disabled selected hidden>
            Filter by type
          </option>
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
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default Filter;
