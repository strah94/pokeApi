import React, { useContext } from "react";
import Pokemons from "../pokemons/Pokemons";
import Search from "../pokemons/Search";
import TypeModal from "../pokemons/TypeModal";
import Filter from "../pokemons/Filter";
import Header from "../layout/Header";
import Navbar from "../layout/Navbar";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Navbar />
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
