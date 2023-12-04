import Button from "../components/Button/Button"
import ImageComponent from "../components/ImageComponent/ImageComponent"
import InfoSection from "../components/InfoSection/InfoSection"
import MainHeadline from "../components/MainHeadline/MainHeadline"
import Portrait from "../components/Portrait/Portrait"
import Spinner from "../components/Spinner/Spinner"

const Layout = () => {
   return (
      <div className=" h-min-screen flex flex-col items-center overflow-hidden">

         <section className=" relative flex flex-col items-center w-full text-sm bg-[#E1DFDB] h-[100vh] z-20">
            <Spinner />
            <Portrait />
            <MainHeadline />
         </section>

         <section className="flex flex-col items-center w-full text-sm bg-[#C49F5F] h-[100vh]   z-30">
            <h5>Faltan</h5>
            <div>CONTADOR</div>
            <Button buttonText={ "Agendar" } widthClass={ "w-48" } colorCode={ "bg-[#5F7752]" } />
            <ImageComponent src={ "/assets/images/church-icon.png" } alt={ "church icon" }/>
            <InfoSection header={ "Ceremonia | 10:00 am" } subtitle={ "Nuestra Señora del Perpetuo Socorro" } lineColorCode={ "border-[#5F7752]"  }>
               Mazzolari 1 | Chacras de Coria, Mza
            </InfoSection>
            <Button buttonText={ "¿Cómo llego?" } widthClass={ "w-48" } colorCode={ "bg-[#5F7752]" } />
            <ImageComponent src={ "/assets/images/music-icon.png" } alt={ "music icon" }/>
            <InfoSection header={ "Fiesta | 13:00 pm" } subtitle={ "Finca AMproS" } lineColorCode={ "border-[#5F7752]" }>
               C. Pescara, Cruz de Piedra, Mendoza
            </InfoSection>
            <Button buttonText={ "¿Cómo llego?" } widthClass={ "w-48" } colorCode={ "bg-[#5F7752]" } />
         </section>

         <section className="flex flex-col items-center h-fit w-full text-sm bg-[#5F7752]  z-20">
            <InfoSection header={ "¿Qué me pongo?" } subtitle={ "Dresscode: Elegante | Sport" } lineColorCode={ "border-[#C49F5F]" }>
            (Vos metele facha y comodidad porque,
               oxidados o no, vamos a bailar)
            </InfoSection>
            <ImageComponent src={ "/assets/images/dance-icon.png" } alt={ "dance icon" }/>
            <InfoSection header={ "¿Temones que no pueden faltar?" } lineColorCode={ "border-[#C49F5F]" }>
               Ayudanos a armar la lista y no dejar, 
               afuera ningún tema de esos que te
               hacen darlo todo.
            </InfoSection>
            <Button buttonText={ "Añadir tu tema" } widthClass={ "w-64" } colorCode={ "bg-[#C49F5F]" } />
         </section>

         <section className="flex flex-col items-center h-fit w-full text-sm bg-[#E1DFDB] z-20">
            <ImageComponent src={ "/assets/images/confirm-icon.png" } alt={ "confirm icon" } />
            <InfoSection header={ "¿Hay equipo?" } lineColorCode={ "border-[#C49F5F]" } textColorCode={ "text-[#404040]" }>
               Esperamos que puedas acompañarnos 
               en este momento tan especial
               PD: Si no confirmás nos dolerá el bolsillo
               (y el alma).
            </InfoSection>
            <Button buttonText={ "Confirmar asistencia" } widthClass={ "w-64" } colorCode={ "bg-[#5F7752]" } />
            <ImageComponent src={ "/assets/images/plane-icon.png" } alt={ "plane icon" }/>
            <InfoSection header={ "¿Qué les regalo?" } lineColorCode={ "border-[#C49F5F]"} textColorCode={ "text-[#404040]" } >
               ¿El mejor regalo? tu presencia,
               pero si querés ayudarnos a cumplir un
               sueño hacé click en el botón.
            </InfoSection>
            <Button buttonText={ "¿Ver información?" } widthClass={ "w-64" } colorCode={ "bg-[#5F7752]" } />
         </section>

      </div>
   )
}

export default Layout