import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ModalContext } from "../../context/ModalContext"
import './ModalConfirm.css';

const initialFormState = {
   fullName: '',
   assist: '',
   partner: '',
   assistChurch: '',
   partnersName: '',
   contact: '',
   message: '',
   drinkPreferences: {
      ['fernet_🥤']: false,
      ['gin_tonic 🍸']: false,
      ['campari_🍹']: false,
      ['vino_🍷']: false,
      ['cerveza_🍺']: false,
      ['no_tomo_alcohol_💧']: false,
      ['otro']: '',
   },
   foodPreferences: {
      ['como_sin_tac_❌🌾']: false,
      ['soy_vegano_❌🥩']: false,
      ['soy_vegetariano_💗🥑']: false,
      ['otro']: false,
   },
};

const ModalConfirm = () => {

   const { setConfirmationModal } = useContext(ModalContext);
   const [formData, setFormData] = useState(initialFormState);

   const handleChange = (event) => {
      console.log([event.target.name], [event.target.value] );
      const { name, type, value, checked } = event.target;
      setFormData( prevData => ({
         ...prevData,
         [name]: type === 'checkbox' ? checked : value,
      }));
   };

   const handleCheckboxChange = ( group, event ) => {
      console.log([group], [event.target.value]);
      const { name, checked } = event.target;
      setFormData((prevData) => ({
         ...prevData,
         [group]: {
            ...prevData[group],
            [name]: name === 'other' ? (checked ? '' : prevData[group].other) : checked,
         },
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form Data:', formData);

      axios
         .post('http://localhost:5000/api/guests', formData)
         .then((response) => {
            console.log('Response:', response.data);
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   };


   return (
      <div className="relative flex flex-col justify-start w-11/12 rounded-md antialiased overflow-y-scroll bg-cream text-gray-dark py-6 shadow-md
         sm:py-12
         lg:w-6/12">

         <img 
            onClick={ () => setConfirmationModal( false ) }
            src="./assets/images/btn-close.png" 
            alt=" Boton cerrar " 
            className="absolute top-5 right-5 h-10 cursor-pointer shadow-md z-50
               transition-all delay-50 duration-150 hover:cursor-pointer hover:scale-90 hover:drop-shadow-md hover:rotate-90" />

         <div className="relative py-3 w-10/12 mx-auto text-center">

            <section className="flex flex-col">
               <span className="text-2xl font-medium mb-4">¿Hay equipo?</span>
               <span className="text-base font-light ">Esperamos que puedas acompañarnos en este momento tan especial</span>
            </section>

            <form className="mt-4 flex flex-col gap-4 text-left">

               {/* Full name section ---------------------- */}
               <section className="modal-confirm-section">
                  <div className="h-2 bg-mustard rounded-t-md"></div>
                  <div className="flex flex-col px-8 py-6">
                     <h2 className="font-semibold mb-4">Nombre y Apellido <span className='text-red-500 font-medium'>*</span></h2>
                     <label className="block font-semibold">
                        <input
                           required
                           type="text"
                           name="fullName"
                           placeholder="Ingresá tu nombre y apellido"
                           value={formData.fullName} 
                           onChange={handleChange}
                           className="border w-full px-3 py-2 mt-2 hover:outline-none focus:outline-none focus:ring-[#5D7551] focus:ring-1 rounded-md placeholder:italic placeholder:font-light"
                        />
                     </label>
                  </div>
               </section>

               {/* Assists section ---------------------- */}
               <section className="modal-confirm-section">
                  <div className="h-2 bg-mustard rounded-t-md"></div>
                  <div className="flex flex-col px-8 py-6">
                     <h2 className="font-semibold mb-4">¿Venís a nuestro casamiento? <span className='text-red-500 font-medium'>*</span></h2>
                     <label className="flex items-center gap-2 mt-3">
                        <input
                           required
                           type="radio"
                           name="assist"
                           value={true}
                           onChange={handleChange}
                           className="cursor-pointer appearance-none border-2 border-mustard bg-cream w-4 h-4 rounded-full checked:bg-mustard hover:bg-mustard active:scale-90"
                        />YENDO 🚀
                     </label>
                     <label className="flex items-center gap-2 mt-3">
                        <input
                           type="radio"
                           name="assist"
                           value={false}
                           onChange={handleChange}
                           className="cursor-pointer appearance-none border-2 border-mustard bg-cream w-4 h-4 rounded-full checked:bg-mustard hover:bg-mustard active:scale-90"
                        />NO VOY A PODER ASISTIR 😔
                     </label>
                  </div>
               </section>

               {/* Drinks section ---------------------- */}
               <section className="modal-confirm-section">
                  <div className="h-2 bg-mustard rounded-t-md"></div>
                  <div className="flex flex-col px-8 py-6">
                     <h2 className="font-semibold mb-4">BEBIDAS</h2>
                     <h3 className="font-medium mb-4">Tendremos una barra pequeña y por eso queremos saber qué preferís tomar (no vaya a ser que te deshidrates)</h3>

                     {Object.entries(formData.drinkPreferences).map(([key, value]) => (
                        <label key={key} className="flex items-center gap-2 mt-3">
                           <input
                              type={ key === 'otro' ? 'text' : 'checkbox' }
                              name={ key }
                              checked={ key === 'otro' ? false : formData.drinkPreferences[key] }
                              value={ key === 'otro' ? value : key }
                              onChange={ key === 'otro' ? handleChange : () => handleCheckboxChange('drinkPreferences', event) }
                              placeholder={ key === 'otro' ? 'Ingresá tu bebida favorita' : '' }
                              className={ key === "otro" ? 
                                 "w-full cursor-pointer border-2 border-darkgray rounded-md px-3 py-2 hover:outline-none focus:outline-none focus:ring-[#5D7551] focus:ring-1 placeholder:italic placeholder:font-light " : 
                                 "cursor-pointer appearance-none border-2 border-mustard bg-cream w-4 h-4 rounded-full checked:bg-mustard hover:bg-mustard active:scale-90"
                              }
                           />
                           { key === 'otro' ? '' : key.toUpperCase().replace(/_/g, ' ')} {key === 'otro' && value }
                        </label>
                     ))}

                  </div>
               </section>

               {/* Food section ---------------------- */}
               <section className="modal-confirm-section">
                  <div className="h-2 bg-mustard rounded-t-md"></div>
                  <div className="flex flex-col px-8 py-6">
                     <h2 className="font-semibold mb-4">COMIDAS</h2>
                     <h3 className="font-medium mb-4">Seleccioná si tenés alguna restricción alimentaria. Haremos lo posible para sumar al menú alguna opción apta para vos.</h3>

                     {Object.entries(formData.foodPreferences).map(([key, value]) => (
                        <label key={key} className="flex items-center gap-2 mt-3">
                           <input
                              type={'checkbox'}
                              name={key}
                              checked={ formData.foodPreferences[key] }
                              value={key}
                              onChange={ () => handleCheckboxChange('foodPreferences', event) }
                              className='cursor-pointer appearance-none border-2 border-mustard bg-cream w-4 h-4 rounded-full checked:bg-mustard hover:bg-mustard active:scale-90'
                           />
                           { key.toUpperCase().replace(/_/g, ' ')} {value}
                        </label>
                     ))}

                  </div>
               </section>

               {/* Partners section ---------------------- */}
               <section className="modal-confirm-section">
                  <div className="h-2 bg-mustard rounded-t-md"></div>
                  <div className="flex flex-col px-8 py-6">
                     <h2 className="font-semibold mb-4">ACOMPAÑANTES <span className='text-red-500 font-medium'>*</span></h2>
                     <label className="flex items-center gap-2 mt-3">
                        <input
                           type="radio"
                           name='partner'
                           value={false}
                           onChange={handleChange}
                           className="cursor-pointer appearance-none border-2 border-mustard bg-cream w-4 h-4 rounded-full checked:bg-mustard hover:bg-mustard active:scale-90"
                        />VOY SOLO 😏
                     </label>
                     <label className="flex items-center gap-2 mt-3">
                        <input
                           type="radio"
                           name='partner'
                           value={true}
                           onChange={handleCheckboxChange}
                           className="cursor-pointer appearance-none border-2 border-mustard bg-cream w-4 h-4 rounded-full checked:bg-mustard hover:bg-mustard active:scale-90"
                        />VOY CON ALGUIEN 😉
                     </label>
                  </div>
               </section>

               {/* Partner's name section ---------------------- */}
               <section className="modal-confirm-section">
                  <div className="h-2 bg-mustard rounded-t-md"></div>
                  <div className="flex flex-col px-8 py-6">
                     <h2 className="font-semibold mb-4">¿CON QUIÉN VENÍS? <span className='text-red-500 font-medium'>*</span></h2>
                     <h3 className="font-medium mb-4">Necesitamos saber el Nombre y Apellido de esa persona para poder agregarla a la lista.</h3>
                     <label className="block font-semibold">
                        <input
                           type="text"
                           name="partnersName"
                           placeholder="Ingresá el nombre de tu acompañante"
                           value={formData.partnersName}
                           onChange={handleChange}
                           className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-[#5D7551] focus:ring-1 rounded-md placeholder:italic placeholder:font-light"
                        />
                     </label>
                  </div>
               </section>

               {/* Church assists section ---------------------- */}
               <section className="modal-confirm-section">
                  <div className="h-2 bg-mustard rounded-t-md"></div>
                  <div className="flex flex-col px-8 py-6">
                     <h2 className="font-semibold mb-4">¿Asistirás a la iglesia o directo al salón? <span className='text-red-500 font-medium'>*</span></h2>
                     <label className="flex items-center mt-3 gap-2">
                        <input
                           type="radio"
                           name='assistChurch'
                           value={true}
                           onChange={handleChange}
                           className="cursor-pointer appearance-none border-2 border-mustard bg-cream w-4 h-4 rounded-full checked:bg-mustard hover:bg-mustard active:scale-90"
                        />Sí, 17h estoy en la iglesia 💒
                     </label>
                     <label className="flex items-center mt-3 gap-2">
                        <input
                           type="radio"
                           name='assistChurch'
                           value={false}
                           onChange={handleChange}
                           className="cursor-pointer appearance-none border-2 border-mustard bg-cream w-4 h-4 rounded-full checked:bg-mustard hover:bg-mustard active:scale-90ss"
                        />No, directo al salón a las 19h 🙌🏼
                     </label>
                  </div>
               </section>

               {/* Contact section ---------------------- */}
               <section className="modal-confirm-section">
                  <div className="h-2 bg-mustard rounded-t-md"></div>
                  <div className="flex flex-col px-8 py-6">
                     <h2 className="font-semibold mb-4">CONTACTO <span className='text-red-500 font-medium'>*</span></h2>
                     <h3 className="font-medium mb-4">Dejanos un número de Whatsapp o mail donde podamos encontrarte si necesitamos consultarte o informarte algo del evento.</h3>
                     <label className="block font-semibold">
                        <input
                           type="text"
                           name="contact"
                           placeholder="Dejanos un número de celular o mail"
                           value={formData.contact}
                           onChange={handleChange}
                           className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-[#5D7551] focus:ring-1 rounded-md placeholder:font-light placeholder:italic"
                        />
                     </label>
                  </div>
               </section>

               {/* Message section ---------------------- */}
               <section className="modal-confirm-section">
                  <div className="h-2 bg-mustard rounded-t-md"></div>
                  <div className="flex flex-col px-8 py-6">
                     <h2 className="font-semibold mb-4">MENSAJE PARA LOS NOVIOS <span className='text-red-500 font-medium'>*</span></h2>
                     <h3 className="font-medium mb-4">Si necesitas hacernos alguna consulta o querés dejarnos algún mensaje este es el lugar.</h3>
                     <label className="block font-semibold">
                        <input
                           type="text"
                           name="message"
                           placeholder="Te leemos"
                           value={formData.message}
                           onChange={handleChange}
                           className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-[#5D7551] focus:ring-1 rounded-md placeholder:font-light placeholder:italic"
                        />
                     </label>
                  </div>
               </section>

               <div className="flex justify-between items-baseline">
                  <button
                     onClick={handleSubmit}
                     type="submit"
                     className="mt-4 bg-mustard text-white py-2 px-6 rounded-md hover:bg-purple-600 ">
                     Enviar
                  </button>
               </div>


            </form>
         </div>
      </div>
   )
}

export default ModalConfirm