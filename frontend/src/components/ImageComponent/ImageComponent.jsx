import AnimatedElement from "../AnimatedElement/AnimatedElement"
import './ImageComponent.css'

const ImageComponent = ({ src, alt, margin }) => {
   return (
      <AnimatedElement>
         <section className={ `relative mb-4 ${margin === 'disabled' ? 'mt-1' : 'mt-10'} lg:mt-8` }>
            <div className="loader top-[15px] left-[50px]">
               <li className="ball"></li>
               <li className="ball"></li>
            </div>
            <div className="flex justify-center items-center h-44">
               <img src={src} alt={alt} className={`relative h-32 `}/>
            </div>
            <div className=" loader bottom-24 -left-4 rotate-45 z-0">
               <li className="ball"></li>
               <li className="ball"></li>
            </div>
            <div className="loader bottom-10 right-[10px] rotate-[140deg] z-10">
               <li className="ball"></li>
               <li className="ball"></li>
               <li className="ball"></li>
            </div>
         </section>
      </AnimatedElement>
   );
}

export default ImageComponent;