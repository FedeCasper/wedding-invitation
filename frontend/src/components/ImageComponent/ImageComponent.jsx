import AnimatedElement from "../AnimatedElement/AnimatedElement"
import './ImageComponent.css'

const ImageComponent = ({ src, alt, margin }) => {
   return (
      <AnimatedElement>
         <section className="relative">
         <div className="loader -top-[5px] left-[50px]">
               <li className="ball"></li>
               <li className="ball"></li>
            </div>
            <img src={src} alt={alt} className={`relative mb-6 h-32 ${margin === 'disabled' ? 'mt-1' : 'mt-16'} lg:mt-16`}/>
            <div className=" loader bottom-12 -left-4 rotate-45 z-0">
               <li className="ball"></li>
               <li className="ball"></li>
            </div>
            <div className="loader bottom-3 right-[10px] rotate-[140deg] z-10">
               <li className="ball"></li>
               <li className="ball"></li>
               <li className="ball"></li>
            </div>
         </section>
      </AnimatedElement>
   );
}

export default ImageComponent;