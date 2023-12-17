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
import ModalWeather from "../components/ModalWeather/ModalWeather"
import SectionContainer from "../components/SectionContainer/SectionContainer"
import SectionContainerElement from "../components/SectionContainerElement/SectionContainerElement"


const Layout = () => {

   const { modal, confirmationModal, weatherModal } = useContext(ModalContext);

   console.log(weatherModal);

   return (
      <div className={` relative flex flex-col items-center overflow-hidden
         ${confirmationModal || weatherModal || modal ? ' h-screen' : 'h-min-screen'} `
      }>

         <ButtonGift />

         {/* Modals --------------------------------------- */}
         {
            modal && (
               <div className="fixed inset-0 mx-auto flex justify-center py-4 h-screen w-full backdrop-blur-md bg-cream/60 z-50 ">
                  <CbuComponent />
               </div>
            )
         }

         {
            weatherModal && (
               <div className="fixed inset-0 mx-auto flex justify-center py-4 h-screen w-full backdrop-blur-md bg-cream/60 z-50 ">
                  <ModalWeather />
               </div>
            )
         }

         {
            confirmationModal && (
               <div className="fixed inset-0 mx-auto flex justify-center py-4 h-screen over w-full backdrop-blur-sm bg-cream/40 z-50 ">
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
         <section className="relative flex flex-col items-center justify-center w-full bg-mustard h-fit px-8 pb-4 z-30
            lg:px-60 lg:pb-20">

            <Countdown />
            <Button
               buttonText={"Agendar"}
               widthClass={"w-48"}
               colorCode={"bg-green"}
               url={'calendar'}
            />

            {/* Church and party container ---------- */}
            <SectionContainer>

               {/* Church section ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/church-icon.png"}
                     alt={"church icon"}
                  />
                  <InfoSection
                     header={"Ceremonia | 17:00 pm"}
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
               </SectionContainerElement>

               {/* Party section ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/music-icon.png"}
                     alt={"Icono música"}
                  />
                  <InfoSection
                     header={"Fiesta | 19:00 pm"}
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
               </SectionContainerElement>

            </SectionContainer>

         </section>

         {/* 3° Music & clothes section --------------------------------------- */}
         <section className="relative flex flex-col items-center w-full h-fit text-sm bg-green px-8 pt-20 pb-32 z-20
            lg:pb-40">
            <CurvedBottomSection bgColor={"bg-mustard"} />

            {/* Dress and music container ---------- */}
            <SectionContainer>

               {/* Dress section ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                        src={"/assets/images/dress-icon.png"}
                        alt={"Icono vestimenta"}
                        margin={"disabled"}
                     />
                  <div className="flex flex-col items-center">
                     <InfoSection
                        header={ '¿Qué me pongo?' }
                        subtitle={ 'Dresscode: Vos metele facha y comodidad porque, oxidados o no, vamos a bailar.' }
                        lineColorCode={ 'border-mustard' }
                     >
                     </InfoSection>
                     <Button
                        buttonText={ 'Mirá el clima' }
                        widthClass={ 'w-64' }
                        colorCode={ 'bg-mustard' }
                        action={ 'openWeatherModal' }
                     />
                  </div>
               </SectionContainerElement>

               {/* Music section ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/dance-icon.png"}
                     alt={"Icono baile"}
                  />
                  <InfoSection
                     header={"¿Temones Imprescindible?"}
                     lineColorCode={"border-mustard"}
                  >
                     Ayudanos a armar la lista y no dejar afuera ningún tema de esos que te hacen darlo todo.
                  </InfoSection>
                  <Button
                     buttonText={"Añadir tu tema"}
                     widthClass={"w-64"}
                     colorCode={"bg-mustard"}
                     url={'spotify'}
                  />
               </SectionContainerElement>

            </SectionContainer>

            <CurvedTopSection bgColor={"bg-cream"} />
         </section>

         {/* 4° Confirmation section --------------------------------------- */}
         <section className="relative flex flex-col items-center h-fit w-full text-sm bg-cream px-8 z-20
            sm:pb-24">

            {/* Dress and music container ---------- */}
            <SectionContainer>

               {/* Confirmation section ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/confirm-icon.png"}
                     alt={"Icono confimación"}
                     margin={"disabled"}
                  />
                  <InfoSection
                     header={ '¿Hay equipo?' }
                     lineColorCode={ 'border-mustard' }
                     textColorCode={ 'text-gray-dark' }
                  >
                     Esperamos que puedas acompañarnos.<br></br>
                     PD: Si no confirmás nos dolerá el bolsillo<br></br>
                     (y el alma).
                  </InfoSection>
                  <Button
                     buttonText={ 'Confirmar asistencia' }
                     widthClass={ 'w-64' }
                     colorCode={ 'bg-green' }
                     action={ 'openConfirmationModal' }
                  />
               </SectionContainerElement>

               {/* Present section ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/plane-icon.png"}
                     alt={"plane icon"}
                  />
                  <InfoSection
                     header={"¿Qué les regalo?"}
                     lineColorCode={"border-mustard"}
                     textColorCode={"text-gray-dark"}
                  >
                     ¿El mejor regalo? tu presencia,<br></br>
                     pero si querés ayudarnos a cumplir<br></br>
                     un sueño hacé click en el botón.
                     
                  </InfoSection>
                  <Button
                     buttonText={ 'Ver información' }
                     widthClass={ 'w-64' }
                     colorCode={ 'bg-green' }
                     url={ false }
                     action={ 'openInfoModal' }
                  />
               </SectionContainerElement>

            </SectionContainer>

         </section>

         {/* 5° Carousel section --------------------------------------- */}
         <section className="relative flex justify-center items-end bg-cream w-full z-20
            sm:hidden">
            <Carousel />
         </section>


      </div>
      );
}

            export default Layout