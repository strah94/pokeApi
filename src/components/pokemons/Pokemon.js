import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PokemonContext from "../../context/pokemon/pokemonContext";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";
import { getAsyncData, setModalLocation } from "../../helpers/functions";
import { colors } from "../../constants/constants";

const Pokemon = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState([]);

  const pokemonContext = useContext(PokemonContext);
  const { setCurrentPokemon, setCurrentType, setModalCoordinates, loading } =
    pokemonContext;

  useEffect(async () => {
    const data = await getAsyncData(url);
    setPokemonData(data);
  }, [name]);

  const handleOnClick = (e) => {
    e.target.name === "link"
      ? setCurrentPokemon(name, url)
      : setCurrentType(e.target.value);

    e.target.name !== "link" && setModalCoordinates(e.pageX, e.pageY);
    e.target.name !== "link" && setModalLocation(e.pageX, e.pageY);
  };

  return (
    <div>
      {pokemonData.sprites && !loading ? (
        <div className="pokemon-card">
          <img src={pokemonData.sprites.front_default}></img>
          <p>{`#${pokemonData.id.toString().padStart(3, "0")}`}</p>
          <Link
            name="link"
            to="/pokemonCurrent"
            className="name-btn"
            onClick={handleOnClick}
          >
            {name}
          </Link>
          <div className="pokemon-type">
            {pokemonData.types.map((element) => {
              return (
                <button
                  name="type"
                  value={element.type.name}
                  onClick={handleOnClick}
                  key={element.type.name}
                  style={{
                    backgroundColor: `${colors[`${element.type.name}`]}`,
                  }}
                >
                  {element.type.name}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Pokemon;
