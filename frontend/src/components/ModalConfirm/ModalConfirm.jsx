import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ModalContext } from "../../context/ModalContext"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import './ModalConfirm.css';
import Swal from 'sweetalert2'



const initialFormState = {
   fullName: '',
   phone: '',
   assist: '',
   partner: 'false',
   partnersName: [],
   childrens: 'false',
   childrensQuantity: 0,
   assistChurch: false,
   dietaryRestrictions: 'false',
   dietaryRestrictionsIndications: '',
   otherFoodPreference: '',
   message: '',
};

const ModalConfirm = () => {

   const { setConfirmationModal, sent, setSent } = useContext(ModalContext);
   const [ formData, setFormData ] = useState(initialFormState);
   const [ arrowBehavior, setArrowBehavior ] = useState(false);
   const [ optionalInput, setOptionalInput ] = useState(true);
   const [ partnerNames, setPartnerNames ] = useState(['']);
   const [isLoading, setIsLoading] = useState(false);

// Función para manejar el cambio en un input
const handlePartnerNameChange = ( index, value ) => {
   const updatedNames = [...partnerNames];
   updatedNames[index] = value;
   setPartnerNames(updatedNames);
   setFormData(prevData => ({
      ...prevData,
      partnersName: updatedNames, // Actualizamos el estado formData con los nombres de los acompañantes
   }));
};

   // Función para agregar un nuevo input para otro acompañante
   const addPartnerInput = (e) => {
      e.preventDefault();
      setPartnerNames([...partnerNames, '']);
   };

// Función para eliminar un input de acompañante
   const removePartnerInput = (index) => {
      const updatedNames = [...partnerNames];
      updatedNames.splice(index, 1);
      setPartnerNames(updatedNames);

      // Actualizar formData eliminando el elemento correspondiente de partnerName
      setFormData(prevData => ({
         ...prevData,
         partnersName: prevData.partnersName.filter((_, i) => i !== index),
      }));
   };

   const handleChange = ( e ) => {
      const { name, type, value, checked } = e.target;
      if( type === "radio" ){
         value === "false" ? setOptionalInput(true) : setOptionalInput(false);
      }
      setFormData( prevData => ({
         ...prevData,
         [ name ]: type === 'checkbox' ? checked : value,
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
      setIsLoading(true);

      const showConfirmation = ( title, text, confirmedText ) => {
         setTimeout(() => {
            Swal.fire({
               confirmButtonText: 'Siguiente',
               title: title,
               text: text,
               background: '#EAE8E4',
               customClass: {
                  confirmButton: 'btn-alert bg-green hover:bg-green-dark'
               },
               buttonsStyling: false
            }).then((result) => {
               if (result.isConfirmed) {
               Swal.fire( {
                  confirmButtonText: 'Cerrar',
                  text: confirmedText,
                  background: '#EAE8E4',
                  customClass: {
                     confirmButton: 'btn-alert bg-green hover:bg-green-dark'
                  },
                  buttonsStyling: false
               }).then((result) => {
                  if (result.isConfirmed) {
                     setConfirmationModal(false);
                  }
               })
            }
         });
         }, 100);
      };

      console.log(formData);

      axios
      .post('https://wedding-invitation-backend.vercel.app/api/guests', formData)
      .then((response) => {
         console.log('Response:', response.data);
         if (formData.assist !== "false") {
            showConfirmation(
               '¡Es un si! 💜', 
               'Te esperamos para compartir y darlo todo con nosotros.', 
               'Formulario enviado con éxito!'
            );
            setSent(true);
         } else {
            showConfirmation(
               '¡Te vamos a extrañar!', 
               'pero creemos que la energía lo atraviesa todo así que igualmente ahí estarás con nosotros ✨.', 
               'Formulario enviado con éxito!'
            );
            setSent(true);
         }
      })
      .catch((error) => {
         console.error('Error:', error);
         showConfirmation(
            'Ups!', 
            'Algo salió mal.', 
            'El formulario no se ha enviado'
            );
      });

   };

   return (
      <div className="relative flex flex-col justify-start w-11/12 rounded-md antialiased overflow-y-scroll bg-cream text-gray-dark py-6 shadow-md
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

            <section className="flex flex-col mb-6">
               <span className="text-2xl font-medium mb-4">¿Hay equipo?</span>
               <span className="text-base font-light ">Hay que enviar un solo formulario por pareja, grupo familiar o individual, si te llegó a vos es porque es tu función 😉 
                  <br></br> ¡Esperamos que nos acompañes!
               </span>
               <span className="text-sm font-light italic mt-2">( Los campos con <span className='text-red'>*</span> son obligatorios )</span>
            </section>

            <form onClick={ handleArrowBehavior } className="mt-4 flex flex-col gap-4 text-left">

               {/* Full name section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='fullname' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-96">
                     <div className="section-header">
                        <h3>
                           Nombre completo
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'fullname') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <div className="flex flex-col pb-6 gap-2">
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

               {/* Phone section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='fullname' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-96">
                     <div className="section-header">
                        <h3>
                           Teléfono
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'fullname') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="text-sm font-medium mb-4">Dejanos un número de teléfono para poder contactarte por cualquier cosa.</h3>
                     <div className="flex flex-col pb-6 gap-2">
                        <label>
                           <input
                              required
                              type="text"
                              name="phone"
                              placeholder="Ingresá tu teléfono"
                              value={ formData.phone }
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
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-fit">
                     <div className="section-header">
                        <h3>
                           Acompañante/s
                           <span className='section-required'>*</span>
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'partners_name') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="text-sm font-medium mb-4">¿Fuiste invitado con alguien? Necesitamos su nombre y apellido para la lista. (Los niños van aparte).</h3>
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
                        <div className={ `${ formData.partner !== 'false' ? 'visible' : 'hidden'}` }>
                           { partnerNames.map( ( partnerName, index ) => (
                              <label key={index} className='flex items-center mt-2'>
                                 <input
                                    type="text"
                                    placeholder={`${index + 1}) Nombre y apellido `}
                                    value={ partnerName }
                                    onChange={ e => handlePartnerNameChange(index, e.target.value) }
                                    className='section-input-text'
                                    disabled={ optionalInput }
                                 />
                                 <CancelIcon onClick={ () => removePartnerInput( index ) } fontSize='small' className='text-mustard ml-1 cursor-pointer' />
                              </label>
                           ))}
                           <button 
                           className='mt-3 flex items-center gap-2 text-gray-dark text-opacity-50 text-sm font-normal'
                           onClick={ addPartnerInput }>
                              <AddCircleIcon fontSize='small' className='text-mustard' />
                              Agregar acompañante
                           </button>
                        </div>
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
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'partners_name') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="text-sm font-medium mb-4">¿Venís con niños que sean mayores a 4 años? Necesitamos agregarlos a la lista.</h3>
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
                        <label className='flex flex-col mt-2'>
                           <input
                              type="number"
                              name="childrensQuantity"
                              placeholder="Ingresá cantidad de niños"
                              value={ formData.childrensQuantity }
                              onChange={ handleChange }
                              className={ `section-input-text ${ formData.childrens !== 'false' ? 'visible section-input-text' : 'hidden'}` }
                              disabled={ optionalInput }
                           />
                        </label>
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
                           />Sí, 17 h estoy en la iglesia. 💒
                        </label>
                        <label className="section-label-radio">
                           <input
                              type="radio"
                              name='assistChurch'
                              value={ false }
                              onChange={ handleChange }
                              className="section-input-radio"
                           />No, 19 h estoy en el salón. 🙌🏼
                        </label>
                     </div>
                  </span>
               </label>

               {/* Food section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='partners_name' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-72">
                     <div className="section-header">
                        <h3>
                           Restricciones alimentarias
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'partners_name') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="text-sm font-medium mb-4">¿Vos o alguno de tu/s acompañante/s tienen alguna restricción alimentaria? Decinos a qué y cuántos son.</h3>
                     <div className="section-label-text">
                        <div className='flex gap-4'>
                           <label htmlFor="childrensConfirm" className='flex gap-2 cursor-pointer'>Si
                              <input 
                              type="radio" 
                              name="dietaryRestrictions" 
                              id="restrictionsConfirm" 
                              value={ true } 
                              onClick={ handleChange } 
                              className='section-input-radio'
                              />
                           </label>
                           <label htmlFor="childrensNotConfirm" className='flex gap-2 cursor-pointer'>No
                              <input 
                              type="radio" 
                              name="dietaryRestrictions" 
                              id="restrictionsNotConfirm" 
                              value={ false } 
                              onClick={ handleChange }
                              className='section-input-radio'
                              />
                           </label>
                        </div>
                        <label className='flex flex-col mt-2'>
                        <input
                           type="text"
                           name="dietaryRestrictionsIndications"
                           placeholder="Ingresá el tipo de restricción"
                           value={formData.dietaryRestrictionsIndications}
                           onChange={ handleChange } 
                           className={`section-input-text ${formData.dietaryRestrictions !== 'false' ? 'visible section-input-text' : 'hidden'}`}
                           disabled={optionalInput} // Utiliza optionalInput para controlar la desactivación del input
                        />
                        </label>
                     </div>
                  </span>
               </label>


               {/* Message section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='message' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-64">
                     <div className="section-header">
                        <h3>
                           Mensaje para los novios
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'message') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="text-sm font-medium mb-4">¿Querés decirnos algo? Consulta, declaraciones de amor, lo que sea, este es el espacio.</h3>
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
                  {
                     sent ?
                     <p className='text-green italic'>Formulario Enviado!</p>:
                     <button
                        onClick={ handleSubmit }
                        type="submit"
                        disabled={ isLoading }
                        className="mt-4 bg-green text-white py-2 px-6 transition-all duration-200 rounded-md hover:bg-green-dark active:scale-95">
                        { isLoading ? 'Enviando...' : 'Enviar' }
                     </button>
                  }

               </div>

            </form>
         </div>
      </div>
   )
}

export default ModalConfirm