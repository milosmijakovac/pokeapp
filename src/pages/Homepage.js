import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import PokemonThumb from '../components/PokemonThumbnail/PokemonThumbnail'
import SearchPokemon from "../components/SearchPokemon/SearchPokemon";


const Homepage = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [chosenPokemonInput, setChosenPokemonInput] = useState('')
  const [chosenPokemon, setChosenPokemon] = useState([])

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    console.log(data);

    setLoadMore(data.next);

    function createPokemonObj(result) {
      result.forEach(async pokemon => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setAllPokemons(currentList => [...currentList, data]);
        allPokemons.push(data);
      });
    }

    createPokemonObj(data.results);
    console.log(allPokemons);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  const getChosenPokemon = (pokemon) => {
    setChosenPokemonInput(pokemon)
  }

  const searchPokemon = async () => {
    try {
      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${chosenPokemonInput}`)
  const res = await data
       console.log(res)
      
    } catch (error) {
      
    }

  }
 

  return (
    <div className="app-contaner">
      <SearchPokemon getChosenPokemon={getChosenPokemon} searchPokemon={searchPokemon} />
      <div className="pokemon-container">
        <div className="all-container">
          { allPokemons.map((pokemonStats, index) => (
         
              <PokemonThumb
                key={pokemonStats.id}
                id={pokemonStats.id}
                image={pokemonStats.sprites.other.dream_world.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
              />
         
          ))}
        </div>
        <button className="load-more" onClick={searchPokemon}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default Homepage;
