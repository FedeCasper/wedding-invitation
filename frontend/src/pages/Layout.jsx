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
import { useContext, useState } from "react"
import { ModalContext } from "../context/ModalContext"
import CbuComponent from "../components/CbuComponent/CbuComponent"
import ModalConfirm from "../components/ModalConfirm/ModalConfirm"

const Layout = () => {

   const { modal, confirmationModal } = useContext(ModalContext);

   console.log(modal);

   // overflow-hidden
   return (
      <div className={` relative flex flex-col items-center overflow-hidden  
         ${modal ?  'h-screen' : 'h-min-screen'} 
         ${confirmationModal ? 'h-screen overflow-y-scroll' : 'h-min-screen'} `
      }>

         <ButtonGift />

         {/* Modals --------------------------------------- */}
         {
            modal && (
               <div className="absolute flex justify-center pt-4 h-[110vh] w-full backdrop-blur-md bg-white/30 z-50 ">
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

         {/* 1° Section --------------------------------------- */}
         <section className=" relative flex flex-col items-center w-full text-sm bg-[#E1DFDB] h-[100vh] z-20 pt-8 px-8 overflow-hidden">
            <Spinner />
            <Portrait />
            <MainHeadline />
            <Arrows />
            <CurvedTopSection bgColor={"bg-[#C49F5F]"} />
         </section>

         {/* 2° Section --------------------------------------- */}
         <section className=" relative flex flex-col items-center justify-center w-full bg-[#C49F5F] h-fit px-8 z-30">
            <Countdown />
            <Button
               buttonText={"Agendar"}
               widthClass={"w-48"}
               colorCode={"bg-[#5F7752]"}
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
               colorCode={"bg-[#5F7752]"}
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
               colorCode={"bg-[#5F7752]"}
               url={'salon'}
            />
         </section>

         {/* 3° Section --------------------------------------- */}
         <section className=" relative flex flex-col items-center justify-center h-[100vh] w-full text-sm bg-[#5F7752] px-8 z-20">
            <CurvedBottomSection bgColor={"bg-[#C49F5F]"} />
            <InfoSection
               header={"¿Qué me pongo?"}
               subtitle={"Dresscode: Elegante | Sport"}
               lineColorCode={"border-[#C49F5F]"}
            >
               (Vos metele facha y comodidad porque, oxidados o no, vamos a bailar)
            </InfoSection>
            <ImageComponent
               src={"/assets/images/dance-icon.png"}
               alt={"dance icon"}
            />
            <InfoSection
               header={"¿Temones que no pueden faltar?"}
               lineColorCode={"border-[#C49F5F]"}
            >
               Ayudanos a armar la lista y no dejar, afuera ningún tema de esos que
               te hacen darlo todo.
            </InfoSection>
            <Button
               buttonText={"Añadir tu tema"}
               widthClass={"w-64"}
               colorCode={"bg-[#C49F5F]"}
               url={'spotify'}
            />
            <CurvedTopSection bgColor={"bg-[#E3E0D9]"} />
         </section>

         {/* 4° Section --------------------------------------- */}
         <section className=" relative flex flex-col items-center h-fit w-full text-sm bg-[#E1DFDB] px-8 z-20">
            <ImageComponent
               src={"/assets/images/confirm-icon.png"}
               alt={"confirm icon"}
            />
            <InfoSection
               header={"¿Hay equipo?"}
               lineColorCode={"border-[#C49F5F]"}
               textColorCode={"text-[#404040]"}
            >
               Esperamos que puedas acompañarnos en este momento tan especial PD: Si
               no confirmás nos dolerá el bolsillo (y el alma).
            </InfoSection>
            <Button
               buttonText={"Confirmar asistencia"}
               widthClass={"w-64"}
               colorCode={"bg-[#5F7752]"}
               url={false}
            />
            <ImageComponent
               src={"/assets/images/plane-icon.png"}
               alt={"plane icon"}
            />
            <InfoSection
               header={"¿Qué les regalo?"}
               lineColorCode={"border-[#C49F5F]"}
               textColorCode={"text-[#404040]"}
            >
               ¿El mejor regalo? tu presencia, pero si querés ayudarnos a cumplir un
               sueño hacé click en el botón.
            </InfoSection>
            <Button
               buttonText={"Ver información"}
               widthClass={"w-64"}
               colorCode={"bg-[#5F7752]"}
               url={false}
               action={"infoModal"}
            />
         </section>
         <section className="bg-[#E1DFDB] w-full">
            <Carousel />
         </section>


      </div>
      );
}

            export default Layout