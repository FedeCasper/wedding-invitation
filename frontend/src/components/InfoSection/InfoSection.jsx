import React from 'react'

const InfoSection = ( { header, subtitle, children, lineColorCode, textColorCode } ) => {
   return (
      <section className="flex flex-col items-center tracking-wide text-center z-50">
         <h2 className={ `text-xl font-medium w-64 lg:w-full ${ textColorCode? textColorCode : 'text-white' }` }> { header } </h2> 
         <hr className={ `w-32 mx-auto my-2 border-1 ${ lineColorCode }` } />
         {
            subtitle &&
            <p className={ `text-base ${ textColorCode? textColorCode : 'text-gray-light' } ` }> { subtitle } </p>
         }
         <p className={ `text-base ${ textColorCode? textColorCode : 'text-gray-light' } ` }> { children } </p>
      </section>
   )
}

export default InfoSection