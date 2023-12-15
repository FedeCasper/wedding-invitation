import React from 'react'

const SectionContainerElement = ( { children } ) => {
   return (
      <div className="relative flex flex-col items-center justify-between
         lg:w-[45%]">
         { children }
      </div>
   )
}

export default SectionContainerElement