import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'


const ModalWeather = () => {

   const [localWeather, setLocalWeather] = useState({})
   const { setWeatherModal } = useContext(ModalContext);

   const handleWeather = () => {
      axios.get(`https://api.weatherapi.com/v1/future.json?q=Mendoza&dt=2024-03-09&lang=es&key=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY}`)
         .then((response) => {
            console.log('Response:', response.data);
            setLocalWeather(response.data)
         })
         .catch((error) => {
            console.error('Error:', error);
         })
   }
   
   useEffect(() => {
      handleWeather()
   }, [])

   return (
      <div className="flex flex-col w-11/12 h-[95vh] rounded-md">

         <header className="relative flex flex-col items-center justify-center gap-2 h-fit w-full pb-16 pt-6 rounded-t-md
            bg-[url('/assets/backgrounds/cbu-header-vertical.png')] bg-no-repeat bg-cover bg-bottom">
            <h2 className="text-xl font-semibold text-center text-white z-50">¿Cómo va a estar<br></br> el clima?</h2>
            <h3 className="text-base font-medium text-center text-gray-dark z-50">Te contamos...</h3>
            <img 
               onClick={ () => setWeatherModal( false ) }
               src="./assets/images/btn-close.png" 
               alt=" Boton cerrar " 
               className="absolute top-4 right-4 h-10 cursor-pointer z-50
                  transition-all delay-50 duration-150 hover:cursor-pointer hover:scale-90 hover:drop-shadow-md hover:rotate-90" 
            />
            <img src="./assets/images/cbu-header-pieces-02.png" alt="" className="h-28 absolute bottom-5 right-5 jumping-element" />
            <img src="./assets/images/cbu-header-pieces-01.png" alt="" className="h-28 absolute top-5 left-2 jumping-element-reverse" />
            <img src="./assets/images/cbu-header-pieces-03.png" alt="" className="h-8 absolute bottom-2 right-25 jumping-element" />
         </header>

         <main className='flex flex-col items-center gap-8 grow bg-cream p-6 text-gray-dark text-sm'>

            <article className="flex flex-col gap-2 w-full">
               <section className="flex items-center gap-2">
                  <img src="./assets/images/green-arrows-icon.png" alt="" className='h-6'/>
                  <h2 className='font-semibold text-base'>Maipú Mendoza (Salón)</h2>
               </section>
               <div className='flex-wrap'>
                  <span className='italic'>Clima :</span>
                  <span className='font-semibold'> { localWeather?.forecast?.forecastday[0]?.day?.condition?.text }</span>
               </div>
               <div className='flex items-center gap-2 flex-wrap'>
                  <span className='italic'>Tempreatura máxima 🥵:</span>
                     <span className='font-semibold'> { localWeather?.forecast?.forecastday[0]?.day?.maxtemp_c }° </span>
               </div>
               <div className='flex-wrap'>
                  <span className='italic'>Tempreatura promedio 🌡: </span>
                  <span className='font-semibold'> { localWeather?.forecast?.forecastday[0]?.day?.avgtemp_c }° </span>
               </div>
               <div className='flex-wrap'>
                  <span className='italic'>Tempreatura mínima 🥶: </span>
                  <span className='font-semibold'> { localWeather?.forecast?.forecastday[0]?.day?.mintemp_c }° </span>
               </div>
               <div className='flex items-center gap-2 flex-wrap'>
                  <span className='italic'>Humedad promedio :</span>
                  <span className='font-semibold'> { localWeather?.forecast?.forecastday[0]?.day?.avghumidity }% </span>
               </div>
            </article>

         </main>

         <footer className='h-[8vh] bg-green flex items-center justify-center rounded-b-md'>
            <img src="./assets/images/cbu-footer.png" alt="" className=" h-3/6" />
         </footer>

      </div>
   )
}
   


export default ModalWeather