import AnimatedElement from "../AnimatedElement/AnimatedElement"
import './ImageComponent.css'

const ImageComponent = ({ src, alt }) => {
   return (
      <AnimatedElement>
         <section className="max-h-12">
            <img src={src} alt={alt} className="mt-16 mb-6 h-32"/>
            <div class="loader">
            <li class="ball"></li>
            <li class="ball"></li>
            <li class="ball"></li>
            </div>
         </section>

      </AnimatedElement>
   );
}

export default ImageComponent;