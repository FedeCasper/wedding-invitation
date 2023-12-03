
const Layout = () => {
   return (
      <div className=" h-min-screen w-full flex flex-col items-center overflow-hidden">
         <section className=" h-36 text-sm font-bold bg-[#E1DFDB] relative z-20">
            <span>CIRCULO</span>
            <h1>Nos casamos</h1>
            <h2>Fede & Fede</h2>
            <h3>23 de junio</h3>
            <span>IMG</span>
         </section>


         <section className="flex flex-col items-center h-36 text-sm font-bold bg-[#5F7752] relative z-20">
            <section className="section2 h-fit w-full text-sm font-bold bg-[#C49F5F] rounded-b-full rounded-t-full absolute -top-10 z-30">
               <h5>Faltan</h5>
               <div>CONTADOR</div>
               <div>BUTTON</div>
               <div>IMG</div>
               <h6>Ceremonia</h6>
               <p>lorem</p>
               <div>BUTTON</div>
               <div>IMG</div>
               <h6>Ceremonia</h6>
               <p>lorem</p>
               <div>BUTTON</div>
            </section>

            <h6>Ceremonia</h6>
            <p>lorem</p>
            <div>IMG</div>
            <h6>Ceremonia</h6>
            <p>lorem</p>
            <div>BUTTON</div>

            <section className=" h-fit w-full text-sm font-bold bg-[#E1DFDB] rounded-b-full rounded-t-full absolute -bottom-10 z-20">
               <div>IMG</div>
               <h6>Ceremonia</h6>
               <p>lorem</p>
               <div>BUTTON</div>
               <h5>Lorem</h5>
               <h5>Lorem</h5>
            </section>
         </section>



      </div>
   )
}

export default Layout