import React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal/Modal";
  




import placeholderImg from '../assets/images/poke-place.jfif'

const PokemonSingle = ({ id, image, name, type }) => {
 

  
  const location = useLocation();
  const { specificType } = location.state;

  
  const [allPokemons, setAllPokemons] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  let pokemons_limit = 30

  
  const getAllPokemonTypes = async (id) => {
    // setIsLoading(true);
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setAllPokemons(pokemonType => [...pokemonType, res])
  };
  
  
  const fetchPokemons = async () => {
    for(let i = 1; i <= pokemons_limit; i++) {
      await getAllPokemonTypes(i)
    }
  };

  const getSinglePokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    const data = await res.json();

    setSinglePokemon(data);
  };

  useEffect(() => {
    getSinglePokemon();
  }, []);

  useEffect(() => {
    fetchPokemons()
  },[])

 
 
  

  const params = useParams();

  const style = type + " thumb-container";
  return (
    <>
      {singlePokemon && (
        <div className="single-pokemon-container">
          {openModal && <Modal closeModal={setOpenModal} allPokemons={allPokemons} specificType={specificType} id={id} image={image} name={name} />}
          <div className={style}>
          <div className="detail-wrapper">
              <h3>{singlePokemon.name}</h3>
              <p className="pokemon-type" onClick={() => {setOpenModal(true)}}>Type: {singlePokemon?.types?.[0]?.type?.name}</p>
            </div>
           <div className="detail-body-wrapper">
             <div className="main-single-image">
                <img
                  src={singlePokemon.sprites?.other?.dream_world?.front_default}
                  alt={singlePokemon.name}
                />
             </div>
             <div className="gallery-pokemon-images">
             <img
                  src={singlePokemon.sprites?.other?.home?.front_default || placeholderImg}
                  alt={singlePokemon.name}
                />
                 <img
                  src={singlePokemon.sprites?.other?.home?.front_female || placeholderImg}
                  alt={singlePokemon.name}
                />
                 <img
                  src={singlePokemon.sprites?.other?.home?.front_shiny || placeholderImg}
                  alt={singlePokemon.name}
                />
                 <img
                  src={singlePokemon.sprites?.other?.dream_world?.front_shiny_female || placeholderImg}
                  alt={singlePokemon.name}
                />
             </div>
           </div>
           
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonSingle;
