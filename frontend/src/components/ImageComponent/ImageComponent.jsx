import AnimatedElement from "../AnimatedElement/AnimatedElement"
import './ImageComponent.css'

const ImageComponent = ({ src, alt }) => {
   return (
      <AnimatedElement>
         <section className="relative">
         <div className="loader -top-[5px] left-[50px]">
               <li className="ball"></li>
               <li className="ball"></li>
            </div>
            <img src={src} alt={alt} className="relative mt-16 mb-6 h-32 "/>
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