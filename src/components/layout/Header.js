import React from "react";
import pokeHeader from "../../assets/images/poke-title.gif";
import pokeBall from "../../assets/images/poke-ball.png";

const Header = () => {
  return (
    <div className="header-container">
      <img className="header-title" src={pokeHeader}></img>
      <img className="header-poke-ball" src={pokeBall}></img>
    </div>
  );
};

export default Header;
