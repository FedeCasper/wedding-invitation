import React from 'react'

const SectionContainerElement = ( { children, desktopView } ) => {
   return (
      <div className={`relative flex flex-col items-center justify-between
         lg:w-[45%] ${desktopView && 'lg:hidden'} `}>
         { children }
      </div>
   )
}

export default SectionContainerElement