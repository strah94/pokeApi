import React, { useContext } from "react";
import PokemonContext from "../../context/pokemon/pokemonContext";

const Navbar = () => {
  const pokemonContext = useContext(PokemonContext);
  const { setCurrentURL, showAll } = pokemonContext;

  const handleOnClick = (e) => {
    setCurrentURL(e.target.name);
  };

  const handleShowAll = (e) => {
    showAll();
  };

  return (
    <div className="navbar">
      <button
        className="btn-decoration type-1-btn"
        onClick={handleOnClick}
        name="previous"
      >
        PREVIOUS
      </button>
      <button className="btn-decoration type-2-btn" onClick={handleShowAll}>
        SHOW ALL
      </button>
      <button
        className="btn-decoration type-1-btn"
        onClick={handleOnClick}
        name="next"
      >
        NEXT
      </button>
    </div>
  );
};
export default Navbar;
