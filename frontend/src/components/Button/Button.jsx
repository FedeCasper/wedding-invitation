import './Button.css'
import AnimatedElement from "../AnimatedElement/AnimatedElement"
import { ModalContext } from "../../context/ModalContext"
import { useContext } from "react"

const Button = ( { buttonText, colorCode, url, action, disabled } ) => {
   
   const { setModal, setConfirmationModal, setWeatherModal, sent } = useContext(ModalContext);

   const handleForm = () => {
      switch(action) {
         case 'openWeatherModal':
            setWeatherModal(true);
            break;
         case 'openConfirmationModal':
            setConfirmationModal(true);
            break;
         case 'openInfoModal':
            setModal(true);
            break;
      }
   };

   const handleUrl = (url) => {
      const urlMapping = {
         calendar: 'https://www.google.com/calendar/event?action=TEMPLATE&text=Casamiento%20Fede%26Fede%20💒👉🏼🥳&dates=20240309/20240310&details=¡Nos%20casamos!%20y%20sí,%20obviamente%20que%20estás%20invitado.%0A%0AA%20tener%20en%20cuenta%20%F0%9F%95%9C%F0%9F%91%87%F0%9F%8F%BC%0A%F0%9F%92%92El%20%C2%A1S%C3%AD!%20de%20la%20iglesia%20lo%20damos%20a%20las%2017%20p.m,%20en%20la%20iglesia%20de%20Chacras%0A%F0%9F%A5%82El%20brindis%20empieza%20a%20las%2019%20p.m%20en%20la%20finca%20AMproS,%20Maip%C3%BA%0A%F0%9F%8E%89%20La%20fiesta%20depende%20de%20ustedes,%20así%20que%20vayan%20con%20zapatos%20cómodos%20para%20darlo%20todo.%0A%0AF%26F',
         salon: 'https://www.google.com.ar/maps/place/AMProS+Finca/@-33.0299681,-68.7834189,17z/data=!3m1!4b1!4m6!3m5!1s0x967e73a636a5a81d:0x781563d83c3e0d97!8m2!3d-33.0299681!4d-68.780844!16s%2Fg%2F11j20rqk2q?entry=ttu',
         church: 'https://www.google.com.ar/maps/place/Nuestra+Se%C3%B1ora+del+Perpetuo+Socorro/@-32.9861458,-68.8823416,19.5z/data=!4m14!1m7!3m6!1s0x967e0aed5218d66d:0x7764b4bce40bb3a3!2sMazzolari+11,+Luj%C3%A1n+de+Cuyo,+Mendoza!3b1!8m2!3d-32.9861862!4d-68.8818644!3m5!1s0x967e0aed5a60252d:0xfdad166df1aef71f!8m2!3d-32.9859832!4d-68.8816163!16s%2Fg%2F11b6nrlfd4?entry=ttu',
         spotify: 'https://open.spotify.com/playlist/4zl9JhttxJvAHzJlsdpdaH?si=wIC9a0QvRYOEjgeDUgYATQ&pt=a7701318c99dae1208e60faafbb0f603',
      };
      if (url in urlMapping) {
         setTimeout(() => {
            window.location.href = urlMapping[url];
         }, 500);
      }
   };

   return (
      <AnimatedElement>
         <button 
            onClick={ url ? () => handleUrl(url) : handleForm }
            disabled={ sent }
            type="button" 
            className={` unselectable w-64 text-lg active:bg-green-dark
            ${colorCode}
            ${ colorCode === 'bg-mustard' ? 'btn-special' : 'btn-normal' }  `}
         >
            { buttonText }
         </button>
      </AnimatedElement>
   )
}

export default Button