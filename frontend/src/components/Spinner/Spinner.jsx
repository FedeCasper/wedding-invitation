import './Spinner.css'

const Spinner = () => {
   return (
      <div className="spinner-text h-[200px] w-[200px] absolute top-[15px] -left-[100px] z-50 flex justify-center items-center
      lg:top-10 lg:left-40">
         <img 
            src="/assets/images/rounded-text-mobile.png" 
            alt="Espiral animada" 
            className='lg:hidden' />
         <img 
            src="/assets/images/rounded-text.png" 
            alt="Espiral animada"
            className='hidden lg:flex'/>
      </div>
   )
}

export default Spinner