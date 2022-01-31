import React from "react";
import "./Modal.scss";
import PokemonThumb from "../PokemonThumbnail/PokemonThumbnail";

const Modal = ({ closeModal, allPokemons, specificType }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-closeBtn">
          {" "}
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">Types:</div>
        <div className="body">
          {allPokemons
            .filter(item =>
              item?.data?.types?.[0]?.type?.name.includes(specificType)
            )
            .map(item => (
              <PokemonThumb
                key={item.data.id}
                id={item.data.id}
                image={item.data.sprites.other.dream_world.front_default}
                name={item.data.name}
                type={item.data.types[0].type.name}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
