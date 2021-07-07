import React, { useContext } from "react";
import Pokemons from "../pokemons/Pokemons";
import PokemonContext from "../../context/pokemon/pokemonContext";
import Search from "../pokemons/Search";
import TypeModal from "../pokemons/TypeModal";
import Filter from "../pokemons/Filter";

const Home = () => {
  const pokemonContext = useContext(PokemonContext);
  const { currentPokemon, setCurrentURL, showAll } = pokemonContext;

  const handleOnClick = (e) => {
    // console.log(e.target.name);
    setCurrentURL(e.target.name);
  };

  const handleShowAll = (e) => {
    showAll();
  };

  return (
    <div className="home">
      <div>
        <button onClick={handleOnClick} name="previous">
          PREVIOUS
        </button>
        <button onClick={handleOnClick} name="next">
          NEXT
        </button>
        <button onClick={handleShowAll}>SHOW ALL</button>
      </div>
      <Search />
      <Filter />
      <div className="pokemon-container">
        <Pokemons />
      </div>
      <TypeModal />
    </div>
  );
};

export default Home;
