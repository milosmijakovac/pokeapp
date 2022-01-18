import React from 'react'
import { Link } from 'react-router-dom';

const PokemonThumb = ({id, image, name, type }) => {
  // console.log(id, image, name, type)
    const style = type + " thumb-container";
    return (
      
    // <Link to={`/pokemon/${id}`}>
        <div className={style}>
              <div className="number"><small>#0{id}</small></div>
              <Link to={`/pokemon/${id}`}><img src={image} alt={name} /></Link>
              <div className="detail-wrapper">
                  <h3>{name}</h3>
              <Link to={`/pokemon/${id}`}>
                    <small>Type: {type}</small>
              </Link>
                </div>
          </div>
    //  </Link>
    )
}

export default PokemonThumb