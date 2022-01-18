import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom';

const PokemonThumb = forwardRef((props, ref) => {
      // console.log(id, image, name, type)
    //   {id, image, name, type, ref }
        const style = props.type + " thumb-container";
        return (
          
        // <Link to={`/pokemon/${id}`}>
            <div className={style} ref={ref}>
                  <div className="number"><small>#0{props.id}</small></div>
                  <Link to={`/pokemon/${props.id}`}><img src={props.image} alt={props.name} /></Link>
                  <div className="detail-wrapper">
                      <h3>{props.name}</h3>
                  <Link to={`/pokemon/${props.id}`}>
                        <small>Type: {props.type}</small>
                  </Link>
                    </div>
              </div>
        //  </Link>
        )
    }) 

export default PokemonThumb