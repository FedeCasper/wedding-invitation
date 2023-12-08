import React, { useContext } from 'react'
import { ModalContext } from "../../context/ModalContext";

const ButtonGift = () => {

   const { modal, setModal } = useContext(ModalContext);

   const handleClick = () => {
      console.log('¡Se hizo clic en el botón!');
      setModal(true)
   };

   return (
      <button 
         onClick={handleClick}
         className="flex self-end absolute h-12 w-12 z-50
         transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
            {
               modal ? (
                  <img src="/assets/images/gift-icon.png" alt="Gift icon"  />
               ) : (
                  <img src="/assets/images/heart-icon.png" alt="Heart icon"  />
               )
            }
      </button>
   )
}

export default ButtonGift