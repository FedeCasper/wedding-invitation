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
      <div className="w-11/12 h-[95vh] flex flex-col rounded-md shadow-md
         md:w-8/12 md:h-5/6 md:self-center ">

         <header className="relative flex flex-col items-center justify-start gap-2 h-[20vh] w-full pt-6 rounded-t-md
            bg-[url('/assets/backgrounds/cbu-header-vertical.png')] bg-no-repeat bg-cover bg-bottom 
            lg:h-[30vh]">
            <h2 className="text-xl font-semibold text-center text-white z-50
               lg:text-3xl">
               ¿Cómo va e estar el clima?
            </h2>
            <h3 className="text-base font-medium text-center text-gray-dark z-50
               lg:text-xl">
               Te contamos:
            </h3>
            <img
               onClick={() => setWeatherModal(false)}
               src="./assets/images/btn-close.png"
               alt=" Boton cerrar "
               className="absolute top-4 right-4 h-10 cursor-pointer rounded-md z-50
                  transition-all delay-50 duration-150 hover:cursor-pointer hover:scale-90 hover:drop-shadow-md hover:rotate-90"
            />
            <img src="./assets/images/weather-header-pieces-03.png" alt="" className="h-28 absolute bottom-5 right-5 jumping-element lg:h-40 lg:bottom-10 lg:right-32" />
            <img src="./assets/images/weather-header-pieces-02.png" alt="" className="h-28 absolute top-5 left-2 jumping-element-reverse lg:h-40 lg:top-10 lg:left-32" />
         </header>

         <main className='flex flex-col items-center gap-8 grow bg-cream p-6 text-gray-dark text-sm'>

            <article className="flex flex-col gap-2 w-full">
               <section className="flex items-center gap-2 mb-4">
                  <img src="./assets/images/green-arrows-icon.png" alt="" className='h-6' />
                  <h2 className='font-semibold text-base'>Pronóstico: {localWeather?.forecast?.forecastday[0]?.day?.condition?.text}</h2>
               </section>
               <div className='flex flex-col flex-wrap'>
                  <span className='italic'>Tempreatura máxima 🥵:</span>
                  <span className='font-semibold text-2xl'> {localWeather?.forecast?.forecastday[0]?.day?.maxtemp_c}° </span>
               </div>
               <div className='flex flex-col flex-wrap'>
                  <span className='italic'>Tempreatura promedio 🌡: </span>
                  <span className='font-semibold text-2xl'> {localWeather?.forecast?.forecastday[0]?.day?.avgtemp_c}° </span>
               </div>
               <div className='flex flex-col flex-wrap'>
                  <span className='italic'>Tempreatura mínima 🥶: </span>
                  <span className='font-semibold text-2xl'> {localWeather?.forecast?.forecastday[0]?.day?.mintemp_c}° </span>
               </div>
               <div className='flex flex-col flex-wrap'>
                  <span className='italic'>Humedad promedio 💧:</span>
                  <span className='font-semibold text-2xl'> {localWeather?.forecast?.forecastday[0]?.day?.avghumidity}% </span>
               </div>
               <div className='flex flex-col flex-wrap'>
                  <span className='italic'>A la hora de la iglesia 💒:</span>
                  <span className='font-semibold text-2xl'> {localWeather?.forecast?.forecastday[0]?.hour[17]?.temp_c}° 
                     <span className='text-base ms-2'>({localWeather?.forecast?.forecastday[0]?.hour[17]?.condition?.text})</span>
                  </span>
               </div>
               <div className='flex flex-col flex-wrap'>
                  <span className='italic'>A la hora del salón 🎶:</span>
                  <span className='font-semibold text-2xl'> {localWeather?.forecast?.forecastday[0]?.hour[17]?.temp_c}° 
                     <span className='text-base ms-2'>({localWeather?.forecast?.forecastday[0]?.hour[19]?.condition?.text})</span>
                  </span>
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