import './Carousel.css'
const Carousel = () => {

   return (
      <section className='flex justify-center items-baseline relative z-40 w-[450px] h-72 pt-12 overflow-hidden
         lg:w-full lg:h-96 lg:pt-6 '>
         < img src="/assets/photos/img-01.png" className="pic01"/>
         < img src="/assets/photos/img-02.png" className="pic02"/>
         < img src="/assets/photos/img-03.png" className="pic03"/>
         < img src="/assets/photos/img-04.png" className="pic04"/>
         < img src="/assets/photos/img-05.png" className='pic05'/>
      </section>
   )
}

export default Carousel