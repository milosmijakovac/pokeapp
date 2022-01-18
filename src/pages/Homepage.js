import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import PokemonThumb from "../components/PokemonThumbnail/PokemonThumbnail";
import SearchPokemon from "../components/SearchPokemon/SearchPokemon";
import Spinner from "../components/Spinner/Spinner";

const Homepage = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [chosenPokemonInput, setChosenPokemonInput] = useState("");
  const [chosenPokemon, setChosenPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  // Infinite scroll reaguje na poslednji element na dnu koji je vidljiv
  // tad se Loaduje jos pokemona
  const observer = useRef();
  const lastPokemonElement = useCallback(node => {
    if(isLoading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        getAllPokemons()
      }
    })
    if(node) observer.current.observe(node)
  }, [isLoading]);

  const getAllPokemons = async () => {
    setIsLoading(true);
    const res = await fetch(loadMore);
    const data = await res.json();


    setLoadMore(data.next);
    setIsLoading(false);

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
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  const getChosenPokemon = pokemon => {
    setChosenPokemonInput(pokemon);
  };

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${chosenPokemonInput}`)
      .then(res => setChosenPokemon(res));
  };

  return (
    <div className="app-contaner">
      <SearchPokemon getChosenPokemon={getChosenPokemon} />
      <div className="pokemon-container">
        <div className="all-container">
          {isLoading && <Spinner />}
          {!isLoading && allPokemons ? (
            allPokemons.map((pokemonStats, index) => {
              if (allPokemons.length === index + 1) {
                return (
                  <PokemonThumb
                    ref={lastPokemonElement}
                    key={pokemonStats.id}
                    id={pokemonStats.id}
                    image={pokemonStats.sprites.other.dream_world.front_default}
                    name={pokemonStats.name}
                    type={pokemonStats.types[0].type.name}
                  />
                );
              } else {
                return (
                  <PokemonThumb
                    key={pokemonStats.id}
                    id={pokemonStats.id}
                    image={pokemonStats.sprites.other.dream_world.front_default}
                    name={pokemonStats.name}
                    type={pokemonStats.types[0].type.name}
                  />
                );
              }
            })
          ) : (
            <h1>Choose your Pokemon</h1>
          )}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default Homepage;
