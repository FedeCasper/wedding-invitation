import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ModalContext } from "../../context/ModalContext"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './ModalConfirm.css';
import Swal from 'sweetalert2'

const initialFormState = {
   fullName: '',
   assist: '',
   partner: false,
   partnersName: '',
   childrens: false,
   childrensQuantity: 0,
   assistChurch: false,
   contact: '',
   message: '',
   drinkPreferences: {
      ['fernet_🥤']: false,
      ['gin_tonic_🍸']: false,
      ['campari_🍹']: false,
      ['vino_🍷']: false,
      ['cerveza_🍺']: false,
      ['no_tomo_alcohol_💧']: false,
      ['otro_🥂']: '',
   },
   foodPreferences: {
      ['como_sin_tac_❌🌾']: false,
      ['soy_vegano_❌🥩']: false,
      ['soy_vegetariano_💗🥑']: false,
      ['otro_🍟🥩']: false,
   },
};

const ModalConfirm = () => {

   const { setConfirmationModal } = useContext(ModalContext);
   const [ formData, setFormData ] = useState(initialFormState);
   const [ arrowBehavior, setArrowBehavior ] = useState(false);
   const [ optionalInput, setOptionalInput ] = useState(true);

   const handleChange = (event) => {
      const { name, type, value, checked } = event.target;
      if(type === "radio"){
         value === "false" ? setOptionalInput(true) : setOptionalInput(false);
      }
      setFormData( prevData => ({
         ...prevData,
         [name]: type === 'checkbox' ? checked : value,
      }));
   };

 
   const handleCheckboxChange = (group, event) => {
      const { name, checked } = event.target;
      setFormData( (prevData) => ({
         ...prevData,
         [group]: {
            ...prevData[group],
            [name]: name === 'other' ? 
               (checked ? '' : prevData[group].other) :
               checked,
         },
      }));
   };

   const handleArrowBehavior = (e) => {
         setArrowBehavior({
            name: e.target.name,
            checked: e.target.checked
         })
   }

   console.log(formData);

   const handleSubmit = (e) => {
      e.preventDefault();

      axios
         .post('https://wedding-invitation-backend.vercel.app/api/guests', formData)
         .then((response) => {
            console.log('Response:', response.data);
            if( formData.assist != "false"){
               setTimeout(() => {
                  Swal.fire("¡Es un si! 💜", "Te esperamos para compartir y darlo todo con nosotros.");
               }, 1000);
            } else {
               setTimeout(() => {
                  Swal.fire("¡Te vamos a extrañar!", "pero creemos que la energía lo atraviesa todo así que igualmente ahí estarás con nosotros ✨");
               }, 1000);
            }
         })
         .catch((error) => {
            console.error('Error:', error);
            setTimeout(() => {
               Swal.fire("¡Ups", "Algo salió mal");
            }, 1000);
         });

   };

   return (
      <div className="relative flex flex-col justify-start w-[375px] rounded-md antialiased overflow-y-scroll bg-cream text-gray-dark py-6 shadow-md
         sm:py-12
         md:w-[640px]
         lg:w-[720px]">

         <img
            onClick={ () => setConfirmationModal(false) }
            src="./assets/images/btn-close.png"
            alt=" Boton cerrar "
            className="absolute top-5 right-5 h-10 cursor-pointer shadow-md rounded-md z-50
               transition-all delay-50 duration-150 hover:cursor-pointer hover:scale-90 hover:drop-shadow-md hover:rotate-90" />

         <div className="relative py-3 w-10/12 mx-auto text-center">

            <section className="flex flex-col">
               <span className="text-2xl font-medium mb-4">¿Hay equipo?</span>
               <span className="text-base font-light ">Esperamos que puedas acompañarnos en este momento tan especial</span>
               <span className="text-sm font-light italic mt-2">( Los campos con <span className='text-red'>*</span> son obligatorios )</span>
            </section>

            <form onClick={ handleArrowBehavior } className="mt-4 flex flex-col gap-4 text-left">

               {/* Full name section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='fullname' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                     <div className="section-header">
                        <h3>
                           Nombre y Apellido
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'fullname') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <div className="section-label-text">
                        <label>
                           <input
                              required
                              type="text"
                              name="fullName"
                              placeholder="Ingresá tu nombre y apellido"
                              value={ formData.fullName }
                              onChange={ handleChange }
                              className="section-input-text"
                           />
                        </label>
                     </div>
                  </span>
               </label>

               {/* Assists section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='assist' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                  <div className="section-header">
                     <h3>
                        Confirmación
                        <span className='section-required'>*</span>
                     </h3>
                     <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'assist') && 'rotate-180' }` } fontSize='medium' /> 
                  </div>
                     <div className="flex flex-col pb-6">
                        <label className="section-label-radio">
                           <input
                              required
                              type="radio"
                              name="assist"
                              value={true}
                              onChange={handleChange}
                              className="section-input-radio"
                           />YENDO 🚀
                        </label>
                        <label className="section-label-radio">
                           <input
                              type="radio"
                              name="assist"
                              value={false}
                              onChange={handleChange}
                              className="section-input-radio"
                           />NO VOY A PODER ASISTIR 😔
                        </label>
                     </div>
                  </span>
               </label>
               
               {/* Partners section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='partners_name' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-72">
                     <div className="section-header">
                        <h3>
                           Acompañante/s
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'partners_name') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="font-medium mb-4">Si venís con acompañante necesitamos saber su nombre y apellido para poder agregarlo a la lista.</h3>
                     <div className="section-label-text">
                        <div className='flex gap-4'>
                           <label htmlFor="partnerConfirm" className='flex gap-2 cursor-pointer'>Si
                              <input 
                                 type="radio" 
                                 name="partner" 
                                 id="partnerConfirm" 
                                 value={ true } 
                                 onClick={ handleChange }
                                 className='section-input-radio'/>
                           </label>
                           <label htmlFor="partnerNotConfirm" className='flex gap-2 cursor-pointer'>No
                              <input 
                                 type="radio" 
                                 name="partner" 
                                 id="partnerNotConfirm" 
                                 value={ false } 
                                 onClick={ handleChange }
                                 className='section-input-radio'/>
                           </label>
                        </div>
                        <label className='flex flex-col'>
                           <input
                              type="text"
                              name="partnersName"
                              placeholder="Nombre y apellido del acompañante"
                              value={ formData.partnersName }
                              onChange={ handleChange }
                              className="section-input-text"
                              disabled={ optionalInput }
                           />
                        </label>
                     </div>
                  </span>
               </label>

               {/* Childrens section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='partners_name' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-72">
                     <div className="section-header">
                        <h3>
                           Niños
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'partners_name') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="font-medium mb-4">Necesitamos saber la cantidad de niños mayores de 4 años para poder agregarlos a la lista.</h3>
                     <div className="section-label-text">
                        <div className='flex gap-4'>
                           <label htmlFor="childrensConfirm" className='flex gap-2 cursor-pointer'>Si
                              <input 
                              type="radio" 
                              name="childrens" 
                              id="childrensConfirm" 
                              value={ true } 
                              onClick={ handleChange } 
                              className='section-input-radio'
                              />
                           </label>
                           <label htmlFor="childrensNotConfirm" className='flex gap-2 cursor-pointer'>No
                              <input 
                              type="radio" 
                              name="childrens" 
                              id="childrensNotConfirm" 
                              value={ false } 
                              onClick={ handleChange }
                              className='section-input-radio'
                              />
                           </label>
                        </div>
                        <label className='flex flex-col'>
                           <input
                              type="number"
                              name="childrensQuantity"
                              placeholder="Ingresá cantidad de niños"
                              value={ formData.childrensQuantity }
                              onChange={ handleChange }
                              className="section-input-text"
                              disabled={ optionalInput }
                           />
                        </label>
                     </div>
                  </span>
               </label>

               {/* Food section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='food' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-96">
                     <div className="section-header">
                        <h3>
                           Restricciones alimentarias
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'food') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="font-medium mb-4">Seleccioná si tenés alguna restricción alimentaria. Haremos lo posible para sumar al menú alguna opción apta para vos.</h3>
                     <div className="flex flex-col pb-6">
                        {Object.entries(formData.foodPreferences).map(([key, value]) => (
                           <label key={key} className="section-label-radio">
                              <input
                                 type={'checkbox'}
                                 name={key}
                                 checked={formData.foodPreferences[key]}
                                 value={key}
                                 onChange={() => handleCheckboxChange('foodPreferences', event)}
                                 className='section-input-radio'
                              />
                              {key.toUpperCase().replace(/_/g, ' ')} {value}
                           </label>
                        ))}
                     </div>
                  </span>
               </label>

               {/* Drinks section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='drinks' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-fit">
                     <div className="section-header">
                        <h3>
                           Bebida
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'drinks') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="font-medium mb-4">Tendremos una barra pequeña y por eso queremos saber qué preferís tomar (no vaya a ser que te deshidrates)</h3>
                     <div className="flex flex-col pb-6">
                        {Object.entries(formData.drinkPreferences).map(([key, value]) => (
                           <label key={key} className="section-label-radio">
                              <input
                                 type={key === 'otro' ? 'text' : 'checkbox'}
                                 name={key}
                                 checked={key === 'otro' ? false : formData.drinkPreferences[key]}
                                 value={key === 'otro' ? value : key}
                                 onChange={key === 'otro' ? handleChange : () => handleCheckboxChange('drinkPreferences', event)}
                                 placeholder={key === 'otro' ? 'Ingresá tu bebida favorita' : ''}
                                 className={key === "otro" ?
                                    "section-input-text" :
                                    "section-input-radio"
                                 }
                              />
                              {key === 'otro' ? '' : key.toUpperCase().replace(/_/g, ' ')} {key === 'otro' && value}
                           </label>
                        ))}
                     </div>
                  </span>
               </label>

               {/* Assist church section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='assist_church' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                     <div className="section-header">
                        <h3>
                           Iglesia
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'assist_church') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <div className="flex flex-col pb-6">
                        <label className="section-label-radio">
                           <input
                              type="radio"
                              name='assistChurch'
                              value={ true }
                              onChange={ handleChange }
                              className="section-input-radio"
                           />Sí, 17hs estoy en la iglesia 💒
                        </label>
                        <label className="section-label-radio">
                           <input
                              type="radio"
                              name='assistChurch'
                              value={ false }
                              onChange={ handleChange }
                              className="section-input-radio"
                           />No, directo al salón a las 19h 🙌🏼
                        </label>
                     </div>
                  </span>
               </label>

               {/* Contact section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='contact' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-64">
                     <div className="section-header">
                        <h3>
                           Contacto
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'contact') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="font-medium mb-4">Dejanos un número de Whatsapp o mail donde podamos encontrarte si necesitamos consultarte o informarte algo del evento.</h3>
                     <div className="section-label-text">
                        <label>
                           <input
                              type="text"
                              name="contact"
                              placeholder="Dejanos un número de celular o mail"
                              value={formData.contact}
                              onChange={handleChange}
                              className="section-input-text"
                           />
                        </label>
                     </div>
                  </span>
               </label>

               {/* Message section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='message' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                     <div className="section-header">
                        <h3>
                           Mensaje para los novios
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'message') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="font-medium mb-4">Si necesitas hacernos alguna consulta o querés dejarnos algún mensaje este es el lugar.</h3>
                     <div className="section-label-text">
                        <label>
                           <input
                              type="text"
                              name="message"
                              placeholder="Te leemos"
                              value={ formData.message }
                              onChange={ handleChange }
                              className='section-input-text'
                           />
                        </label>
                     </div>
                  </span>
               </label>

               <div className="flex justify-between items-baseline">
                  <button
                     onClick={ handleSubmit }
                     type="submit"
                     className="mt-4 bg-green text-white py-2 px-6 transition-all duration-200 rounded-md hover:bg-green-dark active:scale-95">
                     Enviar
                  </button>
               </div>

            </form>
         </div>
      </div>
   )
}

export default ModalConfirm