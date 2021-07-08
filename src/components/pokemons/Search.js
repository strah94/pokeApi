import React, { useContext, useState } from "react";
import PokemonContext from "../../context/pokemon/pokemonContext";

const Search = () => {
  const pokemonContext = useContext(PokemonContext);
  const { searchPokemons, pokemons, getPokemons, noResults } = pokemonContext;

  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      alert("Please Enter Something");
    } else {
      setDisabled(true);
      searchPokemons(text);
    }
  };

  const handleOnClick = (e) => {
    setText("");
    setDisabled(false);
    getPokemons();
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
          disabled={disabled}
        />
      </form>

      {pokemons.length == 1 && (
        <button className="cancel-btn" onClick={handleOnClick}>
          X
        </button>
      )}
      {noResults && (
        <button className="cancel-btn" onClick={handleOnClick}>
          X
        </button>
      )}
    </div>
  );
};

export default Search;
