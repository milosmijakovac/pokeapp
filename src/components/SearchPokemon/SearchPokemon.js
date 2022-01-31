import React from "react";
import { useState } from "react";

const SearchPokemon = ({ getChosenPokemon,  allPokemonButton}) => {
  const [pokemonName, setPokemonName] = useState("");

  

  return (
    <div className="search-bar">
      <h1>Choose Your Pokemon</h1>
      <input
        type="text"
        onChange={e => setPokemonName(e.target.value.toLowerCase())}
      />
      <button className="search-btn"
        onClick={() => {
          getChosenPokemon(pokemonName);
        }}
      >
        Search
      </button>
      <div>
        <button className="all-poke-btn" onClick={() => {allPokemonButton(""); setPokemonName("")}}>All Stars</button>
      </div>
    </div>
  );
};

export default SearchPokemon;
