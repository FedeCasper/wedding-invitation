const MainHeadline = () => {
   return (
      <section className="z-50 flex flex-col items-center gap-5 absolute inset-0 mx-auto top-[40%] lg:top-[35%]">
         <img src="/assets/images/header-title-mobile.png" alt="" className="w-52 mb-2 lg:w-64" />
         <img src="/assets/images/names.png" alt="" className="w-72 lg:w-96"/>
         <hr className="w-44 border-1 border-mustard " />
         <h3 className="text-center text-white text-[22px] mt-2 drop-shadow-lg lg:text-[24px]">
            9 de marzo 2024
         </h3>
      </section>
   )
}

export default MainHeadline