import React, { useContext } from 'react'
import { ModalContext } from "../../context/ModalContext";

const ButtonGift = () => {

   const { modal, setModal } = useContext(ModalContext);

   console.log(modal);

   const handleClick = () => {
      console.log('¡Se hizo clic en el botón!');
      setModal(true);
   };

   return (
      <button 
         onClick={handleClick}
         className=" fixed h-12 w-12 z-50 top-[10px] right-[30px]
         transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
            {
               modal ?
                  <img src="/assets/images/gift-icon.png" alt="Gift icon"  /> :
                  <section className='relative'>
                     <img src="/assets/images/heart-icon.png" alt="Heart icon" className='absolute top-0 left-0' />
                     <span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75 -top-1 -left-1"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-400 -top-1 -left-1"></span>
                     </span>  
                  </section> 
            }
      </button>
   )
}

export default ButtonGift