import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from "../../context/ModalContext";
import './ButtonGift.css'

const ButtonGift = () => {

   const { modal, setModal } = useContext(ModalContext);
   const [ ringMovement, setRingMovement ] = useState(false);

   const handleClick = () => {
      console.log('¡Se hizo clic en el botón!');
      setModal(true);
   };

   const handleMovementInterval = () => {
      setTimeout(() => {
         setRingMovement(!ringMovement);
         // console.log('ringMovement', ringMovement);
      }, 4000);
   };

   useEffect(() => {
      handleMovementInterval();
   }, [ringMovement]);


   return (
      <button 
         onClick={ handleClick }
         className={` fixed h-12 w-12 z-50 top-[10px] right-[30px]
         transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 ${ringMovement ? 'phone' : ''}`}>
            {
               modal ?
                  <img src="/assets/images/gift-icon.png" alt="Gift icon" /> :
                  <section className='relative'>
                     <img src="/assets/images/heart-icon.png" alt="Heart icon" className='absolute top-0 left-0 drop-shadow-md' />
                     <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 -top-1 -left-1"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-700 -top-1 -left-1"></span>
                     </span>  
                  </section> 
            }
      </button>
   )
}

export default ButtonGift