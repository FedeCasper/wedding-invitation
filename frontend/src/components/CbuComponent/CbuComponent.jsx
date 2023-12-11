import { ModalContext } from "../../context/ModalContext"
import { useContext } from "react"
import './CbuComponent.css'


const CbuComponent = () => {

   const { modal, setModal } = useContext(ModalContext);

   const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
   }

   return (

      <div className="flex flex-col w-11/12 h-[95vh] border border-amber-600">

         <header className="relative flex flex-col items-center justify-center gap-2 h-fit w-full pb-16 pt-6  bg-[url('./assets/backgrounds/cbu-header-vertical.png')] bg-no-repeat bg-cover bg-bottom">
            <h2 className="text-lg font-semibold text-center text-white z-50">¡Llegó el esperado<br></br> regalo!</h2>
            <h3 className="text-base font-medium text-center text-[#404040] z-50">Nuestros datos bancarios:</h3>
            <img 
            onClick={ () => setModal( false ) }
            src="./assets/images/btn-close.png" 
            alt=" Boton cerrar " 
            className="absolute top-4 right-4 h-10 cursor-pointer z-50
               transition-all delay-50 duration-150 hover:cursor-pointer hover:scale-90 hover:drop-shadow-md hover:rotate-90" />
            <img src="./assets/images/cbu-header-pieces-02.png" alt="" className="h-28 absolute bottom-5 right-5 jumping-element" />
            <img src="./assets/images/cbu-header-pieces-01.png" alt="" className="h-28 absolute top-5 left-5 jumping-element-reverse" />
            <img src="./assets/images/cbu-header-pieces-03.png" alt="" className="h-8 absolute bottom-5 right-25 jumping-element" />
         </header>

         <main className='flex flex-col gap-8 grow bg-[#EAE8E4] p-6 items-center text-[#404040] text-sm'>

            <article className="flex flex-col gap-2 w-full">
               <section className="flex items-center gap-2">
                  <img src="./assets/images/green-arrows-icon.png" alt="" className='h-6'/>
                  <h2 className='font-semibold text-base'>BANCO PATAGONIA</h2>
               </section>
               <div className='flex-wrap'>
                  <span className='italic'>Titular de cuenta :</span>
                  <span className='font-semibold'> Federica Risso Patrón</span>
               </div>
               <div className='flex items-center gap-2 flex-wrap'>
                  <span className='italic'>Alias :</span>
                     <div className='flex items-center gap-2'>
                        <span className='font-semibold'> FEDE.Y.FEDE</span>
                     </div>
                     <button
                        className="group relative inline-flex " >
                        <img 
                           onClick={ () => copyToClipboard('FEDE.Y.FEDE') } 
                           src="./assets/images/copy-icon.png" 
                           alt=" Boton copiar " 
                           title='Copiar' 
                           className='h-6 cursor-pointer
                           transition origin-bottom-left duration-300 ease-in-out hover:scale-110 hover:rotate-3' />
                        <div className="hidden group-hover:block">
                           <div
                              className="group absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-[#EAE8E4] before:-top-2">
                              <div className="rounded-sm bg-[#5D7551] py-1 px-2">
                                 <p className="whitespace-nowrap">Copiar</p>
                              </div>
                           </div>
                        </div>
                     </button>
               </div>
               <div className='flex-wrap'>
                  <span className='italic'>CUIL/CUIT :</span>
                  <span className='font-semibold'> 27351838855</span>
               </div>
               <div className='flex items-center gap-2 flex-wrap'>
                  <span className='italic'>CBU :</span>
                  <div className='flex items-center gap-2'>
                     <span className='font-semibold'> 0340060908600037774006</span>
                     <button
                        className="group relative inline-flex " >
                        <img 
                           onClick={ () => copyToClipboard('0340060908600037774006') } 
                           src="./assets/images/copy-icon.png" 
                           alt=" Boton copiar " 
                           title='Copiar' 
                           className='h-6 cursor-pointer
                           transition origin-bottom-left duration-300 ease-in-out hover:scale-110 hover:rotate-3' />
                        <div className="hidden group-hover:block">
                           <div
                              className="group absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-[#EAE8E4] before:-top-2">
                              <div className="rounded-sm bg-[#5D7551] py-1 px-2">
                                 <p className="whitespace-nowrap">Copiar</p>
                              </div>
                           </div>
                        </div>
                     </button>
                  </div>
               </div>
            </article>

            <article className="flex flex-col gap-4 w-full">
               <section className="flex items-center gap-2">
                  <img src="./assets/images/green-arrows-icon.png" alt="" className='h-6'/>
                  <h2 className='font-semibold text-base'>DINERO EN MONEDA EXTRANJERA</h2>
               </section>
               <p >
                  <span className='italic text-base/7'>
                     No tenemos cuentas para recibir dinero extranjero, por lo tanto 👉🏻 sobre en mano.<br></br>
                     <span className='font-semibold not-italic'> Requisito único : </span>
                     No dólar cara chica o estropeado (es que después nadie los recibe 😥)
                  </span>
               </p>
            </article>

            <article className='flex flex-col gap-6 items-center'>
               <hr className='w-48 border border-[#5D7551]' />
               <h2 className='text-2xl font-medium'>¡Desde ya mil gracias!</h2>
            </article>

         </main>

         <footer className='h-[10vh] bg-[#5D7551] border border-green-900 flex items-center justify-center'>
            <img src="./assets/images/cbu-footer.png" alt="" className=" h-3/6" />
         </footer>
      </div>


   )
}

export default CbuComponent