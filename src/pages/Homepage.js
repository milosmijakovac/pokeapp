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
  const [searchPokemonInput, setSearchPokemonInput] = useState("");
  const [chosenPokemon, setChosenPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    searchPokemon();
  }, [searchPokemonInput]);

  // Infinite scroll reaguje na poslednji element na dnu koji je vidljiv
  // tad se Loaduje jos pokemona
  const observer = useRef();
  const lastPokemonElement = useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          getAllPokemons();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

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

  const getChosenPokemon = pokemon => {
    setSearchPokemonInput(pokemon);
  };

  const searchPokemon = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchPokemonInput}`
      );
      const data = await res.json();
      setChosenPokemon(data);
    } catch (error) {
      console.log(error, "No such pokemon");
    }
  };

  // const singlePokemonSearched = () => {
  //   if (chosenPokemon.length !==0) {
       
     
  //       <>
  //         <PokemonThumb
  //           // ref={lastPokemonElement}
  //           key={chosenPokemon.id}
  //           id={chosenPokemon.id}
  //           image={chosenPokemon.sprites.other.dream_world.front_default}
  //           name={chosenPokemon.name}
  //           type={chosenPokemon.types[0].type.name}
  //         />
  //       </>
      
  //   }
  //   setAllPokemons([]);
  // };

  return (
    <div className="app-container">
      <div className="pokemon-container">
        <SearchPokemon getChosenPokemon={getChosenPokemon} />
        <div className="all-container">
          {/* {chosenPokemon && singlePokemonSearched} */}
          {isLoading ? <Spinner /> : null}
          {!isLoading && allPokemons
            ? allPokemons.map((pokemonStats, index) => {
                if (allPokemons.length === index + 1) {
                  return (
                    <PokemonThumb
                      ref={lastPokemonElement}
                      key={pokemonStats.id}
                      id={pokemonStats.id}
                      image={
                        pokemonStats.sprites.other.dream_world.front_default
                      }
                      name={pokemonStats.name}
                      type={pokemonStats.types[0].type.name}
                    />
                  );
                } else {
                  return (
                    <PokemonThumb
                      key={pokemonStats.id}
                      id={pokemonStats.id}
                      image={
                        pokemonStats.sprites.other.dream_world.front_default
                      }
                      name={pokemonStats.name}
                      type={pokemonStats.types[0].type.name}
                    />
                  );
                }
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
