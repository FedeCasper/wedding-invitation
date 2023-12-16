import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ModalContext } from "../../context/ModalContext"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
   const [ arrowBehavior, setArrowBehavior ] = useState(false);

   console.log(formData);

   const handleChange = (event) => {
      console.log([event.target.name], [event.target.value]);
      const { name, type, value, checked } = event.target;
      setFormData( prevData => ({
         ...prevData,
         [name]: type === 'checkbox' ? checked : value,
      }));
   };

   const handleCheckboxChange = (group, event) => {
      console.log([group], [event.target.value]);
      const { name, checked } = event.target;
      setFormData((prevData) => ({
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
            onClick={ () => setConfirmationModal(false) }
            src="./assets/images/btn-close.png"
            alt=" Boton cerrar "
            className="absolute top-5 right-5 h-10 cursor-pointer shadow-md z-50
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
                  <input className="peer/showLabel absolute scale-0" type="checkbox" name='fullname' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
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
                  <input className="peer/showLabel absolute scale-0" type="checkbox" name='assist' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                  <div className="section-header">
                     <h3>
                        ¿Venís a nuestro casamiento?
                        <span className='section-required'>*</span>
                     </h3>
                     <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'assist') && 'rotate-180' }` } fontSize='medium' /> 
                  </div>
                     <div className="flex flex-col pb-6">
                        <label className="flex items-center gap-2 mt-3">
                           <input
                              required
                              type="radio"
                              name="assist"
                              value={true}
                              onChange={handleChange}
                              className="section-input-radio"
                           />YENDO 🚀
                        </label>
                        <label className="flex items-center gap-2 mt-3">
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

               {/* Drinks section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0" type="checkbox" name='drinks' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-fit">
                     <div className="section-header">
                        <h3>
                           ¿Qué bebidas preferís?
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'drinks') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="font-medium mb-4">Tendremos una barra pequeña y por eso queremos saber qué preferís tomar (no vaya a ser que te deshidrates)</h3>
                     <div className="flex flex-col pb-6">
                        {Object.entries(formData.drinkPreferences).map(([key, value]) => (
                           <label key={key} className="flex items-center gap-2 mt-3">
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

               {/* Food section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0" type="checkbox" name='food' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-96">
                     <div className="section-header">
                        <h3>
                           ¿Tenés preferencia de menú?
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'food') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="font-medium mb-4">Seleccioná si tenés alguna restricción alimentaria. Haremos lo posible para sumar al menú alguna opción apta para vos.</h3>
                     <div className="flex flex-col pb-6">
                        {Object.entries(formData.foodPreferences).map(([key, value]) => (
                           <label key={key} className="flex items-center gap-2 mt-3">
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

               {/* Partners section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0" type="checkbox" name='partner' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                     <div className="section-header">
                        <h3>
                           ¿Venís en pareja?
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'partner') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <div className="flex flex-col pb-6">
                     <label className="flex items-center gap-2 mt-3">
                        <input
                           type="radio"
                           name='partner'
                           value={false}
                           onChange={handleChange}
                           className="section-input-radio"
                        />VOY SOLO 😏
                     </label>
                     <label className="flex items-center gap-2 mt-3">
                        <input
                           type="radio"
                           name='partner'
                           value={true}
                           onChange={handleChange}
                           className="section-input-radio"
                        />VOY CON ALGUIEN 😉
                     </label>
                     </div>
                  </span>
               </label>

               {/* Partners name section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0" type="checkbox" name='partners_name' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                     <div className="section-header">
                        <h3>
                           ¿Cómo se llama tu pareja?
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'partners_name') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="font-medium mb-4">Necesitamos saber el Nombre y Apellido de esa persona para poder agregarla a la lista.</h3>
                     <div className="section-label-text">
                        <label>
                           <input
                              type="text"
                              name="partnersName"
                              placeholder="Nombre y apellido de tu acompañante"
                              value={formData.partnersName}
                              onChange={handleChange}
                              className="section-input-text"
                           />
                        </label>
                     </div>
                  </span>
               </label>

               {/* Assist church section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0" type="checkbox" name='assist_church' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                     <div className="section-header">
                        <h3>
                           ¿Asistís a la iglesia?
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'assist_church') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <div className="flex flex-col pb-6">
                        <label className="flex items-center mt-3 gap-2">
                           <input
                              type="radio"
                              name='assistChurch'
                              value={true}
                              onChange={handleChange}
                              className="section-input-radio"
                           />Sí, 17hs estoy en la iglesia 💒
                        </label>
                        <label className="flex items-center mt-3 gap-2">
                           <input
                              type="radio"
                              name='assistChurch'
                              value={false}
                              onChange={handleChange}
                              className="section-input-radio"
                           />No, directo al salón a las 19h 🙌🏼
                        </label>
                     </div>
                  </span>
               </label>

               {/* Contact section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0" type="checkbox" name='contact' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-64">
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
                  <input className="peer/showLabel absolute scale-0" type="checkbox" name='message' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
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