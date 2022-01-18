import React from 'react'
import {useState} from 'react'


const SearchPokemon = ({getChosenPokemon}) => {
  const [pokemonName, setPokemonName] = useState('')




  return (
    <div className="search-bar">
      <h1>Choose Your Pokemon</h1>
      <input type="text" onChange={e => setPokemonName(e.target.value.toLowerCase())} />
      <button onClick={() => {
        getChosenPokemon(pokemonName);
        
        }}>Search</button>
    </div>
  )
}

export default SearchPokemon
