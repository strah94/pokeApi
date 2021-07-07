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
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Pokemons..."
          value={text}
          onChange={onChange}
        />
      </form>
      {pokemons.length == 1 && (
        <button className="cancel-btn" onClick={getPokemons}>
          Clear Search
        </button>
      )}
    </div>
  );
};

export default Search;
