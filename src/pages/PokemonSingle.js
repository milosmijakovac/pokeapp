import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import placeholderImg from '../assets/images/poke-place.jfif'

const PokemonSingle = ({ id, image, name, type, _callback }) => {
  // console.log({id, image, name, type })

  const [singlePokemon, setSinglePokemon] = useState([]);

  const getSinglePokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    const data = await res.json();

    setSinglePokemon(data);
  };

  useEffect(() => {
    getSinglePokemon();
  }, []);

  const params = useParams();

  const style = type + " thumb-container";
  return (
    <>
      {singlePokemon && (
        <div>
          <div className={style}>
          <div className="detail-wrapper">
              <h3>{singlePokemon.name}</h3>
              <small>Type: {singlePokemon?.types?.[0]?.type?.name}</small>
            </div>
           <div>
             <div className="main-single-image">
                <img
                  src={singlePokemon.sprites?.other?.dream_world?.front_default}
                  alt={singlePokemon.name}
                />
             </div>
             <div>
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
