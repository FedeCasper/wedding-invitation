import './Button.css'

const Button = ( { buttonText, widthClass, colorCode } ) => {
   return (
      <button 
         type="button" 
         className={`text-lg btn-normal unselectable ${widthClass} ${colorCode}`}>
         { buttonText }
      </button>
   )
}

export default Button