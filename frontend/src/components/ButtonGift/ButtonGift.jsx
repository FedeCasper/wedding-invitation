import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from "../../context/ModalContext";
import './ButtonGift.css'

const ButtonGift = () => {

   const { setModal } = useContext(ModalContext);
   const [ ringMovement, setRingMovement ] = useState(false);
   const [ clicked, setClicked ] = useState(null);

   const handleMovementInterval = () => {
      const intervalFn = setInterval(() => {
         setRingMovement( prevRingMovement => !prevRingMovement );
      }, 8000);
      setClicked( intervalFn );
   };

   const handleClick = () => {
      setModal(true);
      clearInterval( clicked );
      setClicked(null);
   };

   useEffect(() => {
      handleMovementInterval();
   }, []);


   return (
      <button 
         onClick={ handleClick }
         className={`unselectable fixed h-12 w-12 z-50 top-[10px] right-[30px]
            transition-all duration-300 ease-in-out hover:scale-110 active:scale-95
            lg:top-6 lg:right-40
            ${ ringMovement && 'phone' }`
         }
      >
         <section className='relative'>
            <img src="/assets/images/gift-icon.png" alt="Heart icon" className='absolute top-0 left-0 drop-shadow-md' />
            {
               clicked &&
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute -top-1 -left-1 h-full w-full rounded-full bg-mustard opacity-75"></span>
                  <span className="relative -top-1 -left-1 rounded-full h-3 w-3 bg-mustard"></span>
               </span>  
            }
         </section> 
      </button>
   )
}

export default ButtonGift