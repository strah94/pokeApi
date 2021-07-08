import React, { useContext, useState } from "react";
import PokemonContext from "../../context/pokemon/pokemonContext";

const Search = () => {
  const pokemonContext = useContext(PokemonContext);
  const { searchPokemons, pokemons, getPokemons } = pokemonContext;

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      alert("Please Enter Something");
    } else {
      searchPokemons(text);
      setText("");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Pokemons..."
          value={text}
          onChange={onChange}
          className="form-input"
        />
      </form>
      {pokemons.length == 1 && (
        <button className="cancel-btn" onClick={getPokemons}>
          X
        </button>
      )}
    </div>
  );
};

export default Search;
