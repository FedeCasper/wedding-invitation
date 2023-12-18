const SectionContainer = ( { children } ) => {
   return (
      <div className='w-full 
         lg:w-10/12 lg:flex lg:justify-between lg:gap-6'>
         { children }
      </div>
   )
}

export default SectionContainer