import Arrows from "../components/Arrows/Arrows"
import Button from "../components/Button/Button"
import ButtonGift from "../components/ButtonGift/ButtonGift"
import Carousel from "../components/Carousel/Carousel"
import Countdown from "../components/Countdown/Countdown"
import CurvedBottomSection from "../components/CurvedBottomSection/CurvedBottomSection"
import CurvedTopSection from "../components/CurvedTopSection/CurvedSection"
import ImageComponent from "../components/ImageComponent/ImageComponent"
import InfoSection from "../components/InfoSection/InfoSection"
import MainHeadline from "../components/MainHeadline/MainHeadline"
import Portrait from "../components/Portrait/Portrait"
import Spinner from "../components/Spinner/Spinner"
import { useContext } from "react"
import { ModalContext } from "../context/ModalContext"
import CbuComponent from "../components/CbuComponent/CbuComponent"
import ModalConfirm from "../components/ModalConfirm/ModalConfirm"

const Layout = () => {

   const { modal, confirmationModal } = useContext(ModalContext);

   return (
      <div className={` relative flex flex-col items-center overflow-hidden  
         ${modal ?  'h-[105vh]' : 'h-min-screen'} 
         ${confirmationModal ? 'h-screen overflow-y-scroll' : 'h-min-screen'} `
      }>

         <ButtonGift />

         {/* Modals --------------------------------------- */}
         {
            modal && (
               <div className="absolute flex justify-center pt-4 h-[105vh] w-full backdrop-blur-md bg-white/30 z-50 ">
                  <CbuComponent />
               </div>
            )
         }

         {
            confirmationModal && (
               <div className="absolute flex justify-center pt-4 h-fit w-full backdrop-blur-md bg-white/30 z-50 ">
                  <ModalConfirm />
               </div>
            )
         }

         {/* 1° Portrait Section --------------------------------------- */}
         <section className="relative flex flex-col items-center w-full h-[100vh] text-sm bg-cream pt-8 px-8 overflow-hidden z-20">
            <Spinner />
            <Portrait />
            <MainHeadline />
            <Arrows />
            <CurvedTopSection bgColor={"bg-mustard"} />
         </section>

         {/* 2° Countdown, maps and schelude section --------------------------------------- */}
         <section className="relative flex flex-col items-center justify-center w-full bg-mustard h-fit px-8 z-30">
            <Countdown />
            <Button
               buttonText={"Agendar"}
               widthClass={"w-48"}
               colorCode={"bg-green"}
               url={'calendar'}
            />
            <ImageComponent
               src={"/assets/images/church-icon.png"}
               alt={"church icon"}
            />
            <InfoSection
               header={"Ceremonia | 10:00 am"}
               subtitle={"Nuestra Señora del Perpetuo Socorro"}
               lineColorCode={"border-[#5F7752]"}
            >
               Mazzolari 1 | Chacras de Coria, Mza
            </InfoSection>
            <Button
               buttonText={"¿Cómo llego?"}
               widthClass={"w-48"}
               colorCode={"bg-green"}
               url={'church'}
            />
            <ImageComponent
               src={"/assets/images/music-icon.png"}
               alt={"music icon"}
            />
            <InfoSection
               header={"Fiesta | 13:00 pm"}
               subtitle={"Finca AMproS"}
               lineColorCode={"border-[#5F7752]"}
            >
               C. Pescara, Cruz de Piedra, Mendoza
            </InfoSection>
            <Button
               buttonText={"¿Cómo llego?"}
               widthClass={"w-48"}
               colorCode={"bg-green"}
               url={'salon'}
            />
         </section>

         {/* 3° Music & clothes section --------------------------------------- */}
         <section className="relative flex flex-col items-center h-fit text-sm bg-green px-8 pt-20 pb-24 z-20">
            <CurvedBottomSection bgColor={"bg-mustard"} />
            <InfoSection
               header={"¿Qué me pongo?"}
               subtitle={"Dresscode: Vos metele facha y comodidad porque, oxidados o no, vamos a bailar"}
               lineColorCode={"border-mustard"}
            >
            </InfoSection>
            <ImageComponent
               src={"/assets/images/dance-icon.png"}
               alt={"dance icon"}
            />
            <InfoSection
               header={"¿Temones que no pueden faltar?"}
               lineColorCode={"border-mustard"}
            >
               Ayudanos a armar la lista y no dejar, afuera ningún tema de esos que
               te hacen darlo todo.
            </InfoSection>
            <Button
               buttonText={"Añadir tu tema"}
               widthClass={"w-64"}
               colorCode={"bg-mustard"}
               url={'spotify'}
            />
            <CurvedTopSection bgColor={"bg-cream"} />
         </section>

         {/* 4° Confirmation section --------------------------------------- */}
         <section className="relative flex flex-col items-center h-fit w-full text-sm bg-cream px-8 z-20">
            <ImageComponent
               src={"/assets/images/confirm-icon.png"}
               alt={"confirm icon"}
               margin={"disabled"}
            />
            <InfoSection
               header={"¿Hay equipo?"}
               lineColorCode={"border-mustard"}
               textColorCode={"text-gray-dark"}
            >
               Esperamos que puedas acompañarnos en este momento tan especial PD: Si
               no confirmás nos dolerá el bolsillo (y el alma).
            </InfoSection>
            <Button
               buttonText={"Confirmar asistencia"}
               widthClass={"w-64"}
               colorCode={"bg-green"}
               url={false}
            />
            <ImageComponent
               src={"/assets/images/plane-icon.png"}
               alt={"plane icon"}
            />
            <InfoSection
               header={"¿Qué les regalo?"}
               lineColorCode={"border-mustard"}
               textColorCode={"text-gray-dark"}
            >
               ¿El mejor regalo? tu presencia, pero si querés ayudarnos a cumplir un
               sueño hacé click en el botón.
            </InfoSection>
            <Button
               buttonText={"Ver información"}
               widthClass={"w-64"}
               colorCode={"bg-green"}
               url={false}
               action={"infoModal"}
            />
         </section>

         {/* 5° Carousel section --------------------------------------- */}
         <section className="flex justify-center bg-cream w-full z-20">
            <Carousel />
         </section>


      </div>
      );
}

            export default Layout