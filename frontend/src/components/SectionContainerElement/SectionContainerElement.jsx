import React from 'react'

const SectionContainerElement = ( { children, desktopView, mobileView } ) => {
   return (
      <div className={`relative flex flex-col items-center justify-between
         lg:w-[45%] ${desktopView && 'lg:hidden'} ${mobileView && 'hidden lg:flex'}`}>
         { children }
      </div>
   )
}

export default SectionContainerElement