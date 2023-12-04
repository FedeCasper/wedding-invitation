import Button from "../components/Button/Button"

const Layout = () => {
   return (
      <div className=" h-min-screen flex flex-col items-center overflow-hidden">
         <section className=" flex flex-col items-center h-36 w-full text-sm font-bold bg-[#E1DFDB]  z-20">
            <span>CIRCULO</span>
            <h1>Nos casamos</h1>
            <h2>Fede & Fede</h2>
            <h3>23 de junio</h3>
            <span>IMG</span>
         </section>

         <section className="flex flex-col items-center w-full text-sm font-bold bg-[#C49F5F]   z-30">
            <h5>Faltan</h5>
            <div>CONTADOR</div>
            <Button />
            <div>IMG</div>
            <h6>Ceremonia</h6>
            <p>lorem</p>
            <div>BUTTON</div>
            <div>IMG</div>
            <h6>Ceremonia</h6>
            <p>lorem</p>
            <div>BUTTON</div>
         </section>

         <section className="flex flex-col items-center h-36 w-full text-sm font-bold bg-[#5F7752]  z-20">
            <h6>Ceremonia</h6>
            <p>lorem</p>
            <div>IMG</div>
            <h6>Ceremonia</h6>
            <p>lorem</p>
            <div>BUTTON</div>
         </section>

         <section className="flex flex-col items-center h-fit w-full text-sm font-bold bg-[#E1DFDB] z-20">
               <div>IMG</div>
               <h6>Ceremonia</h6>
               <p>lorem</p>
               <div>BUTTON</div>
               <h5>Lorem</h5>
               <h5>Lorem</h5>
         </section>

      </div>
   )
}

export default Layout