import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'


const ModalWeather = () => {

   const [ localWeather, setLocalWeather ] = useState({})
   const [ futureWeather, setFutureWeather ] = useState({})
   const [ formatDate, setFormatDate ] = useState('')
   const { setWeatherModal } = useContext(ModalContext);

   const handleWeather = () => {
      axios.get(`https://api.weatherapi.com/v1/current.json?q=Mendoza&lang=es&key=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY}`)
         .then((response) => {
            console.log('Response:', response.data);
            setLocalWeather(response.data)
         })
         .catch((error) => {
            console.error('Error:', error);
         })
   }

   const fechaActual = () => {
      const todayDate = new Date();

      const year = todayDate.getFullYear();
      const month = todayDate.getMonth() + 1; // Months start from 0, so 1 is added
      const day = todayDate.getDate();

      const lastDayOfMonth = new Date(year, month, 0).getDate();
      console.log("lastDayOfMonth", lastDayOfMonth);

      // Formatear la fecha como "YYYY-MM-DD"
      if( ( (day + 3) <= lastDayOfMonth) ){
         setFormatDate( `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day + 1 : day + 1}` )
      }else{
         setFormatDate( `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day }` )
      }

      console.log(formatDate);
   }

   const handleFutureWeather = () => {
      axios.get(`https://api.weatherapi.com/v1/forecast.json?q=Mendoza&dt=${formatDate}&lang=es&key=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY}`)
         .then((response) => {
            console.log('Response:', response.data);
            setFutureWeather(response.data)
         })
         .catch((error) => {
            console.error('Error:', error);
         })
   }

   useEffect(() => {
      handleWeather()
      handleFutureWeather()
      fechaActual()
   }, [])

   return (
      <div className="w-11/12 h-[95vh] flex flex-col rounded-md shadow-md
         md:w-8/12 md:h-5/6 md:self-center ">

         <header className="relative flex flex-col items-center justify-start gap-2 h-[20vh] w-full pt-6 rounded-t-md
            bg-[url('/assets/backgrounds/cbu-header-vertical.png')] bg-no-repeat bg-cover bg-bottom 
            lg:h-[30vh]">
            <h2 className="text-xl font-semibold text-center text-white z-50
               lg:text-3xl">
               ¿Y el clima?
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
            <img src="./assets/images/weather-header-pieces-02.png" alt="" className="h-28 absolute bottom-5 right-5 jumping-element lg:h-40 lg:bottom-10 lg:right-32" />
            <img src="./assets/images/weather-header-pieces-03.png" alt="" className="h-32 absolute top-5 left-8 jumping-element-reverse lg:h-40 lg:top-10 lg:left-32" />
         </header>

         <main className='flex flex-col items-center gap-8 grow bg-cream p-6 text-gray-dark text-sm'>

            <article className="flex flex-col gap-2 w-full">
               <section className="flex items-center gap-2 mb-4">
                  <img src={`${localWeather?.current?.condition?.icon}`} alt="" className='h-12' />
                  <h2 className='font-semibold text-base'>Pronóstico: {localWeather?.current?.condition?.text}</h2>
               </section>
               <div className='flex flex-col flex-wrap'>
                  <span className='italic'>Tempreatura actual:</span>
                  <span className='font-semibold text-2xl'> {localWeather?.current?.temp_c}° </span>
               </div>
               <div className='flex flex-col flex-wrap'>
                  <span className='italic'>Sensación térmica: </span>
                  <span className='font-semibold text-2xl'> {localWeather?.current?.feelslike_c}° </span>
               </div>
               <div className='flex flex-col flex-wrap'>
                  <span className='italic'>Humedad:</span>
                  <span className='font-semibold text-2xl'> {localWeather?.current?.humidity}% </span>
               </div>
               <div className='flex flex-col flex-wrap mt-4'>
                  <span className='italic'>Mañana:</span>
                  <span className='font-semibold text-lg'>{futureWeather?.forecast?.forecastday[0]?.day?.condition?.text}.</span>
                  <span className=' font-semibold text-2xl'> 
                     {futureWeather?.forecast?.forecastday[0]?.day?.maxtemp_c}° 
                     <span className='text-base mx-2'>(Máxima)</span>
                     - {futureWeather?.forecast?.forecastday[0]?.day?.mintemp_c}° 
                     <span className='text-base ms-2'>(Mínima)</span>
                  </span>
                  <span className='font-semibold text-2xl'> 
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