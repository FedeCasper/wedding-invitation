import React from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedElement = ({ children }) => {
   const [ref, inView] = useInView({
      triggerOnce: true, // Se activa solo una vez
      threshold: 0.5, // Se activa cuando el 50% del elemento es visible
   });

   return (
      <div
         ref={ref}
         className={`${
         inView ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
         } transition-all duration-500`}
      >
         {children}
      </div>
   );
};

export default AnimatedElement;
